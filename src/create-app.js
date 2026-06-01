'use strict';

const express = require('express');
const path = require('path');
const { createVoteStore } = require('./services/vote-store');
const { createHeroService } = require('./services/hero-service');
const { createExternalHeroService } = require('./services/external-hero-service');
const { createGlobalRateLimit, createVoteRateLimit } = require('./middleware/rate-limit');
const { notFoundHandler } = require('./middleware/not-found');
const { errorHandler } = require('./middleware/error-handler');
const { createHeroesRouter } = require('./routes/heroes');
const { createSearchRouter } = require('./routes/search');
const { createVotesRouter } = require('./routes/votes');
const { voteRoster } = require('../data/heroes.server');

function createApp({ env }) {
  const app = express();
  const voteStore = createVoteStore({
    voteFile: env.voteFile,
    voteHeroIds: voteRoster
  });
  const heroService = createHeroService();
  const externalHeroService = createExternalHeroService({ env });
  const globalRateLimit = createGlobalRateLimit(env);
  const voteRateLimit = createVoteRateLimit(env);

  voteStore.ensureVoteStore().catch((error) => {
    console.error('Failed to initialize vote store', error);
  });

  app.disable('x-powered-by');
  app.use(express.json());
  app.use(globalRateLimit);
  app.use(express.static(env.publicDir));

  app.get('/api/health', (_request, response) => {
    response.json({ ok: true, env: env.nodeEnv });
  });

  app.use('/api/heroes', createHeroesRouter({ heroService, externalHeroService }));
  app.use('/api/search', createSearchRouter({ heroService }));
  app.use('/api/votes', createVotesRouter({ voteStore, voteHeroIds: voteRoster, voteRateLimit }));

  app.get('/', (_request, response) => {
    response.sendFile(path.join(env.publicDir, 'heroes.html'));
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
