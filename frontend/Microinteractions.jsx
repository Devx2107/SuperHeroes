import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ease } from "./motion";
import Magnet from "./react-bits/Magnet";

export function RadialButton({ children, onClick, className = "", ...props }) {
  const ref = useRef(null),
    [ripple, setRipple] = useState(null);
  const origin = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 2;
    ref.current.style.setProperty("--origin-x", `${x}px`);
    ref.current.style.setProperty("--origin-y", `${y}px`);
    return { x, y };
  };
  return (
    <Magnet disabled={props.disabled}>
      <motion.button
        ref={ref}
        className={`radial-button ${className}`}
        onPointerEnter={origin}
        onClick={(event) => {
          setRipple({ ...origin(event), id: performance.now() });
          onClick?.(event);
        }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        <span className="button-fill" aria-hidden="true" />
        <span className="button-label">{children}</span>
        {ripple && (
          <motion.span
            key={ripple.id}
            className="shockwave"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 25, opacity: 0 }}
            transition={{ duration: 0.65, ease: ease.cinema }}
            onAnimationComplete={() => setRipple(null)}
            aria-hidden="true"
          />
        )}
      </motion.button>
    </Magnet>
  );
}
export function NavLink({ children, ...props }) {
  return (
    <a
      className="magnetic-nav"
      onPointerEnter={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--underline-origin",
          `${((event.clientX - rect.left) / rect.width) * 100}%`,
        );
      }}
      {...props}
    >
      {children}
      <span aria-hidden="true" />
    </a>
  );
}
const shapes = {
  storm: <path d="M22 2 8 22h11l-3 16 16-23H21Z" />,
  cyclops: (
    <>
      <path
        d="M4 12h32v11H4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M8 16h24v3H8ZM9 26l9 10h4l9-10Z" />
    </>
  ),
  jeangrey: (
    <>
      <path
        d="m20 2 5 10 13-5-10 16-8 15-8-15L2 7l13 5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="20" cy="18" r="4" />
    </>
  ),
  vision: (
    <>
      <path
        d="m20 2 13 17-13 19L7 19Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m20 8 5 8-5 7-5-7Z" />
    </>
  ),
  misterfantastic: (
    <>
      <circle
        cx="20"
        cy="20"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text x="20" y="29" textAnchor="middle" fontSize="28" fontWeight="800">
        4
      </text>
    </>
  ),
  cyborg: (
    <>
      <path
        d="M19 3H9L4 12v16l9 9h7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M23 5h9l5 10-5 20h-9V24h8v-9h-8Z" />
      <circle cx="12" cy="17" r="3" />
    </>
  ),
  zatanna: (
    <>
      <path d="m4 33 25-25 4 4L8 37Z" />
      <path d="m13 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2Zm19 17 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </>
  ),
  raven: (
    <path
      d="m20 3 5 9 13-8-5 18-13 15L7 22 2 4l13 8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  ),
  moonknight: <path d="M27 3a17 17 0 1 0 0 34A19 19 0 0 1 27 3Z" />,
  punisher: (
    <>
      <path
        d="M7 8 13 3h14l6 5v17l-7 3v10h-4V28h-4v10h-4V28l-7-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m10 14 8 3-2 6h-6Zm20 0-8 3 2 6h6Z" />
    </>
  ),
  ghostrider: (
    <>
      <path
        d="m9 24-4-8 6 3-1-14 8 8 6-11 3 15 8-5-3 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 23h16v9l-5 5h-6l-5-5Zm3 3v3h3v-3Zm7 0v3h3v-3Z"
        fillRule="evenodd"
      />
    </>
  ),
  catwoman: (
    <>
      <path
        d="M6 5 15 14h10l9-9-2 25-12 8L8 30Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m10 20 8 3-7 3Zm20 0-8 3 7 3Z" />
    </>
  ),
  ultron: (
    <>
      <path
        d="M8 4h24l4 19-10 14H14L4 23Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m9 14 9 4-2 3H9Zm22 0-9 4 2 3h7ZM13 27h14v4H13Z" />
    </>
  ),
  carnage: (
    <>
      <path
        d="m20 3 8 9 8-6-4 15 6 9-12-2-6 10-6-10-12 2 6-9L4 6l8 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m11 17 7 4-7 3Zm18 0-7 4 7 3Z" />
    </>
  ),
  bane: (
    <>
      <path
        d="M11 3h18l6 13-6 18-9 4-9-4-6-18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17 6h6v11h-6Zm-6 13h6v5h-6m12-5h6v5h-6M15 28h10v5H15Z" />
    </>
  ),
  brainiac: (
    <>
      <circle cx="20" cy="8" r="4" />
      <circle cx="8" cy="29" r="4" />
      <circle cx="32" cy="29" r="4" />
      <path
        d="M20 12v9L8 25m12-4 12 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  daredevil: (
    <>
      <path d="m8 11 2-8 5 8m10 0 5-8 2 8" />
      <text x="20" y="30" textAnchor="middle" fontSize="22" fontWeight="900">
        DD
      </text>
    </>
  ),
  blackwidow: <path d="M8 4h24L25 20l7 16H8l7-16Z" />,
  captainmarvel: (
    <path d="m20 2 5 12 13 1-10 9 3 14-11-8-11 8 3-14L2 15l13-1Z" />
  ),
  scarletwitch: (
    <path
      d="m3 7 9 9 8-11 8 11 9-9-6 25-11 5-11-5Zm8 14 3 8 6 3 6-3 3-8-9 4Z"
      fillRule="evenodd"
    />
  ),
  antman: (
    <>
      <path
        d="M11 14 7 3m22 11 4-11M9 18q11-16 22 0v13l-6 6H15l-6-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m11 19 7 4-7 4m18-8-7 4 7 4M16 30h8v3h-8Z" />
    </>
  ),
  greenarrow: (
    <>
      <path
        d="M20 3v32M8 16 20 3l12 13M20 30l-9-7m9 11 9-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M9 6q29 14 0 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </>
  ),
  shazam: <path d="M22 1 7 23h12l-3 16 17-23H21Z" />,
  deadpool: (
    <>
      <circle
        cx="20"
        cy="20"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M20 3v34M7 14l9 7-9 5Zm26 0-9 7 9 5Z" />
    </>
  ),
  venom: (
    <>
      <path d="m3 6 15 15-7 6-7-7Zm34 0L22 21l7 6 7-7Z" />
      <path
        d="m9 31 4 4 3-3 4 5 4-5 3 3 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  harleyquinn: (
    <path d="m10 8 7 10-7 10-7-10Zm20 0 7 10-7 10-7-10ZM20 23l7 8-7 8-7-8Z" />
  ),
  joker: (
    <>
      <rect
        x="7"
        y="3"
        width="26"
        height="34"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m11 12 6 3m6 0 6-3m-17 9q8 14 16 0m-14 4v5m4-3v5m4-5v5m4-7v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  lexluthor: (
    <>
      <path
        d="m20 2 16 10-6 23H10L4 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16 9v18h11v4H12V9Z" />
    </>
  ),
  darkseid: (
    <text x="20" y="32" textAnchor="middle" fontSize="37" fontWeight="900">
      Ω
    </text>
  ),
  deathstroke: (
    <>
      <path
        d="M20 3v34M8 10l12-7 12 7v18l-12 9-12-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M20 4 8 11v17l12 8Zm4 12h7v3h-7Z" />
    </>
  ),
  loki: (
    <path d="M6 3q-6 16 8 22v10h12V25Q40 19 34 3q-2 15-10 14l-4-9-4 9Q8 18 6 3Z" />
  ),
  thanos: (
    <>
      <path
        d="M11 35 7 20l5-6 3 5V5h5v12-14h5v14-10h5v12-7h5v16l-7 9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16 23h13v7H16Z" />
      <circle cx="12" cy="16" r="2" />
    </>
  ),
  doctordoom: (
    <>
      <path
        d="M20 2 7 10 4 30l9 7h14l9-7-3-20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M11 15h7v4h-7m11-4h7v4h-7M15 26h10v6H15Z" />
    </>
  ),
  magneto: (
    <>
      <path
        d="M7 34V17a13 13 0 0 1 26 0v17l-9-8V15h-8v11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M5 34h9m12 0h9" stroke="currentColor" strokeWidth="3" />
    </>
  ),
  greengoblin: (
    <>
      <path
        d="m4 4 10 7h12l10-7-4 20-12 13L8 24Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m10 15 7 5-7 3Zm20 0-7 5 7 3Zm-17 13h14l-7 5Z" />
    </>
  ),
  batman: (
    <path d="M3 12 8 7l2 6 5-3 3-6 2 3 2-3 3 6 5 3 2-6 5 5-3 8-7-2-7 9-7-9-7 2Z" />
  ),
  superman: (
    <>
      <path
        d="m3 10 7-6h20l7 6-17 23Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <text
        x="20"
        y="23"
        textAnchor="middle"
        fontSize="21"
        fontWeight="900"
        fill="currentColor"
      >
        S
      </text>
    </>
  ),
  spiderman: (
    <>
      <ellipse cx="20" cy="20" rx="3" ry="8" />
      <circle cx="20" cy="11" r="3" />
      <path
        d="m17 14-9-6-3 6m12 5-10-3-3 7m13 1-9 3-2 7m17-20 9-6 3 6m-12 5 10-3 3 7m-13 1 9 3 2 7m-9-9 6 8m-12-8-6 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </>
  ),
  thor: (
    <>
      <path d="M7 7h24v15H7Z" />
      <path d="M16 22h6v15h-6Z" />
      <path d="m31 4 4 5-4 2Z" />
    </>
  ),
  ironman: (
    <>
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" />
      <path
        d="m10 14 20 0-10 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
};
export function Emblem({ id, className = "" }) {
  return (
    <svg
      className={`emblem ${className}`}
      viewBox="0 0 40 40"
      aria-hidden="true"
      fill="currentColor"
    >
      {shapes[id] ||
        (id === "supergirl" ? (
          shapes.superman
        ) : (
          <>
            <path
              d="m20 3 15 8v15l-15 11L5 26V11Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="20"
              y="26"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
            >
              {id[0]?.toUpperCase()}
            </text>
          </>
        ))}
    </svg>
  );
}
export function SafeImage({ src, alt, className = "", fallback, ...props }) {
  return (
    <ImageAsset
      key={src}
      src={src}
      alt={alt}
      className={className}
      fallback={fallback}
      {...props}
    />
  );
}
function ImageAsset({ src, alt, className = "", fallback, ...props }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src)
    return (
      <div
        className={`image-fallback ${className}`}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        {fallback || (
          <span>
            {alt
              ?.split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
export function ActorFlipCard({ actor, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      className="actor-card"
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
      aria-label={`${actor.actor}: ${flipped ? "show portrait" : "reveal quote"}`}
    >
      <motion.div
        className="actor-flip"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: ease.cinema }}
      >
        <div className="actor-front">
          <SafeImage src={actor.image} alt={actor.actor} loading="lazy" />
          <div className="actor-caption">
            <span className="mono">0{index + 1} / ON SCREEN</span>
            <strong>{actor.actor}</strong>
            <ArrowUpRight size={18} />
          </div>
        </div>
        <div className="actor-back">
          <span className="mono">A DIFFERENT FACE. THE SAME LEGEND.</span>
          <blockquote>“{actor.quote}”</blockquote>
          <span>{actor.actor}</span>
          <span className="mono">CLICK TO RETURN ↗</span>
        </div>
      </motion.div>
    </button>
  );
}
