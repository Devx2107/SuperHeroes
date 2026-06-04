# SuperHeroes

Hero Hub is a cinematic multi-page superhero experience with roster browsing, battle simulation, villain cards, timelines, quiz, trivia, search, and a shared fan vote board.

## Features

- Animated power stats bars
- Battle simulator UI
- Villain counterpart cards
- Movie timeline scroll
- Cinematic intro and comic-panel parallax
- Team-up section
- Dark-only cinematic theme
- Hero search and filter
- Which hero are you quiz
- Superhero trivia game
- Fan vote board with JSON persistence
- REST API for heroes, search, votes, and external superhero enrichment
- Rate limiting and centralized error handling
- Modular Express routes and middleware
- Jest and Supertest API smoke tests

## Run locally

```powershell
cd "C:\Users\DevX\Desktop\Coding\Project\SuperHeroes"
npm.cmd install
npm.cmd start
```

Open `http://127.0.0.1:3000/heroes.html`

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
- `GET /api/search?q=thor&universe=all`
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

## Deploy

### Render

- Create a new Web Service from this repo
- Build command: `npm install`
- Start command: `npm start`
- Add any needed env vars from `.env.example`

### Vercel

- Import the repo into Vercel
- Use the included `vercel.json`
- Add any needed env vars from `.env.example`
