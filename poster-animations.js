/* =========================================================
   poster-animations.js
   Scope: ONLY the hero-dossier poster section on heroes.html
   Does not touch: vote/battle/quiz/trivia logic, app.js render
   functions, or the existing .reveal/IntersectionObserver system
   used by every section below the fold.

   Stack: GSAP + ScrollTrigger (entrance timeline + parallax)
          Lenis (site-wide smooth scroll, synced to GSAP ticker)
   ========================================================= */

(function () {
  // Bail safely if libraries didn't load (CDN blocked, offline, etc.)
  // Falls back to your existing .reveal opacity/transform CSS, so the
  // page never looks broken.
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------
     1. LENIS — smooth/inertia scroll, synced to GSAP's ticker
     --------------------------------------------------------- */
  function initLenis() {
    if (typeof Lenis === "undefined") return null;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  /* ---------------------------------------------------------
     2. POSTER ENTRANCE TIMELINE
     Waits for app.js to populate dossierTitle/dossierImage/etc
     via renderAppHeroExperience() before splitting/animating,
     since those elements are empty text nodes at parse time.
     --------------------------------------------------------- */
  function splitChars(el) {
    // Plain textContent only (confirmed in app.js) — safe to split.
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();
    [...text].forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch;
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      frag.appendChild(span);
    });
    el.appendChild(frag);
    return el.querySelectorAll("span");
  }

  function playPosterEntrance() {
    const shell = document.querySelector(".poster-shell");
    if (!shell) return;

    const backdropWord = document.querySelector(".poster-backdrop-word");
    const backdropLine = document.querySelector(".poster-backdrop-line");
    const title = document.querySelector(".poster-title");
    const subtitle = document.querySelector(".poster-subtitle");
    const storyLeft = document.querySelector(".poster-story:not(.poster-story-right)");
    const storyRight = document.querySelector(".poster-story-right");
    const stats = document.querySelector(".poster-metadata");
    const badges = document.querySelectorAll(".poster-chip");
    const imgFrame = document.querySelector(".poster-image-frame");
    const imgGlow = document.querySelector(".poster-image-glow");
    const cta = document.querySelector(".poster-lore-trigger");

    // Guard: title might be empty string for a split second on first paint.
    if (!title || !title.textContent.trim()) return;

    const titleChars = splitChars(title);

    // Set starting states up front to avoid any flash-of-unstyled-content.
    gsap.set(shell, { opacity: 1 }); // shell itself stays visible, children animate
    gsap.set(backdropWord, { opacity: 0, scale: 1.06 });
    gsap.set(backdropLine, { opacity: 0, y: 10 });
    gsap.set(titleChars, { opacity: 0, y: 36, rotateX: -40 });
    gsap.set([subtitle, storyLeft, storyRight, stats], { opacity: 0, y: 18 });
    gsap.set(badges, { opacity: 0, y: 12, scale: 0.92 });
    gsap.set(imgFrame, { opacity: 0, scale: 1.08 });
    gsap.set(imgGlow, { opacity: 0 });
    gsap.set(cta, { opacity: 0, y: 14 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.15,
    });

    tl.to(backdropWord, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" })
      .to(backdropLine, { opacity: 1, y: 0, duration: 0.8 }, "-=1.1")
      .to(
        titleChars,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: { each: 0.025, from: "start" },
          ease: "back.out(1.6)",
        },
        "-=0.9"
      )
      .to(subtitle, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
      .to(imgFrame, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.6")
      .to(imgGlow, { opacity: 0.9, duration: 1.3, ease: "power1.inOut" }, "-=0.9")
      .to(storyLeft, { opacity: 1, y: 0, duration: 0.7 }, "-=0.7")
      .to(storyRight, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
      .to(stats, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .to(
        badges,
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)" },
        "-=0.3"
      )
      .to(cta, { opacity: 1, y: 0, duration: 0.6 }, "-=0.1");
  }

  /* ---------------------------------------------------------
     3. PARALLAX DRIFT ON SCROLL (orbits + backdrop word)
     --------------------------------------------------------- */
  function initParallax() {
    const orbitLeft = document.querySelector(".poster-orbit-left");
    const orbitRight = document.querySelector(".poster-orbit-right");
    const backdropWord = document.querySelector(".poster-backdrop-word");
    const backdropLine = document.querySelector(".poster-backdrop-line");
    const section = document.querySelector(".batman-poster");
    if (!section) return;

    const scrollCfg = { trigger: section, start: "top top", end: "bottom top", scrub: true };

    if (orbitLeft) {
      gsap.to(orbitLeft, { y: -80, x: -30, ease: "none", scrollTrigger: scrollCfg });
    }
    if (orbitRight) {
      gsap.to(orbitRight, { y: 60, x: 20, ease: "none", scrollTrigger: scrollCfg });
    }
    if (backdropWord) {
      gsap.to(backdropWord, { y: 70, ease: "none", scrollTrigger: scrollCfg });
    }
    if (backdropLine) {
      gsap.to(backdropLine, { y: 40, ease: "none", scrollTrigger: scrollCfg });
    }
  }

  /* ---------------------------------------------------------
     4. MAGNETIC CTA BUTTON
     Superseded by the site-wide magnetic effect in
     microinteractions.js, which covers every .button element
     (including this one) without duplicating event handlers
     on exploreLoreBtn. Kept this section header as a marker
     so it's clear the numbering above (1-3) still applies.
     --------------------------------------------------------- */

  /* ---------------------------------------------------------
     5. BOOTSTRAP
     app.js's init() runs renderAppHeroExperience() synchronously
     on DOMContentLoaded-equivalent (it's called at the bottom of
     app.js as a plain `init()` call). Since this script is loaded
     with `defer` AFTER app.js, by the time this file executes,
     app.js has already run and the DOM is populated. A short
     rAF + tiny delay is still used as a safety margin in case
     hero.image (dossierImage) triggers a layout reflow.
     --------------------------------------------------------- */
  function boot() {
    initLenis();
    requestAnimationFrame(() => {
      playPosterEntrance();
      initParallax();
    });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    boot();
  } else {
    document.addEventListener("DOMContentLoaded", boot);
  }

  /* ---------------------------------------------------------
     6. PER-HERO BACKGROUND VIDEO + AUDIO
     Reads heroData[appState.selectedHeroId].video / .audio
     (both globals from app.js, available since this script
     loads after app.js on the same page, no modules/bundler).

     Does NOT touch renderAppHeroExperience() or any app.js
     render function. Instead watches dossierImage's `src`
     attribute via MutationObserver — that attribute changes
     every time app.js switches heroes, so this hooks hero
     changes without modifying app.js at all.

     Behavior:
     - hero.video empty/missing  -> media layer stays fully
       hidden, image-only experience exactly like before this
       feature existed.
     - hero.video set            -> 3s after this hero's poster
       entrance finishes, crossfade from image to full-bleed
       looping muted video behind the section.
     - hero.audio set            -> mute toggle button appears;
       click fades audio in/out. Switching heroes always resets
       to muted (no surprise audio on navigation).
     - Broken video link         -> video 'error' event falls
       back to image-only silently.
     --------------------------------------------------------- */
  function initHeroMedia() {
    const videoEl = document.getElementById("dossierVideo");
    const audioEl = document.getElementById("dossierAudio");
    const mediaBg = document.getElementById("posterMediaBg");
    const muteBtn = document.getElementById("mediaMuteToggle");
    const dossierImage = document.getElementById("dossierImage");
    if (!videoEl || !audioEl || !mediaBg || !muteBtn || !dossierImage) return;

    let videoTimer = null;
    let audioFade = null;

    function fadeAudio(target, duration = 600) {
      if (audioFade) clearInterval(audioFade);
      const steps = 24;
      const stepTime = duration / steps;
      const startVol = audioEl.volume;
      const delta = (target - startVol) / steps;
      let i = 0;
      audioFade = setInterval(() => {
        i += 1;
        audioEl.volume = Math.min(1, Math.max(0, startVol + delta * i));
        if (i >= steps) {
          clearInterval(audioFade);
          audioEl.volume = target;
          if (target === 0) audioEl.pause();
        }
      }, stepTime);
    }

    function resetMediaForNewHero() {
      // Always reset to muted/paused on hero switch -- never carry
      // sound over to a hero the user didn't choose to unmute.
      clearTimeout(videoTimer);
      videoEl.classList.remove("is-active");
      mediaBg.classList.remove("video-on");
      videoEl.pause();
      videoEl.removeAttribute("src");
      audioEl.pause();
      audioEl.volume = 0;
      audioEl.removeAttribute("src");
      muteBtn.classList.remove("is-visible");
      muteBtn.setAttribute("aria-pressed", "false");
      muteBtn.setAttribute("aria-label", "Unmute background audio");

      const hero = (typeof heroData !== "undefined" && typeof appState !== "undefined")
        ? heroData[appState.selectedHeroId]
        : null;
      if (!hero) return;

      if (hero.video) {
        videoEl.src = hero.video;
        videoTimer = setTimeout(() => {
          videoEl.play().catch(() => {
            // Autoplay blocked or bad link -- stay on the image, no crash.
          });
          videoEl.classList.add("is-active");
          mediaBg.classList.add("video-on");
        }, 3000);
      }

      if (hero.audio) {
        audioEl.src = hero.audio;
        muteBtn.classList.add("is-visible");
      }
    }

    videoEl.addEventListener("error", () => {
      videoEl.classList.remove("is-active");
      mediaBg.classList.remove("video-on");
    });

    muteBtn.addEventListener("click", () => {
      const isMuted = muteBtn.getAttribute("aria-pressed") !== "true";
      if (isMuted) {
        audioEl.play().catch(() => {});
        fadeAudio(1);
        muteBtn.setAttribute("aria-pressed", "true");
        muteBtn.setAttribute("aria-label", "Mute background audio");
      } else {
        fadeAudio(0);
        muteBtn.setAttribute("aria-pressed", "false");
        muteBtn.setAttribute("aria-label", "Unmute background audio");
      }
    });

    // Fires on every hero switch since app.js sets dossierImage.src
    // each time renderAppHeroExperience() runs.
    const imgObserver = new MutationObserver(resetMediaForNewHero);
    imgObserver.observe(dossierImage, { attributes: true, attributeFilter: ["src"] });

    // First hero on initial page load.
    resetMediaForNewHero();
  }

  requestAnimationFrame(initHeroMedia);
})();
