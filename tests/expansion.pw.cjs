const { test, expect } = require("@playwright/test");
const { quizQuestions, triviaDecks } = require("../frontend/challenges.json");
const heroes = require("../frontend/heroes.json");

test("saved heroes sync across tabs and malformed saved data is ignored", async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "legendrium-saved-heroes-v1",
      JSON.stringify(["batman", "batman", "unknown-hero"]),
    );
    localStorage.setItem(
      "legendrium-trivia-records-v1",
      JSON.stringify({
        "easy-timed": { score: 999, accuracy: 100, streak: 999 },
      }),
    );
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html");
  await expect(
    page.getByRole("button", { name: /My collection/ }),
  ).toContainText("01");
  const second = await context.newPage();
  await second.emulateMedia({ reducedMotion: "reduce" });
  await second.goto("/heroes.html");
  await second.getByRole("button", { name: /My collection/ }).click();
  await page.getByRole("button", { name: "Save Thor", exact: true }).click();
  await expect(second.locator(".archive-card")).toHaveCount(2);
  await second
    .getByRole("button", { name: "Unsave Batman", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Save Batman", exact: true }),
  ).toBeVisible();
  await second.goto("/trivia.html");
  await expect(second.locator(".personal-best strong")).toHaveText(
    "A NEW STORY",
  );
});

test("collections and trivia practice remain usable when browser storage is blocked", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ["getItem", "setItem", "removeItem"])
      Storage.prototype[method] = () => {
        throw new DOMException("Blocked", "SecurityError");
      };
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html");
  await page.getByRole("button", { name: "Save Batman", exact: true }).click();
  await page.getByRole("button", { name: /My collection/ }).click();
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await page.goto("/trivia.html");
  await page.getByRole("button", { name: "Practice", exact: true }).click();
  await page.getByRole("button", { name: "Start the challenge" }).click();
  await page.locator(".answer-choice").first().click();
  await expect(page.locator(".trivia-feedback")).toContainText(
    triviaDecks.easy[0].explanation,
  );
  for (let round = 0; round < 2; round++) {
    if (round) {
      await page.getByRole("button", { name: "Play another round" }).click();
      await page.getByRole("button", { name: "Start the challenge" }).click();
    }
    for (let i = 0; i < triviaDecks.easy.length; i++) {
      await expect(page.locator(".question-content h2")).toHaveText(
        triviaDecks.easy[i].question,
      );
      if (round || i)
        await page
          .locator(".answer-choice")
          .nth(
            round && i === 0
              ? (triviaDecks.easy[i].answer + 1) % 4
              : triviaDecks.easy[i].answer,
          )
          .click();
      await page
        .getByRole("button", {
          name:
            i === triviaDecks.easy.length - 1
              ? "See my results"
              : "Next question",
        })
        .click();
    }
    await expect(page.locator(".personal-best strong")).toHaveText("16 POINTS");
    if (!round)
      await expect(page.locator(".record-badge")).toContainText("THIS TAB");
    else await expect(page.locator(".record-badge")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("saved collection persists, filters, sorts, and discovers another saved hero", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=batman");
  await page.getByRole("button", { name: "Save Batman", exact: true }).click();
  await page.getByRole("button", { name: "Save Thor", exact: true }).click();
  await page.getByRole("button", { name: /My collection/ }).click();
  await expect(page.locator(".archive-card")).toHaveCount(2);
  await page.locator(".archive-section").screenshot({
    path: "test-results/saved-collection.png",
  });
  await page.getByRole("button", { name: "Surprise me" }).click();
  await expect(page.locator("main")).toHaveAttribute(
    "data-active-hero",
    "thor",
  );
  await page.reload();
  await page.getByRole("button", { name: /My collection/ }).click();
  await expect(page.locator(".archive-card")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Unsave Batman", exact: true })
    .click();
  await page.getByRole("button", { name: "Unsave Thor", exact: true }).click();
  await expect(page.getByText("Your collection starts here.")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Surprise me" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Show all characters" }).click();
  await page.getByLabel("Sort heroes").selectOption("name");
  await expect(page.locator(".archive-card").first()).toHaveAttribute(
    "aria-label",
    `Open ${Object.values(heroes).sort((a, b) => a.name.localeCompare(b.name))[0].name} dossier`,
  );
  await page.getByLabel("Sort heroes").selectOption("intelligence");
  const smartest = Object.values(heroes).sort(
    (a, b) => b.comparison.intelligence - a.comparison.intelligence,
  )[0];
  await expect(page.locator(".archive-card").first()).toHaveAttribute(
    "aria-label",
    `Open ${smartest.name} dossier`,
  );
});

test("battle styles weight ratings, share exact matchups, and restore swapped sides through history", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "legendrium-selection-v2",
      JSON.stringify({ selectedHeroId: "thor", selectedVersionIndex: 0 }),
    ),
  );
  await page.goto("/battle.html?opponent=missing&mode=missing");
  await expect(page.getByLabel("Choose your hero")).toHaveValue("thor");
  await expect(page).toHaveURL(/hero=thor/);
  await expect(
    page.getByRole("button", { name: "Balanced", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goto("/battle.html?hero=batman&opponent=ironman&mode=tactical");
  await expect(
    page.getByRole("button", { name: "Tactical", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("img", { name: /attribute radar/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Compare legends" }).click();
  const total = (hero) =>
    Object.entries(hero.comparison).reduce(
      (sum, [key, value]) =>
        sum + value * (["intelligence", "combat"].includes(key) ? 2 : 1),
      0,
    );
  await expect(page.locator(".comparison-verdict")).toContainText(
    `${total(heroes.batman)} : ${total(heroes.ironman)} / TACTICAL RATING`,
  );
  await page.getByRole("button", { name: "Swap sides" }).click();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("ironman");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("batman");
  await page.getByRole("button", { name: "Share matchup" }).click();
  await expect(page.getByLabel("Matchup link")).toHaveValue(
    /hero=ironman.*opponent=batman.*mode=tactical/,
  );
  await expect(page.locator(".challenger .arena-art img")).toBeVisible();
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo(0, 0);
  });
  await page.mouse.move(10, 10);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "test-results/battle-analysis.png",
    fullPage: true,
  });
  await page.reload();
  await expect(page.getByLabel("Choose opponent")).toHaveValue("batman");
  await expect(
    page.getByRole("button", { name: "Tactical", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goBack();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("batman");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("ironman");
  await page.getByRole("button", { name: "Powerhouse", exact: true }).click();
  await expect(page.locator(".comparison-verdict")).toHaveCount(0);
  await page.getByRole("button", { name: "Compare legends" }).click();
  const powerhouse = (hero) =>
    Object.entries(hero.comparison).reduce(
      (sum, [key, value]) =>
        sum +
        value * (["strength", "durability", "power"].includes(key) ? 2 : 1),
      0,
    );
  await expect(page.locator(".comparison-verdict")).toContainText(
    `${powerhouse(heroes.batman)} : ${powerhouse(heroes.ironman)} / POWERHOUSE RATING`,
  );
});

test("quiz result review edits one choice with keyboard shortcuts and saves the updated result", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("legendrium-quiz-progress-v1"))
      localStorage.setItem(
        "legendrium-quiz-progress-v1",
        JSON.stringify({
          version: 1,
          answers: Array(20).fill(0),
          index: 19,
          complete: true,
        }),
      );
  });
  await page.goto("/quiz.html?hero=batman");
  await page.locator(".quiz-review summary").click();
  await expect(page.locator(".quiz-review li")).toHaveCount(20);
  await page
    .getByRole("button", { name: "Edit answer 1", exact: true })
    .click();
  await expect(page.locator(".question-label")).toContainText("01");
  await expect(page.locator(".question-content h2")).toBeFocused();
  await page.keyboard.press("4");
  await expect(page.locator(".answer-choice").nth(3)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Update my result" }).click();
  await expect(page.locator(".alignment-insight")).toContainText(
    "Your choices lean toward",
  );
  await expect(page.locator(".runner-up-links a")).toHaveCount(2);
  await page.locator(".quiz-review summary").click();
  await expect(page.locator(".quiz-review li").first()).toContainText(
    quizQuestions[0].answers[3].label,
  );
  await page.reload();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("legendrium-quiz-progress-v1")),
  );
  expect(saved.answers[0]).toBe(3);
  expect(saved.complete).toBe(true);
  await expect(page.locator(".quiz-result h2")).toBeVisible();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "test-results/quiz-expanded-result.png",
    fullPage: true,
  });
});

test("untimed trivia learns from missed answers and keeps records separately from timed rounds", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto("/trivia.html?hero=thor");
  await page.getByRole("button", { name: "Practice", exact: true }).click();
  await page.getByRole("button", { name: "Start the challenge" }).click();
  await expect(page.getByLabel("Unlimited time")).toBeVisible();
  await expect(page.getByRole("button", { name: "Pause clock" })).toHaveCount(
    0,
  );
  await page.waitForTimeout(18500);
  await expect(page.locator(".answer-choice").first()).toBeEnabled();
  await expect(page.locator(".trivia-feedback")).not.toContainText("Time’s up");
  for (let i = 0; i < triviaDecks.easy.length; i++) {
    await expect(page.locator(".question-content h2")).toHaveText(
      triviaDecks.easy[i].question,
    );
    const choice =
      i === 0
        ? (triviaDecks.easy[i].answer + 1) % 4
        : triviaDecks.easy[i].answer;
    await page.locator(".question-content h2").focus();
    await page.keyboard.press(String(choice + 1));
    await page
      .getByRole("button", {
        name:
          i === triviaDecks.easy.length - 1
            ? "See my results"
            : "Next question",
      })
      .click();
  }
  await expect(page.locator(".record-badge")).toHaveText("NEW PERSONAL BEST");
  await expect(page.locator(".personal-best strong")).toHaveText("15 POINTS");
  await page.locator(".trivia-review summary").click();
  await expect(page.locator(".trivia-review li")).toHaveCount(1);
  await expect(page.locator(".trivia-review li")).toContainText(
    triviaDecks.easy[0].explanation,
  );
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo(0, 0);
  });
  await page.mouse.move(10, 10);
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "test-results/trivia-practice-result.png",
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator(".personal-best strong")).toHaveText("A NEW STORY");
  await page.getByRole("button", { name: "Practice", exact: true }).click();
  await expect(page.locator(".personal-best strong")).toHaveText("15 POINTS");
});

test("shuffled trivia visits every question once and protects a better saved record", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "legendrium-trivia-records-v1",
      JSON.stringify({
        "easy-practice": { score: 16, accuracy: 100, streak: 16 },
      }),
    ),
  );
  await page.goto("/trivia.html");
  await page.getByRole("button", { name: "Practice", exact: true }).click();
  await page.getByRole("button", { name: "Shuffle questions" }).click();
  await page.getByRole("button", { name: "Start the challenge" }).click();
  const visited = [];
  for (let i = 0; i < triviaDecks.easy.length; i++) {
    await expect(page.locator(".question-label")).toContainText(
      String(i + 1).padStart(2, "0"),
    );
    const prompt = await page.locator(".question-content h2").innerText();
    visited.push(prompt);
    const question = triviaDecks.easy.find((item) => item.question === prompt);
    expect(question).toBeTruthy();
    await page
      .locator(".answer-choice")
      .nth(i === 0 ? (question.answer + 1) % 4 : question.answer)
      .click();
    await expect(page.locator(".question-content h2")).toHaveText(prompt);
    await page
      .getByRole("button", {
        name:
          i === triviaDecks.easy.length - 1
            ? "See my results"
            : "Next question",
      })
      .click();
  }
  expect(new Set(visited).size).toBe(triviaDecks.easy.length);
  expect(visited).not.toEqual(triviaDecks.easy.map((item) => item.question));
  await expect(page.locator(".personal-best strong")).toHaveText("16 POINTS");
  await expect(page.locator(".record-badge")).toHaveCount(0);
  const record = await page.evaluate(
    () =>
      JSON.parse(localStorage.getItem("legendrium-trivia-records-v1"))[
        "easy-practice"
      ],
  );
  expect(record).toEqual({ score: 16, accuracy: 100, streak: 16 });
});
