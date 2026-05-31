const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const rootDir = __dirname;
const voteFile = path.join(rootDir, "data", "votes.json");
const voteHeroIds = ["ironman", "thor", "blackpanther", "flash", "wolverine", "other"];
const voteLabels = {
  ironman: "Iron Man",
  thor: "Thor",
  blackpanther: "Black Panther",
  flash: "The Flash",
  wolverine: "Wolverine",
  other: "Other"
};

app.use(express.json());
app.use(express.static(rootDir));

async function ensureVoteStore() {
  await fs.mkdir(path.dirname(voteFile), { recursive: true });
  try {
    await fs.access(voteFile);
  } catch {
    const seed = Object.fromEntries(voteHeroIds.map((id) => [id, 0]));
    await fs.writeFile(voteFile, JSON.stringify(seed, null, 2));
  }
}

async function readVotes() {
  await ensureVoteStore();
  const raw = await fs.readFile(voteFile, "utf8");
  const data = JSON.parse(raw);
  const normalized = {};
  voteHeroIds.forEach((id) => {
    normalized[id] = Number.isFinite(data[id]) ? data[id] : 0;
  });
  return normalized;
}

async function writeVotes(votes) {
  const tempFile = `${voteFile}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(votes, null, 2));
  await fs.rename(tempFile, voteFile);
}

function formatBoard(votes) {
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  const board = voteHeroIds
    .map((id) => ({
      id,
      label: voteLabels[id],
      votes: votes[id],
      percent: totalVotes === 0 ? 0 : Number(((votes[id] / totalVotes) * 100).toFixed(1))
    }))
    .sort((a, b) => b.votes - a.votes || voteHeroIds.indexOf(a.id) - voteHeroIds.indexOf(b.id));
  return { totalVotes, board };
}

app.get("/api/votes", async (_request, response) => {
  try {
    const votes = await readVotes();
    response.json(formatBoard(votes));
  } catch (error) {
    response.status(500).json({ error: "Failed to load votes." });
  }
});

app.post("/api/votes", async (request, response) => {
  const { heroId } = request.body || {};
  if (!voteHeroIds.includes(heroId)) {
    response.status(400).json({ error: "Unsupported hero id." });
    return;
  }

  try {
    const votes = await readVotes();
    votes[heroId] += 1;
    await writeVotes(votes);
    response.json(formatBoard(votes));
  } catch (error) {
    response.status(500).json({ error: "Failed to save vote." });
  }
});

app.get("/", (_request, response) => {
  response.sendFile(path.join(rootDir, "heroes.html"));
});

ensureVoteStore().then(() => {
  app.listen(port, () => {
    console.log(`Hero Hub server running at http://localhost:${port}`);
  });
});
