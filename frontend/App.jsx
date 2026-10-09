import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import archiveData from "./heroes.json";
import localArt from "./art.json";
import { ease, featuredIds, routeVariants, signatureFor } from "./motion";
import { prepareImage, warmAssets } from "./assets";
import { PointerField, CinematicCursor } from "./PointerField";
import CinematicStage from "./CinematicStage";
import HeroExperience from "./HeroExperience";
import Archive from "./Archive";
import { Emblem, NavLink } from "./Microinteractions";

export const HeroMotionContext = createContext(null);
const page =
  location.pathname.split("/").pop()?.replace(".html", "") || "heroes";
const isRoster = !["battle", "quiz", "trivia", "votes"].includes(page);
const FeaturePages = lazy(() => import("./FeaturePages"));
const heroes = Object.fromEntries(
  Object.entries(archiveData).map(([id, hero]) => [
    id,
    {
      ...hero,
      image: localArt[id] || hero.image,
      versions: hero.versions.map((actor, index) => ({
        ...actor,
        image: localArt[`${id}-actor-${index}`] || actor.image,
      })),
      villains: hero.villains.map((villain, index) => ({
        ...villain,
        image: localArt[`${id}-villain-${index}`] || villain.image,
      })),
    },
  ]),
);
function stored(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function remember(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private browsing still supports navigation. */
  }
}
function storedChoice(key, choices, fallback) {
  const value = stored(key, fallback);
  return choices.includes(value) ? value : fallback;
}
function initialHero() {
  const query = new URLSearchParams(location.search).get("hero");
  if (query) return heroes[query] ? query : "batman";
  try {
    const saved = JSON.parse(stored("legendrium-selection-v2", "{}"));
    const id = saved.selectedHeroId || saved.heroId;
    return heroes[id] ? id : "batman";
  } catch {
    return "batman";
  }
}

function HeroSelector({ active, phase, onSelect }) {
  return (
    <nav className="hero-selector" aria-label="Featured heroes">
      {featuredIds.map((id, index) => (
        <button
          key={id}
          className={`hero-tab ${active === id ? "active" : ""}`}
          onClick={(event) =>
            onSelect(id, { point: { x: event.clientX, y: event.clientY } })
          }
          aria-current={active === id ? "page" : undefined}
        >
          <span className="mono tab-index">0{index + 1}</span>
          <Emblem id={id} />
          <div>
            <strong>{heroes[id].name.toUpperCase()}</strong>
            <span className="mono">{heroes[id].universe} UNIVERSE</span>
          </div>
          <ArrowUpRight size={16} />
          {active === id && (
            <motion.span
              className="hero-tab-indicator"
              layoutId="hero-indicator"
              transition={{
                type: "spring",
                ...signatureFor(heroes[id]).spring,
              }}
            />
          )}
        </button>
      ))}
      <span className="sr-only" role="status">
        {phase === "idle" ? "" : `Opening ${heroes[active].name} archive`}
      </span>
    </nav>
  );
}

function Settings({
  reduced,
  setMotion,
  motionMode,
  quality,
  setQuality,
  onClose,
}) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const panel = dialog.current;
    panel.showModal();
    return () => {
      panel.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <motion.dialog
      ref={dialog}
      className="settings-panel"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.2, ease: ease.cinema }}
      aria-label="Experience settings"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll(
          "button:not(:disabled), select:not(:disabled)",
        );
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div>
        <strong>Make it your experience.</strong>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close settings"
        >
          <X size={17} />
        </button>
      </div>
      <label>
        Motion
        <select
          value={motionMode}
          onChange={(event) => setMotion(event.target.value)}
        >
          <option value="system">Follow system preference</option>
          <option value="full">Full cinematic experience</option>
          <option value="reduced">Reduced motion</option>
        </select>
      </label>
      <label>
        Atmosphere
        <select
          value={quality}
          onChange={(event) => setQuality(event.target.value)}
        >
          <option value="high">Ultra / bloom + particles</option>
          <option value="balanced">Balanced / particles</option>
        </select>
      </label>
      <p className="mono">
        {reduced ? "MOTION: REDUCED" : "MOTION: CINEMATIC"} / DESKTOP EDITION
      </p>
    </motion.dialog>
  );
}

function Experience() {
  const [heroId, setHeroId] = useState(initialHero),
    [phase, setPhaseState] = useState("idle"),
    [present, setPresent] = useState(true);
  const [quality, setQualityState] = useState(() =>
    storedChoice("legendrium-quality", ["high", "balanced"], "high"),
  );
  const [motionMode, setMotionState] = useState(() =>
    storedChoice("legendrium-motion", ["system", "full", "reduced"], "system"),
  );
  const [settings, setSettings] = useState(false);
  const systemReduced = useReducedMotion(),
    reduced =
      motionMode === "reduced" || (motionMode === "system" && systemReduced);
  const hero = heroes[heroId],
    signature = signatureFor(hero);
  const veil = useAnimationControls(),
    veilRef = useRef(null),
    phaseRef = useRef("idle"),
    sequence = useRef(0),
    pending = useRef(null),
    queued = useRef(null),
    current = useRef(heroId),
    mounted = useRef(true);
  const navigateRef = useRef(null);
  const setPhase = useCallback((value) => {
    phaseRef.current = value;
    setPhaseState(value);
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      sequence.current++;
    };
  }, []);
  const navigate = useCallback(
    async (id, options = {}) => {
      if (!heroes[id]) return;
      if (!isRoster) {
        current.current = id;
        setHeroId(id);
        const url = new URL(location.href);
        url.searchParams.set("hero", id);
        if (!options.history) history.pushState({ hero: id }, "", url);
        return;
      }
      if (phaseRef.current !== "idle" && phaseRef.current !== "preparing") {
        queued.current = { id, options };
        return;
      }
      const ticket = ++sequence.current;
      if (id === current.current) {
        setPhase("idle");
        return;
      }
      setPhase("preparing");
      await prepareImage(heroes[id].image);
      if (!mounted.current || ticket !== sequence.current) return;
      pending.current = { id, options };
      const point = options.point || { x: innerWidth / 2, y: innerHeight / 2 };
      veilRef.current.style.setProperty(
        "--veil-color",
        signatureFor(heroes[id]).accent,
      );
      veilRef.current.style.setProperty(
        "--veil-x",
        `${point.x || innerWidth / 2}px`,
      );
      veilRef.current.style.setProperty(
        "--veil-y",
        `${point.y || innerHeight / 2}px`,
      );
      setPhase("covering");
      await veil.start({
        clipPath: "circle(150% at var(--veil-x) var(--veil-y))",
        transition: { duration: reduced ? 0.08 : 0.4, ease: ease.impact },
      });
      if (!mounted.current) return;
      setPhase("swapping");
      setPresent(false);
    },
    [reduced, setPhase, veil],
  );
  navigateRef.current = navigate;
  const commit = () => {
    const next = pending.current;
    if (!next) return;
    if (!next.options.history) {
      history.replaceState(
        { ...history.state, scroll: scrollY },
        "",
        location.href,
      );
      const url = new URL(location.href);
      url.searchParams.set("hero", next.id);
      history.pushState({ hero: next.id, scroll: 0 }, "", url);
    }
    current.current = next.id;
    setHeroId(next.id);
    setPresent(true);
    setPhase("revealing");
    window.scrollTo({
      top: next.options.restoreScroll || 0,
      behavior: "instant",
    });
    remember(
      "legendrium-selection-v2",
      JSON.stringify({ selectedHeroId: next.id, selectedVersionIndex: 0 }),
    );
  };
  useEffect(() => {
    if (phase !== "revealing") return;
    let cancelled = false;
    const reveal = async () => {
      await veil.start({
        clipPath: "circle(0% at var(--veil-x) var(--veil-y))",
        transition: {
          delay: reduced ? 0 : 0.2,
          duration: reduced ? 0.08 : 0.85,
          ease: ease.cinema,
        },
      });
      if (cancelled || !mounted.current) return;
      document
        .querySelector(".kinetic-heading")
        ?.focus({ preventScroll: true });
      await new Promise((resolve) => setTimeout(resolve, reduced ? 0 : 400));
      if (cancelled || !mounted.current) return;
      setPhase("idle");
      pending.current = null;
      if (queued.current) {
        const next = queued.current;
        queued.current = null;
        navigateRef.current(next.id, next.options);
      }
    };
    reveal();
    return () => {
      cancelled = true;
    };
  }, [phase, reduced, setPhase, veil]);
  useEffect(() => {
    const onPop = () => {
      const id = new URLSearchParams(location.search).get("hero") || "batman";
      navigateRef.current(heroes[id] ? id : "batman", {
        history: true,
        restoreScroll: history.state?.scroll || 0,
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    document.title = `Legendrium — ${isRoster ? hero.name : { battle: "Battle arena", quiz: "Discover yourself", trivia: "Trivia", votes: "Fan votes" }[page]}`;
    document.documentElement.style.setProperty("--accent", signature.accent);
    document.documentElement.style.setProperty(
      "--heartbeat-offset",
      `${-(performance.now() % 2400) / 1000}s`,
    );
    document.body.dataset.hero = heroId;
    remember(
      "legendrium-selection-v2",
      JSON.stringify({ selectedHeroId: heroId, selectedVersionIndex: 0 }),
    );
  }, [heroId, hero.name, signature.accent]);
  useEffect(() => warmAssets(featuredIds.map((id) => heroes[id])), []);
  const setMotion = (value) => {
    remember("legendrium-motion", value);
    setMotionState(value);
  };
  const setQuality = (value) => {
    remember("legendrium-quality", value);
    setQualityState(value);
  };
  const context = useMemo(
    () => ({ hero, signature, phase, reduced, quality, navigate }),
    [hero, signature, phase, reduced, quality, navigate],
  );
  return (
    <HeroMotionContext.Provider value={context}>
      <MotionConfig
        reducedMotion={reduced ? "always" : "never"}
        transition={{ ease: ease.cinema }}
      >
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <div className={isRoster ? "roster-atmosphere" : "feature-atmosphere"}>
          <CinematicStage
            hero={hero}
            signature={signature}
            reduced={reduced}
            quality={quality}
          />
        </div>
        <div className="page-grain" aria-hidden="true" />
        <header className="topbar">
          <a className="brand" href="heroes.html" aria-label="Legendrium home">
            <span className="brand-symbol">
              L<span />
            </span>
            LEGENDRIUM<span className="brand-period">.</span>
          </a>
          <nav className="primary-nav" aria-label="Primary">
            <NavLink
              href="heroes.html"
              aria-current={isRoster ? "page" : undefined}
            >
              The heroes <ChevronDown size={12} />
            </NavLink>
            <NavLink
              href="battle.html"
              aria-current={page === "battle" ? "page" : undefined}
            >
              Battle arena
            </NavLink>
            <NavLink
              href="quiz.html"
              aria-current={page === "quiz" ? "page" : undefined}
            >
              Discover yourself
            </NavLink>
            <NavLink
              href="trivia.html"
              aria-current={page === "trivia" ? "page" : undefined}
            >
              Trivia
            </NavLink>
            <NavLink
              href="votes.html"
              aria-current={page === "votes" ? "page" : undefined}
            >
              Fan votes
            </NavLink>
          </nav>
          <div className="header-controls">
            <span className="mono desktop-label">
              AN ARCHIVE OF THE EXTRAORDINARY
            </span>
            <button
              className={`icon-button ${settings ? "active" : ""}`}
              aria-label="Experience settings"
              aria-expanded={settings}
              onClick={() => setSettings(!settings)}
            >
              <SlidersHorizontal size={17} />
            </button>
          </div>
        </header>
        <AnimatePresence>
          {settings && (
            <Settings
              reduced={reduced}
              motionMode={motionMode}
              setMotion={setMotion}
              quality={quality}
              setQuality={setQuality}
              onClose={() => setSettings(false)}
            />
          )}
        </AnimatePresence>
        <main
          id="main"
          data-phase={phase}
          data-active-hero={heroId}
          aria-busy={phase !== "idle"}
        >
          {isRoster ? (
            <>
              <AnimatePresence mode="wait" onExitComplete={commit}>
                {present && (
                  <motion.div
                    key={heroId}
                    variants={
                      reduced
                        ? {
                            initial: { opacity: 0 },
                            present: { opacity: 1 },
                            exit: {
                              opacity: 0,
                              transition: { duration: 0.08 },
                            },
                          }
                        : routeVariants
                    }
                    initial="initial"
                    animate="present"
                    exit="exit"
                    className="hero-route"
                  >
                    <HeroExperience
                      hero={hero}
                      signature={signature}
                      reduced={reduced}
                      selector={
                        <HeroSelector
                          active={heroId}
                          phase={phase}
                          onSelect={navigate}
                        />
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Archive heroes={heroes} activeId={heroId} onSelect={navigate} />
            </>
          ) : (
            <Suspense
              fallback={
                <div className="feature-loading" role="status">
                  Opening the next chapter…
                </div>
              }
            >
              <FeaturePages
                page={page}
                heroes={heroes}
                hero={hero}
                reduced={reduced}
                onSelect={navigate}
              />
            </Suspense>
          )}
        </main>
        <footer className="site-footer">
          <div>
            <span className="brand">
              LEGENDRIUM<span className="brand-period">.</span>
            </span>
            <p>
              Some stories are bigger than life.
              <br />
              This is where they live.
            </p>
          </div>
          <div className="footer-links">
            <NavLink href={isRoster ? "#archive" : "heroes.html#archive"}>
              Explore the archive <ArrowUpRight size={13} />
            </NavLink>
            <NavLink href="votes.html">
              Choose your legend <ArrowUpRight size={13} />
            </NavLink>
          </div>
          <span className="mono">
            EST. 2026
            <br />
            BUILT FOR THE EXTRAORDINARY.
            <br />
            <span className="muted">AN INDEPENDENT FAN ARCHIVE.</span>
          </span>
        </footer>
        <motion.div
          ref={veilRef}
          className="transition-veil"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={veil}
          aria-hidden="true"
        >
          <Emblem id={pending.current?.id || heroId} />
          <span className="mono">ENTERING THE LEGEND</span>
        </motion.div>
        <div
          className="transition-status sr-only"
          role="status"
          aria-live="polite"
        >
          {phase === "preparing"
            ? `Preparing ${pending.current?.id || "hero"} dossier`
            : phase === "idle"
              ? `${hero.name} dossier ready`
              : ""}
        </div>
        <CinematicCursor signature={signature} reduced={reduced} />
      </MotionConfig>
    </HeroMotionContext.Provider>
  );
}
export default function App() {
  return (
    <PointerField>
      <Experience />
    </PointerField>
  );
}
