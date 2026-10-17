import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowLeftRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Link,
  Trophy,
  Vote,
  X,
} from "lucide-react";
import { Emblem, RadialButton, SafeImage } from "./Microinteractions";
import { ease, featuredIds } from "./motion";
import { quizQuestions, triviaDecks } from "./challenges.json";
import {
  emptyQuizProgress,
  readQuizProgress,
  saveQuizProgress,
} from "./quiz-progress";
import { requestVotes } from "./vote-api";
import RadarChart from "./RadarChart";
import DecryptedText from "./react-bits/DecryptedText";
import { readTriviaRecord, saveTriviaRecord } from "./trivia-records";
import "./features.css";

const pageDetails = {
  battle: [
    "01 / THE ARENA",
    "WHEN LEGENDS",
    "COLLIDE.",
    "Set the matchup. Read the strengths. Decide who deserves the last word.",
  ],
  quiz: [
    "02 / YOUR ORIGIN STORY",
    "EVERY HERO",
    "STARTS WITH YOU.",
    "Twenty choices. Seven instincts. Discover the legend that thinks like you.",
  ],
  trivia: [
    "03 / TEST YOUR KNOWLEDGE",
    "KNOW YOUR",
    "LEGENDS?",
    "Beyond the mask, beyond the movies. Put your universe knowledge to the test.",
  ],
  votes: [
    "04 / THE PEOPLE’S CHOICE",
    "GREATNESS IS",
    "YOUR CALL.",
    "The stories are theirs. The decision is yours. Cast your vote for your favorite legend.",
  ],
};
const number = (value) => String(value).padStart(2, "0");
const characterTypes = {
  hero: "Heroes",
  antihero: "Antiheroes",
  villain: "Villains",
};
function CharacterOptions({ characters }) {
  return Object.entries(characterTypes).map(([type, label]) => {
    const options = characters.filter(
      (item) => (item.alignment || "hero") === type,
    );
    return options.length ? (
      <optgroup key={type} label={label}>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </optgroup>
    ) : null;
  });
}
const traits = {
  leader: "Leadership",
  scholar: "Intellect",
  rebel: "Defiance",
  heart: "Compassion",
  speedster: "Instinct",
  mystic: "Intuition",
  feral: "Tenacity",
};
const entryMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.32, ease: ease.cinema },
};

function FeatureIntro({ page, reduced }) {
  const [tag, first, second, copy] = pageDetails[page];
  return (
    <div className="feature-intro">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="eyebrow"
      >
        <span className="tiny-rule" />
        <DecryptedText text={tag} />
      </motion.div>
      <h1 tabIndex={-1}>
        {[first, second].map((line, index) => (
          <span className="feature-title-clip" key={line}>
            <motion.span
              initial={reduced ? false : { y: "110%", rotate: 2 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 0.95,
                delay: index * 0.12,
                ease: ease.cinema,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <div className="feature-intro-aside">
        <span className="mono">
          <span className="status-light" /> THE LEGEND CONTINUES
        </span>
        <p>{copy}</p>
        <span className="intro-cross" aria-hidden="true">
          +
        </span>
      </div>
    </div>
  );
}

function ThemePicker({ heroes, hero, onSelect }) {
  return (
    <div className="feature-picker">
      <span className="mono">
        YOUR LEGEND <ArrowRight size={13} />
      </span>
      <div className="feature-picker-tabs" aria-label="Featured heroes">
        {featuredIds.map((id) => (
          <button
            key={id}
            data-picker-hero={id}
            className={hero.id === id ? "active" : ""}
            aria-pressed={hero.id === id}
            onClick={() => onSelect(id)}
          >
            <Emblem id={id} />
            <span>{heroes[id].name}</span>
          </button>
        ))}
      </div>
      <label className="feature-select">
        <span className="sr-only">Choose your hero</span>
        <select
          id="heroPicker"
          value={hero.id}
          onChange={(event) => onSelect(event.target.value)}
        >
          <CharacterOptions characters={Object.values(heroes)} />
        </select>
      </label>
    </div>
  );
}

function Portrait({ hero, side, children }) {
  return (
    <div className={`arena-portrait ${side}`}>
      <AnimatePresence mode="wait">
        <motion.div className="arena-art" key={hero.id} {...entryMotion}>
          <SafeImage key={hero.image} src={hero.image} alt={hero.name} />
        </motion.div>
      </AnimatePresence>
      <div className="arena-art-shade" />
      <span className="mono portrait-side">
        {side === "challenger" ? "01 / CHALLENGER" : "02 / OPPONENT"}
      </span>
      <div className="portrait-caption">
        <span className="mono">{hero.universe} UNIVERSE</span>
        <h2>{hero.name}</h2>
        <p>{hero.title}</p>
        {children}
      </div>
    </div>
  );
}

const battleStyles = {
  balanced: {
    label: "Balanced",
    copy: "All six attributes carry equal weight.",
    weights: {},
  },
  tactical: {
    label: "Tactical",
    copy: "Intelligence and combat count twice. Every other attribute counts once.",
    weights: { intelligence: 2, combat: 2 },
  },
  powerhouse: {
    label: "Powerhouse",
    copy: "Strength, durability, and power count twice. Every other attribute counts once.",
    weights: { strength: 2, durability: 2, power: 2 },
  },
};
function BattleArena({ heroes, hero, reduced, onSelect }) {
  const [opponentId, setOpponentId] = useState(() => {
    const id = new URLSearchParams(location.search).get("opponent");
    return heroes[id] ? id : hero.id === "superman" ? "batman" : "superman";
  });
  const [style, setStyle] = useState(() => {
    const value = new URLSearchParams(location.search).get("mode");
    return Object.hasOwn(battleStyles, value) ? value : "balanced";
  });
  const [shareLink, setShareLink] = useState(""),
    [shareStatus, setShareStatus] = useState("");
  const [compared, setCompared] = useState(false);
  const candidates = Object.values(heroes).filter(
    (item) => item.id !== hero.id,
  );
  const opponent =
    heroes[opponentId === hero.id ? candidates[0].id : opponentId];
  useEffect(() => {
    setCompared(false);
    setShareLink("");
    setShareStatus("");
  }, [hero.id, opponent.id, style]);
  useEffect(() => {
    const url = new URL(location.href);
    url.searchParams.set("hero", hero.id);
    url.searchParams.set("opponent", opponent.id);
    url.searchParams.set("mode", style);
    history.replaceState(
      { ...history.state, opponent: opponent.id, battleStyle: style },
      "",
      url,
    );
  }, [hero.id, opponent.id, style]);
  useEffect(() => {
    const sync = (event) => {
      const query = new URLSearchParams(location.search);
      // A parent history listener may render before this one. The event snapshot
      // retains the destination matchup even if that render updates the URL.
      const id = event.state?.opponent || query.get("opponent");
      setOpponentId(heroes[id] ? id : "superman");
      const mode = event.state?.battleStyle || query.get("mode");
      setStyle(Object.hasOwn(battleStyles, mode) ? mode : "balanced");
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [heroes]);
  const stats = Object.keys(hero.comparison);
  const total = (item) =>
    Object.entries(item.comparison).reduce(
      (sum, [stat, value]) =>
        sum + value * (battleStyles[style].weights[stat] || 1),
      0,
    );
  const leftTotal = total(hero),
    rightTotal = total(opponent);
  const winner =
    leftTotal === rightTotal ? null : leftTotal > rightTotal ? hero : opponent;
  const edges = winner
    ? stats
        .filter(
          (stat) =>
            winner.comparison[stat] >
            (winner === hero ? opponent : hero).comparison[stat],
        )
        .sort((a, b) => winner.comparison[b] - winner.comparison[a])
        .slice(0, 2)
    : [];
  const randomize = () => {
    const options = candidates.filter((item) => item.id !== opponent.id);
    setOpponentId(options[Math.floor(Math.random() * options.length)].id);
  };
  const share = async () => {
    const url = location.href;
    setShareLink(url);
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("Matchup link copied.");
    } catch {
      setShareStatus("Copy the matchup link below.");
    }
  };
  return (
    <section className="arena-workspace" aria-label="Hero comparison">
      <div className="arena-matchup">
        <Portrait hero={hero} side="challenger" />
        <div className="arena-versus">
          <span className="mono">THE MATCHUP</span>
          <span className="versus-word">
            VS<span>.</span>
          </span>
          <div className="arena-rings" aria-hidden="true" />
          <span className="mono">
            TWO LEGENDS.
            <br />
            ONE CONVERSATION.
          </span>
        </div>
        <Portrait hero={opponent} side="opponent">
          <label className="opponent-select">
            <span className="sr-only">Choose opponent</span>
            <select
              id="battleOpponent"
              value={opponent.id}
              onChange={(event) => setOpponentId(event.target.value)}
            >
              <CharacterOptions characters={candidates} />
            </select>
            <ChevronRight size={16} />
          </label>
        </Portrait>
      </div>
      <div className="arena-console">
        <div className="battle-style-row">
          <div
            className="difficulty-switch"
            role="group"
            aria-label="Battle style"
          >
            {Object.entries(battleStyles).map(([id, item]) => (
              <button
                key={id}
                aria-pressed={style === id}
                className={style === id ? "active" : ""}
                onClick={() => setStyle(id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p>{battleStyles[style].copy}</p>
        </div>
        <div className="console-heading">
          <span className="eyebrow">
            <span className="tiny-rule" />
            TALE OF THE TAPE
          </span>
          <span className="mono muted">ARCHIVE RATINGS / 100</span>
        </div>
        <div className="comparison-grid">
          {stats.map((stat) => (
            <div className="comparison-stat" key={stat}>
              <div>
                <strong>{hero.comparison[stat]}</strong>
                <span className="mono">{stat}</span>
                <strong>{opponent.comparison[stat]}</strong>
              </div>
              <div className="comparison-tracks">
                <div>
                  <motion.i
                    key={`${hero.id}-${stat}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${hero.comparison[stat]}%` }}
                    transition={{ duration: reduced ? 0 : 0.8 }}
                  />
                </div>
                <div>
                  <motion.i
                    key={`${opponent.id}-${stat}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${opponent.comparison[stat]}%` }}
                    transition={{ duration: reduced ? 0 : 0.8 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="arena-analysis">
          <RadarChart left={hero} right={opponent} />
          <div className="arena-insights">
            <span className="eyebrow">THE SHAPE OF A LEGEND</span>
            <h3>
              Different strengths.
              <br />
              <em>Same ambition.</em>
            </h3>
            <div className="radar-legend">
              <span>
                <i />
                {hero.name}
              </span>
              <span>
                <i />
                {opponent.name}
              </span>
            </div>
            <div className="attribute-edges">
              {[hero, opponent].map((item, i) => (
                <div key={item.id}>
                  <strong>
                    {
                      stats.filter(
                        (stat) =>
                          item.comparison[stat] >
                          (i === 0 ? opponent : hero).comparison[stat],
                      ).length
                    }
                    <small> / 6</small>
                  </strong>
                  <span className="mono">
                    ATTRIBUTES LED BY {item.name.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
            <p>
              Radar shows the original ratings. Battle style changes how those
              ratings contribute to the verdict.
            </p>
          </div>
        </div>
        <div className="arena-actions">
          <RadialButton
            className="feature-primary"
            onClick={() => setCompared(true)}
          >
            Compare legends <ArrowUpRight size={16} />
          </RadialButton>
          <button className="text-action" onClick={randomize}>
            <Shuffle size={15} /> Random opponent
          </button>
          <button
            className="text-action"
            onClick={() => {
              setOpponentId(hero.id);
              onSelect(opponent.id);
            }}
          >
            <ArrowLeftRight size={15} /> Swap sides
          </button>
          <button className="text-action" onClick={share}>
            <Link size={14} /> Share matchup
          </button>
          <button
            className="text-action"
            onClick={() => {
              setOpponentId(hero.id === "superman" ? "batman" : "superman");
              setCompared(false);
              setStyle("balanced");
            }}
          >
            <RotateCcw size={14} /> Reset
          </button>
          <p className="mono muted">SIX ATTRIBUTES. ENDLESS DEBATE.</p>
        </div>
        {shareLink && (
          <div className="matchup-share">
            <label htmlFor="matchupLink" className="mono" role="status">
              {shareStatus || "MATCHUP LINK"}
            </label>
            <input
              id="matchupLink"
              aria-label="Matchup link"
              value={shareLink}
              readOnly
              onFocus={(event) => event.target.select()}
            />
          </div>
        )}
        <AnimatePresence>
          {compared && (
            <motion.div
              className="comparison-verdict"
              role="status"
              {...entryMotion}
            >
              <Trophy size={24} />
              <div>
                <span className="mono">
                  {leftTotal} : {rightTotal} /{" "}
                  {style === "balanced"
                    ? "COMBINED RATING"
                    : `${battleStyles[style].label.toUpperCase()} RATING`}
                </span>
                <h3>
                  {winner
                    ? `${winner.name} has the edge.`
                    : "A perfectly matched rivalry."}
                </h3>
                <p>
                  {winner
                    ? `The archive favors ${winner.name}, with advantages in ${edges.join(" and ")}.`
                    : `Both legends share the same ${style === "balanced" ? "combined" : battleStyles[style].label.toLowerCase()} rating.`}{" "}
                  Ratings are an editorial comparison; the story is yours to
                  debate.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Progress({ value, total, label }) {
  return (
    <div className="challenge-progress">
      <div className="mono">
        <span>{label}</span>
        <span>
          {number(value)} / {number(total)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
      >
        <motion.i
          animate={{ width: `${(value / total) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

function AnswerChoices({
  options,
  selected,
  onSelect,
  locked = false,
  correct,
  reveal = false,
}) {
  return (
    <div className="answer-choices" role="group" aria-label="Answer choices">
      {options.map((option, index) => {
        const status = reveal
          ? index === correct
            ? "correct"
            : index === selected
              ? "incorrect"
              : ""
          : "";
        return (
          <button
            className={`answer-choice ${selected === index ? "selected" : ""} ${status}`}
            key={option}
            onClick={() => onSelect(index)}
            disabled={locked}
            aria-pressed={selected === index}
          >
            <span className="answer-letter mono">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{option}</span>
            {status === "correct" ? (
              <Check size={17} />
            ) : status === "incorrect" ? (
              <X size={17} />
            ) : (
              <ArrowUpRight className="answer-arrow" size={16} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function answerShortcut(event, choose) {
  if (
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.repeat ||
    event.target.closest("input, select, textarea, [contenteditable=true]")
  )
    return;
  const key = event.key.toLowerCase();
  const index = /^[1-4]$/.test(key)
    ? Number(key) - 1
    : ["a", "b", "c", "d"].indexOf(key);
  if (index >= 0) {
    event.preventDefault();
    choose(index);
  }
}

function AlignmentQuiz({ heroes, hero }) {
  const headingRef = useRef(null);
  const focusHeading = (definition) => {
    if (definition.opacity === 1)
      headingRef.current?.focus({ preventScroll: true });
  };
  const [progress, setProgress] = useState(readQuizProgress);
  const { answers, index, complete } = progress;
  const [resumed, setResumed] = useState(() => answers.length > 0);
  const [canSave, setCanSave] = useState(true);
  const setAnswers = (update) =>
    setProgress((previous) => ({
      ...previous,
      answers: update(previous.answers),
    }));
  const setIndex = (value) =>
    setProgress((previous) => ({ ...previous, index: value }));
  const setComplete = (value) =>
    setProgress((previous) => ({ ...previous, complete: value }));
  useEffect(() => {
    setCanSave(saveQuizProgress(progress));
  }, [progress]);
  const totals = useMemo(
    () =>
      answers.reduce((scores, answer, question) => {
        if (answer == null) return scores;
        Object.entries(quizQuestions[question].answers[answer].weights).forEach(
          ([trait, value]) => (scores[trait] = (scores[trait] || 0) + value),
        );
        return scores;
      }, {}),
    [answers],
  );
  const rankings = Object.values(heroes)
    .filter((item) => item.alignment !== "villain")
    .map((item) => ({
      hero: item,
      score: Object.entries(totals).reduce(
        (sum, [trait, value]) => sum + value * (item.quizAffinity[trait] || 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  const question = quizQuestions[index];
  const choose = (answer) =>
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = answer;
      return next;
    });
  const strongest = Object.keys(traits)
    .sort((a, b) => (totals[b] || 0) - (totals[a] || 0))
    .slice(0, 2);
  const allAnswered = quizQuestions.every((_, i) => answers[i] != null);
  const restart = () => {
    setProgress(emptyQuizProgress());
    setResumed(false);
  };
  const maxTrait = Math.max(1, ...Object.values(totals));
  return (
    <div className="challenge-layout quiz-layout">
      <section className="challenge-panel" aria-label="Hero alignment quiz">
        <Progress
          value={complete ? quizQuestions.length : index}
          total={quizQuestions.length}
          label={complete ? "ORIGIN STORY COMPLETE" : "YOUR ORIGIN STORY"}
        />
        <div className="quiz-progress-note mono">
          <span role="status">
            {!canSave
              ? "PROGRESS AVAILABLE IN THIS TAB"
              : resumed
                ? "YOUR STORY, RESUMED."
                : answers.length
                  ? "PROGRESS SAVED ON THIS BROWSER"
                  : "20 CHOICES / NO WRONG ANSWERS"}
          </span>
          {!complete && answers.length > 0 && (
            <button onClick={restart}>
              Start over <RotateCcw size={11} />
            </button>
          )}
        </div>
        <AnimatePresence mode="wait">
          {complete ? (
            <motion.div
              key="result"
              className="quiz-result"
              {...entryMotion}
              onAnimationComplete={focusHeading}
            >
              <span className="eyebrow">
                <CheckCircle2 size={16} />
                YOUR CLOSEST ALIGNMENT
              </span>
              <h2 ref={headingRef} tabIndex={-1}>
                {rankings[0].hero.name}
              </h2>
              <p>{rankings[0].hero.subtitle}</p>
              <p className="alignment-insight">
                Your choices lean toward{" "}
                <strong>{traits[strongest[0]].toLowerCase()}</strong> and{" "}
                <strong>{traits[strongest[1]].toLowerCase()}</strong>. These
                instincts shape your closest alignment.
              </p>
              <a
                className="feature-primary feature-link"
                href={`heroes.html?hero=${rankings[0].hero.id}`}
              >
                Meet your legend <ArrowUpRight size={17} />
              </a>
              <button className="text-action" onClick={restart}>
                <RotateCcw size={15} /> Discover again
              </button>
              <div className="runner-up">
                <span className="mono muted">
                  YOU ALSO SHARE INSTINCTS WITH
                </span>
                <div className="runner-up-links">
                  {rankings.slice(1, 3).map(({ hero: item }) => (
                    <a key={item.id} href={`heroes.html?hero=${item.id}`}>
                      <SafeImage src={item.image} alt="" />
                      <strong>{item.name}</strong>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
                <p>
                  Matched from your seven trait scores and the archive’s hero
                  profiles.
                </p>
              </div>
              <details className="answer-review quiz-review">
                <summary>
                  Review your {quizQuestions.length} choices{" "}
                  <span className="mono">EDIT YOUR STORY</span>
                </summary>
                <ol>
                  {quizQuestions.map((item, i) => (
                    <li key={item.prompt}>
                      <span className="mono">{number(i + 1)} / THE CHOICE</span>
                      <h4>{item.prompt}</h4>
                      <p>{item.answers[answers[i]].label}</p>
                      <button
                        className="text-action"
                        aria-label={`Edit answer ${i + 1}`}
                        onClick={() =>
                          setProgress((previous) => ({
                            ...previous,
                            index: i,
                            complete: false,
                          }))
                        }
                      >
                        Edit this choice <ArrowUpRight size={13} />
                      </button>
                    </li>
                  ))}
                </ol>
              </details>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              className="question-content"
              {...entryMotion}
              onAnimationComplete={focusHeading}
              onKeyDown={(event) => answerShortcut(event, choose)}
            >
              <span className="mono question-label">
                THE CHOICE / {number(index + 1)}
              </span>
              <h2 ref={headingRef} tabIndex={-1}>
                {question.prompt}
              </h2>
              <AnswerChoices
                options={question.answers.map((answer) => answer.label)}
                selected={answers[index]}
                onSelect={choose}
              />
              <p className="keyboard-hint mono">
                1–4 OR A–D TO CHOOSE / TAB + ENTER TO CONTINUE
              </p>
              <div className="question-actions">
                <button
                  className="text-action"
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                >
                  <ArrowLeft size={15} /> Previous
                </button>
                <RadialButton
                  className="feature-primary"
                  disabled={answers[index] == null}
                  onClick={() =>
                    index === quizQuestions.length - 1
                      ? setComplete(true)
                      : setIndex(index + 1)
                  }
                >
                  {index === quizQuestions.length - 1
                    ? "Reveal my legend"
                    : "Next choice"}
                  <ArrowRight size={16} />
                </RadialButton>
              </div>
              {allAnswered && (
                <button
                  className="text-action question-return"
                  onClick={() => setComplete(true)}
                >
                  Update my result <ArrowUpRight size={14} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <aside
        className={`instinct-panel ${complete ? "result-art-panel" : ""}`}
        aria-label="Your instincts"
      >
        {complete ? (
          <>
            <SafeImage
              key={rankings[0].hero.id}
              src={rankings[0].hero.image}
              alt={rankings[0].hero.name}
              style={
                rankings[0].hero.id === "superman"
                  ? { objectPosition: "76% 25%" }
                  : undefined
              }
            />
            <div className="result-art-caption">
              <span className="mono">
                YOUR LEGEND / {rankings[0].hero.universe}
              </span>
              <h3>{rankings[0].hero.name}</h3>
            </div>
          </>
        ) : (
          <>
            <div className="instinct-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
              <Emblem id={hero.id} />
            </div>
            <span className="eyebrow">THE HERO WITHIN</span>
            <h3>
              Instincts become
              <br />
              <em>identity.</em>
            </h3>
            <p>There are no wrong answers. Choose what feels like you.</p>
            <div className="trait-list">
              {Object.entries(traits).map(([key, label]) => (
                <div key={key}>
                  <span className="mono">{label}</span>
                  <div>
                    <motion.i
                      animate={{
                        width: `${((totals[key] || 0) / maxTrait) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <span className="mono muted">
              {answers.filter((value) => value != null).length} CHOICES MADE / 7
              INSTINCTS EXPLORED
            </span>
          </>
        )}
      </aside>
    </div>
  );
}

const limits = { easy: 18, medium: 14, hard: 10 };
const pointValues = { easy: 1, medium: 2, hard: 3 };
function shuffledDeck(difficulty, shuffle) {
  const deck = [...triviaDecks[difficulty]];
  if (shuffle)
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  return deck;
}
function TriviaRound({
  difficulty,
  onDifficulty,
  mode,
  onMode,
  shuffle,
  onShuffle,
}) {
  const [deck, setDeck] = useState(() => shuffledDeck(difficulty, shuffle));
  const limit = limits[difficulty],
    practice = mode === "practice";
  const [record, setRecord] = useState(() =>
    readTriviaRecord(difficulty, mode),
  );
  const recordRef = useRef(record);
  const [recordOutcome, setRecordOutcome] = useState(null);
  const [index, setIndex] = useState(0),
    [responses, setResponses] = useState([]),
    [complete, setComplete] = useState(false);
  const [remaining, setRemaining] = useState(limit),
    [paused, setPaused] = useState(false),
    [started, setStarted] = useState(false),
    [hidden, setHidden] = useState(document.hidden);
  const secondsLeft = useRef(limit),
    lastTick = useRef(0);
  const response = responses[index],
    answered = response !== undefined;
  const questionRef = useRef(null);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    secondsLeft.current = limit;
    setRemaining(limit);
  }, [index, limit, started]);
  useEffect(() => {
    if (practice || !started || paused || hidden || answered || complete)
      return;
    lastTick.current = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      secondsLeft.current = Math.max(
        0,
        secondsLeft.current - (now - lastTick.current) / 1000,
      );
      lastTick.current = now;
      setRemaining(Math.ceil(secondsLeft.current));
      if (secondsLeft.current === 0) {
        setResponses((previous) => {
          if (previous[index] !== undefined) return previous;
          const next = [...previous];
          next[index] = null;
          return next;
        });
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [practice, started, paused, hidden, answered, complete, index]);
  const question = deck[index];
  const correctCount = responses.filter(
    (answer, i) => answer === deck[i].answer,
  ).length;
  let streak = 0,
    bestStreak = 0;
  responses.forEach((answer, i) => {
    streak = answer === deck[i].answer ? streak + 1 : 0;
    bestStreak = Math.max(bestStreak, streak);
  });
  const accuracy = responses.length
    ? Math.round((correctCount / responses.length) * 100)
    : 0;
  const score = correctCount * pointValues[difficulty];
  useEffect(() => {
    if (!complete) return;
    const outcome = saveTriviaRecord(
      difficulty,
      mode,
      {
        score,
        accuracy,
        streak: bestStreak,
      },
      recordRef.current,
    );
    recordRef.current = outcome.record;
    setRecord(outcome.record);
    setRecordOutcome(outcome);
  }, [complete, difficulty, mode, score, accuracy, bestStreak]);
  const restart = () => {
    setDeck(shuffledDeck(difficulty, shuffle));
    setIndex(0);
    setResponses([]);
    setComplete(false);
    setPaused(false);
    setStarted(false);
    setRecordOutcome(null);
    secondsLeft.current = limit;
    setRemaining(limit);
  };
  const selectAnswer = (answer) => {
    if (!answered && started && !paused && !hidden)
      setResponses((previous) => {
        if (previous[index] !== undefined) return previous;
        const next = [...previous];
        next[index] = answer;
        return next;
      });
  };
  return (
    <div className="challenge-layout trivia-layout">
      <section className="challenge-panel" aria-label="Trivia challenge">
        <div className="trivia-toolbar">
          <div
            className="difficulty-switch"
            role="group"
            aria-label="Difficulty"
          >
            {Object.keys(limits).map((level) => (
              <button
                key={level}
                className={level === difficulty ? "active" : ""}
                aria-pressed={level === difficulty}
                onClick={() => onDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <span className="mono muted">
            {practice ? "PRACTICE / NO TIMER" : `${limit} SEC / QUESTION`}
          </span>
        </div>
        {(!started || complete) && (
          <div className="trivia-options">
            <div
              className="difficulty-switch"
              role="group"
              aria-label="Round mode"
            >
              {["timed", "practice"].map((value) => (
                <button
                  key={value}
                  aria-pressed={mode === value}
                  className={mode === value ? "active" : ""}
                  onClick={() => onMode(value)}
                >
                  {value === "timed" ? "Timed challenge" : "Practice"}
                </button>
              ))}
            </div>
            <button
              className={`shuffle-toggle ${shuffle ? "active" : ""}`}
              aria-pressed={shuffle}
              onClick={() => onShuffle(!shuffle)}
            >
              <Shuffle size={13} /> Shuffle questions{" "}
              {shuffle && <Check size={12} />}
            </button>
          </div>
        )}
        <Progress
          value={complete ? deck.length : index}
          total={deck.length}
          label={complete ? "ROUND COMPLETE" : "THE KNOWLEDGE TEST"}
        />
        <AnimatePresence mode="wait">
          {complete ? (
            <motion.div
              className="trivia-summary"
              key="summary"
              {...entryMotion}
            >
              <Trophy size={40} />
              <span className="eyebrow">THE FINAL CHAPTER</span>
              {recordOutcome?.improved && (
                <span className="record-badge mono">
                  <Trophy size={12} />{" "}
                  {recordOutcome.saved
                    ? "NEW PERSONAL BEST"
                    : "PERSONAL BEST / THIS TAB"}
                </span>
              )}
              <h2>
                {accuracy >= 80
                  ? "Legendary knowledge."
                  : accuracy >= 50
                    ? "A worthy contender."
                    : "Every legend starts somewhere."}
              </h2>
              <p>
                You answered {correctCount} of {deck.length} correctly on{" "}
                {difficulty} in{" "}
                {practice ? "practice mode" : "a timed challenge"}. Your longest
                streak was {bestStreak}.
              </p>
              <RadialButton className="feature-primary" onClick={restart}>
                Play another round <RotateCcw size={16} />
              </RadialButton>
              {correctCount < deck.length && (
                <details className="answer-review trivia-review">
                  <summary>
                    Revisit {deck.length - correctCount} missed{" "}
                    {deck.length - correctCount === 1
                      ? "question"
                      : "questions"}
                  </summary>
                  <ol>
                    {deck.map((item, i) =>
                      responses[i] === item.answer ? null : (
                        <li key={item.question}>
                          <span className="mono">
                            {number(i + 1)} /{" "}
                            {responses[i] === null
                              ? "TIME EXPIRED"
                              : "MISSED QUESTION"}
                          </span>
                          <h4>{item.question}</h4>
                          <p className="review-picked">
                            Your answer:{" "}
                            {responses[i] === null
                              ? "No answer"
                              : item.choices[responses[i]]}
                          </p>
                          <p className="review-correct">
                            <Check size={13} /> {item.choices[item.answer]}
                          </p>
                          <p>{item.explanation}</p>
                        </li>
                      ),
                    )}
                  </ol>
                </details>
              )}
            </motion.div>
          ) : !started ? (
            <motion.div className="trivia-start" key="start" {...entryMotion}>
              <span className="mono question-label">CHOOSE YOUR CHALLENGE</span>
              <h2>
                A universe of stories.
                <br />
                How many do you know?
              </h2>
              <p>
                {deck.length} questions.{" "}
                {practice
                  ? "Take your time with every answer."
                  : `${limit} seconds per answer.`}{" "}
                Earn {pointValues[difficulty]}{" "}
                {pointValues[difficulty] === 1 ? "point" : "points"} for every
                correct choice.{" "}
                {practice
                  ? "Learn from each explanation. Practice records are kept separately."
                  : "The clock pauses when this tab is hidden."}{" "}
                {shuffle
                  ? "Question order is shuffled for each round."
                  : "Questions follow the archive order."}
              </p>
              <RadialButton
                className="feature-primary"
                onClick={() => setStarted(true)}
              >
                Start the challenge <ArrowRight size={17} />
              </RadialButton>
            </motion.div>
          ) : (
            <motion.div
              className="question-content"
              key={index}
              onKeyDown={(event) => answerShortcut(event, selectAnswer)}
              {...entryMotion}
              onAnimationComplete={(definition) => {
                if (definition.opacity === 1)
                  questionRef.current?.focus({ preventScroll: true });
              }}
            >
              <span className="mono question-label">
                THE QUESTION / {number(index + 1)}
              </span>
              <h2 ref={questionRef} tabIndex={-1}>
                {question.question}
              </h2>
              <AnswerChoices
                options={question.choices}
                selected={response}
                correct={question.answer}
                reveal={answered}
                locked={answered || paused || hidden}
                onSelect={selectAnswer}
              />
              <p className="keyboard-hint mono">1–4 OR A–D TO CHOOSE</p>
              <div className="trivia-feedback" role="status">
                {answered ? (
                  <>
                    <strong>
                      {response === null
                        ? "Time’s up."
                        : response === question.answer
                          ? "That’s the legend."
                          : "A twist in the story."}
                    </strong>
                    <p>{question.explanation}</p>
                  </>
                ) : (
                  <p>
                    {paused || hidden
                      ? "Clock paused. Resume when you’re ready."
                      : practice
                        ? "Take your time. Choose an answer to reveal the story."
                        : "Choose your answer before the clock runs out."}
                  </p>
                )}
              </div>
              <div className="question-actions">
                <button className="text-action" onClick={restart}>
                  <RotateCcw size={14} /> Restart round
                </button>
                {answered ? (
                  <RadialButton
                    className="feature-primary"
                    onClick={() => {
                      setPaused(false);
                      index === deck.length - 1
                        ? setComplete(true)
                        : setIndex(index + 1);
                    }}
                  >
                    {index === deck.length - 1
                      ? "See my results"
                      : "Next question"}
                    <ArrowRight size={16} />
                  </RadialButton>
                ) : !practice ? (
                  <button
                    className="text-action"
                    onClick={() => setPaused(!paused)}
                  >
                    {paused ? <Play size={15} /> : <Pause size={15} />}
                    {paused ? "Resume clock" : "Pause clock"}
                  </button>
                ) : (
                  <span className="mono muted practice-note">
                    NO CLOCK. JUST CURIOSITY.
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <aside className="trivia-scoreboard" aria-label="Round statistics">
        <span className="eyebrow">
          <span className="tiny-rule" />
          {practice ? "ROOM TO DISCOVER" : "ON THE CLOCK"}
        </span>
        <div
          className={`timer-dial ${!practice && remaining <= 5 && started && !answered ? "urgent" : ""} ${practice ? "practice-dial" : ""}`}
          style={{ "--timer-progress": `${(remaining / limit) * 360}deg` }}
        >
          <div>
            <strong
              aria-label={
                complete
                  ? "Round complete"
                  : practice
                    ? "Unlimited time"
                    : `${remaining} seconds remaining`
              }
            >
              {complete ? "—" : practice ? "∞" : number(remaining)}
            </strong>
            <span className="mono">
              {complete
                ? "ROUND COMPLETE"
                : practice
                  ? "NO TIME LIMIT"
                  : paused || hidden
                    ? "PAUSED"
                    : answered
                      ? "ANSWER LOCKED"
                      : !started
                        ? "SECONDS / ANSWER"
                        : "SECONDS REMAINING"}
            </span>
          </div>
        </div>
        <div className="score-metrics">
          <div>
            <span className="mono">TOTAL SCORE</span>
            <strong>
              {number(correctCount * pointValues[difficulty])}
              <small> / {deck.length * pointValues[difficulty]}</small>
            </strong>
          </div>
          <div>
            <span className="mono">
              {complete ? "BEST STREAK" : "CURRENT STREAK"}
            </span>
            <strong>{number(complete ? bestStreak : streak)}</strong>
          </div>
          <div>
            <span className="mono">ACCURACY</span>
            <strong>
              {accuracy}
              <small>%</small>
            </strong>
          </div>
        </div>
        <div className="personal-best">
          <span className="mono">
            YOUR BEST / {difficulty.toUpperCase()} / {mode.toUpperCase()}
          </span>
          <strong>
            {record ? `${number(record.score)} POINTS` : "A NEW STORY"}
          </strong>
          <span className="mono muted">
            {record
              ? `${record.accuracy}% ACCURACY · ${record.streak} BEST STREAK`
              : "FINISH A ROUND TO SET YOUR RECORD"}
          </span>
        </div>
        <p>
          {practice
            ? "Stay curious. Learn the stories."
            : "Think fast. Trust what you know."}
          <br />
          The next chapter is one answer away.
        </p>
      </aside>
    </div>
  );
}

function TriviaChallenge() {
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed"),
    [shuffle, setShuffle] = useState(false);
  return (
    <TriviaRound
      key={`${difficulty}-${mode}-${shuffle}`}
      difficulty={difficulty}
      onDifficulty={setDifficulty}
      mode={mode}
      onMode={setMode}
      shuffle={shuffle}
      onShuffle={setShuffle}
    />
  );
}

const ballotIds = [
  "ironman",
  "thor",
  "blackpanther",
  "flash",
  "wolverine",
  "other",
];
const voteKey = "legendrium-vote-lock-v1";
function savedVote() {
  try {
    return localStorage.getItem(voteKey) || "";
  } catch {
    return "";
  }
}
function FanVotes({ heroes }) {
  const [selected, setSelected] = useState(""),
    [locked, setLocked] = useState(savedVote),
    [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true),
    [submitting, setSubmitting] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const alive = useRef(true),
    controller = useRef(null),
    submittingRef = useRef(false);
  const load = async () => {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setLoading(true);
    setError("");
    try {
      const data = await requestVotes({ signal: request.signal });
      if (alive.current && !request.signal.aborted) setBoard(data);
    } catch (issue) {
      if (alive.current && issue.name !== "AbortError") setError(issue.message);
    } finally {
      if (alive.current && !request.signal.aborted) setLoading(false);
    }
  };
  useEffect(() => {
    alive.current = true;
    load();
    return () => {
      alive.current = false;
      controller.current?.abort();
    };
  }, []);
  useEffect(() => {
    const syncVote = (event) => {
      if (event.key === voteKey) setLocked(event.newValue || "");
    };
    window.addEventListener("storage", syncVote);
    return () => window.removeEventListener("storage", syncVote);
  }, []);
  const vote = async () => {
    if (!selected || locked || submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    setError("");
    try {
      const data = await requestVotes({ heroId: selected });
      try {
        localStorage.setItem(voteKey, selected);
      } catch {}
      if (!alive.current) return;
      setBoard(data);
      setLocked(selected);
      setMessage(
        `Your vote for ${heroes[selected]?.name || "Another legend"} is counted. Thank you for choosing your legend.`,
      );
    } catch (issue) {
      if (issue.status === 409) {
        try {
          localStorage.setItem(voteKey, "recorded");
        } catch {}
        if (alive.current) setLocked("recorded");
      }
      if (alive.current) setError(issue.message);
    } finally {
      submittingRef.current = false;
      if (alive.current) setSubmitting(false);
    }
  };
  return (
    <div className="votes-layout">
      <section className="ballot-panel" aria-label="Choose your legend">
        <div className="console-heading">
          <span className="eyebrow">
            <span className="tiny-rule" />
            THE NOMINEES
          </span>
          <span className="mono muted">ONE FAN. ONE VOTE.</span>
        </div>
        <div className="ballot-grid">
          {ballotIds.map((id, index) => (
            <button
              key={id}
              aria-pressed={(locked || selected) === id}
              disabled={!!locked || submitting}
              className={`ballot-card ${(locked || selected) === id ? "selected" : ""}`}
              onClick={() => setSelected(id)}
            >
              {id === "other" ? (
                <div className="other-legend" aria-hidden="true">
                  ?
                </div>
              ) : (
                <SafeImage src={heroes[id].image} alt="" />
              )}
              <div className="ballot-shade" />
              <span className="mono ballot-number">0{index + 1}</span>
              <span className="ballot-check">
                {(locked || selected) === id ? <Check size={15} /> : <span />}
              </span>
              <span className="ballot-caption">
                <span className="mono">
                  {heroes[id]?.universe || "BEYOND THE BALLOT"}
                </span>
                <strong>{heroes[id]?.name || "Another legend"}</strong>
              </span>
            </button>
          ))}
        </div>
        <div className="vote-submit">
          <RadialButton
            className="feature-primary"
            disabled={!selected || !!locked || submitting || loading || !board}
            onClick={vote}
          >
            {locked ? <CheckCircle2 size={16} /> : <Vote size={16} />}
            {locked
              ? "Vote recorded"
              : submitting
                ? "Counting your vote…"
                : "Cast my vote"}
            {!locked && <ArrowUpRight size={16} />}
          </RadialButton>
          <p>
            {locked
              ? message ||
                (heroes[locked]
                  ? `You’ve already voted for ${heroes[locked].name} from this browser.`
                  : "A vote has already been recorded from this browser.")
              : selected
                ? `${heroes[selected]?.name || "Another legend"} is your choice. Make it count.`
                : "Select a legend above to make your choice."}
          </p>
        </div>
        <div role="status" className={error ? "feature-error" : "vote-message"}>
          {error || message}
        </div>
      </section>
      <aside className="leaderboard-panel" aria-label="Fan leaderboard">
        <div className="leaderboard-heading">
          <span className="eyebrow">
            <span className="status-light" />
            THE FAN VERDICT
          </span>
          <button
            className="icon-button"
            aria-label="Refresh leaderboard"
            disabled={loading || submitting}
            onClick={load}
          >
            <RotateCcw size={14} />
          </button>
        </div>
        <h2>
          Legends,
          <br />
          <em>by the numbers.</em>
        </h2>
        <div className="vote-total">
          <strong>{board ? board.totalVotes.toLocaleString() : "—"}</strong>
          <span className="mono">VOTES CAST</span>
        </div>
        {loading && !board ? (
          <p role="status" className="leaderboard-loading">
            Opening the fan verdict…
          </p>
        ) : !board ? (
          <div className="leaderboard-empty">
            <p>The verdict is taking a moment.</p>
            <button className="text-action" onClick={load}>
              Retry leaderboard <RotateCcw size={14} />
            </button>
          </div>
        ) : (
          <ol className="leaderboard">
            {board.board.map((item, index) => (
              <motion.li layout key={item.id}>
                <span className="mono rank">{number(index + 1)}</span>
                <div>
                  <div className="leaderboard-name">
                    <strong>{item.label}</strong>
                    <span className="mono">{item.percent}%</span>
                  </div>
                  <div className="leaderboard-track">
                    <motion.i
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.8, ease: ease.cinema }}
                    />
                  </div>
                  <span className="mono muted">
                    {item.votes.toLocaleString()}{" "}
                    {item.votes === 1 ? "VOTE" : "VOTES"}
                  </span>
                </div>
                {index === 0 && item.votes > 0 && <Trophy size={15} />}
              </motion.li>
            ))}
          </ol>
        )}
        <p className="leaderboard-note mono">
          THE SHARED TALLY, AS OF YOUR LAST REFRESH.
          <br />
          EVERY VOTE ADDS TO THE STORY.
        </p>
      </aside>
    </div>
  );
}

export default function FeaturePages({
  page,
  heroes,
  hero,
  reduced,
  onSelect,
}) {
  const props = { heroes, hero, reduced, onSelect };
  return (
    <div className={`feature-page feature-${page}`}>
      <FeatureIntro page={page} reduced={reduced} />
      {page !== "votes" && <ThemePicker {...props} />}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: ease.cinema }}
      >
        {page === "battle" ? (
          <BattleArena {...props} />
        ) : page === "quiz" ? (
          <AlignmentQuiz {...props} />
        ) : page === "trivia" ? (
          <TriviaChallenge />
        ) : (
          <FanVotes {...props} />
        )}
      </motion.div>
      <div className="feature-bottom-note mono">
        <span>LEGENDRIUM / {pageDetails[page][0]}</span>
        <span>
          THERE’S ALWAYS ANOTHER STORY.{" "}
          <a href="heroes.html">
            EXPLORE THE ARCHIVE <ArrowUpRight size={12} />
          </a>
        </span>
      </div>
    </div>
  );
}
