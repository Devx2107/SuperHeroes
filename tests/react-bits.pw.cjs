const { test, expect } = require("@playwright/test");
const heroes = require("../frontend/heroes.json");

test("decrypted labels settle, replay on hover, and retain stable accessible text", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/heroes.html?hero=joker");
  const label = page.locator(".hero-kicker .rb-decrypted");
  await expect(label).toHaveAttribute("data-decrypting", "false");
  await expect(label.locator(".rb-decrypted-visual")).toHaveText(
    heroes.joker.title,
  );
  await expect(label.locator(".rb-sr-only")).toHaveText(heroes.joker.title);
  const before = await label.boundingBox();
  await label.hover();
  await expect(label).toHaveAttribute("data-decrypting", "true");
  expect((await label.boundingBox()).width).toBeCloseTo(before.width, 0);
  await expect(label).toHaveAttribute("data-decrypting", "false");
  await expect(label.locator(".rb-decrypted-visual")).toHaveText(
    heroes.joker.title,
  );
  await page
    .getByRole("button", { name: "Open Raven dossier", exact: true })
    .click();
  await expect(page.locator(".hero-kicker .rb-decrypted-visual")).toHaveText(
    heroes.raven.title,
  );
  expect(errors).toEqual([]);
});

test("magnetic actions move within their stable hit area and still activate by keyboard", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=joker");
  const button = page.getByRole("button", {
    name: "Enter the legend",
    exact: true,
  });
  await expect(page.locator("main")).toHaveAttribute("data-phase", "idle");
  const magnet = page.locator(".hero-cta .rb-magnet");
  const before = await magnet.boundingBox();
  const relativePosition = () =>
    magnet.evaluate((node) => {
      const self = node.getBoundingClientRect(),
        parent = node.parentElement.getBoundingClientRect();
      return { x: self.x - parent.x, y: self.y - parent.y };
    });
  const beforeRelative = await relativePosition();
  await button.hover({
    position: { x: before.width * 0.8, y: before.height * 0.7 },
  });
  await expect(magnet).toHaveAttribute("data-magnet-active", "true");
  await expect
    .poll(() =>
      magnet
        .locator(".rb-magnet-inner")
        .evaluate(
          (node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41,
        ),
    )
    .toBeGreaterThan(1);
  const afterRelative = await relativePosition();
  expect(afterRelative.x).toBeCloseTo(beforeRelative.x, 0);
  expect(afterRelative.y).toBeCloseTo(beforeRelative.y, 0);
  await page.mouse.move(20, 100);
  await expect(magnet).toHaveAttribute("data-magnet-active", "false");
  await expect
    .poll(() =>
      magnet
        .locator(".rb-magnet-inner")
        .evaluate((node) =>
          Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m41),
        ),
    )
    .toBeLessThan(0.1);
  await button.focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
});

test("card glare sweeps across the artwork without blocking collection and battle actions", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=joker");
  const card = page.getByRole("button", {
    name: "Open Raven dossier",
    exact: true,
  });
  await card.hover();
  const glare = card.locator(".rb-glare"),
    band = glare.locator(".rb-glare-band");
  await expect(glare).toHaveCSS("pointer-events", "none");
  await page.waitForTimeout(350);
  await page.screenshot({ path: "test-results/react-bits-glare.png" });
  await expect
    .poll(() =>
      band.evaluate((node) => parseFloat(getComputedStyle(node).left)),
    )
    .toBeGreaterThan((await card.boundingBox()).width);
  await page.getByRole("button", { name: "Save Raven", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Unsave Raven", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Compare The Joker with Raven", exact: true })
    .click();
  await expect(page.getByLabel("Choose your hero")).toHaveValue("joker");
  await expect(page.getByLabel("Choose opponent")).toHaveValue("raven");
});

test("legend ticker responds to scrolling, pauses on request, and resumes", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=joker");
  const ticker = page.locator(".rb-velocity"),
    track = ticker.locator(".rb-velocity-track");
  await ticker.scrollIntoViewIfNeeded();
  await page.mouse.move(20, 120);
  await expect(ticker).toHaveAttribute("data-paused", "false");
  const first = await track.evaluate(
    (node) => getComputedStyle(node).transform,
  );
  await expect
    .poll(() => track.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(first);
  await page.mouse.wheel(0, -250);
  await expect
    .poll(() =>
      track.evaluate((node) =>
        Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).m21),
      ),
    )
    .toBeGreaterThan(0.001);
  await ticker.getByRole("button", { name: "Pause legend ticker" }).click();
  await expect(ticker).toHaveAttribute("data-paused", "true");
  const paused = await track.evaluate(
    (node) => getComputedStyle(node).transform,
  );
  await page.waitForTimeout(200);
  expect(await track.evaluate((node) => getComputedStyle(node).transform)).toBe(
    paused,
  );
  await page.screenshot({ path: "test-results/react-bits-ticker.png" });
  await ticker.getByRole("button", { name: "Resume legend ticker" }).click();
  await expect
    .poll(() => track.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(paused);
});

test("click sparks stay bounded, expire, and pause with the background when hidden", async ({
  page,
}) => {
  await page.goto("/heroes.html?hero=joker");
  const field = page.locator(".interactive-field");
  await expect(field).toHaveAttribute("data-visibility", "visible");
  for (let click = 0; click < 12; click++) await page.mouse.click(850, 350);
  await expect(field).toHaveAttribute("data-spark-bursts", "12");
  expect(
    Number(await field.getAttribute("data-live-sparks")),
  ).toBeLessThanOrEqual(8);
  await expect(field).toHaveAttribute("data-live-sparks", "0");
  await page.mouse.click(850, 350);
  await page.waitForTimeout(100);
  await page.screenshot({ path: "test-results/react-bits-sparks.png" });
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(field).toHaveAttribute("data-visibility", "paused");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(field).toHaveAttribute("data-visibility", "visible");
  await expect(field).toHaveAttribute("data-live-sparks", "0");
});

test("React Bits effects follow reduced motion and an explicit Full override", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/heroes.html?hero=joker");
  await expect(page.locator(".hero-kicker .rb-decrypted")).toHaveAttribute(
    "data-motion",
    "reduced",
  );
  await expect(page.locator(".hero-cta .rb-magnet")).toHaveAttribute(
    "data-motion",
    "reduced",
  );
  await expect(page.locator(".rb-glare")).toHaveCount(0);
  await expect(page.locator(".rb-velocity-static")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("full");
  await page.getByRole("button", { name: "Close settings" }).click();
  await expect(page.locator(".hero-kicker .rb-decrypted")).toHaveAttribute(
    "data-motion",
    "full",
  );
  await expect(page.locator(".hero-cta .rb-magnet")).toHaveAttribute(
    "data-motion",
    "full",
  );
  await expect(page.locator(".rb-glare")).toHaveCount(52);
  await expect(page.locator(".rb-velocity-track")).toHaveCount(1);
  await expect(page.locator(".interactive-field")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Experience settings", exact: true })
    .click();
  await page
    .getByRole("combobox", { name: "Motion", exact: true })
    .selectOption("reduced");
  await page.getByRole("button", { name: "Close settings" }).click();
  await expect(page.locator(".rb-glare")).toHaveCount(0);
  await expect(page.locator(".rb-velocity-track")).toHaveCount(0);
  await expect(page.locator(".interactive-field")).toHaveCount(0);
});
