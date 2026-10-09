import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PointerContext = createContext(null);
export const usePointer = () => useContext(PointerContext);
export function PointerField({ children }) {
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const raw = useRef({
    x: 0,
    y: 0,
    screenX: -100,
    screenY: -100,
    active: false,
  });
  useEffect(() => {
    const move = (event) => {
      raw.current = {
        x: (event.clientX / innerWidth) * 2 - 1,
        y: (event.clientY / innerHeight) * 2 - 1,
        screenX: event.clientX,
        screenY: event.clientY,
        active: true,
      };
      x.set(raw.current.x);
      y.set(raw.current.y);
    };
    const leave = () => {
      raw.current.active = false;
      raw.current.x = 0;
      raw.current.y = 0;
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);
  const value = useMemo(() => ({ x, y, raw }), [x, y]);
  return (
    <PointerContext.Provider value={value}>{children}</PointerContext.Provider>
  );
}
const polygon = (points) =>
  points
    .map((point, index) => `${index ? "L" : "M"}${point[0]} ${point[1]}`)
    .join(" ") + " Z";
const paths = {
  shadow: polygon([
    [2, 2],
    [8, 2],
    [8, 5],
    [5, 5],
    [5, 19],
    [8, 19],
    [8, 22],
    [2, 22],
    [22, 22],
    [22, 2],
    [16, 2],
    [16, 5],
  ]),
  crystal: polygon([
    [12, 1],
    [16, 5],
    [19, 8],
    [23, 12],
    [19, 16],
    [16, 19],
    [12, 23],
    [8, 19],
    [5, 16],
    [1, 12],
    [5, 8],
    [8, 5],
  ]),
  web: polygon([
    [12, 1],
    [14, 8],
    [21, 4],
    [16, 10],
    [23, 12],
    [16, 14],
    [20, 21],
    [14, 16],
    [12, 23],
    [10, 16],
    [3, 20],
    [8, 10],
  ]),
  storm: polygon([
    [14, 1],
    [11, 7],
    [8, 11],
    [5, 14],
    [10, 14],
    [8, 23],
    [14, 16],
    [19, 10],
    [14, 10],
    [16, 4],
    [15, 3],
    [14, 2],
  ]),
  reactor: polygon(
    Array.from({ length: 12 }, (_, index) => [
      12 + 10 * Math.cos((index / 12) * Math.PI * 2),
      12 + 10 * Math.sin((index / 12) * Math.PI * 2),
    ]),
  ),
};
export function CinematicCursor({ signature, reduced }) {
  const { raw } = usePointer();
  const sx = useMotionValue(-100),
    sy = useMotionValue(-100);
  const x = useSpring(sx, { stiffness: 600, damping: 42 }),
    y = useSpring(sy, { stiffness: 600, damping: 42 });
  const trailX = useSpring(sx, signature.spring),
    trailY = useSpring(sy, signature.spring);
  const cursor = useRef(null);
  useEffect(() => {
    if (reduced) return;
    let frame;
    const tick = () => {
      sx.set(raw.current.screenX);
      sy.set(raw.current.screenY);
      frame = requestAnimationFrame(tick);
    };
    tick();
    document.documentElement.classList.add("custom-cursor");
    const over = (event) => {
      cursor.current?.classList.toggle(
        "cursor-hidden",
        !!event.target.closest('input,textarea,[contenteditable="true"]'),
      );
      cursor.current?.classList.toggle(
        "cursor-interactive",
        !!event.target.closest("a,button"),
      );
    };
    const leave = () => cursor.current?.classList.add("cursor-hidden");
    const enter = () => cursor.current?.classList.remove("cursor-hidden");
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [raw, reduced, sx, sy]);
  if (reduced) return null;
  return (
    <div ref={cursor} className="cursor-system" aria-hidden="true">
      {signature.motif === "web" && <svg className="web-cursor-thread"><motion.line x1={trailX} y1={trailY} x2={x} y2={y} /></svg>}
      <motion.div
        className={`cursor-trail cursor-${signature.motif}`}
        style={{ x: trailX, y: trailY }}
      />
      <motion.svg
        className="cinematic-cursor"
        viewBox="0 0 24 24"
        style={{ x, y }}
      >
        <motion.path
          animate={{ d: paths[signature.motif] }}
          transition={{ duration: 0.35 }}
        />
        <circle cx="12" cy="12" r="1" />
      </motion.svg>
      <motion.div className="pointer-glow" style={{ x: trailX, y: trailY }} />
    </div>
  );
}
