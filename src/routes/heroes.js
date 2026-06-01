'use strict';

const express = require('express');

function createHeroesRouter({ heroService, externalHeroService }) {
  const router = express.Router();

  router.get('/', (request, response) => {
    const summary = request.query.summary === 'true';
    response.json(heroService.listHeroes({ summary }));
  });

  router.get('/:id', (request, response) => {
    const summary = request.query.summary === 'true';
    const hero = heroService.findHero(request.params.id, { summary });
    if (!hero) {
      response.status(404).json({ error: 'Hero not found.' });
      return;
    }
    response.json(hero);
  });

  router.get('/:id/external', async (request, response, next) => {
    try {
      const hero = heroService.findHero(request.params.id);
      if (!hero) {
        response.status(404).json({ error: 'Hero not found.' });
        return;
      }
      const result = await externalHeroService.fetchHeroProfile(hero);
      response.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = { createHeroesRouter };
