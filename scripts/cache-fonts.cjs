const fs = require("node:fs/promises");
const path = require("node:path");
const families = [
  ["Barlow Condensed", "Barlow+Condensed:wght@500;600;700;800;900", "normal"],
  ["Barlow Condensed", "Barlow+Condensed:ital,wght@1,700", "italic"],
  ["DM Sans", "DM+Sans:wght@400;500;600;700", "normal"],
  ["Space Mono", "Space+Mono:wght@400;700", "normal"],
];
(async () => {
  const directory = path.resolve(__dirname, "../public/fonts");
  await fs.mkdir(directory, { recursive: true });
  const rules = [];
  for (const [family, query, style] of families) {
    const response = await fetch(
      `https://fonts.googleapis.com/css2?family=${query}&display=swap`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        },
      },
    );
    if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
    const css = await response.text();
    const blocks = [
      ...css.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g),
    ].map((match) => match[1]);
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index],
        url = block.match(/url\(([^)]+)\)/)?.[1];
      if (!url) continue;
      const filename = `${family.toLowerCase().replaceAll(" ", "-")}-${style}-${index}.woff2`;
      const font = await fetch(url);
      if (!font.ok) throw new Error(`Font download: ${font.status}`);
      await fs.writeFile(
        path.join(directory, filename),
        Buffer.from(await font.arrayBuffer()),
      );
      rules.push(block.replace(url, `/fonts/${filename}`));
    }
  }
  if (!rules.length)
    throw new Error("No Latin font faces found in the font stylesheet.");
  await fs.writeFile(
    path.resolve(__dirname, "../frontend/fonts.css"),
    rules.join("\n"),
  );
  for (const family of ["barlowcondensed", "dmsans", "spacemono"]) {
    const license = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
    if (!license.ok) throw new Error(`Font license download: ${license.status}`);
    await fs.writeFile(path.join(directory, `${family}-OFL.txt`), await license.text());
  }
  console.log(`Cached ${rules.length} font faces locally.`);
})();
