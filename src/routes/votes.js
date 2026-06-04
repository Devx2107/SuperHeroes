'use strict';

const express = require('express');

function createVotesRouter({ voteStore, voteHeroIds, voteRateLimit }) {
  const router = express.Router();

  router.get('/', async (_request, response, next) => {
    try {
      const votes = await voteStore.readVotes();
      response.json(voteStore.formatBoard(votes));
    } catch (error) {
      next(error);
    }
  });

  router.post('/', voteRateLimit, async (request, response, next) => {
    const { heroId } = request.body || {};
    if (!voteHeroIds.includes(heroId)) {
      response.status(400).json({ error: 'Unsupported hero id.' });
      return;
    }

    try {
      const voterId = request.ip || request.headers['x-forwarded-for'] || 'unknown';
      const board = await voteStore.incrementVote(heroId, voterId);
      response.json(board);
    } catch (error) {
      if (error.code === 'DUPLICATE_VOTE') {
        response.status(409).json({ error: 'You have already voted from this browser or IP.' });
        return;
      }
      next(error);
    }
  });

  return router;
}

module.exports = { createVotesRouter };
