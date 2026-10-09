import { useMemo, useRef } from "react";
import { gsap, useGSAP } from "./motion";
import { usePointer } from "./PointerField";

export default function KineticHeading({
  text,
  className = "",
  signature,
  reduced,
  tag: Tag = "h1",
}) {
  const root = useRef(null),
    { raw } = usePointer();
  const words = useMemo(
    () =>
      text
        .split(" ")
        .map((word) =>
          Array.from(
            new Intl.Segmenter("en", { granularity: "grapheme" }).segment(word),
            (part) => part.segment,
          ),
        ),
    [text],
  );
  useGSAP(
    () => {
      const glyphs = gsap.utils.toArray(".glyph", root.current);
      if (reduced) return;
      const stagger = Math.min(0.028, 0.42 / Math.max(glyphs.length - 1, 1));
      gsap.fromTo(
        glyphs,
        {
          yPercent: -115,
          rotation: (index) => (index % 2 ? 6 : -6),
          filter: "blur(12px)",
        },
        {
          yPercent: 0,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.65 * signature.duration,
          stagger,
          ease: "legend-impact",
          delay: 0.22,
        },
      );
      gsap.to(".heading-breath", {
        scale: 1.002,
        startAt: { scale: 0.998 },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "legend-drift",
        delay: 1.5,
      });
      let centers = [],
        active = false;
      const setters = glyphs.map((glyph) => ({
        x: gsap.quickTo(glyph, "x", { duration: 0.35, ease: "legend-cinema" }),
        y: gsap.quickTo(glyph, "y", { duration: 0.35, ease: "legend-cinema" }),
      }));
      const measure = () => {
        centers = glyphs.map((glyph) => {
          const rect = glyph.getBoundingClientRect();
          return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        });
      };
      const enter = () => {
        measure();
        active = true;
      };
      const leave = () => {
        active = false;
        setters.forEach((set) => {
          set.x(0);
          set.y(0);
        });
      };
      const tick = () => {
        if (!active) return;
        centers.forEach((center, index) => {
          const dx = center.x - raw.current.screenX,
            dy = center.y - raw.current.screenY,
            distance = Math.hypot(dx, dy);
          const force = Math.pow(Math.max(0, 1 - distance / 110), 2) * 9;
          setters[index].x(distance ? (dx / distance) * force : 0);
          setters[index].y(distance ? (dy / distance) * force : 0);
        });
      };
      root.current.addEventListener("pointerenter", enter);
      root.current.addEventListener("pointerleave", leave);
      gsap.ticker.add(tick);
      const element = root.current;
      return () => {
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
        gsap.ticker.remove(tick);
      };
    },
    {
      scope: root,
      dependencies: [text, reduced, signature.duration],
      revertOnUpdate: true,
    },
  );
  const longest = Math.max(...words.map((word) => word.length));
  return (
    <Tag
      ref={root}
      style={{
        fontSize: `clamp(85px, ${Math.min(10.9, 65 / longest)}vw, 180px)`,
      }}
      className={`kinetic-heading ${className}`}
      aria-label={text}
      tabIndex={Tag === "h1" ? -1 : undefined}
    >
      <span className="heading-breath" aria-hidden="true">
        {words.map((word, index) => (
          <span className="kinetic-word" key={index}>
            {word.map((letter, i) => (
              <span className="glyph-cell" key={i}>
                <span className="glyph">{letter}</span>
              </span>
            ))}
            {index < words.length - 1 && <span className="word-space"> </span>}
          </span>
        ))}
      </span>
    </Tag>
  );
}
