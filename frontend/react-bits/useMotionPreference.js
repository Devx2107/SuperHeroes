import { useContext } from "react";
import { MotionConfigContext, useReducedMotion } from "framer-motion";

export default function useMotionPreference() {
  const { reducedMotion } = useContext(MotionConfigContext);
  const system = useReducedMotion();
  return reducedMotion === "never"
    ? false
    : reducedMotion === "always" || system;
}
