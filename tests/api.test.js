'use strict';

const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { createApp } = require('../src/create-app');
const { getEnv } = require('../src/config/env');
const request = require('supertest');

describe('Legendrium API', () => {
  let tempDir;
  let app;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'legendrium-'));
    const env = {
      ...getEnv(),
      nodeEnv: 'test',
      dataDir: tempDir,
      voteFile: path.join(tempDir, 'votes.json'),
      voteLockFile: path.join(tempDir, 'vote-locks.json'),
      publicDir: process.cwd(),
      rateLimitMax: 1000,
      voteRateLimitMax: 1000
    };
    app = createApp({ env });
  });

  afterEach(async () => {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test('GET /api/heroes returns roster data', async () => {
    const response = await request(app).get('/api/heroes?summary=true');
    expect(response.status).toBe(200);
    expect(response.body.heroes.length).toBeGreaterThan(4);
    expect(response.body.rosterOrder).toContain('ironman');
  });

  test('GET /api/search filters by query', async () => {
    const response = await request(app).get('/api/search?q=wakanda');
    expect(response.status).toBe(200);
    expect(response.body.results.some((hero) => hero.id === 'blackpanther')).toBe(true);
  });

  test('POST /api/votes persists and returns updated totals', async () => {
    const postResponse = await request(app).post('/api/votes').send({ heroId: 'thor' });
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.totalVotes).toBe(1);

    const getResponse = await request(app).get('/api/votes');
    const thorEntry = getResponse.body.board.find((entry) => entry.id === 'thor');
    expect(thorEntry.votes).toBe(1);
  });

  test('POST /api/votes blocks duplicate submissions from the same client', async () => {
    const firstResponse = await request(app).post('/api/votes').send({ heroId: 'thor' });
    expect(firstResponse.status).toBe(200);

    const duplicateResponse = await request(app).post('/api/votes').send({ heroId: 'ironman' });
    expect(duplicateResponse.status).toBe(409);
  });

  test('POST /api/votes rejects unsupported ids', async () => {
    const response = await request(app).post('/api/votes').send({ heroId: 'batman' });
    expect(response.status).toBe(400);
  });
});
