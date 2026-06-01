'use strict';

const { heroes, rosterOrder, voteRoster, toHeroArray, getHeroById } = require('../../data/heroes.server');

function createHeroService() {
  const heroArray = toHeroArray();
  const supportedUniverseFilters = ['all', ...new Set(heroArray.map((hero) => hero.universe))];

  function toSummary(hero) {
    return {
      id: hero.id,
      name: hero.name,
      universe: hero.universe,
      tag: hero.tag,
      image: hero.image,
      stats: hero.stats,
      badges: hero.badges,
      colors: hero.colors
    };
  }

  function listHeroes({ summary = false } = {}) {
    const results = heroArray.map((hero) => (summary ? toSummary(hero) : hero));
    return {
      heroes: results,
      rosterOrder,
      voteRoster,
      universeFilters: supportedUniverseFilters
    };
  }

  function findHero(id, { summary = false } = {}) {
    const hero = getHeroById(id);
    if (!hero) {
      return null;
    }
    return summary ? toSummary(hero) : hero;
  }

  function searchHeroes({ query = '', universe = 'all', includeSurprise = true } = {}) {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedUniverse = universe.trim().toLowerCase();
    const results = heroArray.filter((hero) => {
      const inUniverse = normalizedUniverse === 'all' || hero.universe.toLowerCase() === normalizedUniverse;
      if (!inUniverse) {
        return false;
      }
      if (!includeSurprise && !rosterOrder.includes(hero.id)) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        hero.name,
        hero.universe,
        hero.tag,
        hero.story,
        ...(hero.badges || []),
        ...(hero.abilities || []),
        ...(hero.villains || []).map((villain) => villain.name)
      ].join(' ').toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    return {
      query,
      universe,
      count: results.length,
      results: results.map(toSummary)
    };
  }

  return {
    listHeroes,
    findHero,
    searchHeroes,
    rosterOrder,
    voteRoster,
    supportedUniverseFilters
  };
}

module.exports = { createHeroService };
