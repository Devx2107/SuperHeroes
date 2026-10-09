import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };
export const ease = {
  cinema: [0.16, 1, 0.3, 1],
  impact: [0.12, 0.9, 0.22, 1],
  weight: [0.7, 0, 0.84, 0],
  precision: [0.76, 0, 0.24, 1],
  rebound: [0.22, 1.25, 0.36, 1],
  drift: [0.45, 0, 0.55, 1],
};
Object.entries(ease).forEach(([name, points]) =>
  CustomEase.create(`legend-${name}`, points.join(",")),
);
export const signatures = {
  batman: {
    duration: 1.25,
    spring: { stiffness: 150, damping: 28, mass: 1.4 },
    label: "THE DARK KNIGHT",
    accent: "#ed5444",
    motif: "shadow",
  },
  superman: {
    duration: 0.85,
    spring: { stiffness: 240, damping: 30, mass: 1 },
    label: "THE MAN OF TOMORROW",
    accent: "#68b6ff",
    motif: "crystal",
  },
  spiderman: {
    duration: 0.9,
    spring: { stiffness: 320, damping: 18, mass: 0.8 },
    label: "YOUR FRIENDLY NEIGHBORHOOD",
    accent: "#ed4c5c",
    motif: "web",
  },
  thor: {
    duration: 0.8,
    spring: { stiffness: 420, damping: 24, mass: 1.2 },
    label: "THE GOD OF THUNDER",
    accent: "#9dbbff",
    motif: "storm",
  },
  ironman: {
    duration: 0.75,
    spring: { stiffness: 500, damping: 40, mass: 1 },
    label: "THE FUTURIST",
    accent: "#ef7846",
    motif: "reactor",
  },
};
export function signatureFor(hero) {
  return (
    signatures[hero.id] || {
      ...signatures.superman,
      label: hero.title,
      accent: hero.colors.primary,
      motif: hero.motif || "crystal",
    }
  );
}
export const featuredIds = [
  "batman",
  "superman",
  "spiderman",
  "thor",
  "ironman",
];
export const routeVariants = {
  initial: { opacity: 0 },
  present: { opacity: 1, transition: { duration: 0.1 } },
  exit: {
    opacity: 0,
    scale: 1.055,
    y: -36,
    filter: "blur(14px)",
    transition: { duration: 0.4, ease: ease.weight },
  },
};
