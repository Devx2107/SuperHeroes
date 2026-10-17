import { useEffect, useRef } from "react";
import { usePointer } from "./PointerField";
import { createSparkBurst, drawSparkBursts } from "./react-bits/ClickSpark";

// A small, bounded layer also works when WebGL is unavailable.
export default function InteractiveField({ accent, reduced, quality }) {
  const canvas = useRef(null);
  const { raw } = usePointer();
  useEffect(() => {
    if (reduced) return;
    const surface = canvas.current;
    const context = surface.getContext("2d");
    if (!context) return;
    let width = 1,
      height = 1,
      frame,
      last = 0;
    const dots = Array.from({ length: quality === "high" ? 76 : 38 }, () => ({
      nx: Math.random(),
      ny: Math.random(),
      x: 0,
      y: 0,
      seed: Math.random() * 6.28,
      size: 0.7 + Math.random() * 1.1,
    }));
    let rings = [],
      sparks = [];
    const resize = () => {
      width = surface.clientWidth;
      height = surface.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.forEach((dot) => {
        dot.x = dot.nx * width;
        dot.y = dot.ny * height;
      });
    };
    const pulse = (event) => {
      if (
        event.button !== 0 ||
        event.target.closest(
          "dialog,input,select,textarea,[contenteditable=true]",
        )
      )
        return;
      const rect = surface.getBoundingClientRect();
      if (event.clientY < rect.top) return;
      sparks = [
        ...sparks.slice(-7),
        createSparkBurst(
          event.clientX - rect.left,
          event.clientY - rect.top,
          performance.now(),
          quality === "high" ? 10 : 6,
        ),
      ];
      surface.dataset.sparkBursts = String(
        Number(surface.dataset.sparkBursts || 0) + 1,
      );
      rings = [
        ...rings.slice(-3),
        {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          time: performance.now(),
        },
      ];
      surface.dataset.pulses = String(Number(surface.dataset.pulses || 0) + 1);
    };
    const draw = (now) => {
      const step = Math.min((now - last) / 16.67 || 1, 2);
      last = now;
      context.clearRect(0, 0, width, height);
      context.fillStyle = accent;
      context.strokeStyle = accent;
      const pointer = { x: raw.current.screenX, y: raw.current.screenY - 80 };
      surface.dataset.pointer = raw.current.active ? "active" : "idle";
      for (const dot of dots) {
        let tx = dot.nx * width + Math.sin(now / 4600 + dot.seed) * 18;
        let ty = dot.ny * height + Math.cos(now / 5600 + dot.seed) * 15;
        const dx = tx - pointer.x,
          dy = ty - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (raw.current.active && distance < 180 && distance > 0) {
          const push = (1 - distance / 180) ** 2 * 65;
          tx += (dx / distance) * push;
          ty += (dy / distance) * push;
        }
        dot.x += (tx - dot.x) * 0.055 * step;
        dot.y += (ty - dot.y) * 0.055 * step;
        context.globalAlpha =
          raw.current.active && distance < 240 ? 0.55 : 0.16;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        context.fill();
      }
      if (raw.current.active) {
        context.lineWidth = 0.6;
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (Math.hypot(dot.x - pointer.x, dot.y - pointer.y) > 260) continue;
          let connections = 0;
          for (let j = i + 1; j < dots.length && connections < 2; j++) {
            const other = dots[j],
              distance = Math.hypot(dot.x - other.x, dot.y - other.y);
            if (distance > 115) continue;
            context.globalAlpha = (1 - distance / 115) * 0.25;
            context.beginPath();
            context.moveTo(dot.x, dot.y);
            context.lineTo(other.x, other.y);
            context.stroke();
            connections++;
          }
        }
      }
      rings = rings.filter((ring) => now - ring.time < 1100);
      for (const ring of rings) {
        const life = (now - ring.time) / 1100;
        context.globalAlpha = (1 - life) ** 2 * 0.6;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(ring.x, ring.y, 12 + life * 150, 0, Math.PI * 2);
        context.stroke();
        context.globalAlpha *= 0.35;
        context.beginPath();
        context.arc(ring.x, ring.y, 8 + life * 110, 0, Math.PI * 2);
        context.stroke();
      }
      sparks = drawSparkBursts(context, sparks, now);
      surface.dataset.liveSparks = String(sparks.length);
      frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      surface.dataset.visibility = document.hidden ? "paused" : "visible";
      if (!document.hidden) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    resize();
    visibility();
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    window.addEventListener("pointerdown", pulse, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointerdown", pulse);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [accent, reduced, quality, raw]);
  return reduced ? null : (
    <canvas
      ref={canvas}
      className="interactive-field"
      aria-hidden="true"
      data-pulses="0"
      data-react-bits="ClickSpark"
      data-spark-bursts="0"
    />
  );
}
