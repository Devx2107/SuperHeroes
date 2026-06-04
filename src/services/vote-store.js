'use strict';

const fs = require('fs/promises');
const path = require('path');

const voteLabels = {
  ironman: 'Iron Man',
  thor: 'Thor',
  blackpanther: 'Black Panther',
  flash: 'The Flash',
  wolverine: 'Wolverine',
  other: 'Other'
};

function createVoteStore({ voteFile, voteLockFile, voteHeroIds }) {
  async function ensureVoteStore() {
    await fs.mkdir(path.dirname(voteFile), { recursive: true });
    try {
      await fs.access(voteFile);
    } catch {
      const seed = Object.fromEntries(voteHeroIds.map((id) => [id, 0]));
      await fs.writeFile(voteFile, JSON.stringify(seed, null, 2));
    }
    if (voteLockFile) {
      try {
        await fs.access(voteLockFile);
      } catch {
        await fs.writeFile(voteLockFile, JSON.stringify({}, null, 2));
      }
    }
  }

  async function readVotes() {
    await ensureVoteStore();
    const raw = await fs.readFile(voteFile, 'utf8');
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

  async function readVoteLocks() {
    if (!voteLockFile) return {};
    await ensureVoteStore();
    const raw = await fs.readFile(voteLockFile, 'utf8');
    try {
      const data = JSON.parse(raw);
      return data && typeof data === 'object' ? data : {};
    } catch {
      return {};
    }
  }

  async function writeVoteLocks(locks) {
    if (!voteLockFile) return;
    const tempFile = `${voteLockFile}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(locks, null, 2));
    await fs.rename(tempFile, voteLockFile);
  }

  function formatBoard(votes) {
    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
    const board = voteHeroIds
      .map((id) => ({
        id,
        label: voteLabels[id] || id,
        votes: votes[id],
        percent: totalVotes === 0 ? 0 : Number(((votes[id] / totalVotes) * 100).toFixed(1))
      }))
      .sort((a, b) => b.votes - a.votes || voteHeroIds.indexOf(a.id) - voteHeroIds.indexOf(b.id));
    return { totalVotes, board };
  }

  async function incrementVote(heroId, voterId) {
    const votes = await readVotes();
    const locks = await readVoteLocks();
    if (voterId && locks[voterId]) {
      const error = new Error('Duplicate vote submission.');
      error.code = 'DUPLICATE_VOTE';
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

  return {
    ensureVoteStore,
    readVotes,
    writeVotes,
    readVoteLocks,
    writeVoteLocks,
    formatBoard,
    incrementVote
  };
}

module.exports = { createVoteStore, voteLabels };
