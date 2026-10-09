const cache = new Map();
export function prepareImage(src) {
  if (!src) return Promise.resolve(false);
  if (cache.has(src)) return cache.get(src);
  const promise = new Promise((resolve) => {
    const image = new Image();
    const timer = setTimeout(() => resolve(false), 3500);
    image.onload = async () => {
      clearTimeout(timer);
      try {
        await image.decode();
      } catch {
        /* Loaded image remains usable. */
      }
      resolve(true);
    };
    image.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    image.src = src;
  });
  cache.set(src, promise);
  return promise;
}
export function warmAssets(heroes) {
  let cancelled = false;
  const run = async () => {
    for (const hero of heroes) {
      if (cancelled) return;
      await prepareImage(hero.image);
    }
  };
  const timer = setTimeout(run, 500);
  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}
