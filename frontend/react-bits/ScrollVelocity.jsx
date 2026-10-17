// Adapted from React Bits by David Haz. See LICENSE.md and SOURCES.md.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import useMotionPreference from "./useMotionPreference";

const wrap = (min, max, value) => {
  const range = max - min;
  return range ? ((((value - min) % range) + range) % range) + min : 0;
};

function MovingNames({ children, paused, host }) {
  const baseX = useMotionValue(0),
    skewX = useMotionValue(0),
    copy = useRef(null);
  const width = useMotionValue(1),
    visible = useRef(false);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const x = useTransform(() => wrap(-width.get(), 0, baseX.get()));
  useLayoutEffect(() => {
    const measure = () => width.set(copy.current.getBoundingClientRect().width);
    const observer = new ResizeObserver(measure);
    observer.observe(copy.current);
    measure();
    return () => observer.disconnect();
  }, [width]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [host]);
  useAnimationFrame((_, delta) => {
    if (paused || !visible.current || document.hidden) return;
    const speed = Math.max(-3, Math.min(3, smooth.get() / 800));
    baseX.set(baseX.get() - ((32 + speed * 75) * Math.min(delta, 50)) / 1000);
    skewX.set(Math.max(-4, Math.min(4, -speed * 1.2)));
  });
  return (
    <motion.div
      className="rb-velocity-track"
      style={{ x, skewX }}
      aria-hidden="true"
    >
      <span className="rb-velocity-copy" ref={copy}>
        {children}
      </span>
      <span className="rb-velocity-copy">{children}</span>
    </motion.div>
  );
}

export default function ScrollVelocity({ heroes, activeId }) {
  const reduced = useMotionPreference(),
    root = useRef(null);
  const [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false);
  const ids = [
    activeId,
    "batman",
    "storm",
    "spiderman",
    "moonknight",
    "raven",
    "joker",
    "doctordoom",
    "ultron",
    "superman",
    "carnage",
  ];
  const names = [...new Set(ids)]
    .filter((id) => heroes[id])
    .map((id) => (
      <span
        key={id}
        className={`rb-velocity-name ${id === activeId ? "current" : ""}`}
      >
        {heroes[id].name.toUpperCase()}
        <span className="rb-velocity-star">✦</span>
      </span>
    ));
  return (
    <div
      ref={root}
      className="rb-velocity"
      data-react-bits="ScrollVelocity"
      data-motion={reduced ? "reduced" : "full"}
      data-paused={paused || hovered || reduced ? "true" : "false"}
    >
      <div className="rb-velocity-caption mono">
        <span>
          <Sparkles size={12} /> {Object.keys(heroes).length} LEGENDS. INFINITE
          POSSIBILITIES.
        </span>
        {reduced ? (
          <span>THE MULTIVERSE, CONNECTED</span>
        ) : (
          <button
            type="button"
            className="rb-velocity-toggle"
            aria-label={paused ? "Resume legend ticker" : "Pause legend ticker"}
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            <span>{paused ? "FLOW PAUSED" : "SCROLL TO SHIFT THE FLOW"}</span>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        )}
      </div>
      <div
        className="rb-velocity-window"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {reduced ? (
          <div className="rb-velocity-static" aria-hidden="true">
            {names}
          </div>
        ) : (
          <MovingNames host={root} paused={paused || hovered}>
            {names}
          </MovingNames>
        )}
      </div>
    </div>
  );
}
