// Adapted from React Bits by David Haz. See LICENSE.md and SOURCES.md.
import { useEffect, useRef } from "react";
import useMotionPreference from "./useMotionPreference";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/+#";

export default function DecryptedText({ text, className = "" }) {
  const root = useRef(null),
    visual = useRef(null),
    play = useRef(() => {});
  const reduced = useMotionPreference();
  useEffect(() => {
    const node = root.current,
      letters = Array.from(text);
    let timer,
      observer,
      iteration = 0;
    const finish = () => {
      clearInterval(timer);
      visual.current.textContent = text;
      node.dataset.decrypting = "false";
    };
    const run = () => {
      if (reduced || document.hidden) return;
      clearInterval(timer);
      iteration = 0;
      node.dataset.decrypting = "true";
      const tick = () => {
        const revealed = Math.floor((iteration / 14) * letters.length);
        visual.current.textContent = letters
          .map((letter, index) =>
            index < revealed || /\s/.test(letter)
              ? letter
              : characters[Math.floor(Math.random() * characters.length)],
          )
          .join("");
        if (++iteration > 14) finish();
      };
      tick();
      timer = setInterval(tick, 40);
    };
    play.current = run;
    finish();
    if (!reduced) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
    }
    const visibility = () => {
      if (document.hidden) finish();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      play.current = () => {};
    };
  }, [text, reduced]);
  return (
    <span
      ref={root}
      className={`rb-decrypted ${className}`}
      data-react-bits="DecryptedText"
      data-motion={reduced ? "reduced" : "full"}
      onPointerEnter={() => play.current()}
    >
      <span className="rb-sr-only">{text}</span>
      <span className="rb-decrypted-layout" aria-hidden="true">
        {text}
      </span>
      <span ref={visual} className="rb-decrypted-visual" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
