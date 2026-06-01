'use strict';

const rateLimit = require('express-rate-limit');

function createGlobalRateLimit(env) {
  return rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests. Please slow down and try again soon.'
    }
  });
}

function createVoteRateLimit(env) {
  return rateLimit({
    windowMs: env.voteRateLimitWindowMs,
    max: env.voteRateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many vote requests. Please wait a minute and try again.'
    }
  });
}

module.exports = { createGlobalRateLimit, createVoteRateLimit };
