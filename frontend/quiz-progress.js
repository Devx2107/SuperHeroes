import { quizQuestions } from "./challenges.json";

const key = "legendrium-quiz-progress-v1";
export const emptyQuizProgress = () => ({
  answers: [],
  index: 0,
  complete: false,
});

export function readQuizProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (
      saved?.version !== 1 ||
      !Array.isArray(saved.answers) ||
      saved.answers.length > quizQuestions.length
    )
      return emptyQuizProgress();
    if (
      !saved.answers.every(
        (answer, index) =>
          answer === null ||
          (Number.isInteger(answer) &&
            answer >= 0 &&
            answer < quizQuestions[index].answers.length),
      )
    )
      return emptyQuizProgress();
    const firstUnanswered = quizQuestions.findIndex(
      (_, index) => saved.answers[index] == null,
    );
    const complete = saved.complete === true && firstUnanswered === -1;
    const requestedIndex =
      Number.isInteger(saved.index) && saved.index >= 0 ? saved.index : 0;
    const index = complete
      ? quizQuestions.length - 1
      : Math.min(
          requestedIndex,
          firstUnanswered === -1 ? quizQuestions.length - 1 : firstUnanswered,
        );
    return { answers: saved.answers, index, complete };
  } catch {
    return emptyQuizProgress();
  }
}

export function saveQuizProgress(progress) {
  try {
    if (!progress.answers.length) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify({ version: 1, ...progress }));
    return true;
  } catch {
    return false;
  }
}
