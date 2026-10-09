const fs = require("node:fs/promises");
const path = require("node:path");
const additions = require("./new-characters.json");
const root = path.resolve(__dirname, "..");
const normalize = (name) => name.replace(/^The /, "").toLowerCase();

(async () => {
  const response = await fetch(
    "https://akabab.github.io/superhero-api/api/all.json",
    { signal: AbortSignal.timeout(15000) },
  );
  if (!response.ok) throw new Error(`Artwork catalog: HTTP ${response.status}`);
  const catalog = await response.json();
  const manifestPath = path.join(root, "frontend/art.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const sources = [];
  const queue = additions.flatMap((entry) => {
    const art = catalog.find((item) => item.id === entry.artId);
    if (!art) throw new Error(`No artwork for ${entry.id}`);
    sources.push(art);
    const rival = catalog.find(
      (item) => normalize(item.name) === normalize(entry.rival[0]),
    );
    if (rival) sources.push(rival);
    return [
      { id: entry.id, url: art.images.lg },
      ...(rival ? [{ id: `${entry.id}-villain-0`, url: rival.images.lg }] : []),
    ];
  });
  const missing = [];
  async function cache(entry) {
    if (manifest[entry.id]) {
      try {
        await fs.access(path.join(root, "public", manifest[entry.id]));
        return;
      } catch {}
    }
    try {
      const response = await fetch(entry.url, {
        signal: AbortSignal.timeout(15000),
      });
      if (
        !response.ok ||
        !response.headers.get("content-type")?.startsWith("image/")
      )
        throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 1000) throw new Error("Empty artwork");
      await fs.writeFile(
        path.join(root, "public/art", `${entry.id}.jpg`),
        buffer,
      );
      manifest[entry.id] = `/art/${entry.id}.jpg`;
      console.log(`Cached ${entry.id}`);
    } catch (error) {
      missing.push(entry.id);
      console.error(`${entry.id}: ${error.message}`);
    }
  }
  for (let i = 0; i < queue.length; i += 4)
    await Promise.all(queue.slice(i, i + 4).map(cache));
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  const artwork = [
    ...new Map(sources.map((item) => [item.id, item])).values(),
  ].map(({ id, name, images }) => ({ id, name, images: { lg: images.lg } }));
  await fs.writeFile(
    path.join(__dirname, "roster-art-source.json"),
    JSON.stringify(artwork, null, 2) + "\n",
  );
  console.log(
    `${queue.length - missing.length}/${queue.length} portraits available locally.`,
  );
  if (additions.some((entry) => missing.includes(entry.id)))
    process.exitCode = 1;
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
