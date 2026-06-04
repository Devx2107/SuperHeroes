'use strict';

const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ quiet: true });

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getEnv() {
  return {
    port: toNumber(process.env.PORT, 3000),
    nodeEnv: process.env.NODE_ENV || 'development',
    dataDir: process.env.DATA_DIR || path.join(process.cwd(), 'data'),
    voteFile: process.env.VOTE_FILE || path.join(process.env.DATA_DIR || path.join(process.cwd(), 'data'), 'votes.json'),
    voteLockFile: process.env.VOTE_LOCK_FILE || path.join(process.env.DATA_DIR || path.join(process.cwd(), 'data'), 'vote-locks.json'),
    publicDir: process.env.PUBLIC_DIR || process.cwd(),
    superheroApiBaseUrl: process.env.SUPERHERO_API_BASE_URL || '',
    superheroApiToken: process.env.SUPERHERO_API_TOKEN || '',
    superheroApiTimeoutMs: toNumber(process.env.SUPERHERO_API_TIMEOUT_MS, 4000),
    rateLimitWindowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    rateLimitMax: toNumber(process.env.RATE_LIMIT_MAX, 120),
    voteRateLimitWindowMs: toNumber(process.env.VOTE_RATE_LIMIT_WINDOW_MS, 60 * 1000),
    voteRateLimitMax: toNumber(process.env.VOTE_RATE_LIMIT_MAX, 20)
  };
}

module.exports = { getEnv };
