"use strict";

const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const { createVoteStore } = require("../src/services/vote-store");

describe("shared vote persistence", () => {
  let directory, store;
  beforeEach(async () => {
    directory = await fs.mkdtemp(
      path.join(os.tmpdir(), "legendrium-concurrent-"),
    );
    store = createVoteStore({
      voteFile: path.join(directory, "votes.json"),
      voteLockFile: path.join(directory, "locks", "votes.json"),
      voteHeroIds: ["thor", "ironman"],
    });
  });
  afterEach(async () => {
    await fs.rm(directory, { recursive: true, force: true });
  });

  test("a burst of distinct voters preserves every count and lock", async () => {
    const requests = Array.from({ length: 30 }, (_, index) =>
      store.incrementVote(index % 2 ? "ironman" : "thor", `voter-${index}`),
    );
    const results = await Promise.allSettled(requests);
    expect(results.filter((result) => result.status === "rejected")).toEqual(
      [],
    );
    expect(await store.readVotes()).toEqual({ thor: 15, ironman: 15 });
    expect(Object.keys(await store.readVoteLocks())).toHaveLength(30);
  });

  test("a rejected duplicate does not block the next voter", async () => {
    const results = await Promise.allSettled([
      store.incrementVote("thor", "first"),
      store.incrementVote("ironman", "first"),
      store.incrementVote("ironman", "second"),
    ]);
    expect(results.map((result) => result.status)).toEqual([
      "fulfilled",
      "rejected",
      "fulfilled",
    ]);
    expect(results[1].reason.code).toBe("DUPLICATE_VOTE");
    expect(await store.readVotes()).toEqual({ thor: 1, ironman: 1 });
  });

  test("initial leaderboard reads cannot reset an incoming vote", async () => {
    await Promise.all([
      store.readVotes(),
      store.incrementVote("thor", "first"),
      store.readVotes(),
    ]);
    expect(await store.readVotes()).toEqual({ thor: 1, ironman: 0 });
  });
});
