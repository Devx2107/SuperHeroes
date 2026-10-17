# SuperHeroes

Legendrium is a desktop cinematic superhero archive built with React, Framer Motion, GSAP, and Three.js, backed by Express. All five tabs share the cinematic React shell, atmosphere, preferences, and navigation. The roster includes **52 dossiers: 32 heroes, 7 antiheroes, and 13 villains**, using five atmosphere motifs with character-specific accents and emblems.

## Features

- Animated power stats bars
- Portrait matchups with six-attribute comparisons, radar charts, Balanced/Tactical/Powerhouse scoring, random opponents, side swapping, and shareable matchup links
- Villain counterpart cards
- Movie timeline scroll
- Cinematic intro and comic-panel parallax
- Team-up section
- Dark-only cinematic theme
- Character and identity search, hero/antihero/villain and universe filters, archive sorting, saved collections, and filtered random discovery
- Global keyboard character finder, pointer-reactive background particles, click ripples, contextual cursor trails, and tilting roster cards with hover ratings and quick battle links
- React Bits effects: decrypted dossier labels, magnetic action buttons, click sparks, reflective card sweeps, and a scroll-reactive legend ticker with pause/resume
- Twenty-question hero alignment quiz with editable result reviews, keyboard choices, live trait scores, weighted hero matches, related dossiers, and saved progress/results across refreshes
- Three trivia difficulties with timed and untimed practice modes, optional question shuffling, pause/resume, explanations, scoring, streaks, missed-answer reviews, and personal records for each difficulty and mode
- Visual fan ballot and shared leaderboard with serialized JSON persistence, vote locks shared across browser tabs, request timeouts, retry, and duplicate-vote handling
- REST API for heroes, search, votes, and external superhero enrichment
- Rate limiting and centralized error handling
- Modular Express routes and middleware
- Jest and Supertest API smoke tests
- Persistent Three.js atmosphere with OffscreenCanvas worker rendering and a main-thread fallback
- Hero color floods, letter entrances, chromatic portrait reveals, and six depth layers
- Pinned horizontal origin, power, nemesis, timeline, and quote chapters
- Hero-specific springs, SVG cursor morphs, radial buttons, and perspective actor flips
- Local featured artwork and fonts, image fallbacks, reduced motion, and quality controls
- URL/history navigation and shared hero selection across the feature pages
- Playwright interaction, fallback, and scene lifecycle tests

## Run locally

If dependencies are already installed, the Windows launcher builds and starts the app without requiring `npm.cmd`:

```powershell
cd "C:\Users\DevX\Desktop\Coding\SuperHeroes"
.\start.cmd
```

The launcher uses Node from your PATH, or the bundled Codex runtime when available. Use `.\start.cmd --build` to build without starting the server.

For a fresh installation with Node and npm installed:

```powershell
cd "C:\Users\DevX\Desktop\Coding\SuperHeroes"
npm.cmd install
npm.cmd start
```

Open `http://127.0.0.1:3000/heroes.html`

`npm start` builds the frontend before starting Express. To work with hot reload, keep Express running and open a second terminal:

```powershell
npm.cmd run dev
```

The development frontend runs at `http://127.0.0.1:5173/heroes.html` and proxies API requests to port 3000. A production build is available with `npm.cmd run build`.

If PowerShell cannot find `npm.cmd`, this machine also has a bundled Node runtime. With dependencies already present, use:

```powershell
cd "C:\Users\DevX\Desktop\Coding\SuperHeroes"
$legendriumNode = "C:\Users\DevX\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
& $legendriumNode node_modules/vite/bin/vite.js build
& $legendriumNode server.js
```

For hot reload in a second terminal, use `& $legendriumNode node_modules/vite/bin/vite.js --host 127.0.0.1`. Set `$legendriumNode` in that terminal as well.

Use `?hero=thor` (or another archive ID) to link directly to a dossier. Experience settings are available from the slider icon in the header; motion and atmosphere preferences persist locally.

Settings support keyboard focus, Escape, and backdrop dismissal. Quiz progress saves automatically on this browser; use **Start over** to clear it. If browser storage is blocked, the quiz still works for the current tab.

Save heroes with the heart on their archive cards, then use **My collection** to revisit them. Sorting and **Surprise me** respect your current search and filters. Saved collections sync between tabs in the same browser.

Open **Find a character** from any page, or press **Ctrl+K**, **Cmd+K**, or **/** outside a text field. Search names, identities, universes, and abilities; use the arrow keys and Enter to open a result, or Escape to close. Hover a roster card to tilt its portrait, reveal power/intelligence/combat ratings, and use its crossed-swords link to compare that character with the current dossier.

Moving the pointer bends nearby background particles and brings a glow through the atmosphere. Click the scene to send out expanding energy rings. The contextual cursor follows with spring trails and labels interactive controls; text fields and dialogs retain the native cursor. Reduced motion disables the custom cursor, animated background, and card tilt. The particle field also works when WebGL is unavailable, and pauses while the page is hidden.

[React Bits](https://reactbits.dev/) effects are adapted to the existing experience. Dossier and activity labels decrypt on entry and hover, action buttons ease toward the pointer, scene clicks release sparks, and roster cards catch a diagonal light sweep. The legend ticker speeds up and changes direction with scrolling; hover it or use **Pause legend ticker** to stop the flow. These effects follow the shared motion setting, including an explicit Full override of the operating system preference. Reduced motion keeps text readable and the ticker static. Source links and the upstream license are preserved in `frontend/react-bits/`.

The first expansion adds Daredevil, Black Widow, Captain Marvel, Scarlet Witch, Ant-Man, Green Arrow, Supergirl, Shazam, Deadpool, Venom, Harley Quinn, Joker, Lex Luthor, Darkseid, Deathstroke, Loki, Thanos, Doctor Doom, Magneto, and Green Goblin. The latest batch adds **Storm, Cyclops, Jean Grey, Vision, Mister Fantastic, Cyborg, Zatanna, Raven, Moon Knight, Punisher, Ghost Rider, Catwoman, Ultron, Carnage, Bane, and Brainiac**. Every addition has local artwork, origin and power chapters, an opposing character, an editorial legacy, and six battle ratings. Character type reflects the version featured in each dossier; characters such as Loki, Magneto, and Scarlet Witch have other roles in different stories. The alignment quiz matches heroes and antiheroes. All 52 characters are available in the battle arena.

Battle styles explain their attribute weights above the comparison. The radar always shows the original ratings. **Share matchup** copies a link containing both heroes and the selected style, with a selectable link fallback when clipboard access is unavailable. These are editorial ratings, not predictions of a canonical fight.

Use **1–4** or **A–D** to choose answers in Quiz and Trivia. Quiz result reviews let you edit any choice and update the result immediately. Trivia **Practice** removes the time limit; **Shuffle questions** changes the order for every new round. Completed rounds save personal records on this browser, separately for each difficulty and mode. Storage restrictions leave the current round playable.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed.

- `PORT`: local server port
- `SUPERHERO_API_BASE_URL`: optional external hero API base URL
- `SUPERHERO_API_TOKEN`: optional bearer token for that API
- `VOTE_FILE`: path to JSON vote persistence file

## API endpoints

- `GET /api/health`
- `GET /api/heroes`
- `GET /api/heroes/:id`
- `GET /api/heroes/:id/external`
- `GET /api/search?q=thor&universe=all&alignment=all` (alignment: `all`, `hero`, `antihero`, or `villain`)
- `GET /api/votes`
- `POST /api/votes`

Example vote payload:

```json
{
  "heroId": "thor"
}
```

## Tests

```powershell
npm.cmd test
```

Browser tests exercise the built frontend and require Playwright's browser installation:

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:browser
```

On Windows, an installed Edge browser can be used instead:

```powershell
$env:PLAYWRIGHT_CHANNEL = "msedge"
npm.cmd run test:browser
```

The browser suite checks all five featured signatures across twenty switches, rapid navigation, history/refresh, pinned chapters, archive discovery and collections, keyboard settings and actor interaction, persisted preferences, renderer resizing, and worker/main-thread/static fallbacks. Expanded roster checks open all thirty-six additions, verify their local portraits and chapters, combine character type, publisher, and identity filters, save a villain, compare new characters, and validate hero and antihero quiz results. Interaction checks exercise keyboard search and focus restoration, contextual and native cursors, card tilt and quick battle links, pointer/click effects with and without WebGL, and reduced-motion settings. Feature checks cover desktop layouts, weighted battle totals and share links, saved alignment results and result editing, blocked browser storage, complete timed and practice trivia rounds, shuffled decks, personal records, timeouts, and voting success/error/timeout/duplicate flows across tabs. Browser voting checks mock the API. Backend tests use temporary vote files and exercise concurrent submissions, duplicate locks, expanded profiles, and filtered search. Screenshots and traces are written to ignored `test-results/`.

The React Bits browser checks additionally cover stable accessible decryption, magnetic button hit areas and keyboard activation, card glare with collection/battle controls, ticker scrolling and pause/resume, bounded spark lifetimes, hidden-tab behavior, and reduced-motion overrides.

## Frontend structure

- `frontend/App.jsx`: hero state, presence boundary, transition director, history, persistent navigation, preferences.
- `frontend/motion.js`: shared cubic-bezier dictionary, hero signatures, route variants, GSAP registration.
- `frontend/CinematicStage.jsx`: persistent rendering host, worker selection, fallback, resize, visibility, diagnostics.
- `frontend/scene-engine.js`: atmosphere shader, particles, shards, web growth, storm arcs, and reactor rings.
- `frontend/atmosphere.worker.js`: OffscreenCanvas renderer lifecycle and messages.
- `frontend/PointerField.jsx`: pointer motion values, compatible SVG cursor morphs, trailing springs.
- `frontend/InteractiveField.jsx`: bounded pointer-reactive Canvas particles and click ripples, including the non-WebGL fallback.
- `frontend/CharacterFinder.jsx`: modal global character search and keyboard navigation.
- `frontend/interactions.css`: finder, cursor, and interactive archive styles.
- `frontend/react-bits/`: adapted React Bits effects, shared preference handling, styles, source attribution, and license.
- `frontend/HeroExperience.jsx`: opening composition, nested pointer/scroll wrappers, portrait entry, actor cards.
- `frontend/KineticHeading.jsx`: grapheme splitting, masked entry, breathing, proximity repulsion.
- `frontend/StoryRail.jsx`: pinned GSAP master timeline and reversible chapter effects.
- `frontend/Microinteractions.jsx`: reusable buttons, navigation, image fallbacks, emblems, and flip cards.
- `frontend/Archive.jsx`: full roster search, universe filters, sorting, and saved collections.
- `frontend/useSavedHeroes.js`: validated collection storage and cross-tab updates.
- `frontend/FeaturePages.jsx`: battle comparisons, alignment quiz, trivia rounds, and connected fan voting, loaded separately from the roster.
- `frontend/RadarChart.jsx`: accessible SVG comparison of six archive attributes.
- `frontend/features.css`: cinematic activity layouts and controls.
- `frontend/challenges.json`: original twenty-question quiz and three trivia decks.
- `frontend/quiz-progress.js`: validated quiz restoration and optional browser persistence.
- `frontend/trivia-records.js`: validated personal records with separate difficulty and mode entries.
- `frontend/vote-api.js`: bounded vote requests and leaderboard response validation.
- `frontend/heroes.json`: existing editorial archive content imported into the React frontend.
- `scripts/new-characters.json`: editable source for the first twenty expanded dossiers, including official publisher profile links.
- `scripts/next-characters.json`: editable source for the next sixteen dossiers.
- `scripts/roster-additions.cjs`: combines both expansion sources for generation, artwork caching, and validation.
- `scripts/expand-roster.cjs`: rebuilds expanded dossier content from those sources.

Motion owns presence and interactive springs, GSAP owns scroll timelines and glyph choreography, and Three.js owns the atmosphere. Separate nested wrappers prevent engines from writing the same transform. Pointer and render-frame updates do not use React state.

The renderer retains one active scene group and temporarily one outgoing group, disposing obsolete geometry and materials after the crossfade. Rendering and worker frame scheduling pause in hidden tabs. The canvas fits its visible container and keeps current pixel density when quality changes. Reduced motion removes the renderer and pinned scrolling; balanced quality bypasses bloom. Development diagnostics are available on `.cinematic-stage` through `data-engine`, `data-visibility`, `data-geometries`, `data-textures`, and `data-frame-ms`.

## Assets

`public/art/` contains locally cached archive artwork. `frontend/art.json` maps the cached files; unavailable original images retain their remote URLs and have designed visual fallbacks. `public/fonts/` contains the Latin font faces used by the React experience. Original image references remain in `frontend/heroes.json`.

Expanded portraits are sourced from the [Superhero API artwork catalog](https://github.com/akabab/superhero-api). Characters and their artwork belong to their respective rights holders. New dossier text is original editorial copy; each dossier links to its official [Marvel](https://www.marvel.com/characters) or [DC](https://www.dc.com/characters) character profile. New profiles use thematic chapters rather than invented film appearances or attributed quotes.

To refresh the expanded portrait cache, then regenerate the expanded dossiers:

```powershell
node scripts/cache-roster-art.cjs
node scripts/expand-roster.cjs
```

To retry available artwork downloads or refresh the font cache:

```powershell
npm.cmd run cache:art
node scripts/cache-fonts.cjs
```

The atmosphere uses bounded particles, instanced shards, procedural fog, selective entry distortion, and bloom. Visual smoothness depends on desktop hardware; a reference-PC 60 fps/1440p benchmark has not been established.

## Deploy

JSON voting uses one Express process and a writable data directory. For durable hosted votes, configure persistent storage. Multiple server instances and serverless deployments need a shared transactional database; local JSON files do not provide cross-process coordination or durable serverless storage.

### Render

- Create a new Web Service from this repo
- Build command: `npm install`
- Start command: `npm start`
- Add any needed env vars from `.env.example`

### Vercel

- Import the repo into Vercel
- Use the included `vercel.json`
- Add any needed env vars from `.env.example`
