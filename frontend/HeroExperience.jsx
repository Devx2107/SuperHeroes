import { useLayoutEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Crosshair, MoveUpRight } from "lucide-react";
import { usePointer } from "./PointerField";
import { gsap, useGSAP, ease } from "./motion";
import KineticHeading from "./KineticHeading";
import StoryRail from "./StoryRail";
import DecryptedText from "./react-bits/DecryptedText";
import {
  Emblem,
  RadialButton,
  SafeImage,
  ActorFlipCard,
} from "./Microinteractions";

function CharacterRig({ hero, signature, reduced }) {
  const { x, y } = usePointer();
  const px = useTransform(x, [-1, 1], [24, -24]),
    py = useTransform(y, [-1, 1], [15, -15]);
  const rx = useTransform(y, [-1, 1], [3, -3]),
    ry = useTransform(x, [-1, 1], [-4, 4]);
  const sx = useSpring(px, signature.spring),
    sy = useSpring(py, signature.spring);
  const srx = useSpring(rx, signature.spring),
    sry = useSpring(ry, signature.spring);
  return (
    <div className={`character-scroll character-${hero.id}`}>
      <motion.div
        className="character-pointer"
        style={reduced ? {} : { x: sx, y: sy, rotateX: srx, rotateY: sry }}
      >
        <motion.div
          className="character-entry"
          initial={
            reduced
              ? false
              : { y: "24vh", scale: 1.06, filter: "brightness(1.5)" }
          }
          animate={{ y: 0, scale: 1, filter: "brightness(1)" }}
          transition={{
            delay: 0.55,
            duration: 1.1 * signature.duration,
            ease: ease.cinema,
          }}
        >
          <div className="art-halo" />
          <SafeImage
            src={hero.image}
            alt={`${hero.name} cinematic artwork`}
            className="character-art"
            fetchPriority="high"
            fallback={
              <>
                <div className="hero-silhouette" />
                <Emblem id={hero.id} />
              </>
            }
          />
          {!reduced && (
            <>
              <motion.img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="chromatic chromatic-red"
                initial={{ x: -14, opacity: 0.6 }}
                animate={{ x: 0, opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              />
              <motion.img
                src={hero.image}
                alt=""
                aria-hidden="true"
                className="chromatic chromatic-blue"
                initial={{ x: 14, opacity: 0.6 }}
                animate={{ x: 0, opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroExperience({ hero, signature, reduced, selector }) {
  const root = useRef(null),
    { x } = usePointer();
  const titleX = useSpring(useTransform(x, [-1, 1], [10, -10]), {
    stiffness: 70,
    damping: 25,
  });
  useLayoutEffect(() => {
    const intro = root.current.querySelector(".hero-intro"),
      copy = intro.querySelector(".hero-copy"),
      index = intro.querySelector(".hero-index"),
      hint = intro.querySelector(".hero-bottom");
    let alive = true,
      frame;
    const fit = () => {
      if (!alive) return;
      intro.style.setProperty(
        "--copy-content-height",
        `${Math.ceil(copy.offsetHeight)}px`,
      );
      // Measure layout boxes so scroll transforms cannot alter the spacing.
      const baseTop =
        copy.offsetTop +
        (parseFloat(copy.style.getPropertyValue("--copy-lift")) || 0);
      const overflow = Math.max(
        0,
        baseTop + copy.offsetHeight + 24 - hint.offsetTop,
      );
      const room = Math.max(
        0,
        baseTop - index.offsetTop - index.offsetHeight - 32,
      );
      copy.style.setProperty("--copy-lift", `${Math.min(overflow, room)}px`);
    };
    const schedule = () => {
      if (!alive) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(intro);
    observer.observe(copy);
    fit();
    document.fonts.ready.then(schedule);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [hero.id]);
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".hero-copy .wipe-reveal, .hero-meta, .hero-bottom", {
        clipPath: "inset(0 0 100% 0)",
        y: 18,
        duration: 0.7,
        stagger: 0.09,
        delay: 1,
        ease: "legend-cinema",
      });
      gsap.to(".monument-scroll", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.to(".character-scroll", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.to(".environment-lines", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.to(".hero-copy", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-intro",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      const skew = gsap.quickTo(".hero-heading-skew", "skewX", {
        duration: 0.22,
        ease: "legend-cinema",
      });
      const trigger = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: ".hero-intro",
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
              skew(gsap.utils.clamp(-3, 3, self.getVelocity() / 700));
            },
            onScrubComplete: () => skew(0),
          },
        },
      );
      gsap.utils.toArray(".section-reveal").forEach((element) => {
        gsap.from(element, {
          clipPath: "inset(0 0 100% 0)",
          y: 30,
          duration: 0.8,
          ease: "legend-cinema",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });
      return () => trigger.kill();
    },
    { scope: root, dependencies: [hero.id, reduced], revertOnUpdate: true },
  );
  const explore = () =>
    document
      .querySelector("#story")
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  const year = hero.timeline[0]?.year;
  return (
    <div ref={root} className="hero-experience">
      <section
        className="hero-intro"
        aria-label={`${hero.name} cinematic dossier`}
      >
        <div className="monument-scroll" aria-hidden="true">
          <motion.div
            className="monument-title"
            style={reduced ? {} : { x: titleX }}
          >
            {hero.name.replaceAll(" ", "")}
          </motion.div>
        </div>
        <div className="environment-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <CharacterRig hero={hero} signature={signature} reduced={reduced} />
        <div className="hero-index mono">
          <span className="status-light" /> CLASSIFIED /{" "}
          {hero.universe.toUpperCase()} UNIVERSE <span className="index-line" />{" "}
          EST. {year} / {(hero.alignment || "hero").toUpperCase()}
        </div>
        <div className="hero-copy">
          <div className="hero-kicker wipe-reveal">
            <span className="tiny-rule" />{" "}
            <DecryptedText text={signature.label} />
          </div>
          <div className="hero-heading-skew">
            <KineticHeading
              text={hero.name.toUpperCase()}
              signature={signature}
              reduced={reduced}
            />
          </div>
          <p className="hero-description wipe-reveal">{hero.storyRight}</p>
          <div className="hero-cta wipe-reveal">
            <RadialButton className="primary-button" onClick={explore}>
              Enter the legend <ArrowUpRight size={18} />
            </RadialButton>
            <button
              className="text-button"
              onClick={() =>
                document
                  .querySelector("#archive")
                  ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" })
              }
            >
              Explore the archive <ArrowDown size={14} />
            </button>
          </div>
          <div className="hero-facts wipe-reveal">
            <div>
              <span className="mono">IDENTITY</span>
              <strong>
                {hero.identity ||
                  {
                    batman: "Bruce Wayne",
                    superman: "Clark Kent",
                    spiderman: "Peter Parker",
                    thor: "Thor Odinson",
                    ironman: "Tony Stark",
                  }[hero.id] ||
                  hero.name}
              </strong>
            </div>
            <div>
              <span className="mono">BASE OF OPERATIONS</span>
              <strong>{hero.cityLabel}</strong>
            </div>
          </div>
        </div>
        <aside className="hero-meta">
          <Emblem id={hero.id} />
          <span className="vertical-label mono">
            {hero.universe.toUpperCase()} / FIELD DOSSIER
          </span>
          <span className="coordinate mono">
            {year}
            <br />—<br />
            2026
          </span>
        </aside>
        <div className="hero-bottom">
          <span className="mono">
            <Crosshair size={12} />{" "}
            {reduced
              ? "THE EXTRAORDINARY, DOCUMENTED."
              : "MOVE TO EXPLORE / CLICK TO LEAVE YOUR MARK."}
          </span>
          <button onClick={explore} className="scroll-cue mono">
            SCROLL TO DISCOVER <ArrowDown size={14} />
          </button>
        </div>
        <span className="hero-art-credit mono">
          ARTWORK / FROM THE ORIGINAL ARCHIVE
        </span>
        {selector}
      </section>
      <section className="story-heading section-reveal" id="story">
        <div>
          <span className="eyebrow">
            <span className="tiny-rule" /> INSIDE THE LEGEND
          </span>
          <h2>
            EVERY LEGEND.
            <br />
            <span>AN UNTOLD STORY.</span>
          </h2>
        </div>
        <p>
          Behind the symbol is a story.
          <br />
          Follow the moments that made {hero.name}.
        </p>
        <MoveUpRight size={32} />
      </section>
      <StoryRail hero={hero} signature={signature} reduced={reduced} />
      {hero.versions.length > 0 ? (
        <section className="actors-section">
          <div className="section-title section-reveal">
            <div>
              <span className="eyebrow">THE LEGEND REIMAGINED</span>
              <h2>
                DIFFERENT FACES.
                <br />
                <span>ONE ICON.</span>
              </h2>
            </div>
            <span className="mono">CLICK A PORTRAIT TO GO DEEPER ↗</span>
          </div>
          <div className="actors-grid">
            {hero.versions.map((actor, index) => (
              <ActorFlipCard key={actor.actor} actor={actor} index={index} />
            ))}
          </div>
        </section>
      ) : (
        <section
          className="dossier-source section-reveal"
          aria-label="Dossier source"
        >
          <div>
            <span className="eyebrow">THE ORIGINAL FILE</span>
            <h2>
              BEYOND
              <br />
              <span>THE DOSSIER.</span>
            </h2>
          </div>
          <div>
            <p>{hero.lore.legacy[0]}</p>
            <a
              className="text-button"
              href={hero.source}
              target="_blank"
              rel="noreferrer"
            >
              Read the official{" "}
              {hero.universe.startsWith("DC") ? "DC" : "Marvel"} profile{" "}
              <ArrowUpRight size={16} />
            </a>
            <span className="mono muted">
              ARCHIVE RATINGS ARE EDITORIAL / ALIGNMENTS REFLECT THIS DOSSIER'S
              FOCUS
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
