'use strict';

const express = require('express');

function createSearchRouter({ heroService }) {
  const router = express.Router();

  router.get('/', (request, response) => {
    const query = request.query.q || '';
    const universe = request.query.universe || 'all';
    const includeSurprise = request.query.includeSurprise !== 'false';
    response.json(heroService.searchHeroes({ query, universe, includeSurprise }));
  });

  return router;
}

module.exports = { createSearchRouter };
