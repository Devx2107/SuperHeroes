const rosterOrder = ["batman", "superman", "ironman", "spiderman", "wonderwoman"];
const voteRoster = ["batman", "superman", "ironman", "spiderman", "wonderwoman"];

const heroes = {
  batman: {
    id: "batman",
    name: "Batman",
    universe: "DC",
    title: "THE DARK KNIGHT",
    subtitle: "THE MAN BEHIND THE MASK",
    bgText: "BATMAN",
    cityLabel: "GOTHAM CITY",
    versions: [
      {
        actor: "CHRISTIAN BALE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Christian_Bale_2014_%28cropped%29.jpg/440px-Christian_Bale_2014_%28cropped%29.jpg",
        quote: "It's not who I am underneath, but what I do that defines me."
      },
      {
        actor: "BEN AFFLECK",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/440px-Ben_Affleck_by_Gage_Skidmore_3.jpg",
        quote: "Tell me, do you bleed? You will."
      },
      {
        actor: "MICHAEL KEATON",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Michael_Keaton_October_2014.jpg/440px-Michael_Keaton_October_2014.jpg",
        quote: "I'm Batman."
      }
    ],
    storyLeft: "He is vengeance. He is the night. Born from tragedy, forged in shadow — Gotham's last hope wears no badge, carries no gun, and fears nothing but the day his city stops fighting back.",
    storyRight: "Billionaire by day. Guardian by night. Every scar is a lesson, every shadow a weapon. He doesn't kill — the darkness obeys him. Can one man's will hold a city together when evil never sleeps?",
    ctaLabel: "ENTER THE DARK",
    wiki: "https://en.wikipedia.org/wiki/Batman",
    colors: { primary: "#ff4d4d", secondary: "#1a1a1a", accent: "#ff8c00", bg: "#0a0a0a" },
    image: "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg",
    stats: { "SUPERPOWERS": "0", "WILLPOWER": "∞", "YRS OF LEGACY": "85+" },
    abilities: ["Tactical Analysis", "Stealth Mastery", "Gadget Innovation", "Intimidation Technique"],
    heroTabs: ["GOTHAM", "BRUCE WAYNE", "THE ROGUES", "THE MUSIC"],
    villains: [
      { name: "The Joker", threat: "Anarchist", image: "https://upload.wikimedia.org/wikipedia/en/1/17/Joker_%28DC_Comics_character%29.jpg", front: "A master of chaos.", back: "The absolute antithesis to order." },
      { name: "Bane", threat: "Revolutionary", image: "https://upload.wikimedia.org/wikipedia/en/3/3e/Bane_%28DC_Comics_character%29.png", front: "The man who broke the bat.", back: "Born in the darkness." }
    ],
    timeline: [
      { year: "1939", title: "Detective Comics #27", text: "The first appearance of Batman." },
      { year: "1989", title: "Keaton Era", text: "Tim Burton redefines Batman for the screen." },
      { year: "2005", title: "Bale Era", text: "Nolan brings a grounded, gritty realism." },
      { year: "2022", title: "Pattinson Era", text: "Reeves brings a detective noir vision." }
    ],
    teamup: { partner: "Superman", synergy: 85, title: "World's Finest", text: "The ultimate contrast of power and strategy." },
    battle: { hp: 100, attack: 15, special: 25, moves: { attack: "strikes from shadows", special: "uses tactical gadgetry", guard: "deploys armored cape" } },
    trivia: [{ question: "What is Batman's secret identity?", choices: ["Bruce Wayne", "Clark Kent", "Peter Parker"], answer: 0 }],
    quizAffinity: { leader: 2, scholar: 3, rebel: 1, heart: 1, feral: 1, speedster: 1, mystic: 1 },
    badges: ["World's Greatest Detective", "Master Martial Artist", "Billionaire Strategist"],
    tag: "The Dark Knight", story: "Billionaire by day. Gotham's guardian by night."
  },
  superman: {
    id: "superman",
    name: "Superman",
    universe: "DC",
    title: "MAN OF STEEL",
    subtitle: "THE LAST SON OF KRYPTON",
    bgText: "SUPERMAN",
    cityLabel: "METROPOLIS",
    versions: [
      {
        actor: "HENRY CAVILL",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Henry_Cavill_%2848429838422%29_%28cropped%29.jpg/440px-Henry_Cavill_%2848429838422%29_%28cropped%29.jpg",
        quote: "You will give the people of Earth an ideal to strive towards."
      },
      {
        actor: "CHRISTOPHER REEVE",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Christopher_Reeve_in_September_1978.jpg/440px-Christopher_Reeve_in_September_1978.jpg",
        quote: "Easy, miss. I've got you."
      },
      {
        actor: "TYLER HOECHLIN",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tyler_Hoechlin_by_Gage_Skidmore.jpg/440px-Tyler_Hoechlin_by_Gage_Skidmore.jpg",
        quote: "The world is big, but hope is bigger."
      }
    ],
    storyLeft: "Sent to Earth from a dying world, he was raised in Smallville to be the greatest force for good the planet has ever seen. He doesn't just fly — he carries the weight of every hope.",
    storyRight: "Clark Kent is the mask. Superman is the truth. A god among mortals who chose compassion over conquest. When the sky turns dark, look up — he's already there.",
    ctaLabel: "RISE ABOVE",
    wiki: "https://en.wikipedia.org/wiki/Superman",
    colors: { primary: "#4d94ff", secondary: "#1a1a1a", accent: "#ffcc00", bg: "#0a0a0a" },
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png",
    stats: { "SUPERPOWERS": "∞", "WILLPOWER": "MAX", "YRS OF LEGACY": "85+" },
    abilities: ["Solar Absorption", "Flight", "Invulnerability", "Heat Vision"],
    heroTabs: ["METROPOLIS", "CLARK KENT", "THE VILLAINS", "THE LEGACY"],
    villains: [
      { name: "Lex Luthor", threat: "Genius", image: "https://upload.wikimedia.org/wikipedia/en/0/09/Lex_Luthor.png", front: "Humanity's self-proclaimed savior.", back: "Driven by pure envy of a god." }
    ],
    timeline: [
      { year: "1938", title: "Action Comics #1", text: "The first appearance of Superman." },
      { year: "1978", title: "Reeve Era", text: "Richard Donner makes you believe a man can fly." },
      { year: "2013", title: "Cavill Era", text: "Zack Snyder's grounded, powerful Man of Steel." }
    ],
    teamup: { partner: "Batman", synergy: 85, title: "World's Finest", text: "The ultimate contrast of power and strategy." },
    battle: { hp: 150, attack: 20, special: 35, moves: { attack: "delivers a sonic punch", special: "unleashes heat vision", guard: "stands unyielding" } },
    trivia: [{ question: "Where was Superman born?", choices: ["Earth", "Krypton", "Mars"], answer: 1 }],
    quizAffinity: { leader: 3, heart: 3, scholar: 1, rebel: 1, feral: 1, speedster: 2, mystic: 1 },
    badges: ["Last Son of Krypton", "Symbol of Hope", "Man of Tomorrow"],
    tag: "Man of Steel", story: "Sent to Earth from a dying planet."
  },
  ironman: {
    id: "ironman",
    name: "Iron Man",
    universe: "Marvel",
    title: "THE INVINCIBLE",
    subtitle: "GENIUS. BILLIONAIRE. PLAYBOY. PHILANTHROPIST.",
    bgText: "IRON MAN",
    cityLabel: "STARK TOWER",
    versions: [
      {
        actor: "ROBERT DOWNEY JR.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/440px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg",
        quote: "I am Iron Man."
      },
      {
        actor: "COMIC CLASSIC",
        image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
        quote: "The suit and I are one."
      }
    ],
    storyLeft: "Tony Stark built his first suit in a cave. With a box of scraps. What started as survival became a crusade — one man's tech against every threat the universe can throw.",
    storyRight: "He's not the strongest. Not the fastest. But he's the smartest man in every room. The armor changes, the ego stays. And when the endgame comes, he's the one who makes the sacrifice play.",
    ctaLabel: "SUIT UP",
    wiki: "https://en.wikipedia.org/wiki/Iron_Man",
    colors: { primary: "#ff4d4d", secondary: "#1a1a1a", accent: "#ffcc00", bg: "#0a0a0a" },
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
    stats: { "SUPERPOWERS": "0 (TECH)", "WILLPOWER": "MAX", "YRS OF LEGACY": "60+" },
    abilities: ["Arc Reactor Tech", "Flight Systems", "Repulsor Blasts", "JARVIS AI Integration"],
    heroTabs: ["STARK INDUSTRIES", "TONY STARK", "THE ARMORS", "THE AVENGERS"],
    villains: [
      { name: "Thanos", threat: "Titan", image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Thanos_MCU.jpg", front: "The inevitable.", back: "A mad titan with a righteous goal." },
      { name: "Obadiah Stane", threat: "Betrayer", image: "https://upload.wikimedia.org/wikipedia/en/e/ec/Iron_Monger.jpg", front: "The man behind the curtain.", back: "Corporate greed in titanium." }
    ],
    timeline: [
      { year: "1963", title: "Tales of Suspense #39", text: "Iron Man's first appearance." },
      { year: "2008", title: "MCU Launch", text: "Robert Downey Jr. kickstarts the Marvel Cinematic Universe." },
      { year: "2019", title: "Endgame", text: "\"I am Iron Man.\" The ultimate sacrifice." }
    ],
    teamup: { partner: "Spider-Man", synergy: 90, title: "Mentor & Student", text: "Tech genius meets youthful instinct." },
    battle: { hp: 110, attack: 18, special: 30, moves: { attack: "fires repulsor blast", special: "orbital unibeam strike", guard: "activates nano-shield" } },
    trivia: [{ question: "Who created Iron Man's first suit?", choices: ["Pepper Potts", "Tony Stark", "JARVIS"], answer: 1 }],
    quizAffinity: { leader: 2, scholar: 3, rebel: 2, heart: 1, feral: 1, speedster: 1, mystic: 1 },
    badges: ["Genius Inventor", "Avenger", "Arc Reactor Pioneer"],
    tag: "The Invincible Iron Man", story: "Tony Stark built the future in a cave."
  },
  spiderman: {
    id: "spiderman",
    name: "Spider-Man",
    universe: "Marvel",
    title: "SPIDER-MAN",
    subtitle: "WITH GREAT POWER...",
    bgText: "SPIDER-MAN",
    cityLabel: "NEW YORK",
    versions: [
      { actor: "TOM HOLLAND", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/440px-Tom_Holland_by_Gage_Skidmore.jpg", quote: "I'm just a friendly neighborhood Spider-Man." },
      { actor: "TOBEY MAGUIRE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/440px-Tobey_Maguire_2014.jpg", quote: "With great power comes great responsibility." }
    ],
    storyLeft: "Bitten by a radioactive spider, Peter Parker balances high school with heroism.",
    storyRight: "He stays for the little things while fighting the biggest threats in the multiverse.",
    ctaLabel: "SWING IN",
    wiki: "https://en.wikipedia.org/wiki/Spider-Man",
    colors: { primary: "#ff4d4d", secondary: "#1a1a1a", accent: "#4d94ff", bg: "#0a0a0a" },
    image: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    stats: { "SUPERPOWERS": "12", "WILLPOWER": "HIGH", "YRS OF LEGACY": "60+" },
    abilities: ["Wall Crawling", "Web Shooting", "Spider-Sense", "Peak Human Condition"],
    heroTabs: ["NEW YORK", "PETER PARKER", "THE ROGUES", "THE MULTIVERSE"],
    villains: [{ name: "Green Goblin", threat: "Psycho", image: "https://upload.wikimedia.org/wikipedia/en/e/e9/Green_Goblin_%28Alex_Ross%27s_art%29.jpg", front: "The Osborne curse.", back: "A glider and a grin." }],
    timeline: [{ year: "1962", title: "Amazing Fantasy #15", text: "The first appearance of Spider-Man." }],
    teamup: { partner: "Iron Man", synergy: 90, title: "Mentor and Student", text: "Tech meets instinct." },
    battle: { hp: 90, attack: 12, special: 22, moves: { attack: "webs and strikes", special: "coordinated web-blast", guard: "evades with spider-sense" } },
    trivia: [{ question: "What is Spider-Man's real name?", choices: ["Peter Parker", "Miles Morales", "Gwen Stacy"], answer: 0 }],
    quizAffinity: { heart: 3, scholar: 2, rebel: 2, leader: 1, feral: 1, speedster: 3, mystic: 1 },
    badges: ["Web-Slinger", "Wall-Crawler", "Spider-Sense"],
    tag: "The Friendly Neighborhood Spider-Man", story: "A kid from Queens, bitten by greatness."
  },
  wonderwoman: {
    id: "wonderwoman",
    name: "Wonder Woman",
    universe: "DC",
    title: "DIANA PRINCE",
    subtitle: "THE AMAZON WARRIOR",
    bgText: "WONDER WOMAN",
    cityLabel: "THEMYSCIRA",
    versions: [
      { actor: "GAL GADOT", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Gal_Gadot_%2833646498484%29_%28cropped2%29.jpg/440px-Gal_Gadot_%2833646498484%29_%28cropped2%29.jpg", quote: "I will fight for those who cannot fight for themselves." },
      { actor: "LYNDA CARTER", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lynda_Carter_1977.jpg/440px-Lynda_Carter_1977.jpg", quote: "All the world is waiting for you." }
    ],
    storyLeft: "Raised among the Amazons, Diana left Themyscira to bring peace to a world at war.",
    storyRight: "Daughter of Hippolyta, champion of truth. She wields the lasso, and the lasso never lies.",
    ctaLabel: "TRUTH AWAITS",
    wiki: "https://en.wikipedia.org/wiki/Wonder_Woman",
    colors: { primary: "#ffcc00", secondary: "#1a1a1a", accent: "#ff4d4d", bg: "#0a0a0a" },
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Wonder_Woman.jpg",
    stats: { "SUPERPOWERS": "8", "WILLPOWER": "INFINITE", "YRS OF LEGACY": "80+" },
    abilities: ["Lasso of Truth", "Indestructible Bracelets", "Super Strength", "Flight"],
    heroTabs: ["THEMYSCIRA", "DIANA", "THE GODS", "THE LEGACY"],
    villains: [{ name: "Ares", threat: "God", image: "https://upload.wikimedia.org/wikipedia/en/7/72/AresMarvel.jpg", front: "The god of war.", back: "Eternal conflict embodied." }],
    timeline: [{ year: "1941", title: "All Star Comics #8", text: "The first appearance of Wonder Woman." }],
    teamup: { partner: "Batman", synergy: 82, title: "Justice League Founders", text: "Wisdom and strategy." },
    battle: { hp: 120, attack: 18, special: 30, moves: { attack: "strikes with bracelets", special: "lasso of truth bind", guard: "deflects with bracelets" } },
    trivia: [{ question: "What is Wonder Woman's weapon of truth?", choices: ["Sword", "Lasso", "Shield"], answer: 1 }],
    quizAffinity: { leader: 3, heart: 2, scholar: 1, rebel: 2, feral: 1, speedster: 1, mystic: 2 },
    badges: ["Amazonian Princess", "Champion of Truth", "Goddess of War"],
    tag: "Amazon Warrior", story: "From Themyscira to the world of men."
  }
};

const quizQuestions = [
  {
    prompt: "A crisis hits your city. What is your first instinct?",
    answers: [
      { label: "Take command and coordinate everyone", weights: { leader: 3, heart: 1 } },
      { label: "Improvise a risky move nobody else sees yet", weights: { rebel: 2, scholar: 1 } },
      { label: "Protect the most vulnerable first", weights: { heart: 3 } },
      { label: "Study the pattern before striking", weights: { scholar: 3, mystic: 1 } }
    ]
  },
  {
    prompt: "Which flaw do you battle most often?",
    answers: [
      { label: "Pride", weights: { leader: 1, scholar: 1 } },
      { label: "Isolation", weights: { rebel: 2, feral: 1 } },
      { label: "Overthinking", weights: { scholar: 2, speedster: 1 } },
      { label: "Feeling too much", weights: { heart: 2, mystic: 2 } }
    ]
  }
];

const appState = {
  selectedHeroId: "batman",
  selectedVersionIndex: 0,
  actorRevealed: false,
  battle: { active: false, heroId: "batman", enemyId: "superman", heroHp: 0, enemyHp: 0, heroGuarded: false, enemyGuarded: false, ended: false },
  quiz: { index: 0, scores: {}, complete: false, resultId: null },
  trivia: { deck: [], index: 0, score: 0, answered: false, complete: false },
  vote: { board: [], total: 0, message: "Loading shared totals..." }
};

const STORAGE_KEY = "legendrium-selection-v1";
const THEME_KEY = "legendrium-theme-v1";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const elements = {};
function cacheElements() {
  const ids = [
    "heroNav", "dossierTitle", "dossierSubtitle", "versionSelector",
    "dossierStoryLeft", "dossierStoryRight", "dossierImage", "actorImage",
    "dossierStats", "bgText", "cityLabel", "ctaBtn", "heroImageArea",
    "villainGrid", "timelineRail", "teamupCard",
    "battleOpponent", "battleStatus", "battleHeroName", "battleEnemyName",
    "battleHeroImage", "battleEnemyImage", "battleHeroHealth", "battleEnemyHealth", "battleLog",
    "quizCard", "triviaCard",
    "voteButtons", "voteMessage", "voteTotal", "voteBoard",
    "externalHeroCard", "themeToggle", "cursorDot", "cursorRing",
    "dcDropdownBtn", "dcDropdownMenu", "marvelDropdownBtn", "marvelDropdownMenu",
    "heroSubtabs"
  ];
  ids.forEach(id => { elements[id] = document.getElementById(id); });
}

function resolveDisplayHero() { return heroes[appState.selectedHeroId]; }

function persistSelection() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    selectedHeroId: appState.selectedHeroId,
    selectedVersionIndex: appState.selectedVersionIndex
  }));
}

function restoreSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.selectedHeroId && heroes[saved.selectedHeroId]) appState.selectedHeroId = saved.selectedHeroId;
    if (Number.isInteger(saved.selectedVersionIndex)) appState.selectedVersionIndex = saved.selectedVersionIndex;
  } catch (e) { localStorage.removeItem(STORAGE_KEY); }
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  if (elements.themeToggle) elements.themeToggle.textContent = theme === "light" ? "☀" : "☾";
}
function restoreTheme() { applyTheme(localStorage.getItem(THEME_KEY) || "dark"); }
function toggleTheme() {
  const next = document.body.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

function setTheme(hero) {
  document.documentElement.style.setProperty("--primary", hero.colors.primary);
  document.documentElement.style.setProperty("--secondary", hero.colors.secondary);
  document.documentElement.style.setProperty("--accent", hero.colors.accent);
  document.documentElement.style.setProperty("--bg", hero.colors.bg);
}

/* ── Dropdown Menus ── */
function buildDropdowns() {
  const dcHeroes = rosterOrder.filter(id => heroes[id].universe === "DC");
  const marvelHeroes = rosterOrder.filter(id => heroes[id].universe === "Marvel");

  if (elements.dcDropdownMenu) {
    elements.dcDropdownMenu.innerHTML = dcHeroes.map(id => `
      <button class="dropdown-hero-item ${appState.selectedHeroId === id ? 'active' : ''}" data-hero="${id}">${heroes[id].name}</button>
    `).join("");
    elements.dcDropdownMenu.querySelectorAll(".dropdown-hero-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectHero(btn.dataset.hero);
        closeAllDropdowns();
      });
    });
  }
  if (elements.marvelDropdownMenu) {
    elements.marvelDropdownMenu.innerHTML = marvelHeroes.map(id => `
      <button class="dropdown-hero-item ${appState.selectedHeroId === id ? 'active' : ''}" data-hero="${id}">${heroes[id].name}</button>
    `).join("");
    elements.marvelDropdownMenu.querySelectorAll(".dropdown-hero-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectHero(btn.dataset.hero);
        closeAllDropdowns();
      });
    });
  }
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-menu").forEach(m => m.classList.remove("open"));
  document.querySelectorAll(".dropdown-btn").forEach(b => b.classList.remove("open"));
}

function initDropdowns() {
  if (elements.dcDropdownBtn) {
    elements.dcDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = elements.dcDropdownMenu.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) { elements.dcDropdownMenu.classList.add("open"); elements.dcDropdownBtn.classList.add("open"); }
    });
  }
  if (elements.marvelDropdownBtn) {
    elements.marvelDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = elements.marvelDropdownMenu.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) { elements.marvelDropdownMenu.classList.add("open"); elements.marvelDropdownBtn.classList.add("open"); }
    });
  }
  document.addEventListener("click", closeAllDropdowns);
}

function selectHero(id) {
  appState.selectedHeroId = id;
  appState.selectedVersionIndex = 0;
  appState.actorRevealed = false;
  persistSelection();
  renderHeroExperience();
}

/* ── Cinematic Splash Rendering ── */
function renderDossier() {
  const hero = resolveDisplayHero();
  const version = hero.versions[appState.selectedVersionIndex];

  if (elements.bgText) elements.bgText.textContent = hero.bgText;
  if (elements.cityLabel) elements.cityLabel.textContent = `— ${hero.cityLabel}`;
  if (elements.dossierTitle) elements.dossierTitle.textContent = hero.title;
  if (elements.dossierSubtitle) elements.dossierSubtitle.textContent = hero.subtitle;
  if (elements.dossierStoryLeft) elements.dossierStoryLeft.textContent = hero.storyLeft;
  if (elements.dossierStoryRight) elements.dossierStoryRight.textContent = hero.storyRight;

  // Hero image (character)
  if (elements.dossierImage) {
    elements.dossierImage.src = hero.image;
    elements.dossierImage.alt = hero.name;
  }
  // Actor image (revealed on hover)
  if (elements.actorImage) {
    elements.actorImage.src = version.image;
    elements.actorImage.alt = version.actor;
  }

  // CTA button
  if (elements.ctaBtn) {
    elements.ctaBtn.textContent = hero.ctaLabel;
    elements.ctaBtn.onclick = () => window.open(hero.wiki, "_blank");
  }

  // Version selector tabs
  if (elements.versionSelector) {
    elements.versionSelector.innerHTML = hero.versions.map((v, i) => `
      <button class="version-btn ${appState.selectedVersionIndex === i ? 'active' : ''}" data-index="${i}">${v.actor}</button>
    `).join("");
    elements.versionSelector.querySelectorAll(".version-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        appState.selectedVersionIndex = parseInt(e.target.dataset.index);
        renderDossier();
        persistSelection();
      });
    });
  }

  // Hero sub-tabs (decorative for now)
  if (elements.heroSubtabs) {
    elements.heroSubtabs.innerHTML = hero.heroTabs.map((tab, i) => `
      <button class="hero-subtab ${i === 0 ? 'active' : ''}">${tab}</button>
    `).join("");
  }

  // Stats
  if (elements.dossierStats) {
    elements.dossierStats.innerHTML = Object.entries(hero.stats).map(([label, value]) => `
      <div class="stat-item"><span class="stat-value">${value}</span><span class="stat-label">${label}</span></div>
    `).join("");
  }

  // Update dropdown active states
  buildDropdowns();
}

function renderHeroExperience() {
  const hero = resolveDisplayHero();
  setTheme(hero);
  renderDossier();
  renderVillains(hero);
  renderTimeline(hero);
  renderTeamUp(hero);
  renderBattleHeroName();
}

function renderVillains(hero) {
  if (!elements.villainGrid) return;
  elements.villainGrid.innerHTML = hero.villains.map(v => `
    <article class="villain-card reveal visible" tabindex="0">
      <div class="villain-card-inner">
        <div class="villain-face front"><img src="${v.image}" alt="${v.name}"><span class="threat">${v.threat}</span><h3>${v.name}</h3><p>${v.front}</p></div>
        <div class="villain-face back"><span class="threat">Why it matters</span><h3>${v.name}</h3><p>${v.back}</p></div>
      </div>
    </article>
  `).join("");
}

function renderTimeline(hero) {
  if (!elements.timelineRail) return;
  elements.timelineRail.innerHTML = hero.timeline.map(e => `
    <article class="timeline-card"><time>${e.year}</time><h3>${e.title}</h3><p>${e.text}</p></article>
  `).join("");
}

function renderTeamUp(hero) {
  if (!elements.teamupCard) return;
  elements.teamupCard.innerHTML = `
    <div><p class="eyebrow">Recommended pairing</p><h3>${hero.teamup.partner}</h3><p><strong>${hero.teamup.title}</strong></p><p>${hero.teamup.text}</p></div>
    <div class="synergy-meter"><strong>${hero.teamup.synergy}% synergy</strong><div class="meter"><span style="width:${hero.teamup.synergy}%"></span></div></div>
  `;
}

/* ── Battle ── */
function buildBattleOpponents() {
  if (!elements.battleOpponent) return;
  elements.battleOpponent.innerHTML = rosterOrder.filter(id => id !== appState.selectedHeroId)
    .map(id => `<option value="${id}">${heroes[id].name}</option>`).join("");
}
function renderBattleHeroName() {
  if (!elements.battleHeroName) return;
  const hero = resolveDisplayHero();
  elements.battleHeroName.textContent = hero.name;
  if (elements.battleHeroImage) { elements.battleHeroImage.src = hero.image; elements.battleHeroImage.alt = hero.name; }
}
function prepareBattle() {
  if (!elements.battleOpponent) return;
  buildBattleOpponents();
  const heroId = appState.selectedHeroId;
  const enemyId = elements.battleOpponent.value || rosterOrder.find(id => id !== heroId);
  appState.battle = { active: false, heroId, enemyId, heroHp: heroes[heroId].battle.hp, enemyHp: heroes[enemyId].battle.hp, heroGuarded: false, enemyGuarded: false, ended: false };
  renderBattleState("Ready for showdown.");
}
function startBattle() {
  const { heroId, enemyId } = appState.battle;
  appState.battle.active = true; appState.battle.ended = false;
  if (elements.battleLog) elements.battleLog.innerHTML = "";
  logBattle(`${heroes[heroId].name} vs ${heroes[enemyId].name}`);
  renderBattleState("Battle in progress.");
}
function logBattle(text) {
  if (!elements.battleLog) return;
  const li = document.createElement("li"); li.textContent = text; elements.battleLog.prepend(li);
}
function renderBattleState(msg) {
  if (!elements.battleStatus) return;
  const { heroId, enemyId, heroHp, enemyHp, active, ended } = appState.battle;
  elements.battleStatus.textContent = msg;
  if (elements.battleHeroName) elements.battleHeroName.textContent = heroes[heroId].name;
  if (elements.battleEnemyName) elements.battleEnemyName.textContent = heroes[enemyId].name;
  if (elements.battleHeroHealth) elements.battleHeroHealth.style.width = `${(heroHp / heroes[heroId].battle.hp) * 100}%`;
  if (elements.battleEnemyHealth) elements.battleEnemyHealth.style.width = `${(enemyHp / heroes[enemyId].battle.hp) * 100}%`;
  ["actionAttack", "actionSpecial", "actionGuard"].forEach(id => { const b = document.getElementById(id); if (b) b.disabled = !active || ended; });
}
function performHeroAction(type) {
  const s = appState.battle; if (!s.active || s.ended) return;
  const hero = heroes[s.heroId]; s.heroGuarded = false;
  if (type === "guard") { s.heroGuarded = true; logBattle(`${hero.name} ${hero.battle.moves.guard}`); }
  else { const dmg = Math.floor((type === "special" ? hero.battle.special : hero.battle.attack) * (s.enemyGuarded ? 0.6 : 1)); s.enemyHp = Math.max(0, s.enemyHp - dmg); s.enemyGuarded = false; logBattle(`${hero.name} ${hero.battle.moves[type]} for ${dmg}`); }
  if (s.enemyHp <= 0) { s.ended = true; renderBattleState(`${hero.name} wins!`); return; }
  enemyTurn();
}
function enemyTurn() {
  const s = appState.battle; const enemy = heroes[s.enemyId]; const roll = Math.random(); s.enemyGuarded = false;
  if (roll < 0.3) { s.enemyGuarded = true; logBattle(`${enemy.name} ${enemy.battle.moves.guard}`); }
  else { const sp = roll > 0.8; const dmg = Math.floor((sp ? enemy.battle.special : enemy.battle.attack) * (s.heroGuarded ? 0.6 : 1)); s.heroHp = Math.max(0, s.heroHp - dmg); s.heroGuarded = false; logBattle(`${enemy.name} ${enemy.battle.moves[sp ? "special" : "attack"]} for ${dmg}`); }
  if (s.heroHp <= 0) { s.ended = true; renderBattleState(`${enemy.name} wins!`); return; }
  renderBattleState("Your turn.");
}

/* ── Quiz ── */
function resetQuiz() { appState.quiz = { index: 0, scores: {}, complete: false, resultId: null }; renderQuiz(); }
function scoreQuizAnswer(weights) {
  Object.entries(weights).forEach(([t, v]) => appState.quiz.scores[t] = (appState.quiz.scores[t] || 0) + v);
  appState.quiz.index++;
  if (appState.quiz.index >= quizQuestions.length) { appState.quiz.complete = true; appState.quiz.resultId = rosterOrder[0]; }
  renderQuiz();
}
function renderQuiz() {
  if (!elements.quizCard) return;
  if (appState.quiz.complete) {
    const hero = heroes[appState.quiz.resultId];
    elements.quizCard.innerHTML = `<h4>Matched: ${hero.name}</h4><button id="quizReset">Restart</button>`;
    document.getElementById("quizReset").addEventListener("click", resetQuiz); return;
  }
  const q = quizQuestions[appState.quiz.index];
  elements.quizCard.innerHTML = `<h4>${q.prompt}</h4><div id="qOpts"></div>`;
  q.answers.forEach(a => { const btn = document.createElement("button"); btn.textContent = a.label; btn.addEventListener("click", () => scoreQuizAnswer(a.weights)); document.getElementById("qOpts").appendChild(btn); });
}

/* ── Trivia ── */
function buildTriviaDeck() { appState.trivia.deck = rosterOrder.map(id => ({ ...heroes[id].trivia[0], heroId: id })); appState.trivia.index = 0; appState.trivia.score = 0; }
function renderTrivia(feedback = "") {
  if (!elements.triviaCard) return;
  const current = appState.trivia.deck[appState.trivia.index];
  elements.triviaCard.innerHTML = `<h4>${current.question}</h4><div id="tOpts"></div><p>${feedback}</p>`;
  current.choices.forEach((c, i) => {
    const btn = document.createElement("button"); btn.textContent = c;
    btn.addEventListener("click", () => { const ok = i === current.answer; if (ok) appState.trivia.score++; appState.trivia.index++; if (appState.trivia.index >= appState.trivia.deck.length) elements.triviaCard.innerHTML = `<h4>Score: ${appState.trivia.score}</h4>`; else renderTrivia(ok ? "Correct!" : "Wrong."); });
    document.getElementById("tOpts").appendChild(btn);
  });
}

/* ── Votes ── */
async function fetchVotes() { try { const r = await fetch("/api/votes"); const d = await r.json(); appState.vote.board = d.board; renderVoteBoard(); } catch(e){} }
async function submitVote(heroId) { try { const r = await fetch("/api/votes", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({heroId}) }); const d = await r.json(); appState.vote.board = d.board; renderVoteBoard(); } catch(e){} }
function renderVoteBoard() {
  if (!elements.voteButtons) return;
  elements.voteButtons.innerHTML = voteRoster.map(id => `<button onclick="submitVote('${id}')">${heroes[id].name}</button>`).join("");
  if (elements.voteBoard) elements.voteBoard.innerHTML = appState.vote.board.map(e => `<div>${e.label}: ${e.votes}</div>`).join("");
}

/* ── Utilities ── */
function initRevealObserver() {
  const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("visible")), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(n => obs.observe(n));
}
function initThemeToggle() { if (elements.themeToggle) elements.themeToggle.addEventListener("click", toggleTheme); }
function initBattleEvents() {
  const start = document.getElementById("battleStart"); if (start) start.addEventListener("click", startBattle);
  ["Attack", "Special", "Guard"].forEach(type => { const b = document.getElementById("action" + type); if (b) b.addEventListener("click", () => performHeroAction(type.toLowerCase())); });
}
async function fetchExternalHeroData() {}

/* ── Init ── */
function init() {
  cacheElements();
  restoreSelection();
  restoreTheme();
  initRevealObserver();
  initThemeToggle();
  initDropdowns();
  renderHeroExperience();
  if (elements.battleOpponent) { prepareBattle(); initBattleEvents(); }
  if (elements.quizCard) resetQuiz();
  if (elements.triviaCard) { buildTriviaDeck(); renderTrivia(); }
  if (elements.voteButtons) { renderVoteBoard(); fetchVotes(); }
}

window.submitVote = submitVote;
init();
