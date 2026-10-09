const fs = require("node:fs/promises");
const path = require("node:path");
const heroes = require("../frontend/heroes.json");

(async () => {
  const directory = path.resolve(__dirname, "../public/art");
  await fs.mkdir(directory, { recursive: true });
  const manifest = path.resolve(__dirname, "../frontend/art.json");
  const results = JSON.parse(
    await fs.readFile(manifest, "utf8").catch(() => "{}"),
  );
  const queue = Object.values(heroes).map((hero) => ({
    id: hero.id,
    url: hero.image,
  }));
  for (const id of ["batman", "superman", "spiderman", "thor", "ironman"]) {
    heroes[id].versions.forEach((actor, index) =>
      queue.push({
        id: `${id}-actor-${index}`,
        url: actor.image,
        title:
          actor.actor === "ROBERT DOWNEY JR"
            ? "Robert Downey Jr."
            : actor.actor
                .toLowerCase()
                .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      }),
    );
    heroes[id].villains.forEach((villain, index) =>
      queue.push({
        id: `${id}-villain-${index}`,
        url: villain.image,
        title:
          {
            "The Joker": "Joker (character)",
            Bane: "Bane (DC Comics)",
            Brainiac: "Brainiac (character)",
            "Green Goblin": "Green Goblin",
          }[villain.name] || villain.name,
      }),
    );
  }
  let cached = 0,
    failed = 0;
  async function run({ id, url, title }) {
    if (results[id]) {
      try {
        await fs.access(
          path.resolve(__dirname, "../public", results[id].replace(/^\//, "")),
        );
        return;
      } catch {
        /* Restore missing cached files. */
      }
    }
    try {
      let response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!response.ok && url.includes("/thumb/")) {
        const original = url
          .replace("/thumb/", "")
          .slice(0, url.replace("/thumb/", "").lastIndexOf("/"));
        response = await fetch(original, {
          signal: AbortSignal.timeout(10000),
        });
      }
      if (!response.ok && title) {
        const page = await fetch(
          `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
          { signal: AbortSignal.timeout(10000) },
        );
        const html = await page.text();
        const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
        if (
          image &&
          /^https:\/\/(upload|thumb)\.wikimedia\.org\//.test(image)
        ) {
          let canonical = new URL(image.replaceAll("&amp;", "&"));
          canonical.search = "";
          canonical.hostname = "upload.wikimedia.org";
          if (canonical.pathname.includes("/thumb/"))
            canonical.pathname = canonical.pathname
              .replace("/thumb/", "")
              .slice(
                0,
                canonical.pathname.replace("/thumb/", "").lastIndexOf("/"),
              );
          response = await fetch(canonical, {
            signal: AbortSignal.timeout(10000),
          });
        }
      }
      if (
        !response.ok ||
        !response.headers.get("content-type")?.startsWith("image/")
      )
        throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      const extension = response.headers.get("content-type").includes("png")
        ? "png"
        : "jpg";
      await fs.writeFile(path.join(directory, `${id}.${extension}`), buffer);
      results[id] = `/art/${id}.${extension}`;
      cached++;
    } catch (error) {
      failed++;
      console.log(`${id}: retaining remote artwork (${error.message})`);
    }
  }
  for (const entry of queue) await run(entry);
  await fs.writeFile(manifest, JSON.stringify(results, null, 2));
  console.log(
    `Cached ${cached} new images. ${Object.keys(results).length} local images total. ${failed} remote fallbacks.`,
  );
})();
