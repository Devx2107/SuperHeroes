"use strict";

const fs = require("fs/promises");
const path = require("path");
const { setTimeout: delay } = require("timers/promises");

const voteLabels = {
  ironman: "Iron Man",
  thor: "Thor",
  blackpanther: "Black Panther",
  flash: "The Flash",
  wolverine: "Wolverine",
  other: "Other",
};

function createVoteStore({ voteFile, voteLockFile, voteHeroIds }) {
  let initialization;
  let pendingWrite = Promise.resolve();

  async function replaceFile(tempFile, target) {
    for (let attempt = 0; ; attempt++) {
      try {
        await fs.rename(tempFile, target);
        return;
      } catch (error) {
        // Windows scanners can briefly hold a freshly written file open.
        if (attempt >= 5 || !["EPERM", "EACCES", "EBUSY"].includes(error.code))
          throw error;
        await delay(25 * 2 ** attempt);
      }
    }
  }

  async function initialize() {
    await fs.mkdir(path.dirname(voteFile), { recursive: true });
    try {
      const seed = Object.fromEntries(voteHeroIds.map((id) => [id, 0]));
      await fs.writeFile(voteFile, JSON.stringify(seed, null, 2), {
        flag: "wx",
      });
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
    }
    if (voteLockFile) {
      await fs.mkdir(path.dirname(voteLockFile), { recursive: true });
      try {
        await fs.writeFile(voteLockFile, JSON.stringify({}, null, 2), {
          flag: "wx",
        });
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
      }
    }
  }

  function ensureVoteStore() {
    if (!initialization) {
      initialization = initialize().catch((error) => {
        initialization = undefined;
        throw error;
      });
    }
    return initialization;
  }

  async function readVotes() {
    await ensureVoteStore();
    const raw = await fs.readFile(voteFile, "utf8");
    const data = JSON.parse(raw);
    const normalized = {};
    voteHeroIds.forEach((id) => {
      normalized[id] =
        Number.isSafeInteger(data[id]) && data[id] >= 0 ? data[id] : 0;
    });
    return normalized;
  }

  async function writeVotes(votes) {
    const tempFile = `${voteFile}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(votes, null, 2));
    await replaceFile(tempFile, voteFile);
  }

  async function readVoteLocks() {
    if (!voteLockFile) return {};
    await ensureVoteStore();
    const raw = await fs.readFile(voteLockFile, "utf8");
    try {
      const data = JSON.parse(raw);
      return data && typeof data === "object" ? data : {};
    } catch {
      return {};
    }
  }

  async function writeVoteLocks(locks) {
    if (!voteLockFile) return;
    const tempFile = `${voteLockFile}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(locks, null, 2));
    await replaceFile(tempFile, voteLockFile);
  }

  function formatBoard(votes) {
    const totalVotes = Object.values(votes).reduce(
      (sum, count) => sum + count,
      0,
    );
    const board = voteHeroIds
      .map((id) => ({
        id,
        label: voteLabels[id] || id,
        votes: votes[id],
        percent:
          totalVotes === 0
            ? 0
            : Number(((votes[id] / totalVotes) * 100).toFixed(1)),
      }))
      .sort(
        (a, b) =>
          b.votes - a.votes ||
          voteHeroIds.indexOf(a.id) - voteHeroIds.indexOf(b.id),
      );
    return { totalVotes, board };
  }

  async function commitVote(heroId, voterId) {
    const votes = await readVotes();
    const locks = await readVoteLocks();
    if (voterId && locks[voterId]) {
      const error = new Error("Duplicate vote submission.");
      error.code = "DUPLICATE_VOTE";
      throw error;
    }
    votes[heroId] += 1;
    await writeVotes(votes);
    if (voterId) {
      locks[voterId] = heroId;
      try {
        await writeVoteLocks(locks);
      } catch (error) {
        votes[heroId] -= 1;
        await writeVotes(votes);
        throw error;
      }
    }
    return formatBoard(votes);
  }

  function incrementVote(heroId, voterId) {
    // Keep the vote count and duplicate lock in one serialized operation.
    // A rejected submission must not prevent later voters from being counted.
    const result = pendingWrite.then(() => commitVote(heroId, voterId));
    pendingWrite = result.catch(() => {});
    return result;
  }

  return {
    ensureVoteStore,
    readVotes,
    writeVotes,
    readVoteLocks,
    writeVoteLocks,
    formatBoard,
    incrementVote,
  };
}

module.exports = { createVoteStore, voteLabels };
