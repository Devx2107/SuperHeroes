const { test, expect } = require("@playwright/test");
const { quizQuestions, triviaDecks } = require("../frontend/challenges.json");
const heroes = require("../frontend/heroes.json");
const voteBoard = {
  totalVotes: 10,
  board: [
    { id: "ironman", label: "Iron Man", votes: 4, percent: 40 },
    { id: "thor", label: "Thor", votes: 3, percent: 30 },
    { id: "blackpanther", label: "Black Panther", votes: 2, percent: 20 },
    { id: "flash", label: "The Flash", votes: 1, percent: 10 },
    { id: "wolverine", label: "Wolverine", votes: 0, percent: 0 },
    { id: "other", label: "Other", votes: 0, percent: 0 },
  ],
};

test("all feature pages share the cinematic shell without runtime errors or overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/api/votes", (route) =>
    route.fulfill({ json: voteBoard }),
  );
  for (const feature of ["battle", "quiz", "trivia", "votes"]) {
    await page.goto(`/${feature}.html?hero=batman`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.locator('.primary-nav [aria-current="page"]'),
    ).toHaveCount(1);
    await page.waitForTimeout(1300);
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await page.screenshot({
      path: `test-results/${feature}-desktop.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 1050, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await page.screenshot({
      path: `test-results/${feature}-compact.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  expect(errors).toEqual([]);
});

test("battle compares actual ratings, resets and changes opponents without self matchups", async ({
  page,
}) => {
  await page.goto("/battle.html?hero=batman");
  await page.getByLabel("Choose opponent").selectOption("ironman");
  await page.getByRole("button", { name: "Compare legends" }).click();
  const sum = (hero) =>
    Object.values(hero.comparison).reduce((a, b) => a + b, 0);
  await expect(page.locator(".comparison-verdict")).toContainText(
    `${sum(heroes.batman)} : ${sum(heroes.ironman)}`,
  );
  await expect(page.locator(".comparison-verdict")).toContainText(
    "Iron Man has the edge",
  );
  await page.getByRole("button", { name: "Random opponent" }).click();
  await expect(page.getByLabel("Choose opponent")).not.toHaveValue("ironman");
  await expect(page.locator(".comparison-verdict")).toHaveCount(0);
  await page.getByLabel("Choose your hero").selectOption("superman");
  await expect(page.getByLabel("Choose opponent")).not.toHaveValue("superman");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByLabel("Choose opponent")).toHaveValue("batman");
  await page.reload();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("superman");
});

test("quiz completes all questions with real weighted matching, editing and theme continuity", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/quiz.html?hero=batman");
  const choices = page.locator(".answer-choice");
  await choices.nth(1).click();
  await page.getByRole("button", { name: "Next choice" }).click();
  await page.getByRole("button", { name: "Previous" }).click();
  await expect(choices.nth(1)).toHaveAttribute("aria-pressed", "true");
  await choices.first().click();
  await page.getByLabel("Choose your hero").selectOption("thor");
  await expect(choices.first()).toHaveAttribute("aria-pressed", "true");
  const totals = {};
  for (let index = 0; index < quizQuestions.length; index++) {
    await expect(page.locator(".question-label")).toContainText(
      String(index + 1).padStart(2, "0"),
    );
    await choices.first().click();
    Object.entries(quizQuestions[index].answers[0].weights).forEach(
      ([key, value]) => (totals[key] = (totals[key] || 0) + value),
    );
    await page
      .getByRole("button", {
        name:
          index === quizQuestions.length - 1
            ? "Reveal my legend"
            : "Next choice",
      })
      .click();
  }
  const matched = Object.values(heroes)
    .filter((hero) => hero.alignment !== "villain")
    .map((hero) => ({
      hero,
      score: Object.entries(totals).reduce(
        (sum, [key, value]) => sum + value * (hero.quizAffinity[key] || 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score)[0].hero;
  await expect(page.locator(".quiz-result h2")).toHaveText(matched.name);
  await page.reload();
  await expect(page.locator(".quiz-result h2")).toHaveText(matched.name);
  await expect(
    page.getByRole("link", { name: "Meet your legend" }),
  ).toHaveAttribute("href", `heroes.html?hero=${matched.id}`);
  await page.screenshot({
    path: "test-results/quiz-result.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Discover again" }).click();
  await expect(choices.locator('[aria-pressed="true"]')).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Next choice" }),
  ).toBeDisabled();
  await page.reload();
  await expect(page.locator(".question-label")).toContainText("01");
});

test("quiz restores edited answers and can start over mid-story", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/quiz.html");
  await page.locator(".answer-choice").nth(2).click();
  await page.getByRole("button", { name: "Next choice" }).click();
  await expect(page.locator(".question-label")).toContainText("02");
  await page.reload();
  await expect(page.locator(".quiz-progress-note")).toContainText("RESUMED");
  await expect(page.locator(".question-label")).toContainText("02");
  await page.getByRole("button", { name: "Previous" }).click();
  await expect(page.locator(".answer-choice").nth(2)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Start over", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Next choice" }),
  ).toBeDisabled();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("legendrium-quiz-progress-v1"),
    ),
  ).toBeNull();
});

test("settings contain keyboard focus, restore it on Escape and dismiss on backdrop click", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("legendrium-motion", "invalid");
    localStorage.setItem("legendrium-quality", "invalid");
    localStorage.setItem(
      "legendrium-quiz-progress-v1",
      JSON.stringify({ version: 1, answers: [999], index: 55, complete: true }),
    );
  });
  await page.goto("/quiz.html");
  await expect(page.locator(".question-label")).toContainText("01");
  const trigger = page.getByRole("button", {
    name: "Experience settings",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Experience settings" });
  await expect(dialog).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close settings" }),
  ).toBeFocused();
  await expect(
    page.getByRole("combobox", { name: "Motion", exact: true }),
  ).toHaveValue("system");
  await expect(
    page.getByRole("combobox", { name: "Atmosphere", exact: true }),
  ).toHaveValue("high");
  for (let index = 0; index < 4; index++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => document.activeElement?.closest("dialog") !== null,
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(20, 20);
  await expect(dialog).toHaveCount(0);
});

test("quiz remains usable when browser storage is blocked", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
    Storage.prototype.removeItem = () => {
      throw new DOMException("Blocked", "SecurityError");
    };
  });
  await page.goto("/quiz.html");
  await page.locator(".answer-choice").first().click();
  await page.getByRole("button", { name: "Next choice" }).click();
  await expect(page.locator(".question-label")).toContainText("02");
  await expect(page.locator(".quiz-progress-note")).toContainText(
    "PROGRESS AVAILABLE IN THIS TAB",
  );
  expect(errors).toEqual([]);
});

test("Marvel filtering includes X-Men dossiers", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html");
  await page
    .getByRole("group", { name: "Filter universe" })
    .getByRole("button", { name: "Marvel", exact: true })
    .click();
  await page.getByRole("searchbox").fill("wolverine");
  await expect(
    page.getByRole("button", { name: "Open Wolverine dossier" }),
  ).toBeVisible();
  await expect(page.locator(".archive-card")).toHaveCount(1);
});

test("malformed vote responses and failed submissions recover without losing the ballot", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let broken = true;
  await page.route("**/api/votes", (route) => {
    if (route.request().method() === "POST")
      return route.fulfill({
        status: 503,
        contentType: "text/html",
        body: "<h1>Unavailable</h1>",
      });
    return route.fulfill({
      json: broken ? { totalVotes: 10, board: null } : voteBoard,
    });
  });
  await page.goto("/votes.html");
  await expect(page.locator(".feature-error")).toContainText(
    "temporarily unavailable",
  );
  await expect(page.locator(".ballot-card")).toHaveCount(6);
  broken = false;
  await page.getByRole("button", { name: "Retry leaderboard" }).click();
  await expect(page.locator(".vote-total strong")).toHaveText("10");
  await page.locator(".ballot-card").first().click();
  await page.getByRole("button", { name: "Cast my vote" }).click();
  await expect(page.locator(".feature-error")).toContainText(
    "temporarily unavailable",
  );
  await expect(page.locator(".ballot-card").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("button", { name: "Cast my vote" }),
  ).toBeEnabled();
  expect(errors).toEqual([]);
});

test("a stalled leaderboard request times out and can be retried", async ({
  page,
}) => {
  let stalled = true;
  await page.route("**/api/votes", (route) => {
    if (!stalled) return route.fulfill({ json: voteBoard });
  });
  await page.goto("/votes.html");
  await expect(page.locator(".feature-error")).toContainText("took too long", {
    timeout: 15000,
  });
  stalled = false;
  await page.getByRole("button", { name: "Retry leaderboard" }).click();
  await expect(page.locator(".vote-total strong")).toHaveText("10");
});

test("a successful vote locks the ballot in another open tab", async ({
  page,
  context,
}) => {
  await context.route("**/api/votes", (route) =>
    route.fulfill({ json: voteBoard }),
  );
  await page.goto("/votes.html");
  const second = await context.newPage();
  await second.goto("/votes.html");
  await second.locator(".ballot-card").nth(1).click();
  await page.locator(".ballot-card").first().click();
  await page.getByRole("button", { name: "Cast my vote" }).click();
  await expect(
    second.getByRole("button", { name: "Vote recorded" }),
  ).toBeDisabled();
  await expect(second.locator(".ballot-card").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await second.close();
});

test("renderer fits its host after resizing and pauses when hidden", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.transferControlToOffscreen = undefined;
  });
  await page.goto("/battle.html");
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-engine",
    "main-thread",
  );
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1280, height: 850 },
  ]) {
    await page.setViewportSize(viewport);
    await expect
      .poll(() =>
        page
          .locator(".cinematic-stage canvas")
          .evaluate((canvas) =>
            Math.abs(
              canvas.height -
                canvas.clientHeight * Math.min(devicePixelRatio, 1.5),
            ),
          ),
      )
      .toBeLessThan(2);
  }
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-visibility",
    "paused",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: false,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-visibility",
    "visible",
  );
});

test("trivia pause, answer feedback, scoring, difficulty and full round work", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trivia.html");
  await page.getByRole("button", { name: "Start the challenge" }).click();
  await page.getByRole("button", { name: "Pause clock" }).click();
  await expect(page.locator(".answer-choice").first()).toBeDisabled();
  await expect(page.locator(".timer-dial .mono")).toHaveText("PAUSED");
  await page.getByRole("button", { name: "Resume clock" }).click();
  for (let index = 0; index < triviaDecks.easy.length; index++) {
    await expect(page.locator(".question-label")).toContainText(
      String(index + 1).padStart(2, "0"),
    );
    await page
      .locator(".answer-choice")
      .nth(triviaDecks.easy[index].answer)
      .click();
    await expect(page.locator(".trivia-feedback")).toContainText(
      triviaDecks.easy[index].explanation,
    );
    await expect(page.locator(".answer-choice.correct")).toHaveCount(1);
    await expect(page.locator(".answer-choice").first()).toBeDisabled();
    await page
      .getByRole("button", {
        name:
          index === triviaDecks.easy.length - 1
            ? "See my results"
            : "Next question",
      })
      .click();
  }
  await expect(page.locator(".trivia-summary")).toContainText(
    "16 of 16 correctly",
  );
  await expect(page.locator(".score-metrics")).toContainText("100");
  await page.getByRole("button", { name: "Play another round" }).click();
  await page.getByRole("button", { name: "hard", exact: true }).click();
  await expect(page.locator(".timer-dial strong")).toHaveText("10");
  await page.getByRole("button", { name: "Start the challenge" }).click();
  const wrong = (triviaDecks.hard[0].answer + 1) % 4;
  await page.locator(".answer-choice").nth(wrong).click();
  await expect(page.locator(".answer-choice.incorrect")).toHaveCount(1);
  await expect(page.locator(".trivia-feedback")).toContainText(
    "A twist in the story.",
  );
});

test("trivia deadline reveals an unanswered question and resumes the next one", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/trivia.html");
  await page.getByRole("button", { name: "hard", exact: true }).click();
  await page.getByRole("button", { name: "Start the challenge" }).click();
  await page.getByRole("button", { name: "Pause clock" }).click();
  const pausedTime = await page.locator(".timer-dial strong").textContent();
  await page.waitForTimeout(1200);
  await expect(page.locator(".timer-dial strong")).toHaveText(pausedTime);
  await page.getByRole("button", { name: "Resume clock" }).click();
  await expect(page.locator(".trivia-feedback")).toContainText("Time’s up.", {
    timeout: 15000,
  });
  await page.getByRole("button", { name: "Next question" }).click();
  await expect(page.locator(".question-label")).toContainText("02");
  await expect(page.locator(".answer-choice").first()).toBeEnabled();
});

test("fan ballot posts selected hero, updates tally and persists the browser lock", async ({
  page,
}) => {
  let posted = null;
  await page.route("**/api/votes", (route) => {
    if (route.request().method() === "POST") {
      posted = route.request().postDataJSON();
      const board = voteBoard.board
        .map((item) => ({
          ...item,
          votes: item.votes + (item.id === "ironman" ? 1 : 0),
        }))
        .map((item) => ({
          ...item,
          percent: Math.round((item.votes / 11) * 1000) / 10,
        }));
      return route.fulfill({ json: { totalVotes: 11, board } });
    }
    return route.fulfill({ json: voteBoard });
  });
  await page.goto("/votes.html");
  await expect(
    page.getByRole("button", { name: "Cast my vote" }),
  ).toBeDisabled();
  await page.locator(".ballot-card").first().click();
  await page.getByRole("button", { name: "Cast my vote" }).click();
  await expect(
    page.getByRole("button", { name: "Vote recorded" }),
  ).toBeDisabled();
  await expect(page.locator(".vote-total strong")).toHaveText("11");
  expect(posted).toEqual({ heroId: "ironman" });
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Vote recorded" }),
  ).toBeDisabled();
  await expect(page.locator(".ballot-card").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("votes recover from a failed load and handle duplicate votes", async ({
  page,
}) => {
  let failed = true;
  await page.route("**/api/votes", (route) => {
    if (route.request().method() === "POST")
      return route.fulfill({
        status: 409,
        json: { error: "You have already voted from this browser or IP." },
      });
    return route.fulfill(
      failed
        ? { status: 503, json: { error: "Leaderboard unavailable." } }
        : { json: voteBoard },
    );
  });
  await page.goto("/votes.html");
  await expect(page.locator(".feature-error")).toContainText(
    "Leaderboard unavailable.",
  );
  failed = false;
  await page.getByRole("button", { name: "Retry leaderboard" }).click();
  await expect(page.locator(".vote-total strong")).toHaveText("10");
  await page.locator(".ballot-card").nth(1).click();
  await page.getByRole("button", { name: "Cast my vote" }).click();
  await expect(page.locator(".feature-error")).toContainText("already voted");
  await expect(
    page.getByRole("button", { name: "Vote recorded" }),
  ).toBeDisabled();
});
