/* =========================================================
   microinteractions.js
   Scope: cursor (site-wide), roster card hover, button magnetic
   effect (site-wide on .button elements).
   Nav underline-draw, villain flip shadow, and selected-card
   pulse are pure CSS and live in styles.css instead -- no JS
   needed for those three.

   Does not touch app.js render functions. Reads DOM only.
   ========================================================= */

(function () {
  const hasGsap = typeof gsap !== "undefined";

  /* ---------------------------------------------------------
     1. CUSTOM CURSOR
     The dot/ring elements already exist in every page's HTML
     and already have CSS (opacity: 0 by default). This is the
     first JS to ever drive them -- previously fully inert.
     --------------------------------------------------------- */
  function initCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    // Respect touch devices -- a custom cursor on mobile is just
    // a stray dot stuck wherever you last tapped. Skip entirely.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Small label span injected into the ring for contextual text
    // like "VIEW" or "PLAY". Empty by default, filled on hover.
    const label = document.createElement("span");
    label.className = "cursor-ring-label";
    ring.appendChild(label);

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;
    let revealed = false;

    function loop() {
      // Dot tracks instantly, ring trails with easing for the
      // classic "two-speed" cursor feel.
      dotX = mouseX;
      dotY = mouseY;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!revealed) {
        revealed = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    });

    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      if (revealed) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    });

    requestAnimationFrame(loop);

    // Contextual hover states. data-cursor-label on any element
    // overrides the default "VIEW" text -- optional, falls back
    // gracefully if not present.
    const hoverTargets = [
      { selector: "a, button", label: "" , grow: true },
      { selector: ".roster-card", label: "VIEW", grow: true },
      { selector: ".villain-card", label: "FLIP", grow: true },
      { selector: "#mediaMuteToggle", label: "SOUND", grow: true },
      { selector: ".poster-image-frame", label: "PLAY", grow: true }
    ];

    hoverTargets.forEach(({ selector, label: defaultLabel, grow }) => {
      document.addEventListener("mouseover", (e) => {
        const target = e.target.closest(selector);
        if (!target) return;
        ring.classList.toggle("is-growing", grow);
        const customLabel = target.getAttribute("data-cursor-label");
        label.textContent = customLabel || defaultLabel;
        ring.classList.toggle("has-label", Boolean(customLabel || defaultLabel));
      });
      document.addEventListener("mouseout", (e) => {
        const target = e.target.closest(selector);
        if (!target) return;
        const stillOver = e.relatedTarget && e.relatedTarget.closest(selector);
        if (!stillOver) {
          ring.classList.remove("is-growing", "has-label");
          label.textContent = "";
        }
      });
    });
  }

  /* ---------------------------------------------------------
     2. ROSTER CARD TILT
     Mousemove-based 3D tilt scoped to .roster-card. Cards are
     re-rendered on universe filter changes (innerHTML replaced),
     so this delegates from the grid container instead of binding
     per-card, meaning it survives re-renders with zero extra wiring.
     --------------------------------------------------------- */
  function initRosterTilt() {
    const grid = document.getElementById("heroRosterGrid");
    if (!grid) return;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const maxTilt = 8; // degrees

    grid.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".roster-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-py * maxTilt).toFixed(2);
      const rotateY = (px * maxTilt).toFixed(2);
      if (hasGsap) {
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 600,
        });
      } else {
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    grid.addEventListener("mouseout", (e) => {
      const card = e.target.closest(".roster-card");
      if (!card) return;
      const stillOver = e.relatedTarget && e.relatedTarget.closest(".roster-card") === card;
      if (stillOver) return;
      if (hasGsap) {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
      } else {
        card.style.transform = "";
      }
    });
  }

  /* ---------------------------------------------------------
     3. SITE-WIDE MAGNETIC BUTTONS
     Extends the same effect already proven on #exploreLoreBtn
     to every .button element. Delegated from document so it
     covers buttons rendered later by app.js (quizRestart,
     triviaRestart, etc.) without needing to re-init.
     --------------------------------------------------------- */
  function initMagneticButtons() {
    if (!hasGsap) return;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const strength = 0.3;
    let activeBtn = null;

    document.addEventListener("mousemove", (e) => {
      const btn = e.target.closest(".button");
      if (!btn) {
        return;
      }
      activeBtn = btn;
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out" });
    });

    document.addEventListener("mouseout", (e) => {
      const btn = e.target.closest(".button");
      if (!btn || btn !== activeBtn) return;
      const stillOver = e.relatedTarget && e.relatedTarget.closest(".button") === btn;
      if (stillOver) return;
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      activeBtn = null;
    });
  }

  function boot() {
    initCursor();
    initRosterTilt();
    initMagneticButtons();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    boot();
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }
})();
