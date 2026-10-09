const { test, expect } = require("@playwright/test");

async function open(page, id = "batman") {
  await page.goto(`/heroes.html?hero=${id}`);
  await expect(
    page.getByRole("heading", {
      name:
        id === "ironman"
          ? "IRON MAN"
          : id === "spiderman"
            ? "SPIDER-MAN"
            : id.toUpperCase(),
      exact: true,
      level: 1,
    }),
  ).toBeVisible();
}
async function settled(page, id) {
  await expect(page.locator("main")).toHaveAttribute("data-active-hero", id);
  await expect(page.locator("main")).toHaveAttribute("data-phase", "idle", {
    timeout: 15000,
  });
}
async function select(page, name) {
  await page
    .getByRole("navigation", { name: "Featured heroes" })
    .getByRole("button", { name: new RegExp(name, "i") })
    .click();
}

test("loads local artwork, renders atmosphere, and has no runtime exceptions", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await open(page);
  await expect
    .poll(() =>
      page
        .locator(".character-art")
        .evaluate((image) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-engine",
    /worker|main-thread/,
    { timeout: 15000 },
  );
  await expect(page.locator(".chromatic-red")).toHaveCSS("opacity", "0");
  await page.screenshot({ path: "test-results/batman-entry.png" });
  expect(errors).toEqual([]);
});

test("all five signatures switch without leaked scene groups", async ({
  page,
}) => {
  test.setTimeout(100000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await open(page);
  for (const [name, id] of Array(4)
    .fill([
      ["Superman", "superman"],
      ["Spider-Man", "spiderman"],
      ["Thor", "thor"],
      ["Iron Man", "ironman"],
      ["Batman", "batman"],
    ])
    .flat()) {
    await select(page, name);
    await settled(page, id);
    await expect(page).toHaveURL(new RegExp(`hero=${id}`));
    await expect(page.locator(".hero-intro")).toHaveAttribute(
      "aria-label",
      new RegExp(name),
    );
  }
  await expect
    .poll(
      async () =>
        Number(
          await page
            .locator(".cinematic-stage")
            .getAttribute("data-geometries"),
        ),
      { timeout: 15000 },
    )
    .toBeLessThan(12);
  expect(errors).toEqual([]);
});

test("main-thread and unavailable-WebGL fallbacks preserve the experience", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.transferControlToOffscreen = undefined;
  });
  await open(page);
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-engine",
    "main-thread",
    { timeout: 15000 },
  );
  await select(page, "Superman");
  await settled(page, "superman");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl")
        ? null
        : original.call(this, type, ...args);
    };
  });
  await page.reload();
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-engine",
    "static",
    { timeout: 15000 },
  );
  await select(page, "Thor");
  await settled(page, "thor");
});

test("rapid navigation resolves to the latest requested hero", async ({
  page,
}) => {
  await open(page);
  await select(page, "Superman");
  await select(page, "Thor");
  await select(page, "Iron Man");
  await settled(page, "ironman");
  await expect(page.locator(".transition-veil")).toHaveCSS(
    "clip-path",
    /circle\(0%/,
  );
});

test("back, forward, and refresh preserve hero routing", async ({ page }) => {
  await open(page);
  await select(page, "Superman");
  await settled(page, "superman");
  await select(page, "Thor");
  await settled(page, "thor");
  await page.goBack();
  await settled(page, "superman");
  await page.goForward();
  await settled(page, "thor");
  await page.reload();
  await settled(page, "thor");
});

test("pinned chapters reveal powers, villain, and quote in both directions", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Enter the legend" }).click();
  const nav = page.getByRole("navigation", { name: "Story chapters" });
  await nav.getByRole("button", { name: /02 Power/ }).click();
  await expect(page.locator(".story-viewport")).toHaveAttribute(
    "data-chapter",
    "1",
  );
  await expect
    .poll(() =>
      page
        .locator(".power-fill")
        .first()
        .evaluate((el) =>
          Number(getComputedStyle(el).transform.split("(")[1].split(",")[0]),
        ),
    )
    .toBeGreaterThan(0.5);
  await nav.getByRole("button", { name: /03 Nemesis/ }).click();
  await expect(page.locator(".story-viewport")).toHaveAttribute(
    "data-chapter",
    "2",
  );
  await expect(
    page
      .getByRole("region", { name: "Batman story chapters" })
      .getByRole("heading", { name: "THE JOKER", exact: true, level: 2 }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".villain-heading")
        .evaluate((el) =>
          [...getComputedStyle(el).clipPath.matchAll(/[\d.]+/g)].every(
            (value) => Number(value[0]) < 0.1,
          ),
        ),
    )
    .toBe(true);
  await page.screenshot({ path: "test-results/villain-reveal.png" });
  await nav.getByRole("button", { name: /05 Conviction/ }).click();
  await expect(page.locator(".story-viewport")).toHaveAttribute(
    "data-chapter",
    "4",
  );
  await page.screenshot({ path: "test-results/quote-reveal.png" });
  await nav.getByRole("button", { name: /01 Origin/ }).click();
  await expect(page.locator(".story-viewport")).toHaveAttribute(
    "data-chapter",
    "0",
  );
});

test("archive filters, empty search, and non-featured hero selection work", async ({
  page,
}) => {
  await open(page);
  const search = page.getByRole("searchbox", {
    name: "Search heroes, powers, or villains",
  });
  await search.fill("not-a-hero");
  await expect(page.getByText("No matching legends.")).toBeVisible();
  await search.fill("Wonder Woman");
  await expect(page.locator(".archive-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Open Wonder Woman dossier" }).click();
  await settled(page, "wonderwoman");
  await expect(
    page.getByRole("heading", { name: "WONDER WOMAN", exact: true, level: 1 }),
  ).toBeVisible();
});

test("reduced motion, keyboard actor flips, and quality settings persist", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await expect(page.locator(".cinematic-stage")).toHaveAttribute(
    "data-engine",
    "static",
  );
  await expect(page.locator(".story-viewport")).toHaveClass(/story-static/);
  const card = page.locator(".actor-card").first();
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(card).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Atmosphere", exact: true })
    .selectOption("balanced");
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("reduced");
  await page.reload();
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await expect(
    page.getByRole("combobox", { name: "Atmosphere", exact: true }),
  ).toHaveValue("balanced");
  await expect(
    page.getByRole("combobox", { name: "Motion", exact: true }),
  ).toHaveValue("reduced");
});

test("existing feature pages and API remain reachable", async ({
  page,
  request,
}) => {
  for (const route of [
    "/api/health",
    "/api/heroes",
    "/battle.html",
    "/quiz.html",
    "/trivia.html",
    "/votes.html",
  ]) {
    expect((await request.get(route)).status()).toBe(200);
  }
  await open(page);
  await select(page, "Iron Man");
  await settled(page, "ironman");
  await page.getByRole("link", { name: "Battle arena", exact: true }).click();
  await expect(page).toHaveURL(/battle\.html/);
  await expect(page.locator("#battleOpponent")).toBeVisible();
  await expect(page.locator('[data-picker-hero="ironman"]')).toHaveClass(
    /active/,
  );
});
