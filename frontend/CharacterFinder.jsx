import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { SafeImage, Emblem } from "./Microinteractions";

export default function CharacterFinder({ heroes, onSelect, onClose }) {
  const dialog = useRef(null),
    input = useRef(null);
  const [query, setQuery] = useState(""),
    [active, setActive] = useState(0);
  const matches = useMemo(
    () =>
      Object.values(heroes).filter((hero) =>
        [hero.name, hero.identity || "", hero.universe, ...hero.abilities]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [heroes, query],
  );
  const results = matches.slice(0, 8);
  useEffect(() => {
    const previous = document.activeElement,
      panel = dialog.current;
    panel.showModal();
    input.current.focus();
    return () => {
      panel.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const choose = (hero) => {
    onClose();
    onSelect(hero.id);
  };
  return (
    <dialog
      ref={dialog}
      className="character-finder"
      aria-label="Find a character"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
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
      <div className="finder-top">
        <span className="mono">THE MULTIVERSE, AT YOUR FINGERTIPS</span>
        <button
          className="icon-button"
          aria-label="Close character search"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>
      <label className="finder-input">
        <Search size={22} />
        <input
          ref={input}
          role="combobox"
          aria-label="Search all characters"
          aria-expanded="true"
          aria-controls="finder-results"
          aria-autocomplete="list"
          aria-activedescendant={
            results[active] ? `finder-${results[active].id}` : undefined
          }
          placeholder="A name. A power. A secret identity."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={(event) => {
            if (["ArrowDown", "ArrowUp"].includes(event.key)) {
              event.preventDefault();
              if (results.length)
                setActive(
                  (previous) =>
                    (previous +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      results.length) %
                    results.length,
                );
            }
            if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              choose(results[active]);
            }
          }}
        />
      </label>
      <div className="finder-summary mono" role="status">
        {matches.length} CHARACTERS{" "}
        {query ? "MATCH YOUR SEARCH" : "IN THE ARCHIVE"}
        <span>
          {matches.length > 8
            ? "TYPE TO NARROW THE FIELD"
            : "CHOOSE YOUR NEXT LEGEND"}
        </span>
      </div>
      <div
        id="finder-results"
        role="listbox"
        aria-label="Matching characters"
        className="finder-results"
      >
        {results.map((hero, index) => (
          <button
            type="button"
            role="option"
            id={`finder-${hero.id}`}
            key={hero.id}
            aria-selected={active === index}
            className="finder-result"
            onPointerMove={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => choose(hero)}
          >
            <SafeImage
              src={hero.image}
              alt=""
              fallback={<Emblem id={hero.id} />}
            />
            <span>
              <strong>{hero.name}</strong>
              <small>{hero.identity || hero.title}</small>
            </span>
            <span className={`finder-type ${hero.alignment}`}>
              {hero.alignment}
            </span>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      {!results.length && (
        <div className="finder-empty">
          <Emblem id="unknown" />
          <h2>No signals found.</h2>
          <p>Try a character name, identity, or power.</p>
          <button
            className="text-button"
            onClick={() => {
              setQuery("");
              input.current.focus();
            }}
          >
            Clear search <X size={13} />
          </button>
        </div>
      )}
      <div className="finder-footer mono">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> TO EXPLORE
        </span>
        <span>
          <kbd>ENTER</kbd> OPEN DOSSIER
        </span>
        <span>
          <kbd>ESC</kbd> CLOSE
        </span>
      </div>
    </dialog>
  );
}
