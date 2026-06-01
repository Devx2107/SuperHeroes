'use strict';

const heroes = {
  ironman: {
    id: "ironman",
    name: "Iron Man",
    universe: "Marvel Cinematic Universe",
    tag: "Tech futurist with a reactor-powered conscience",
    story: "Tony Stark turns invention into armor, ego into sacrifice, and every room into a livewire press conference. He wins by thinking faster than the threat.",
    badges: ["Avenger founder", "Armor architect", "Arc reactor core"],
    colors: { primary: "#ff6b35", secondary: "#f7c948", accent: "#7be0ff", bg: "#0d1424" },
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 88, Speed: 72, Strategy: 97, Durability: 84, Charisma: 91 },
    abilities: ["Repulsor barrage", "Nanotech deployment", "Aerial combat matrix", "AI-assisted targeting"],
    villains: [
      {
        name: "Mandarin",
        threat: "Global manipulator",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        front: "A myth, a terrorist symbol, and the perfect mirror for Tony's fear of weaponized spectacle.",
        back: "The Mandarin matchup always asks whether Stark's genius can outmaneuver fear, propaganda, and a villain who turns image into control."
      },
      {
        name: "Whiplash",
        threat: "Vengeful engineer",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        front: "Ivan Vanko proves that the arc reactor can inspire rivals as dangerous as Tony himself.",
        back: "Whiplash is personal. He attacks the Stark legacy at its source and turns innovation into a blood feud."
      },
      {
        name: "Ultron",
        threat: "Runaway intelligence",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
        front: "Tony's worst-case scenario given shape: a machine that inherits his ambition without his restraint.",
        back: "Ultron matters because he is not just a villain. He is Stark's own logic detached from empathy."
      }
    ],
    timeline: [
      { year: "2008", title: "Armor Genesis", text: "Tony builds the first suit in captivity and redefines the superhero movie era." },
      { year: "2012", title: "Battle of New York", text: "He becomes the engine of the Avengers and starts carrying the burden of planetary defense." },
      { year: "2016", title: "Civil War Split", text: "His belief in accountability fractures the team and exposes his emotional fault lines." },
      { year: "2019", title: "Endgame Sacrifice", text: "Stark closes the Infinity Saga by giving everything to finish the fight." }
    ],
    teamup: {
      partner: "Black Panther",
      synergy: 93,
      title: "Precision meets sovereignty",
      text: "Tony brings improvisational invention. T'Challa brings disciplined leadership. Together they combine battlefield technology with strategic calm."
    },
    battle: {
      hp: 118,
      attack: 23,
      special: 31,
      guard: 0.55,
      moves: {
        attack: "fires a repulsor burst",
        special: "unleashes a nanotech overdrive",
        guard: "raises a kinetic shield"
      }
    },
    quizAffinity: { leader: 3, rebel: 2, scholar: 3, heart: 1, mystic: 0, feral: 0, speedster: 1 },
    trivia: [
      { question: "What powers Iron Man's armor?", choices: ["Arc reactor", "Tesseract shard", "Gamma battery", "Vibranium core"], answer: 0 },
      { question: "What is Tony Stark's company?", choices: ["Oscorp", "WayneTech", "Stark Industries", "LexCorp"], answer: 2 }
    ]
  },
  thor: {
    id: "thor",
    name: "Thor",
    universe: "Marvel Multiverse",
    tag: "God of thunder with mythic force and bruised nobility",
    story: "Thor carries storms, legacy, and grief in equal measure. He is at his best when thunder becomes protection instead of pride.",
    badges: ["Asgardian royalty", "Storm wielder", "Mjolnir lineage"],
    colors: { primary: "#5fc8ff", secondary: "#b2d7ff", accent: "#ffe27a", bg: "#071424" },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 97, Speed: 76, Strategy: 78, Durability: 96, Charisma: 85 },
    abilities: ["Mjolnir recall", "Storm channeling", "Bifrost strike", "God-tier endurance"],
    villains: [
      {
        name: "Loki",
        threat: "Chaos tactician",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
        front: "Brotherhood makes every battle sting harder when Loki turns wit, envy, and survival into theater.",
        back: "Loki matters because he constantly tests whether Thor's strength includes forgiveness, humility, and emotional intelligence."
      },
      {
        name: "Hela",
        threat: "Death sovereign",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
        front: "Hela strips away crown, hammer, and certainty, forcing Thor to become power without props.",
        back: "Her arrival reframes Thor's identity: he is not the god of hammers, but the god of thunder."
      },
      {
        name: "Gorr",
        threat: "God butcher",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
        front: "Gorr attacks the moral legitimacy of gods, not just their bodies.",
        back: "He pushes Thor to answer whether divinity means glory or service."
      }
    ],
    timeline: [
      { year: "2011", title: "Exile to Earth", text: "Thor loses his hammer and learns worthiness the hard way." },
      { year: "2017", title: "Ragnarok Reforged", text: "He survives the fall of Asgard and unlocks his power without Mjolnir." },
      { year: "2018", title: "Stormbreaker", text: "Thor channels cosmic grief into a weapon built to kill a titan." },
      { year: "2022", title: "Love and Thunder", text: "He rediscovers tenderness while battling a crusade against gods." }
    ],
    teamup: {
      partner: "The Flash",
      synergy: 90,
      title: "Lightning in two tempos",
      text: "Thor brings godlike force while Flash manipulates pace and positioning. Together they overwhelm enemies before the battlefield can stabilize."
    },
    battle: {
      hp: 128,
      attack: 24,
      special: 34,
      guard: 0.52,
      moves: {
        attack: "swings Mjolnir with thunderous force",
        special: "calls down a bifrost stormbreaker combo",
        guard: "summons a storm barrier"
      }
    },
    quizAffinity: { leader: 2, rebel: 1, scholar: 0, heart: 2, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "What makes Thor worthy of Mjolnir?", choices: ["Royal blood", "Worthiness enchantment", "Odin's crown", "Infinity energy"], answer: 1 },
      { question: "Thor is prince of which realm?", choices: ["Xandar", "Asgard", "Attilan", "Latveria"], answer: 1 }
    ]
  },
  blackpanther: {
    id: "blackpanther",
    name: "Black Panther",
    universe: "Marvel | Wakanda",
    tag: "Royal tactician with vibranium grace",
    story: "T'Challa balances kingly duty, technological genius, and ancestral identity. He moves like a shadow and rules like a strategist.",
    badges: ["King of Wakanda", "Vibranium suit", "Ancestral line"],
    colors: { primary: "#8d7dff", secondary: "#42e8e0", accent: "#f5e663", bg: "#0b1020" },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 84, Speed: 86, Strategy: 93, Durability: 82, Charisma: 88 },
    abilities: ["Kinetic redistribution", "Enhanced senses", "Vibranium claws", "Royal strategy"],
    villains: [
      {
        name: "Killmonger",
        threat: "Revolutionary insurgent",
        image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80",
        front: "Killmonger weaponizes shared heritage and turns Wakanda's isolation into an accusation.",
        back: "He matters because he forces T'Challa to confront the moral cost of protecting paradise without helping the world."
      },
      {
        name: "Namor",
        threat: "Ocean empire ruler",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        front: "Namor is not chaos for chaos's sake. He is a sovereign threat with principles, grief, and impossible leverage.",
        back: "This rivalry measures diplomacy against vengeance and asks how far a nation should go to defend itself."
      },
      {
        name: "Klaw",
        threat: "Vibranium raider",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        front: "Klaw strips Wakanda's resource struggle down to greed, extraction, and invasion.",
        back: "He is a smaller-scale villain than others, but he embodies the colonial hunger T'Challa has to outmaneuver."
      }
    ],
    timeline: [
      { year: "2016", title: "Debut in Civil War", text: "T'Challa arrives as a poised force of vengeance and restraint." },
      { year: "2018", title: "Wakanda Opened", text: "Black Panther transforms from origin story into cultural event and national mythmaking." },
      { year: "2018", title: "Infinity War Frontline", text: "Wakanda becomes the last defense against Thanos' invasion." },
      { year: "2022", title: "Wakanda Forever", text: "Legacy shifts from one king to a people carrying memory forward." }
    ],
    teamup: {
      partner: "Iron Man",
      synergy: 95,
      title: "Brains, resources, and battlefield calm",
      text: "T'Challa complements Stark's improvisation with discipline. One engineers the future, the other decides how it should be used."
    },
    battle: {
      hp: 112,
      attack: 22,
      special: 28,
      guard: 0.6,
      moves: {
        attack: "slashes with vibranium claws",
        special: "releases stored kinetic force",
        guard: "crosses his suit into a vibranium brace"
      }
    },
    quizAffinity: { leader: 3, rebel: 0, scholar: 2, heart: 2, mystic: 1, feral: 0, speedster: 0 },
    trivia: [
      { question: "What powers Black Panther's suit and kingdom?", choices: ["Adamantium", "Vibranium", "Nth metal", "Uru"], answer: 1 },
      { question: "Which nation does T'Challa rule?", choices: ["Madripoor", "Genosha", "Latveria", "Wakanda"], answer: 3 }
    ]
  },
  flash: {
    id: "flash",
    name: "The Flash",
    universe: "DC Multiverse",
    tag: "Fastest man alive with a heart that outruns time",
    story: "Barry Allen races through grief, timelines, and impossible rescues. Every choice is measured in microseconds and consequence.",
    badges: ["Speed Force link", "Forensic scientist", "Temporal wildcard"],
    colors: { primary: "#ffd449", secondary: "#ff5f45", accent: "#ffeec2", bg: "#190a07" },
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 79, Speed: 100, Strategy: 81, Durability: 72, Charisma: 86 },
    abilities: ["Lightning sprint", "Phasing", "Time remnant tactics", "Speed Force surge"],
    villains: [
      {
        name: "Reverse-Flash",
        threat: "Temporal stalker",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        front: "No villain makes heroism feel more intimate and invasive than a speedster who lives to ruin Barry's life.",
        back: "Reverse-Flash weaponizes obsession itself. He turns Barry's powers into a timeline-wide vulnerability."
      },
      {
        name: "Zoom",
        threat: "Predatory speed god",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        front: "Zoom doesn't just chase the Flash. He tries to define what pain should teach him.",
        back: "He matters because he treats suffering as a curriculum, forcing Barry to reject brutality as growth."
      },
      {
        name: "Savitar",
        threat: "Future nightmare",
        image: "https://images.unsplash.com/photo-1505672678657-cc7037095e02?auto=format&fit=crop&w=900&q=80",
        front: "Savitar is the speedster myth gone feral: all velocity, no healing.",
        back: "As a twisted future echo, Savitar warns Barry what happens when speed stops serving people."
      }
    ],
    timeline: [
      { year: "2014", title: "TV Breakout", text: "The CW era turns speed into bright, emotional serial storytelling." },
      { year: "2017", title: "Justice League Entry", text: "Barry becomes the awkward heartbeat of a world-scale team-up." },
      { year: "2023", title: "Flashpoint Cinema", text: "The film doubles down on multiverse consequences and family loss." },
      { year: "Always", title: "Speed Force Legacy", text: "Every Flash story replays the tension between rescue, regret, and second chances." }
    ],
    teamup: {
      partner: "Thor",
      synergy: 89,
      title: "One redirects weather, the other redirects time",
      text: "Flash handles chaos control and impossible saves while Thor turns every opening into thunderous impact."
    },
    battle: {
      hp: 96,
      attack: 21,
      special: 30,
      guard: 0.48,
      moves: {
        attack: "lands a blur-speed combo",
        special: "detonates a Speed Force vortex",
        guard: "phases between incoming strikes"
      }
    },
    quizAffinity: { leader: 1, rebel: 1, scholar: 1, heart: 3, mystic: 1, feral: 0, speedster: 3 },
    trivia: [
      { question: "Barry Allen is also what kind of professional?", choices: ["Journalist", "Forensic scientist", "Astronaut", "Lawyer"], answer: 1 },
      { question: "The Flash draws power from the...", choices: ["Quantum Realm", "Negative Zone", "Speed Force", "Phantom Zone"], answer: 2 }
    ]
  },
  wolverine: {
    id: "wolverine",
    name: "Wolverine",
    universe: "Marvel | X-Men",
    tag: "Adamantium fury wrapped around a wounded survivor",
    story: "Logan is claws, healing, grit, and memory scars. He is terrifying in battle and devastatingly human when the rage subsides.",
    badges: ["Mutant healing", "Adamantium skeleton", "X-Men icon"],
    colors: { primary: "#f2c94c", secondary: "#4a6fa5", accent: "#ffd9a0", bg: "#110f1d" },
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 87, Speed: 74, Strategy: 76, Durability: 98, Charisma: 70 },
    abilities: ["Adamantium claws", "Regenerative healing", "Berserker rush", "Heightened senses"],
    villains: [
      {
        name: "Sabretooth",
        threat: "Savage counterpart",
        image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=900&q=80",
        front: "Sabretooth makes every Wolverine fight feel like family trauma with claws out.",
        back: "This rivalry matters because Victor embodies the version of Logan who never learned restraint."
      },
      {
        name: "Weapon X",
        threat: "Program, not person",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        front: "Weapon X is the machinery that turned Logan's body into a battlefield.",
        back: "Sometimes the villain is not a face. It is the institution that stole identity and commodified pain."
      },
      {
        name: "Lady Deathstrike",
        threat: "Precision assassin",
        image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80",
        front: "Deathstrike brings elegance and vengeance to a fight that is always one cut from catastrophe.",
        back: "She matters because she mirrors Wolverine's weaponization while keeping none of his reluctant conscience."
      }
    ],
    timeline: [
      { year: "2000", title: "X-Men Launch", text: "Wolverine becomes the breakout intensity engine of the modern team era." },
      { year: "2009", title: "Origins Retold", text: "His tortured past and Weapon X history move to center stage." },
      { year: "2013", title: "The Wolverine", text: "The solo myth leans into mortality, honor, and exile." },
      { year: "2017", title: "Logan", text: "The character reaches a raw, elegiac peak in a future-western finale." }
    ],
    teamup: {
      partner: "Black Panther",
      synergy: 84,
      title: "Instinct sharpened by discipline",
      text: "Wolverine disrupts and absorbs pressure. Black Panther chooses the moments where Logan's ferocity becomes mission-winning leverage."
    },
    battle: {
      hp: 135,
      attack: 25,
      special: 27,
      guard: 0.58,
      moves: {
        attack: "slashes in a berserker burst",
        special: "dives into an adamantium frenzy",
        guard: "drops into a low feral defense"
      }
    },
    quizAffinity: { leader: 0, rebel: 3, scholar: 0, heart: 1, mystic: 0, feral: 3, speedster: 0 },
    trivia: [
      { question: "What metal coats Wolverine's skeleton?", choices: ["Vibranium", "Carbonadium", "Adamantium", "Promethium"], answer: 2 },
      { question: "Wolverine is most famously tied to which mutant team?", choices: ["Guardians", "Fantastic Four", "X-Men", "Eternals"], answer: 2 }
    ]
  },
  scarletwitch: {
    id: "scarletwitch",
    name: "Scarlet Witch",
    universe: "Marvel | Surprise Pool",
    tag: "Reality-bending grief made mythic",
    story: "Wanda turns emotion into impossible scale. She is the kind of surprise pick that changes the emotional weather of the whole page.",
    badges: ["Chaos magic", "Reality warp", "Surprise pool reveal"],
    colors: { primary: "#f14f7c", secondary: "#ffa3b1", accent: "#ffd7e1", bg: "#190814" },
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 99, Speed: 70, Strategy: 83, Durability: 78, Charisma: 80 },
    abilities: ["Hex field", "Reality rewrite", "Telekinetic crush", "Chaos projection"],
    villains: [
      {
        name: "Agatha Harkness",
        threat: "Witch manipulator",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
        front: "Agatha understands power and appetite, making her a precise threat to Wanda's instability.",
        back: "She matters because she identifies Wanda's potential and immediately tries to claim it."
      }
    ],
    timeline: [
      { year: "2015", title: "Avengers Arrival", text: "Wanda enters the battlefield as grief and power fused together." },
      { year: "2021", title: "Westview Fracture", text: "WandaVision turns sorrow into genre-bending television spectacle." },
      { year: "2022", title: "Multiverse of Madness", text: "Her arc becomes a warning about power without healing." },
      { year: "Hidden", title: "Surprise Pool", text: "She appears when Other becomes a full reveal." }
    ],
    teamup: {
      partner: "Thor",
      synergy: 88,
      title: "Chaos and thunder",
      text: "Thor provides force and protection while Wanda bends the shape of the fight itself."
    },
    battle: {
      hp: 108,
      attack: 24,
      special: 35,
      guard: 0.47,
      moves: {
        attack: "lashes out with scarlet energy",
        special: "tears reality with a chaos nova",
        guard: "wraps herself in a hex barrier"
      }
    },
    quizAffinity: { leader: 0, rebel: 1, scholar: 1, heart: 3, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "Scarlet Witch's magic is often described as...", choices: ["Solar magic", "Chaos magic", "Gamma magic", "Vibranium magic"], answer: 1 }
    ]
  },
  milesmorales: {
    id: "milesmorales",
    name: "Miles Morales",
    universe: "Marvel | Surprise Pool",
    tag: "Electric swagger and modern Spider-Verse style",
    story: "Miles brings youth, rhythm, and invention. He shifts the page into a more kinetic, neon register the moment Other reveals him.",
    badges: ["Spider-Verse", "Bio-electric venom", "Surprise pool reveal"],
    colors: { primary: "#ff4f4f", secondary: "#3f9dff", accent: "#ffe26d", bg: "#0f1018" },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 81, Speed: 88, Strategy: 82, Durability: 77, Charisma: 92 },
    abilities: ["Venom strike", "Camouflage", "Acrobatic webs", "Street-level reflexes"],
    villains: [
      {
        name: "The Prowler",
        threat: "Family fracture",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        front: "Prowler turns mentorship, secrecy, and family into one loaded conflict.",
        back: "The rivalry matters because Miles never gets to separate heroic growth from personal stakes."
      }
    ],
    timeline: [
      { year: "2018", title: "Spider-Verse Breakthrough", text: "Miles becomes a defining animated superhero voice overnight." },
      { year: "2023", title: "Across the Spider-Verse", text: "The multiverse expands and so does Miles' resistance to predetermined fate." },
      { year: "Hidden", title: "Surprise Pool", text: "Miles appears when Other pivots from mystery into momentum." },
      { year: "Future", title: "Next Swing", text: "Every new version of Miles keeps the style conversation moving forward." }
    ],
    teamup: {
      partner: "The Flash",
      synergy: 86,
      title: "Velocity and improvisation",
      text: "Flash opens the lane. Miles turns it into fluid, high-style pressure with constant repositioning."
    },
    battle: {
      hp: 102,
      attack: 22,
      special: 29,
      guard: 0.51,
      moves: {
        attack: "snaps in with a venom jab",
        special: "drops an electric web cascade",
        guard: "fades into camouflage"
      }
    },
    quizAffinity: { leader: 1, rebel: 2, scholar: 1, heart: 3, mystic: 0, feral: 0, speedster: 2 },
    trivia: [
      { question: "Miles Morales is famous for what extra spider ability?", choices: ["Heat vision", "Venom strike", "Super breath", "Magic webs"], answer: 1 }
    ]
  },
  doctorstrange: {
    id: "doctorstrange",
    name: "Doctor Strange",
    universe: "Marvel | Surprise Pool",
    tag: "Mystic strategist guarding impossible thresholds",
    story: "Strange brings occult precision and multiverse consequence. He shifts Other from wildcard to cosmic chessboard.",
    badges: ["Sorcerer Supreme", "Mystic shields", "Surprise pool reveal"],
    colors: { primary: "#ff7d3b", secondary: "#6bc5ff", accent: "#ffd27f", bg: "#100d18" },
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 92, Speed: 68, Strategy: 94, Durability: 74, Charisma: 78 },
    abilities: ["Eldritch shields", "Portal slicing", "Astral projection", "Time-loop tactics"],
    villains: [
      {
        name: "Dormammu",
        threat: "Dimension tyrant",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        front: "Dormammu is not just larger than life. He is larger than ordinary cause and effect.",
        back: "He matters because Strange's greatest wins often come from cunning, not direct force."
      }
    ],
    timeline: [
      { year: "2016", title: "Mystic Origin", text: "Stephen Strange turns surgical discipline into sorcerous control." },
      { year: "2018", title: "One Chance on Titan", text: "He sees the one future path to victory and commits." },
      { year: "2022", title: "Multiverse Fracture", text: "His stories expand into incursions, variants, and hard responsibility." },
      { year: "Hidden", title: "Surprise Pool", text: "Strange surfaces when Other reveals the cosmic tier." }
    ],
    teamup: {
      partner: "Iron Man",
      synergy: 91,
      title: "Calculation on two frequencies",
      text: "Tony handles engineered solutions while Strange handles metaphysical threats. Together they cover every axis of disaster."
    },
    battle: {
      hp: 104,
      attack: 20,
      special: 33,
      guard: 0.57,
      moves: {
        attack: "lashes out with a sigil strike",
        special: "folds the arena with eldritch geometry",
        guard: "casts a rotating mandala shield"
      }
    },
    quizAffinity: { leader: 1, rebel: 0, scholar: 3, heart: 1, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "What title is Doctor Strange known by?", choices: ["Master Builder", "Sorcerer Supreme", "King of Kings", "Omega Herald"], answer: 1 }
    ]
  }
};

const rosterOrder = ["ironman", "thor", "blackpanther", "flash", "wolverine"];
const voteRoster = [...rosterOrder, "other"];

function toHeroArray() {
  return Object.values(heroes).map((hero) => ({ ...hero }));
}

function getHeroById(id) {
  return heroes[id] || null;
}

module.exports = { heroes, rosterOrder, voteRoster, toHeroArray, getHeroById };
