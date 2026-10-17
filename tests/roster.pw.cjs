const { test, expect } = require("@playwright/test");
const additions = require("../scripts/roster-additions.cjs");
const heroes = require("../frontend/heroes.json");
const { quizQuestions } = require("../frontend/challenges.json");

test("character types combine with universe and identity search, and empty filters reset", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=batman");
  const types = page.getByRole("group", { name: "Character type" });
  const universes = page.getByRole("group", { name: "Filter universe" });
  const cards = page.locator(".archive-card");
  await expect(cards).toHaveCount(52);
  await types.getByRole("button", { name: /Villains/ }).click();
  await expect(cards).toHaveCount(13);
  await expect(page.locator(".archive-alignment")).toHaveText(
    Array(13).fill("villain"),
  );
  await page
    .locator(".archive-section")
    .screenshot({ path: "test-results/villain-roster.png" });
  await universes.getByRole("button", { name: "Marvel", exact: true }).click();
  await expect(cards).toHaveCount(7);
  await page.getByRole("searchbox").fill("Norman Osborn");
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAttribute(
    "aria-label",
    "Open Green Goblin dossier",
  );
  await universes.getByRole("button", { name: "DC", exact: true }).click();
  await expect(page.getByText("No matching legends.")).toBeVisible();
  await page.getByRole("button", { name: "Reset the archive" }).click();
  await expect(cards).toHaveCount(52);
  await expect(page.getByRole("searchbox")).toHaveValue("");
  await types.getByRole("button", { name: /Antiheroes/ }).click();
  await expect(cards).toHaveCount(7);
  await universes.getByRole("button", { name: "Marvel", exact: true }).click();
  await expect(cards).toHaveCount(5);
});

test("all expanded characters have complete dossiers, readable identities, and working local portraits", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const character of additions) {
    await page.goto(`/heroes.html?hero=${character.id}`);
    await expect(
      page.getByRole("heading", {
        name: character.name.toUpperCase(),
        level: 1,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator(".hero-facts")).toContainText(character.identity);
    await expect(page.locator(".hero-index")).toContainText(
      character.alignment.toUpperCase(),
    );
    await expect(page.locator(".origin-panel")).toContainText(character.origin);
    await expect(page.locator(".power-stat")).toHaveCount(6);
    await expect(page.locator(".villain-heading")).toHaveText(
      character.rival[0].toUpperCase(),
    );
    await expect(page.locator(".timeline-event")).toHaveCount(4);
    await expect(page.locator(".actors-section")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /Read the official .* profile/ }),
    ).toHaveAttribute("href", character.source);
    await expect(page.locator(".character-art")).toHaveAttribute(
      "src",
      `/art/${character.id}.jpg`,
    );
    await expect
      .poll(() =>
        page
          .locator(".character-art")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("a saved villain opens from the archive and survives refresh and collection filtering", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=batman");
  await page
    .getByRole("group", { name: "Character type" })
    .getByRole("button", { name: /Villains/ })
    .click();
  await page
    .getByRole("button", { name: "Save The Joker", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Open The Joker dossier", exact: true })
    .click();
  await expect(page.locator("main")).toHaveAttribute(
    "data-active-hero",
    "joker",
  );
  await expect(page).toHaveURL(/hero=joker/);
  await page.reload();
  await expect(page.locator(".hero-facts")).toContainText("Unknown");
  await page.getByRole("button", { name: /My collection/ }).click();
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await expect(page.locator(".archive-card")).toHaveAttribute(
    "aria-label",
    "Open The Joker dossier",
  );
  await page
    .getByRole("button", { name: "Unsave The Joker", exact: true })
    .click();
  await expect(page.getByText("Your collection starts here.")).toBeVisible();
});

test("villains and antiheroes can battle with accurate weighted totals, swapping, and refresh", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/battle.html?hero=thanos&opponent=darkseid&mode=powerhouse");
  await expect(page.getByLabel("Choose your hero")).toHaveValue("thanos");
  expect(
    await page
      .locator("#heroPicker optgroup")
      .evaluateAll((groups) => groups.map((group) => group.label)),
  ).toEqual(["Heroes", "Antiheroes", "Villains"]);
  await expect(page.locator("#heroPicker option")).toHaveCount(52);
  await expect(page.getByLabel("Choose your hero")).toHaveValue("thanos");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("darkseid");
  const total = (hero) =>
    Object.entries(hero.comparison).reduce(
      (sum, [key, value]) =>
        sum +
        value * (["strength", "durability", "power"].includes(key) ? 2 : 1),
      0,
    );
  await page.getByRole("button", { name: "Compare legends" }).click();
  await expect(page.locator(".comparison-verdict")).toContainText(
    `${total(heroes.thanos)} : ${total(heroes.darkseid)}`,
  );
  await page.getByRole("button", { name: "Swap sides" }).click();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("darkseid");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("thanos");
  await page.reload();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("darkseid");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("thanos");
  await page.getByLabel("Choose opponent").selectOption("venom");
  await expect(page).toHaveURL(/opponent=venom/);
  await page.getByLabel("Choose your hero").selectOption("venom");
  await expect(page.getByLabel("Choose opponent")).not.toHaveValue("venom");
});

test("quiz results and related legends exclude villain dossiers even when villains score highly", async ({
  page,
}) => {
  const answers = quizQuestions.map((question) =>
    question.answers.reduce(
      (best, answer, index, all) =>
        (answer.weights.scholar || 0) > (all[best].weights.scholar || 0)
          ? index
          : best,
      0,
    ),
  );
  await page.addInitScript(
    (answers) =>
      localStorage.setItem(
        "legendrium-quiz-progress-v1",
        JSON.stringify({
          version: 1,
          answers,
          index: answers.length - 1,
          complete: true,
        }),
      ),
    answers,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/quiz.html?hero=doctordoom");
  await expect(page.locator(".quiz-result h2")).toBeVisible();
  const resultLinks = await page
    .locator(".quiz-result a[href*='hero=']")
    .evaluateAll((links) =>
      links.map((link) => new URL(link.href).searchParams.get("hero")),
    );
  expect(resultLinks.length).toBe(3);
  for (const id of resultLinks)
    expect(heroes[id].alignment).not.toBe("villain");
});

test("expanded portraits and atmosphere motifs render at both desktop widths", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const id of [
    "moonknight",
    "misterfantastic",
    "ultron",
    "carnage",
    "storm",
    "raven",
  ]) {
    await page.goto(`/heroes.html?hero=${id}`);
    await expect(page.locator(".cinematic-stage")).toHaveAttribute(
      "data-engine",
      /worker|main-thread/,
    );
    await expect(page.locator(".cinematic-stage")).toHaveAttribute(
      "data-motif",
      heroes[id].motif,
      { timeout: 15000 },
    );
    await expect(page.locator(".chromatic-red")).toHaveCSS("opacity", "0");
    await page.waitForTimeout(700);
    await page.screenshot({ path: `test-results/${id}-dossier.png` });
    await page.setViewportSize({ width: 1050, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    await expect
      .poll(() =>
        page.evaluate(() => {
          const facts = document
            .querySelector(".hero-facts")
            .getBoundingClientRect();
          const hint = document
            .querySelector(".hero-bottom")
            .getBoundingClientRect();
          return hint.top - facts.bottom;
        }),
      )
      .toBeGreaterThanOrEqual(20);
    await page.screenshot({ path: `test-results/${id}-compact.png` });
    if (id === "moonknight") {
      await page.setViewportSize({ width: 1050, height: 800 });
      await expect
        .poll(() =>
          page.evaluate(() => {
            const facts = document
              .querySelector(".hero-facts")
              .getBoundingClientRect();
            const hint = document
              .querySelector(".hero-bottom")
              .getBoundingClientRect();
            return hint.top - facts.bottom;
          }),
        )
        .toBeGreaterThanOrEqual(20);
      await page.screenshot({ path: "test-results/moonknight-short.png" });
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  expect(errors).toEqual([]);
});
