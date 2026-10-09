import { useId } from "react";

const labels = {
  intelligence: "INTELLECT",
  strength: "STRENGTH",
  speed: "SPEED",
  durability: "DURABILITY",
  power: "POWER",
  combat: "COMBAT",
};
export default function RadarChart({ left, right }) {
  const id = useId();
  const axes = Object.keys(left.comparison);
  const point = (index, value) => {
    const angle = (index / axes.length) * Math.PI * 2 - Math.PI / 2;
    return [180 + Math.cos(angle) * value, 155 + Math.sin(angle) * value];
  };
  const polygon = (values) =>
    values.map((value, index) => point(index, value).join(",")).join(" ");
  return (
    <svg
      className="rating-radar"
      viewBox="0 0 360 315"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
    >
      <title id={`${id}-title`}>
        {left.name} versus {right.name}: attribute radar
      </title>
      <desc id={`${id}-desc`}>
        Six archive ratings from zero to one hundred.{" "}
        {axes
          .map(
            (stat) =>
              `${stat}: ${left.name} ${left.comparison[stat]}, ${right.name} ${right.comparison[stat]}`,
          )
          .join(". ")}
        . Exact values also appear in the comparison bars.
      </desc>
      {[25, 50, 75, 100].map((value) => (
        <polygon
          key={value}
          points={polygon(axes.map(() => value))}
          className="radar-grid"
        />
      ))}
      {axes.map((stat, index) => {
        const [x, y] = point(index, 100),
          [lx, ly] = point(index, 128);
        return (
          <g key={stat}>
            <line x1="180" y1="155" x2={x} y2={y} className="radar-grid" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle">
              {labels[stat] || stat.toUpperCase()}
            </text>
          </g>
        );
      })}
      <polygon
        className="radar-left"
        points={polygon(axes.map((stat) => left.comparison[stat]))}
      />
      <polygon
        className="radar-right"
        points={polygon(axes.map((stat) => right.comparison[stat]))}
      />
      {axes.map((stat, index) => (
        <circle
          key={stat}
          cx={point(index, left.comparison[stat])[0]}
          cy={point(index, left.comparison[stat])[1]}
          r="3"
          className="radar-dot"
        />
      ))}
    </svg>
  );
}
