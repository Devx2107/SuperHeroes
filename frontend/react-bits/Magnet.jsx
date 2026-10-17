// Adapted from React Bits by David Haz. See LICENSE.md and SOURCES.md.
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useMotionPreference from "./useMotionPreference";

export default function Magnet({ children, disabled }) {
  const reduced = useMotionPreference(),
    root = useRef(null);
  const tx = useMotionValue(0),
    ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 170, damping: 22 }),
    y = useSpring(ty, { stiffness: 170, damping: 22 });
  const reset = () => {
    tx.set(0);
    ty.set(0);
    if (root.current) root.current.dataset.magnetActive = "false";
  };
  useEffect(() => {
    if (disabled || reduced) reset();
    window.addEventListener("blur", reset);
    return () => window.removeEventListener("blur", reset);
  }, [disabled, reduced, tx, ty]);
  return (
    <span
      ref={root}
      className="rb-magnet"
      data-react-bits="Magnet"
      data-motion={reduced ? "reduced" : "full"}
      data-magnet-active="false"
      onPointerMove={(event) => {
        if (disabled || reduced || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        tx.set(
          Math.max(
            -7,
            Math.min(7, (event.clientX - rect.left - rect.width / 2) / 4),
          ),
        );
        ty.set(
          Math.max(
            -5,
            Math.min(5, (event.clientY - rect.top - rect.height / 2) / 4),
          ),
        );
        event.currentTarget.dataset.magnetActive = "true";
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.span
        className="rb-magnet-inner"
        style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
      >
        {children}
      </motion.span>
    </span>
  );
}
