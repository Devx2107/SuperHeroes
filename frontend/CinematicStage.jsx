import { memo, useEffect, useRef } from "react";
import { gsap } from "./motion";
import { usePointer } from "./PointerField";

export default memo(function CinematicStage({
  hero,
  signature,
  reduced,
  quality,
}) {
  const host = useRef(null),
    runtime = useRef(null),
    latest = useRef({ hero, signature, quality });
  latest.current = { hero, signature, quality };
  const { raw } = usePointer();
  useEffect(() => {
    if (reduced) {
      host.current.dataset.engine = "static";
      host.current.replaceChildren();
      return;
    }
    let cancelled = false,
      ticker,
      worker,
      engine,
      timer,
      lastMessage = 0,
      fallingBack = false;
    const report = (data) => {
      if (!host.current || cancelled) return;
      if (data.type === "stats") {
        host.current.dataset.geometries = data.geometries;
        host.current.dataset.textures = data.textures;
        host.current.dataset.frameMs = data.frameMs;
      }
      if (data.type === "initialized") clearTimeout(timer);
      if (data.type === "ready") host.current.dataset.motif = data.motif;
      if (data.type === "pulse") host.current.dataset.pulses = data.count;
    };
    const makeCanvas = () => {
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      host.current.replaceChildren(canvas);
      return canvas;
    };
    const dimensions = () => ({
      width: Math.max(1, host.current.clientWidth),
      height: Math.max(1, host.current.clientHeight),
      dpr: devicePixelRatio,
    });
    const initial = () => ({
      ...dimensions(),
      visible: !document.hidden,
      hero: latest.current.hero.id,
      accent: latest.current.signature.accent,
      motif: latest.current.signature.motif,
    });
    const fallback = async () => {
      if (cancelled || fallingBack) return;
      fallingBack = true;
      clearTimeout(timer);
      worker?.terminate();
      if (ticker) {
        gsap.ticker.remove(ticker);
        ticker = null;
      }
      try {
        const { createSceneEngine } = await import("./scene-engine");
        if (cancelled) return;
        engine = createSceneEngine(makeCanvas(), initial(), report);
        engine.quality(latest.current.quality);
        engine.visibility(!document.hidden);
        runtime.current = {
          send: (data) => {
            if (data.type === "hero")
              engine.hero(data.hero, data.accent, data.motif);
            if (data.type === "quality") engine.quality(data.value);
          },
        };
        host.current.dataset.engine = "main-thread";
        ticker = () => {
          if (document.hidden) return;
          engine.pointer(raw.current.x, raw.current.y, raw.current.active);
          engine.update(performance.now());
        };
        gsap.ticker.add(ticker);
      } catch {
        if (!cancelled) {
          host.current.dataset.engine = "static";
          host.current.replaceChildren();
        }
      }
    };
    const canvas = makeCanvas();
    if (canvas.transferControlToOffscreen && typeof Worker !== "undefined") {
      try {
        worker = new Worker(
          new URL("./atmosphere.worker.js", import.meta.url),
          { type: "module" },
        );
        worker.onmessage = ({ data }) => {
          if (data.type === "error") fallback();
          else report(data);
        };
        worker.onerror = fallback;
        const offscreen = canvas.transferControlToOffscreen();
        worker.postMessage({ type: "init", canvas: offscreen, ...initial() }, [
          offscreen,
        ]);
        worker.postMessage({ type: "quality", value: latest.current.quality });
        runtime.current = { send: (data) => worker.postMessage(data) };
        host.current.dataset.engine = "worker";
        timer = setTimeout(fallback, 6000);
        ticker = () => {
          if (document.hidden) return;
          const now = performance.now();
          if (now - lastMessage > 32) {
            worker.postMessage({
              type: "pointer",
              x: raw.current.x,
              y: raw.current.y,
              active: raw.current.active,
            });
            lastMessage = now;
          }
        };
        gsap.ticker.add(ticker);
      } catch {
        fallback();
      }
    } else fallback();
    const resize = () => {
      const { width, height, dpr } = dimensions();
      if (engine) engine.resize(width, height, dpr);
      else
        worker?.postMessage({
          type: "resize",
          width,
          height,
          dpr,
        });
    };
    const visibility = () => {
      host.current.dataset.visibility = document.hidden ? "paused" : "visible";
      if (engine) engine.visibility(!document.hidden);
      else
        worker?.postMessage({ type: "visibility", visible: !document.hidden });
    };
    const pulse = (event) => {
      if (
        event.button !== 0 ||
        event.target.closest(
          'dialog,input,select,textarea,[contenteditable="true"]',
        )
      )
        return;
      const rect = host.current.getBoundingClientRect();
      if (event.clientY < rect.top) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (engine) engine.pulse(x, y);
      else worker?.postMessage({ type: "pulse", x, y });
    };
    visibility();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pointerdown", pulse, { passive: true });
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (ticker) gsap.ticker.remove(ticker);
      worker?.terminate();
      engine?.dispose();
      runtime.current = null;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pointerdown", pulse);
    };
  }, [raw, reduced]);
  useEffect(() => {
    runtime.current?.send({
      type: "hero",
      hero: hero.id,
      accent: signature.accent,
      motif: signature.motif,
    });
  }, [hero.id, signature.accent, signature.motif]);
  useEffect(() => {
    runtime.current?.send({ type: "quality", value: quality });
  }, [quality]);
  return (
    <div
      ref={host}
      className="cinematic-stage"
      aria-hidden="true"
      data-engine="preparing"
    />
  );
});
