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
      const board = await voteStore.incrementVote(heroId);
      response.json(board);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createVotesRouter };
