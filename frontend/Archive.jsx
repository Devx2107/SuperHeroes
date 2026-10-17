import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Heart, Search, Shuffle, Swords, X } from "lucide-react";
import { Emblem, SafeImage } from "./Microinteractions";
import { signatureFor } from "./motion";
import useSavedHeroes from "./useSavedHeroes";
import GlareHover from "./react-bits/GlareHover";
import ScrollVelocity from "./react-bits/ScrollVelocity";

function ReactiveCard({ children, reduced, ...props }) {
  const rx = useMotionValue(0),
    ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 230, damping: 24 }),
    rotateY = useSpring(ry, { stiffness: 230, damping: 24 });
  useEffect(() => {
    if (reduced) {
      rx.set(0);
      ry.set(0);
    }
  }, [reduced, rx, ry]);
  return (
    <motion.button
      {...props}
      style={{
        ...props.style,
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformPerspective: 900,
      }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - rect.left) / rect.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - rect.top) / rect.height),
        );
        rx.set((0.5 - y) * 10);
        ry.set((x - 0.5) * 12);
        event.currentTarget.style.setProperty("--spot-x", `${x * 100}%`);
        event.currentTarget.style.setProperty("--spot-y", `${y * 100}%`);
        event.currentTarget.dataset.tilt = "active";
      }}
      onPointerLeave={(event) => {
        rx.set(0);
        ry.set(0);
        event.currentTarget.dataset.tilt = "rest";
      }}
    >
      {children}
    </motion.button>
  );
}

export default function Archive({ heroes, activeId, onSelect, reduced }) {
  const [query, setQuery] = useState(""),
    [universe, setUniverse] = useState("all"),
    [alignment, setAlignment] = useState("all");
  const ids = useMemo(() => Object.keys(heroes), [heroes]);
  const [saved, toggleSaved] = useSavedHeroes(ids);
  const [savedOnly, setSavedOnly] = useState(false),
    [sort, setSort] = useState("archive");
  const filtered = useMemo(
    () =>
      Object.values(heroes)
        .filter(
          (hero) =>
            (alignment === "all" || (hero.alignment || "hero") === alignment) &&
            (universe === "all" ||
              hero.universe.split("|")[0].trim() === universe) &&
            (!savedOnly || saved.includes(hero.id)) &&
            [
              hero.name,
              hero.identity || "",
              hero.title,
              ...hero.abilities,
              ...hero.villains.map((v) => v.name),
            ]
              .join(" ")
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((left, right) =>
          sort === "name"
            ? left.name.localeCompare(right.name)
            : sort === "rating"
              ? Object.values(right.comparison).reduce((a, b) => a + b, 0) -
                Object.values(left.comparison).reduce((a, b) => a + b, 0)
              : sort === "intelligence"
                ? right.comparison.intelligence - left.comparison.intelligence
                : ids.indexOf(left.id) - ids.indexOf(right.id),
        ),
    [heroes, query, universe, alignment, savedOnly, saved, sort, ids],
  );
  const surprises = filtered.filter((hero) => hero.id !== activeId);
  return (
    <section
      className="archive-section"
      id="archive"
      data-motion={reduced ? "reduced" : "full"}
    >
      <div className="section-title">
        <div>
          <span className="eyebrow">THE MULTIVERSE IS WAITING</span>
          <h2>
            FIND YOUR
            <br />
            <span>NEXT LEGEND.</span>
          </h2>
        </div>
        <p>
          Heroes. Antiheroes. Villains. Extraordinary stories.
          <br />
          Choose a different perspective.
        </p>
      </div>
      <ScrollVelocity heroes={heroes} activeId={activeId} />
      <div className="archive-toolbar">
        <div
          className="archive-filters"
          role="group"
          aria-label="Filter universe"
        >
          {["all", "DC", "Marvel"].map((value) => (
            <button
              key={value}
              aria-pressed={universe === value}
              onClick={() => setUniverse(value)}
            >
              {universe === value && (
                <motion.span layoutId="universe-indicator" />
              )}
              <span>{value === "all" ? "All universes" : value}</span>
            </button>
          ))}
        </div>
        <label className="archive-search">
          <Search size={16} />
          <input
            aria-label="Search heroes, powers, or villains"
            type="search"
            placeholder="Search names, identities, powers…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X size={14} />
            </button>
          )}
        </label>
        <span className="mono archive-count" role="status">
          {String(filtered.length).padStart(2, "0")} FILES FOUND
        </span>
      </div>
      <div
        className="archive-role-row"
        role="group"
        aria-label="Character type"
      >
        {[
          ["all", "All characters"],
          ["hero", "Heroes"],
          ["antihero", "Antiheroes"],
          ["villain", "Villains"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={alignment === value ? "active" : ""}
            aria-pressed={alignment === value}
            onClick={() => setAlignment(value)}
          >
            {label}
            <span className="mono">
              {String(
                Object.values(heroes).filter(
                  (item) =>
                    value === "all" || (item.alignment || "hero") === value,
                ).length,
              ).padStart(2, "0")}
            </span>
          </button>
        ))}
        <span className="mono muted">A PLACE FOR EVERY SIDE OF THE STORY.</span>
      </div>
      <div className="archive-collection-bar">
        <button
          className={`collection-toggle ${savedOnly ? "active" : ""}`}
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly(!savedOnly)}
        >
          <Heart size={14} fill={savedOnly ? "currentColor" : "none"} /> My
          collection{" "}
          <span className="mono">{String(saved.length).padStart(2, "0")}</span>
        </button>
        <span className="mono muted collection-hint">
          KEEP THE LEGENDS THAT STAY WITH YOU.
        </span>
        <label>
          Sort by{" "}
          <select
            aria-label="Sort heroes"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="archive">Archive order</option>
            <option value="name">Name A–Z</option>
            <option value="rating">Combined rating</option>
            <option value="intelligence">Intelligence</option>
          </select>
        </label>
        <button
          className="collection-surprise"
          disabled={!surprises.length}
          onClick={() =>
            onSelect(surprises[Math.floor(Math.random() * surprises.length)].id)
          }
        >
          <Shuffle size={14} /> Surprise me
        </button>
      </div>
      <div className="archive-grid">
        {filtered.map((hero) => (
          <article className="archive-tile" key={hero.id}>
            <ReactiveCard
              reduced={reduced}
              className={`archive-card ${activeId === hero.id ? "selected" : ""}`}
              onClick={() => onSelect(hero.id)}
              whileHover={reduced ? undefined : { y: -7 }}
              whileTap={{ scale: 0.98 }}
              style={{ "--card-accent": signatureFor(hero).accent }}
              aria-label={`Open ${hero.name} dossier`}
            >
              <SafeImage
                src={hero.image}
                alt=""
                loading="lazy"
                fallback={<Emblem id={hero.id} />}
              />
              <span className="archive-card-shade" />
              <span className="archive-card-light" aria-hidden="true" />
              <GlareHover reduced={reduced} />
              <span className="archive-card-id mono">
                {String(ids.indexOf(hero.id) + 1).padStart(2, "0")} /{" "}
                {hero.universe.toUpperCase()}
              </span>
              <span
                className={`archive-alignment mono ${hero.alignment || "hero"}`}
              >
                {hero.alignment || "hero"}
              </span>
              <span className="archive-hover-stats mono">
                <span>
                  POWER <strong>{hero.comparison.power}</strong>
                </span>
                <span>
                  INTEL <strong>{hero.comparison.intelligence}</strong>
                </span>
                <span>
                  COMBAT <strong>{hero.comparison.combat}</strong>
                </span>
              </span>
              <div>
                <Emblem id={hero.id} />
                <h3>{hero.name.toUpperCase()}</h3>
                <span className="mono">{hero.title}</span>
              </div>
              <ArrowUpRight className="archive-card-arrow" size={20} />
            </ReactiveCard>
            <button
              className={`save-hero ${saved.includes(hero.id) ? "saved" : ""}`}
              aria-label={`${saved.includes(hero.id) ? "Unsave" : "Save"} ${hero.name}`}
              aria-pressed={saved.includes(hero.id)}
              onClick={() => toggleSaved(hero.id)}
            >
              <Heart
                size={15}
                fill={saved.includes(hero.id) ? "currentColor" : "none"}
              />
            </button>
            {hero.id !== activeId && (
              <a
                className="card-compare"
                href={`battle.html?hero=${activeId}&opponent=${hero.id}&mode=balanced`}
                aria-label={`Compare ${heroes[activeId].name} with ${hero.name}`}
                data-cursor="COMPARE"
              >
                <Swords size={14} />
              </a>
            )}
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-archive">
          <Search size={30} />
          <h3>
            {savedOnly && !saved.length
              ? "Your collection starts here."
              : "No matching legends."}
          </h3>
          <p>
            {savedOnly && !saved.length
              ? "Save a character with the heart on their archive card."
              : "Try a character name, an identity, or an ability."}
          </p>
          <button
            className="text-button"
            onClick={() => {
              setQuery("");
              setUniverse("all");
              setAlignment("all");
              setSavedOnly(false);
            }}
          >
            {savedOnly ? "Show all characters" : "Reset the archive"}{" "}
            <ArrowUpRight size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
