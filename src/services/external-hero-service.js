'use strict';

async function fetchWithTimeout(url, timeoutMs, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function createExternalHeroService({ env }) {
  async function fetchHeroProfile(hero) {
    if (!env.superheroApiBaseUrl) {
      return {
        available: false,
        source: 'env-not-configured',
        heroId: hero.id,
        message: 'SUPERHERO_API_BASE_URL is not configured.'
      };
    }

    const url = new URL(env.superheroApiBaseUrl);
    url.searchParams.set('name', hero.name);

    const headers = {};
    if (env.superheroApiToken) {
      headers.Authorization = `Bearer ${env.superheroApiToken}`;
    }

    const response = await fetchWithTimeout(url, env.superheroApiTimeoutMs, { headers });
    if (!response.ok) {
      return {
        available: false,
        source: 'remote-error',
        heroId: hero.id,
        status: response.status,
        message: `External API returned ${response.status}.`
      };
    }

    const payload = await response.json();
    return {
      available: true,
      source: url.origin,
      heroId: hero.id,
      payload
    };
  }

  return {
    fetchHeroProfile
  };
}

module.exports = { createExternalHeroService };
