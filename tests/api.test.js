"use strict";

const fs = require("fs/promises");
const os = require("os");
const path = require("path");
const { createApp } = require("../src/create-app");
const { getEnv } = require("../src/config/env");
const request = require("supertest");

describe("Legendrium API", () => {
  let tempDir;
  let app;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "legendrium-"));
    const env = {
      ...getEnv(),
      nodeEnv: "test",
      dataDir: tempDir,
      voteFile: path.join(tempDir, "votes.json"),
      voteLockFile: path.join(tempDir, "vote-locks.json"),
      publicDir: process.cwd(),
      rateLimitMax: 1000,
      voteRateLimitMax: 1000,
    };
    app = createApp({ env });
  });

  afterEach(async () => {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test("GET /api/heroes returns roster data", async () => {
    const response = await request(app).get("/api/heroes?summary=true");
    expect(response.status).toBe(200);
    expect(response.body.heroes.length).toBeGreaterThan(4);
    expect(response.body.rosterOrder).toContain("ironman");
  });

  test("GET /api/search filters by query", async () => {
    const response = await request(app).get("/api/search?q=wakanda");
    expect(response.status).toBe(200);
    expect(
      response.body.results.some((hero) => hero.id === "blackpanther"),
    ).toBe(true);
  });

  test("expanded roster exposes every new character with local artwork and battle ratings", async () => {
    const additions = require("../scripts/roster-additions.cjs");
    const archive = require("../frontend/heroes.json");
    const list = await request(app).get("/api/heroes?summary=true");
    expect(list.body.rosterOrder.slice().sort()).toEqual(
      Object.keys(archive).sort(),
    );
    for (const character of additions) {
      const response = await request(app).get(`/api/heroes/${character.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        identity: character.identity,
        alignment: character.alignment,
        source: character.source,
        image: `/art/${character.id}.jpg`,
      });
      expect(Object.keys(response.body.comparison)).toHaveLength(6);
      for (const rating of Object.values(response.body.comparison)) {
        expect(rating).toBeGreaterThanOrEqual(0);
        expect(rating).toBeLessThanOrEqual(100);
      }
      await expect(
        fs.access(path.join(process.cwd(), "public", response.body.image)),
      ).resolves.toBeUndefined();
    }
  });

  test("search combines villain, publisher, and identity filters", async () => {
    const villains = await request(app).get(
      "/api/search?alignment=villain&universe=Marvel",
    );
    expect(villains.status).toBe(200);
    expect(villains.body.count).toBe(7);
    expect(
      villains.body.results.every(
        (character) => character.alignment === "villain",
      ),
    ).toBe(true);
    expect(villains.body.results.map((character) => character.id)).toContain(
      "magneto",
    );
    const identity = await request(app).get(
      "/api/search?alignment=villain&universe=Marvel&q=Norman%20Osborn",
    );
    expect(identity.body.results.map((character) => character.id)).toEqual([
      "greengoblin",
    ]);
    const dc = await request(app).get(
      "/api/search?alignment=villain&universe=DC",
    );
    expect(dc.body.count).toBe(6);
  });

  test("static assets do not consume the API rate limit", async () => {
    const limitedApp = createApp({
      env: {
        ...getEnv(),
        dataDir: tempDir,
        voteFile: path.join(tempDir, "votes.json"),
        voteLockFile: path.join(tempDir, "vote-locks.json"),
        publicDir: process.cwd(),
        rateLimitMax: 1,
      },
    });
    expect((await request(limitedApp).get("/heroes.html")).status).toBe(200);
    expect((await request(limitedApp).get("/heroes.html")).status).toBe(200);
    expect((await request(limitedApp).get("/api/health")).status).toBe(200);
    expect((await request(limitedApp).get("/api/health")).status).toBe(429);
  });

  test("POST /api/votes persists and returns updated totals", async () => {
    const postResponse = await request(app)
      .post("/api/votes")
      .send({ heroId: "thor" });
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.totalVotes).toBe(1);

    const getResponse = await request(app).get("/api/votes");
    const thorEntry = getResponse.body.board.find(
      (entry) => entry.id === "thor",
    );
    expect(thorEntry.votes).toBe(1);
  });

  test("POST /api/votes blocks duplicate submissions from the same client", async () => {
    const firstResponse = await request(app)
      .post("/api/votes")
      .send({ heroId: "thor" });
    expect(firstResponse.status).toBe(200);

    const duplicateResponse = await request(app)
      .post("/api/votes")
      .send({ heroId: "ironman" });
    expect(duplicateResponse.status).toBe(409);
  });

  test("POST /api/votes rejects unsupported ids", async () => {
    const response = await request(app)
      .post("/api/votes")
      .send({ heroId: "batman" });
    expect(response.status).toBe(400);
  });

  test("simultaneous submissions from one client count only once", async () => {
    const submissions = await Promise.all(
      Array.from({ length: 8 }, () =>
        request(app).post("/api/votes").send({ heroId: "thor" }),
      ),
    );
    expect(
      submissions.filter((response) => response.status === 200),
    ).toHaveLength(1);
    expect(
      submissions.filter((response) => response.status === 409),
    ).toHaveLength(7);
    const response = await request(app).get("/api/votes");
    expect(response.body.totalVotes).toBe(1);
  });
});
