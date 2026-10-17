const { test, expect } = require("@playwright/test");

test("global search opens by shortcut, navigates with arrows, and restores focus on Escape", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=batman");
  const trigger = page.getByRole("button", {
    name: "Find a character",
    exact: true,
  });
  await trigger.focus();
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Find a character" });
  const search = page.getByRole("combobox", { name: "Search all characters" });
  await expect(search).toBeFocused();
  await dialog.screenshot({ path: "test-results/finder-desktop.png" });
  await page.setViewportSize({ width: 1050, height: 900 });
  await dialog.screenshot({ path: "test-results/finder-compact.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await search.fill("symbiote");
  await expect(dialog.getByRole("option")).toHaveCount(2);
  await search.press("ArrowDown");
  await expect(search).toHaveAttribute(
    "aria-activedescendant",
    "finder-carnage",
  );
  await search.press("Enter");
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("main")).toHaveAttribute(
    "data-active-hero",
    "carnage",
  );
  await expect(page).toHaveURL(/hero=carnage/);
  await trigger.focus();
  await page.keyboard.press("/");
  await expect(search).toBeFocused();
  await search.fill("Ororo Munroe");
  await expect(dialog.getByRole("option")).toHaveCount(1);
  await expect(dialog.getByRole("option")).toContainText("Storm");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("search empty states recover, typing slash stays in fields, and feature pages can open a dossier", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html");
  await page.getByRole("searchbox").fill("/");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goto("/battle.html?hero=batman");
  await page
    .getByRole("button", { name: "Find a character", exact: true })
    .click();
  const search = page.getByRole("combobox", { name: "Search all characters" });
  await search.fill("unknown-character-1234");
  await expect(page.getByText("No signals found.")).toBeVisible();
  await search.press("ArrowDown");
  await search.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(search).toBeFocused();
  await search.fill("Rachel Roth");
  await page
    .getByRole("dialog", { name: "Find a character" })
    .getByRole("option", { name: /Raven/ })
    .click();
  await expect(page).toHaveURL(/heroes.html\?hero=raven/);
  await expect(
    page.getByRole("heading", { name: "RAVEN", level: 1, exact: true }),
  ).toBeVisible();
});

test("cursor reacts to cards and restores native cursors for fields and modal controls", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=storm");
  const cursor = page.locator(".cursor-system");
  const card = page.getByRole("button", { name: "Open Moon Knight dossier" });
  await card.hover();
  await expect(cursor).toHaveAttribute("data-action", "open");
  await expect(cursor).not.toHaveClass(/cursor-hidden/);
  await expect(cursor.locator(".cursor-label")).toHaveText("OPEN");
  await expect(cursor).toHaveAttribute("data-motif", "storm");
  await page.getByRole("searchbox").hover();
  await expect(cursor).toHaveClass(/cursor-hidden/);
  await expect(page.getByRole("searchbox")).toHaveCSS("cursor", "text");
  await page
    .getByRole("button", { name: "Find a character", exact: true })
    .click();
  await page.getByRole("combobox", { name: "Search all characters" }).hover();
  await expect(cursor).toHaveClass(/cursor-hidden/);
  await page.getByRole("button", { name: "Close character search" }).hover();
  await expect(
    page.getByRole("button", { name: "Close character search" }),
  ).toHaveCSS("cursor", "pointer");
});

test("pointer movement and clicks drive both atmosphere layers, including the WebGL fallback", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /Shader Error|VALIDATE_STATUS|not compiled|ERROR: 0:/.test(message.text())
    )
      errors.push(message.text());
  });
  for (const fallback of [false, true]) {
    if (fallback)
      await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...args) {
          return /webgl/.test(type) ? null : original.call(this, type, ...args);
        };
        window.Worker = undefined;
      });
    await page.goto("/heroes.html?hero=ultron");
    await expect(page.locator(".cinematic-stage")).toHaveAttribute(
      "data-engine",
      fallback ? "static" : /worker|main-thread/,
    );
    if (!fallback)
      await expect(page.locator(".cinematic-stage")).toHaveAttribute(
        "data-motif",
        "reactor",
      );
    await page.mouse.move(680, 500, { steps: 15 });
    await expect(page.locator(".interactive-field")).toHaveAttribute(
      "data-pointer",
      "active",
    );
    await page.mouse.click(680, 500);
    await expect(page.locator(".interactive-field")).toHaveAttribute(
      "data-pulses",
      "1",
    );
    if (!fallback)
      await expect(page.locator(".cinematic-stage")).toHaveAttribute(
        "data-pulses",
        "1",
      );
    await page.screenshot({
      path: `test-results/interactive-background-${fallback ? "fallback" : "webgl"}.png`,
    });
  }
  expect(errors).toEqual([]);
});

test("cards tilt, reveal ratings, and open a battle against the selected character", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=storm");
  const card = page.getByRole("button", { name: "Open Raven dossier" });
  await card.scrollIntoViewIfNeeded();
  const rect = await card.boundingBox();
  await page.mouse.move(
    rect.x + rect.width * 0.8,
    rect.y + rect.height * 0.25,
    { steps: 10 },
  );
  await expect(card).toHaveAttribute("data-tilt", "active");
  await expect(card.locator(".archive-hover-stats")).toHaveCSS("opacity", "1");
  await expect
    .poll(() =>
      card.evaluate((element) => element.style.transform.includes("rotateY")),
    )
    .toBe(true);
  await page.screenshot({ path: "test-results/roster-hover.png" });
  const compare = page.getByRole("link", {
    name: "Compare Storm with Raven",
    exact: true,
  });
  await expect(compare).toHaveAttribute(
    "href",
    "battle.html?hero=storm&opponent=raven&mode=balanced",
  );
  await compare.click();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("storm");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("raven");
});

test("reduced motion removes interactive effects and restores them when changed back", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=raven");
  await expect(page.locator(".interactive-field")).toHaveCount(0);
  await expect(page.locator(".cursor-system")).toHaveCount(0);
  await expect(page.locator(".archive-section")).toHaveAttribute(
    "data-motion",
    "reduced",
  );
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("full");
  await page.getByRole("button", { name: "Close settings" }).click();
  await expect(page.locator(".interactive-field")).toHaveCount(1);
  await expect(page.locator(".cursor-system")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".interactive-field")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("reduced");
  await expect(page.locator(".interactive-field")).toHaveCount(0);
  await expect(page.locator(".cursor-system")).toHaveCount(0);
});
