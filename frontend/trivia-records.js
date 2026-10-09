import { triviaDecks } from "./challenges.json";
const key = "legendrium-trivia-records-v1";
const maximums = Object.fromEntries(
  Object.entries(triviaDecks).map(([difficulty, deck]) => [
    difficulty,
    deck.length * { easy: 1, medium: 2, hard: 3 }[difficulty],
  ]),
);
function records() {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" && !Array.isArray(value)
      ? value
      : {};
  } catch {
    return {};
  }
}
function valid(value, difficulty) {
  return (
    value &&
    Number.isInteger(value.score) &&
    value.score >= 0 &&
    value.score <= maximums[difficulty] &&
    Number.isInteger(value.accuracy) &&
    value.accuracy >= 0 &&
    value.accuracy <= 100 &&
    Number.isInteger(value.streak) &&
    value.streak >= 0 &&
    value.streak <= triviaDecks[difficulty]?.length
  );
}
export function readTriviaRecord(difficulty, mode) {
  const value = records()[`${difficulty}-${mode}`];
  return valid(value, difficulty) ? value : null;
}
function beats(result, previous) {
  return (
    !previous ||
    result.score > previous.score ||
    (result.score === previous.score &&
      (result.accuracy > previous.accuracy ||
        (result.accuracy === previous.accuracy &&
          result.streak > previous.streak)))
  );
}
export function saveTriviaRecord(difficulty, mode, result, sessionBest = null) {
  let previous = readTriviaRecord(difficulty, mode);
  if (valid(sessionBest, difficulty) && beats(sessionBest, previous))
    previous = sessionBest;
  if (!valid(result, difficulty) || !beats(result, previous))
    return { record: previous, improved: false, saved: true };
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ ...records(), [`${difficulty}-${mode}`]: result }),
    );
    return { record: result, improved: true, saved: true };
  } catch {
    return { record: result, improved: true, saved: false };
  }
}
