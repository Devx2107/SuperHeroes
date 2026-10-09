// Rebuild the expanded dossiers from their editable editorial source.
const fs = require("node:fs");
const path = require("node:path");
const additions = require("./new-characters.json");
const catalog = require("./roster-art-source.json");
const localArt = require("../frontend/art.json");
const target = path.resolve(__dirname, "../frontend/heroes.json");
const heroes = JSON.parse(fs.readFileSync(target, "utf8"));
for (const entry of additions) {
  const art = catalog.find((item) => item.id === entry.artId);
  if (!art) throw new Error(`Missing artwork record for ${entry.id}`);
  const comparison = Object.fromEntries(
    ["strength", "speed", "intelligence", "durability", "combat", "power"].map(
      (key, i) => [key, entry.ratings[i]],
    ),
  );
  const [rivalName, threat, front, back] = entry.rival;
  const rival = [...Object.values(heroes), ...additions].find(
    (item) =>
      item.name.replace(/^The /, "").toLowerCase() ===
      rivalName.replace(/^The /, "").toLowerCase(),
  );
  const catalogRival = catalog.find(
    (item) =>
      item.name.replace(/^The /, "").toLowerCase() ===
      rivalName.replace(/^The /, "").toLowerCase(),
  );
  const rivalArt =
    localArt[`${entry.id}-villain-0`] ||
    localArt[rival?.id] ||
    (rival?.artId
      ? catalog.find((item) => item.id === rival.artId)?.images.lg
      : rival?.image) ||
    catalogRival?.images.lg ||
    "";
  heroes[entry.id] = {
    id: entry.id,
    name: entry.name,
    identity: entry.identity,
    universe: entry.universe,
    alignment: entry.alignment,
    title: entry.title,
    subtitle: entry.subtitle,
    bgText: entry.name.toUpperCase(),
    cityLabel: entry.city,
    image: art.images.lg,
    video: "",
    audio: "",
    wiki: entry.source,
    source: entry.source,
    motif: entry.motif,
    colors: {
      primary: entry.color,
      secondary: "#141820",
      accent: entry.color,
      bg: "#07090d",
    },
    stats: {
      ALIGNMENT: entry.alignment.toUpperCase(),
      DEBUT: entry.debut[0],
      SPECIALTY: entry.abilities[0].toUpperCase(),
    },
    abilities: entry.abilities,
    badges: [
      entry.title,
      entry.alignment === "villain"
        ? "Rogues gallery"
        : entry.alignment === "antihero"
          ? "Walks the gray line"
          : "A different kind of hero",
    ],
    storyLeft: entry.origin,
    storyRight: entry.angle,
    ctaLabel: "OPEN THE DOSSIER",
    versions: [],
    villains: [{ name: rivalName, threat, image: rivalArt, front, back }],
    timelineKind: "profile",
    timeline: [
      { year: entry.debut[0], title: "First appearance", text: entry.debut[1] },
      { year: "ORIGIN", title: "The turning point", text: entry.origin },
      { year: "POWER", title: "Signature abilities", text: entry.powers },
      { year: "LEGACY", title: "The enduring question", text: entry.legacy },
    ],
    comparison,
    battle: {
      hp: 100,
      attack: Math.round(comparison.combat / 4),
      special: Math.round(comparison.power / 3),
      moves: {
        attack: entry.abilities[0],
        special: entry.abilities[1],
        guard: "takes a defensive stance",
      },
    },
    quizAffinity: Object.fromEntries(
      [
        "leader",
        "scholar",
        "rebel",
        "heart",
        "speedster",
        "mystic",
        "feral",
      ].map((key, i) => [key, entry.traits[i]]),
    ),
    lore: {
      origin: [entry.origin, entry.angle],
      powers: [entry.powers],
      storylines: [entry.legacy],
      allies: [entry.angle],
      legacy: [entry.legacy],
      funFacts: [
        `First appeared in ${entry.debut[1]}.`,
        `Identity: ${entry.identity}.`,
      ],
    },
    trivia: [
      {
        question: `Which identity belongs to ${entry.name}?`,
        choices: [entry.identity, "Bruce Wayne", "Tony Stark", "Peter Parker"],
        answer: 0,
        explanation: `${entry.name}'s identity is ${entry.identity}.`,
      },
    ],
  };
}
for (const hero of Object.values(heroes)) hero.alignment ||= "hero";
fs.writeFileSync(target, JSON.stringify(heroes, null, 2) + "\n");
console.log(
  `Expanded archive: ${Object.keys(heroes).length} dossiers, ${additions.length} additions.`,
);
