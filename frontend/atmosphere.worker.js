import { createSceneEngine } from "./scene-engine";
let engine,
  frame,
  visible = true;
const tick = (now) => {
  frame = undefined;
  if (!visible) return;
  engine?.update(now);
  frame = requestAnimationFrame(tick);
};
self.onmessage = ({ data }) => {
  try {
    if (data.type === "init") {
      engine = createSceneEngine(data.canvas, data, (message) =>
        self.postMessage(message),
      );
      visible = data.visible !== false;
      engine.visibility(visible);
      if (visible) frame = requestAnimationFrame(tick);
    } else if (data.type === "hero")
      engine?.hero(data.hero, data.accent, data.motif);
    else if (data.type === "pointer") engine?.pointer(data.x, data.y);
    else if (data.type === "resize")
      engine?.resize(data.width, data.height, data.dpr);
    else if (data.type === "visibility") {
      visible = data.visible;
      engine?.visibility(visible);
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = undefined;
      } else if (engine && frame === undefined)
        frame = requestAnimationFrame(tick);
    } else if (data.type === "quality") engine?.quality(data.value);
    else if (data.type === "dispose") {
      cancelAnimationFrame(frame);
      engine?.dispose();
      self.close();
    }
  } catch (error) {
    self.postMessage({ type: "error", message: error.message });
  }
};
