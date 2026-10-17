// Click Spark drawing adapted from React Bits by David Haz. See LICENSE.md and SOURCES.md.
// Shares the existing background canvas and its lifecycle instead of adding a renderer.
export function createSparkBurst(x, y, time, count) {
  return {
    x,
    y,
    time,
    sparks: Array.from({ length: count }, (_, index) => ({
      angle: (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.16,
      reach: 0.85 + Math.random() * 0.3,
    })),
  };
}

export function drawSparkBursts(context, bursts, now) {
  const live = bursts.filter((burst) => now - burst.time < 600);
  context.lineCap = "round";
  context.lineWidth = 1.5;
  for (const burst of live) {
    const progress = Math.min(1, (now - burst.time) / 600);
    const eased = 1 - (1 - progress) ** 3;
    context.globalAlpha = (1 - progress) ** 1.4 * 0.95;
    for (const spark of burst.sparks) {
      const distance = 48 * spark.reach * eased;
      const length = 14 * (1 - progress) ** 1.6;
      const dx = Math.cos(spark.angle),
        dy = Math.sin(spark.angle);
      context.beginPath();
      context.moveTo(burst.x + dx * distance, burst.y + dy * distance);
      context.lineTo(
        burst.x + dx * (distance + length),
        burst.y + dy * (distance + length),
      );
      context.stroke();
    }
  }
  context.globalAlpha = 1;
  return live;
}
