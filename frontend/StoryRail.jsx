import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Shield, Zap } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "./motion";
import { Emblem, SafeImage } from "./Microinteractions";

const chapters = ["Origin", "Power", "Nemesis", "Legacy", "Conviction"];

export default function StoryRail({ hero, signature, reduced }) {
  const root = useRef(null),
    rail = useRef(null),
    trigger = useRef(null),
    current = useRef(0);
  const [chapter, setChapter] = useState(0);
  useGSAP(
    () => {
      if (reduced) return;
      const distance = () =>
        rail.current.scrollWidth - root.current.clientWidth;
      const timeline = gsap.timeline({
        defaults: { ease: "legend-cinema" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 80px",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(4, Math.round(self.progress * 4));
            if (index !== current.current) {
              current.current = index;
              setChapter(index);
            }
            root.current.style.setProperty("--story-progress", self.progress);
          },
        },
      });
      timeline.to(
        rail.current,
        { x: () => -distance(), duration: 4, ease: "none" },
        0,
      );
      chapters.forEach((label, index) =>
        timeline.addLabel(label.toLowerCase(), index),
      );
      const originEntry = gsap.timeline({
        defaults: { ease: "legend-cinema" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      originEntry.from(
        ".origin-panel .comic-page",
        {
          x: 90,
          rotate: 3,
          clipPath: "inset(0 100% 0 0)",
          stagger: 0.08,
          duration: 0.6,
        },
        0,
      );
      originEntry.from(
        ".origin-panel .panel-text",
        { clipPath: "inset(0 0 100% 0)", y: 30, duration: 0.5 },
        0.15,
      );
      gsap.utils.toArray(".power-fill", root.current).forEach((bar, index) => {
        const value = Number(bar.dataset.value) / 100;
        timeline.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: Math.min(value * 1.03, 1), duration: 0.3 },
          0.45 + index * 0.025,
        );
        timeline.to(
          bar,
          { scaleX: value, duration: 0.1 },
          0.75 + index * 0.025,
        );
      });
      timeline.from(
        ".power-panel .panel-text",
        { clipPath: "inset(0 100% 0 0)", duration: 0.4 },
        0.5,
      );
      timeline.from(
        ".villain-backlight",
        { scale: 0.2, opacity: 0, duration: 0.65 },
        1.25,
      );
      timeline.from(
        ".villain-art",
        { y: 90, clipPath: "inset(100% 0 0 0)", duration: 0.65 },
        1.3,
      );
      timeline.from(
        ".villain-heading, .villain-copy",
        { clipPath: "inset(0 100% 0 0)", x: -35, duration: 0.3, stagger: 0.06 },
        1.55,
      );
      if (hero.id === "thor")
        timeline.to(
          ".villain-art",
          { x: 3, yoyo: true, repeat: 3, duration: 0.03 },
          1.9,
        );
      timeline.from(
        ".timeline-event",
        { y: 60, clipPath: "inset(0 0 100% 0)", stagger: 0.09, duration: 0.45 },
        2.25,
      );
      timeline.fromTo(
        ".filmstrip-track",
        { x: 100 },
        { x: -70, duration: 1.1, ease: "none" },
        2.65,
      );
      timeline.from(
        ".quote-word",
        {
          yPercent: 110,
          rotate: 3,
          stagger: Math.min(
            0.018,
            0.28 / root.current.querySelectorAll(".quote-word").length,
          ),
          duration: 0.22,
        },
        3.45,
      );
      timeline.fromTo(
        ".quote-spotlight",
        { xPercent: -45 },
        { xPercent: 45, duration: 0.6, ease: "none" },
        3.4,
      );
      timeline.from(
        ".quote-attribution",
        { clipPath: "inset(0 100% 0 0)", duration: 0.2 },
        3.8,
      );
      trigger.current = timeline.scrollTrigger;
      let timer;
      const observer = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => ScrollTrigger.refresh(), 150);
      });
      observer.observe(root.current);
      document.fonts.ready.then(() => {
        if (trigger.current) ScrollTrigger.refresh();
      });
      return () => {
        clearTimeout(timer);
        observer.disconnect();
        trigger.current = null;
      };
    },
    { scope: root, dependencies: [hero.id, reduced], revertOnUpdate: true },
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        root.current?.setAttribute(
          "data-nearby",
          String(entries[0].isIntersecting),
        );
      },
      { rootMargin: "800px" },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const jump = (index) => {
    if (trigger.current)
      window.scrollTo({
        top:
          trigger.current.start +
          ((trigger.current.end - trigger.current.start) * index) / 4,
        behavior: "smooth",
      });
    else
      root.current
        ?.querySelectorAll(".story-panel")
        [index]?.scrollIntoView({ behavior: "instant" });
  };
  const villain = hero.villains[0];
  const quote =
    hero.versions[Math.min(1, hero.versions.length - 1)]?.quote ||
    hero.subtitle;
  const stats = Object.entries(hero.comparison || {}).slice(0, 6);
  return (
    <section
      ref={root}
      className={`story-viewport ${reduced ? "story-static" : ""}`}
      aria-label={`${hero.name} story chapters`}
      data-chapter={chapter}
    >
      <div className="story-navigation">
        <span className="mono">THE {hero.name.toUpperCase()} FILES</span>
        <nav aria-label="Story chapters">
          {chapters.map((label, index) => (
            <button
              key={label}
              className={chapter === index ? "active" : ""}
              onClick={() => jump(index)}
              aria-current={chapter === index ? "step" : undefined}
            >
              <span className="mono">0{index + 1}</span> {label}
            </button>
          ))}
        </nav>
        <span className="mono">0{chapter + 1} / 05</span>
      </div>
      <div ref={rail} className="story-rail">
        <article className="story-panel origin-panel">
          <div className="panel-copy">
            <span className="eyebrow">01 / THE BEGINNING</span>
            <h2>
              BEFORE
              <br />
              THE <span>SYMBOL.</span>
            </h2>
            <p className="panel-text">{hero.lore.origin[0]}</p>
            <p className="panel-text muted">{hero.lore.origin[1]}</p>
            <span className="panel-footnote mono">
              <Shield size={14} /> {hero.badges[0]}
            </span>
          </div>
          <div className="comic-stack">
            <div className="comic-page comic-main">
              <SafeImage
                src={hero.image}
                alt={`${hero.name} origin artwork`}
                fallback={<Emblem id={hero.id} />}
              />
              <span className="comic-caption">
                {hero.cityLabel} / WHERE IT ALL BEGAN
              </span>
            </div>
            <div className="comic-page comic-detail">
              <Emblem id={hero.id} />
              <span className="mono">
                A SYMBOL.
                <br />A PROMISE.
                <br />A LEGEND.
              </span>
            </div>
            <span className="comic-year">{hero.timeline[0]?.year}</span>
          </div>
        </article>
        <article className="story-panel power-panel">
          <div className="panel-copy">
            <span className="eyebrow">02 / BEYOND HUMAN</span>
            <h2>
              POWER WITH
              <br />
              <span>PURPOSE.</span>
            </h2>
            <p className="panel-text">{hero.lore.powers[0]}</p>
            <div className="ability-tags">
              {hero.abilities.map((ability) => (
                <span key={ability}>
                  <Zap size={12} />
                  {ability}
                </span>
              ))}
            </div>
            <p className="mono stat-note">
              ARCHIVE COMPARISONS / RELATIVE INDEX
            </p>
          </div>
          <div className="power-console">
            <div className="console-heading">
              <Emblem id={hero.id} />
              <span className="mono">
                CAPABILITY ANALYSIS
                <br />
                <span className="muted">FIELD STATUS: ACTIVE</span>
              </span>
              <span className="status-light" />
            </div>
            {stats.map(([label, value]) => (
              <div className="power-stat" key={label}>
                <div>
                  <span className="mono">{label.toUpperCase()}</span>
                  <strong>
                    {value}
                    <small>/100</small>
                  </strong>
                </div>
                <div className="power-track">
                  <div
                    className="power-fill"
                    data-value={value}
                    style={
                      reduced
                        ? { transform: `scaleX(${value / 100})` }
                        : undefined
                    }
                  >
                    <span className="energy-tip" />
                    <span className="energy-spark" />
                  </div>
                </div>
              </div>
            ))}
            <span className="mono console-footer">
              ANALYSIS COMPLETE <ArrowUpRight size={12} />
            </span>
          </div>
        </article>
        <article className="story-panel villain-panel">
          <div className="villain-backlight" />
          <div className="villain-visual">
            <SafeImage
              src={villain.image}
              alt={villain.name}
              className="villain-art"
              loading="lazy"
              fallback={
                <span className="villain-monogram">{villain.name[0]}</span>
              }
            />
            <span className="villain-code mono">
              {hero.alignment === "villain"
                ? "OPPOSITION / ARCHIVE FILE"
                : "THREAT LEVEL / CRITICAL"}
            </span>
          </div>
          <div className="panel-copy">
            <span className="eyebrow">03 / THE OTHER SIDE</span>
            <span className="mono villain-warning">
              {hero.alignment === "villain"
                ? "EVERY SCHEME MEETS RESISTANCE."
                : "EVERY LIGHT CASTS A SHADOW."}
            </span>
            <h2 className="villain-heading">{villain.name.toUpperCase()}</h2>
            <span className="villain-threat mono">
              {villain.threat.toUpperCase()}
            </span>
            <p className="villain-copy">{villain.front}</p>
            <p className="villain-copy muted">{villain.back}</p>
          </div>
        </article>
        <article className="story-panel legacy-panel">
          <span className="eyebrow">
            {hero.timelineKind === "profile"
              ? "04 / KEY CHAPTERS"
              : "04 / THROUGH THE YEARS"}
          </span>
          <h2>
            {hero.timelineKind === "profile" ? "A LEGEND" : "A LEGACY"}
            <br />
            <span>
              {hero.timelineKind === "profile" ? "IN FOCUS." : "IN MOTION."}
            </span>
          </h2>
          <div className="filmstrip">
            <div className="filmstrip-track">
              {hero.timeline.map((event, index) => (
                <button
                  className="timeline-event"
                  key={event.year}
                  onClick={() => {
                    root.current.style.setProperty("--milestone", index);
                    root.current
                      .querySelectorAll(".timeline-event")
                      .forEach((el, i) =>
                        el.classList.toggle("selected", i === index),
                      );
                  }}
                >
                  <span className="timeline-dot" />
                  <span className="timeline-year">{event.year}</span>
                  <strong>{event.title}</strong>
                  <p>{event.text}</p>
                  <span className="mono">FRAME / 0{index + 1}</span>
                </button>
              ))}
            </div>
            <span className="film-playhead" />
          </div>
          <span className="mono legacy-note">
            MOMENTS PASS. LEGENDS REMAIN.
          </span>
        </article>
        <article className="story-panel quote-panel">
          <div className="quote-spotlight" />
          <Emblem id={hero.id} />
          <span className="eyebrow">
            {hero.versions.length
              ? "05 / WHAT THEY STAND FOR"
              : "05 / THE ARCHIVE PERSPECTIVE"}
          </span>
          <blockquote aria-label={quote}>
            {hero.versions.length > 0 && (
              <span aria-hidden="true" className="quote-mark">
                “
              </span>
            )}
            {quote.split(" ").map((word, index) => (
              <span className="quote-word-cell" key={index}>
                <span className="quote-word">{word}&nbsp;</span>
              </span>
            ))}
          </blockquote>
          <div className="quote-attribution">
            <span className="tiny-rule" />
            <span className="mono">
              {hero.name.toUpperCase()} /{" "}
              {hero.versions.length ? signature.label : "EDITORIAL THEME"}
            </span>
          </div>
          <button
            className="text-button"
            onClick={() =>
              document
                .querySelector(
                  hero.versions.length ? ".actors-section" : "#archive",
                )
                ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" })
            }
          >
            {hero.versions.length
              ? "The faces behind the legend"
              : "Discover more characters"}{" "}
            <ArrowRight size={16} />
          </button>
        </article>
      </div>
      <div className="story-progress" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
