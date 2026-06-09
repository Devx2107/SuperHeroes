'use strict';

const heroes = {
  ironman: {
    id: "ironman",
    name: "Iron Man",
    universe: "Marvel Cinematic Universe",
    tag: "Tech futurist with a reactor-powered conscience",
    story: "Tony Stark turns invention into armor, ego into sacrifice, and every room into a livewire press conference. He wins by thinking faster than the threat.",
    badges: ["Avenger founder", "Armor architect", "Arc reactor core"],
    colors: { primary: "#ff6b35", secondary: "#f7c948", accent: "#7be0ff", bg: "#0d1424" },
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 88, Speed: 72, Strategy: 97, Durability: 84, Charisma: 91 },
    abilities: ["Repulsor barrage", "Nanotech deployment", "Aerial combat matrix", "AI-assisted targeting"],
    villains: [
      {
        name: "Mandarin",
        threat: "Global manipulator",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        front: "A myth, a terrorist symbol, and the perfect mirror for Tony's fear of weaponized spectacle.",
        back: "The Mandarin matchup always asks whether Stark's genius can outmaneuver fear, propaganda, and a villain who turns image into control."
      },
      {
        name: "Whiplash",
        threat: "Vengeful engineer",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        front: "Ivan Vanko proves that the arc reactor can inspire rivals as dangerous as Tony himself.",
        back: "Whiplash is personal. He attacks the Stark legacy at its source and turns innovation into a blood feud."
      },
      {
        name: "Ultron",
        threat: "Runaway intelligence",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
        front: "Tony's worst-case scenario given shape: a machine that inherits his ambition without his restraint.",
        back: "Ultron matters because he is not just a villain. He is Stark's own logic detached from empathy."
      }
    ],
    timeline: [
      { year: "2008", title: "Armor Genesis", text: "Tony builds the first suit in captivity and redefines the superhero movie era." },
      { year: "2012", title: "Battle of New York", text: "He becomes the engine of the Avengers and starts carrying the burden of planetary defense." },
      { year: "2016", title: "Civil War Split", text: "His belief in accountability fractures the team and exposes his emotional fault lines." },
      { year: "2019", title: "Endgame Sacrifice", text: "Stark closes the Infinity Saga by giving everything to finish the fight." }
    ],
    teamup: {
      partner: "Black Panther",
      synergy: 93,
      title: "Precision meets sovereignty",
      text: "Tony brings improvisational invention. T'Challa brings disciplined leadership. Together they combine battlefield technology with strategic calm."
    },
    battle: {
      hp: 118,
      attack: 23,
      special: 31,
      guard: 0.55,
      moves: {
        attack: "fires a repulsor burst",
        special: "unleashes a nanotech overdrive",
        guard: "raises a kinetic shield"
      }
    },
    quizAffinity: { leader: 3, rebel: 2, scholar: 3, heart: 1, mystic: 0, feral: 0, speedster: 1 },
    trivia: [
      { question: "What powers Iron Man's armor?", choices: ["Arc reactor", "Tesseract shard", "Gamma battery", "Vibranium core"], answer: 0 },
      { question: "What is Tony Stark's company?", choices: ["Oscorp", "WayneTech", "Stark Industries", "LexCorp"], answer: 2 }
    ]
  },
  thor: {
    id: "thor",
    name: "Thor",
    universe: "Marvel Multiverse",
    tag: "God of thunder with mythic force and bruised nobility",
    story: "Thor carries storms, legacy, and grief in equal measure. He is at his best when thunder becomes protection instead of pride.",
    badges: ["Asgardian royalty", "Storm wielder", "Mjolnir lineage"],
    colors: { primary: "#5fc8ff", secondary: "#b2d7ff", accent: "#ffe27a", bg: "#071424" },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 97, Speed: 76, Strategy: 78, Durability: 96, Charisma: 85 },
    abilities: ["Mjolnir recall", "Storm channeling", "Bifrost strike", "God-tier endurance"],
    villains: [
      {
        name: "Loki",
        threat: "Chaos tactician",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
        front: "Brotherhood makes every battle sting harder when Loki turns wit, envy, and survival into theater.",
        back: "Loki matters because he constantly tests whether Thor's strength includes forgiveness, humility, and emotional intelligence."
      },
      {
        name: "Hela",
        threat: "Death sovereign",
        image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
        front: "Hela strips away crown, hammer, and certainty, forcing Thor to become power without props.",
        back: "Her arrival reframes Thor's identity: he is not the god of hammers, but the god of thunder."
      },
      {
        name: "Gorr",
        threat: "God butcher",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",
        front: "Gorr attacks the moral legitimacy of gods, not just their bodies.",
        back: "He pushes Thor to answer whether divinity means glory or service."
      }
    ],
    timeline: [
      { year: "2011", title: "Exile to Earth", text: "Thor loses his hammer and learns worthiness the hard way." },
      { year: "2017", title: "Ragnarok Reforged", text: "He survives the fall of Asgard and unlocks his power without Mjolnir." },
      { year: "2018", title: "Stormbreaker", text: "Thor channels cosmic grief into a weapon built to kill a titan." },
      { year: "2022", title: "Love and Thunder", text: "He rediscovers tenderness while battling a crusade against gods." }
    ],
    teamup: {
      partner: "The Flash",
      synergy: 90,
      title: "Lightning in two tempos",
      text: "Thor brings godlike force while Flash manipulates pace and positioning. Together they overwhelm enemies before the battlefield can stabilize."
    },
    battle: {
      hp: 128,
      attack: 24,
      special: 34,
      guard: 0.52,
      moves: {
        attack: "swings Mjolnir with thunderous force",
        special: "calls down a bifrost stormbreaker combo",
        guard: "summons a storm barrier"
      }
    },
    quizAffinity: { leader: 2, rebel: 1, scholar: 0, heart: 2, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "What makes Thor worthy of Mjolnir?", choices: ["Royal blood", "Worthiness enchantment", "Odin's crown", "Infinity energy"], answer: 1 },
      { question: "Thor is prince of which realm?", choices: ["Xandar", "Asgard", "Attilan", "Latveria"], answer: 1 }
    ]
  },
  blackpanther: {
    id: "blackpanther",
    name: "Black Panther",
    universe: "Marvel | Wakanda",
    tag: "Royal tactician with vibranium grace",
    story: "T'Challa balances kingly duty, technological genius, and ancestral identity. He moves like a shadow and rules like a strategist.",
    badges: ["King of Wakanda", "Vibranium suit", "Ancestral line"],
    colors: { primary: "#8d7dff", secondary: "#42e8e0", accent: "#f5e663", bg: "#0b1020" },
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 84, Speed: 86, Strategy: 93, Durability: 82, Charisma: 88 },
    abilities: ["Kinetic redistribution", "Enhanced senses", "Vibranium claws", "Royal strategy"],
    villains: [
      {
        name: "Killmonger",
        threat: "Revolutionary insurgent",
        image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80",
        front: "Killmonger weaponizes shared heritage and turns Wakanda's isolation into an accusation.",
        back: "He matters because he forces T'Challa to confront the moral cost of protecting paradise without helping the world."
      },
      {
        name: "Namor",
        threat: "Ocean empire ruler",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        front: "Namor is not chaos for chaos's sake. He is a sovereign threat with principles, grief, and impossible leverage.",
        back: "This rivalry measures diplomacy against vengeance and asks how far a nation should go to defend itself."
      },
      {
        name: "Klaw",
        threat: "Vibranium raider",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        front: "Klaw strips Wakanda's resource struggle down to greed, extraction, and invasion.",
        back: "He is a smaller-scale villain than others, but he embodies the colonial hunger T'Challa has to outmaneuver."
      }
    ],
    timeline: [
      { year: "2016", title: "Debut in Civil War", text: "T'Challa arrives as a poised force of vengeance and restraint." },
      { year: "2018", title: "Wakanda Opened", text: "Black Panther transforms from origin story into cultural event and national mythmaking." },
      { year: "2018", title: "Infinity War Frontline", text: "Wakanda becomes the last defense against Thanos' invasion." },
      { year: "2022", title: "Wakanda Forever", text: "Legacy shifts from one king to a people carrying memory forward." }
    ],
    teamup: {
      partner: "Iron Man",
      synergy: 95,
      title: "Brains, resources, and battlefield calm",
      text: "T'Challa complements Stark's improvisation with discipline. One engineers the future, the other decides how it should be used."
    },
    battle: {
      hp: 112,
      attack: 22,
      special: 28,
      guard: 0.6,
      moves: {
        attack: "slashes with vibranium claws",
        special: "releases stored kinetic force",
        guard: "crosses his suit into a vibranium brace"
      }
    },
    quizAffinity: { leader: 3, rebel: 0, scholar: 2, heart: 2, mystic: 1, feral: 0, speedster: 0 },
    trivia: [
      { question: "What powers Black Panther's suit and kingdom?", choices: ["Adamantium", "Vibranium", "Nth metal", "Uru"], answer: 1 },
      { question: "Which nation does T'Challa rule?", choices: ["Madripoor", "Genosha", "Latveria", "Wakanda"], answer: 3 }
    ]
  },
  flash: {
    id: "flash",
    name: "The Flash",
    universe: "DC Multiverse",
    tag: "Fastest man alive with a heart that outruns time",
    story: "Barry Allen races through grief, timelines, and impossible rescues. Every choice is measured in microseconds and consequence.",
    badges: ["Speed Force link", "Forensic scientist", "Temporal wildcard"],
    colors: { primary: "#ffd449", secondary: "#ff5f45", accent: "#ffeec2", bg: "#190a07" },
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 79, Speed: 100, Strategy: 81, Durability: 72, Charisma: 86 },
    abilities: ["Lightning sprint", "Phasing", "Time remnant tactics", "Speed Force surge"],
    villains: [
      {
        name: "Reverse-Flash",
        threat: "Temporal stalker",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        front: "No villain makes heroism feel more intimate and invasive than a speedster who lives to ruin Barry's life.",
        back: "Reverse-Flash weaponizes obsession itself. He turns Barry's powers into a timeline-wide vulnerability."
      },
      {
        name: "Zoom",
        threat: "Predatory speed god",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
        front: "Zoom doesn't just chase the Flash. He tries to define what pain should teach him.",
        back: "He matters because he treats suffering as a curriculum, forcing Barry to reject brutality as growth."
      },
      {
        name: "Savitar",
        threat: "Future nightmare",
        image: "https://images.unsplash.com/photo-1505672678657-cc7037095e02?auto=format&fit=crop&w=900&q=80",
        front: "Savitar is the speedster myth gone feral: all velocity, no healing.",
        back: "As a twisted future echo, Savitar warns Barry what happens when speed stops serving people."
      }
    ],
    timeline: [
      { year: "2014", title: "TV Breakout", text: "The CW era turns speed into bright, emotional serial storytelling." },
      { year: "2017", title: "Justice League Entry", text: "Barry becomes the awkward heartbeat of a world-scale team-up." },
      { year: "2023", title: "Flashpoint Cinema", text: "The film doubles down on multiverse consequences and family loss." },
      { year: "Always", title: "Speed Force Legacy", text: "Every Flash story replays the tension between rescue, regret, and second chances." }
    ],
    teamup: {
      partner: "Thor",
      synergy: 89,
      title: "One redirects weather, the other redirects time",
      text: "Flash handles chaos control and impossible saves while Thor turns every opening into thunderous impact."
    },
    battle: {
      hp: 96,
      attack: 21,
      special: 30,
      guard: 0.48,
      moves: {
        attack: "lands a blur-speed combo",
        special: "detonates a Speed Force vortex",
        guard: "phases between incoming strikes"
      }
    },
    quizAffinity: { leader: 1, rebel: 1, scholar: 1, heart: 3, mystic: 1, feral: 0, speedster: 3 },
    trivia: [
      { question: "Barry Allen is also what kind of professional?", choices: ["Journalist", "Forensic scientist", "Astronaut", "Lawyer"], answer: 1 },
      { question: "The Flash draws power from the...", choices: ["Quantum Realm", "Negative Zone", "Speed Force", "Phantom Zone"], answer: 2 }
    ]
  },
  wolverine: {
    id: "wolverine",
    name: "Wolverine",
    universe: "Marvel | X-Men",
    tag: "Adamantium fury wrapped around a wounded survivor",
    story: "Logan is claws, healing, grit, and memory scars. He is terrifying in battle and devastatingly human when the rage subsides.",
    badges: ["Mutant healing", "Adamantium skeleton", "X-Men icon"],
    colors: { primary: "#f2c94c", secondary: "#4a6fa5", accent: "#ffd9a0", bg: "#110f1d" },
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 87, Speed: 74, Strategy: 76, Durability: 98, Charisma: 70 },
    abilities: ["Adamantium claws", "Regenerative healing", "Berserker rush", "Heightened senses"],
    villains: [
      {
        name: "Sabretooth",
        threat: "Savage counterpart",
        image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=900&q=80",
        front: "Sabretooth makes every Wolverine fight feel like family trauma with claws out.",
        back: "This rivalry matters because Victor embodies the version of Logan who never learned restraint."
      },
      {
        name: "Weapon X",
        threat: "Program, not person",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        front: "Weapon X is the machinery that turned Logan's body into a battlefield.",
        back: "Sometimes the villain is not a face. It is the institution that stole identity and commodified pain."
      },
      {
        name: "Lady Deathstrike",
        threat: "Precision assassin",
        image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80",
        front: "Deathstrike brings elegance and vengeance to a fight that is always one cut from catastrophe.",
        back: "She matters because she mirrors Wolverine's weaponization while keeping none of his reluctant conscience."
      }
    ],
    timeline: [
      { year: "2000", title: "X-Men Launch", text: "Wolverine becomes the breakout intensity engine of the modern team era." },
      { year: "2009", title: "Origins Retold", text: "His tortured past and Weapon X history move to center stage." },
      { year: "2013", title: "The Wolverine", text: "The solo myth leans into mortality, honor, and exile." },
      { year: "2017", title: "Logan", text: "The character reaches a raw, elegiac peak in a future-western finale." }
    ],
    teamup: {
      partner: "Black Panther",
      synergy: 84,
      title: "Instinct sharpened by discipline",
      text: "Wolverine disrupts and absorbs pressure. Black Panther chooses the moments where Logan's ferocity becomes mission-winning leverage."
    },
    battle: {
      hp: 135,
      attack: 25,
      special: 27,
      guard: 0.58,
      moves: {
        attack: "slashes in a berserker burst",
        special: "dives into an adamantium frenzy",
        guard: "drops into a low feral defense"
      }
    },
    quizAffinity: { leader: 0, rebel: 3, scholar: 0, heart: 1, mystic: 0, feral: 3, speedster: 0 },
    trivia: [
      { question: "What metal coats Wolverine's skeleton?", choices: ["Vibranium", "Carbonadium", "Adamantium", "Promethium"], answer: 2 },
      { question: "Wolverine is most famously tied to which mutant team?", choices: ["Guardians", "Fantastic Four", "X-Men", "Eternals"], answer: 2 }
    ]
  },
  scarletwitch: {
    id: "scarletwitch",
    name: "Scarlet Witch",
    universe: "Marvel | Surprise Pool",
    tag: "Reality-bending grief made mythic",
    story: "Wanda turns emotion into impossible scale. She is the kind of surprise pick that changes the emotional weather of the whole page.",
    badges: ["Chaos magic", "Reality warp", "Surprise pool reveal"],
    colors: { primary: "#f14f7c", secondary: "#ffa3b1", accent: "#ffd7e1", bg: "#190814" },
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 99, Speed: 70, Strategy: 83, Durability: 78, Charisma: 80 },
    abilities: ["Hex field", "Reality rewrite", "Telekinetic crush", "Chaos projection"],
    villains: [
      {
        name: "Agatha Harkness",
        threat: "Witch manipulator",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
        front: "Agatha understands power and appetite, making her a precise threat to Wanda's instability.",
        back: "She matters because she identifies Wanda's potential and immediately tries to claim it."
      }
    ],
    timeline: [
      { year: "2015", title: "Avengers Arrival", text: "Wanda enters the battlefield as grief and power fused together." },
      { year: "2021", title: "Westview Fracture", text: "WandaVision turns sorrow into genre-bending television spectacle." },
      { year: "2022", title: "Multiverse of Madness", text: "Her arc becomes a warning about power without healing." },
      { year: "Hidden", title: "Surprise Pool", text: "She appears when Other becomes a full reveal." }
    ],
    teamup: {
      partner: "Thor",
      synergy: 88,
      title: "Chaos and thunder",
      text: "Thor provides force and protection while Wanda bends the shape of the fight itself."
    },
    battle: {
      hp: 108,
      attack: 24,
      special: 35,
      guard: 0.47,
      moves: {
        attack: "lashes out with scarlet energy",
        special: "tears reality with a chaos nova",
        guard: "wraps herself in a hex barrier"
      }
    },
    quizAffinity: { leader: 0, rebel: 1, scholar: 1, heart: 3, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "Scarlet Witch's magic is often described as...", choices: ["Solar magic", "Chaos magic", "Gamma magic", "Vibranium magic"], answer: 1 }
    ]
  },
  milesmorales: {
    id: "milesmorales",
    name: "Miles Morales",
    universe: "Marvel | Surprise Pool",
    tag: "Electric swagger and modern Spider-Verse style",
    story: "Miles brings youth, rhythm, and invention. He shifts the page into a more kinetic, neon register the moment Other reveals him.",
    badges: ["Spider-Verse", "Bio-electric venom", "Surprise pool reveal"],
    colors: { primary: "#ff4f4f", secondary: "#3f9dff", accent: "#ffe26d", bg: "#0f1018" },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 81, Speed: 88, Strategy: 82, Durability: 77, Charisma: 92 },
    abilities: ["Venom strike", "Camouflage", "Acrobatic webs", "Street-level reflexes"],
    villains: [
      {
        name: "The Prowler",
        threat: "Family fracture",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        front: "Prowler turns mentorship, secrecy, and family into one loaded conflict.",
        back: "The rivalry matters because Miles never gets to separate heroic growth from personal stakes."
      }
    ],
    timeline: [
      { year: "2018", title: "Spider-Verse Breakthrough", text: "Miles becomes a defining animated superhero voice overnight." },
      { year: "2023", title: "Across the Spider-Verse", text: "The multiverse expands and so does Miles' resistance to predetermined fate." },
      { year: "Hidden", title: "Surprise Pool", text: "Miles appears when Other pivots from mystery into momentum." },
      { year: "Future", title: "Next Swing", text: "Every new version of Miles keeps the style conversation moving forward." }
    ],
    teamup: {
      partner: "The Flash",
      synergy: 86,
      title: "Velocity and improvisation",
      text: "Flash opens the lane. Miles turns it into fluid, high-style pressure with constant repositioning."
    },
    battle: {
      hp: 102,
      attack: 22,
      special: 29,
      guard: 0.51,
      moves: {
        attack: "snaps in with a venom jab",
        special: "drops an electric web cascade",
        guard: "fades into camouflage"
      }
    },
    quizAffinity: { leader: 1, rebel: 2, scholar: 1, heart: 3, mystic: 0, feral: 0, speedster: 2 },
    trivia: [
      { question: "Miles Morales is famous for what extra spider ability?", choices: ["Heat vision", "Venom strike", "Super breath", "Magic webs"], answer: 1 }
    ]
  },
  doctorstrange: {
    id: "doctorstrange",
    name: "Doctor Strange",
    universe: "Marvel | Surprise Pool",
    tag: "Mystic strategist guarding impossible thresholds",
    story: "Strange brings occult precision and multiverse consequence. He shifts Other from wildcard to cosmic chessboard.",
    badges: ["Sorcerer Supreme", "Mystic shields", "Surprise pool reveal"],
    colors: { primary: "#ff7d3b", secondary: "#6bc5ff", accent: "#ffd27f", bg: "#100d18" },
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 92, Speed: 68, Strategy: 94, Durability: 74, Charisma: 78 },
    abilities: ["Eldritch shields", "Portal slicing", "Astral projection", "Time-loop tactics"],
    villains: [
      {
        name: "Dormammu",
        threat: "Dimension tyrant",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
        front: "Dormammu is not just larger than life. He is larger than ordinary cause and effect.",
        back: "He matters because Strange's greatest wins often come from cunning, not direct force."
      }
    ],
    timeline: [
      { year: "2016", title: "Mystic Origin", text: "Stephen Strange turns surgical discipline into sorcerous control." },
      { year: "2018", title: "One Chance on Titan", text: "He sees the one future path to victory and commits." },
      { year: "2022", title: "Multiverse Fracture", text: "His stories expand into incursions, variants, and hard responsibility." },
      { year: "Hidden", title: "Surprise Pool", text: "Strange surfaces when Other reveals the cosmic tier." }
    ],
    teamup: {
      partner: "Iron Man",
      synergy: 91,
      title: "Calculation on two frequencies",
      text: "Tony handles engineered solutions while Strange handles metaphysical threats. Together they cover every axis of disaster."
    },
    battle: {
      hp: 104,
      attack: 20,
      special: 33,
      guard: 0.57,
      moves: {
        attack: "lashes out with a sigil strike",
        special: "folds the arena with eldritch geometry",
        guard: "casts a rotating mandala shield"
      }
    },
    quizAffinity: { leader: 1, rebel: 0, scholar: 3, heart: 1, mystic: 3, feral: 0, speedster: 0 },
    trivia: [
      { question: "What title is Doctor Strange known by?", choices: ["Master Builder", "Sorcerer Supreme", "King of Kings", "Omega Herald"], answer: 1 }
    ]
  },
  spiderman: {
    id: "spiderman",
    name: "Spider-Man",
    universe: "Marvel",
    tag: "Neighborhood hero with a spider-sense and a conscience",
    story: "Peter Parker turns a radioactive accident into responsibility and keeps swinging back into danger for people he will probably never meet.",
    badges: ["Neighborhood hero", "Web-slinger", "Spider-Sense icon"],
    colors: { primary: "#ff5b57", secondary: "#183c7a", accent: "#5cb7ff", bg: "#05070c" },
    image: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    stats: { Power: 75, Speed: 98, Strategy: 85, Durability: 78, Charisma: 90 },
    abilities: ["Spider-sense", "Wall-crawling", "Webbing", "Enhanced agility"],
    villains: [
      { name: "Green Goblin", threat: "Chaos in a mask", image: "https://upload.wikimedia.org/wikipedia/en/e/e9/Green_Goblin_%28Alex_Ross%27s_art%29.jpg", front: "Norman Osborn turns wealth, obsession, and madness into Peter's most personal enemy.", back: "The Goblin knows exactly where Peter hurts." },
      { name: "Doc Ock", threat: "Twisted intellect", image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80", front: "Otto Octavius weaponizes brilliance and resentment against Spider-Man.", back: "The rivalry becomes a debate over who deserves the hero's symbol." }
    ],
    timeline: [
      { year: "1962", title: "First appearance", text: "Spider-Man debuts in Amazing Fantasy #15 and rewrites what a teenage hero can be." },
      { year: "1987", title: "Kraven's Last Hunt", text: "One of Marvel's darkest Spider-Man stories explores identity and resilience." },
      { year: "2014", title: "Spider-Verse", text: "The multiverse expands Spider-Man into a legacy bigger than one person." },
      { year: "2023", title: "Across the Spider-Verse", text: "Responsibility keeps evolving across generations." }
    ],
    teamup: { partner: "Iron Man", synergy: 94, title: "Mentor and student", text: "Tony gives Peter resources and standards. Peter gives Tony the kind of hopeful energy he forgets to protect." },
    battle: { hp: 92, attack: 14, special: 24, moves: { attack: "throws a web-and-kick combo", special: "unleashes a spider-sense counterburst", guard: "dodges into a webbed stance" } },
    quizAffinity: { leader: 1, rebel: 2, scholar: 3, heart: 5, mystic: 0, feral: 0, speedster: 3 },
    trivia: [
      { question: "Which idea defines Spider-Man more than any gadget?", choices: ["Responsibility", "Luck", "Secrecy", "Power"], answer: 0 },
      { question: "What warning system does Spider-Man rely on?", choices: ["Spider-sense", "X-ray vision", "Telepathy", "Super hearing"], answer: 0 }
    ]
  },
  captainamerica: {
    id: "captainamerica",
    name: "Captain America",
    universe: "Marvel",
    tag: "A shield, a promise, and a world at war",
    story: "Steve Rogers becomes a super-soldier and keeps fighting for ideals bigger than himself, even when the world gets messy.",
    badges: ["Super-soldier", "Shield bearer", "Avengers founder"],
    colors: { primary: "#d74a4a", secondary: "#173b63", accent: "#f7f1d1", bg: "#050816" },
    image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 78, Speed: 74, Strategy: 84, Durability: 82, Charisma: 91 },
    abilities: ["Vibranium shield throws", "Peak human conditioning", "Battlefield leadership", "Tactical reads"],
    villains: [
      { name: "Red Skull", threat: "Ideological enemy", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80", front: "Red Skull turns hate into doctrine and makes Cap fight for the future.", back: "The rivalry pits democratic hope against fascist control." },
      { name: "Crossbones", threat: "Relentless assassin", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Crossbones is the close-range violence that keeps testing Steve's restraint.", back: "He forces Captain America to stay disciplined when chaos gets personal." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Captain America debuts as a wartime symbol with a moral center." },
      { year: "2006", title: "Civil War", text: "Cap stands against registration and pays the price for principle." },
      { year: "2011", title: "A Man Out of Time", text: "Steve becomes a study in legacy, loss, and adaptation." },
      { year: "Present", title: "Shield upheld", text: "The character keeps proving that courage is a choice." }
    ],
    teamup: { partner: "Black Panther", synergy: 90, title: "Disciplined leaders", text: "Steve and T'Challa bring different traditions, but both understand that power means restraint." },
    battle: { hp: 114, attack: 19, special: 28, moves: { attack: "ricochets a shield strike", special: "launches a tactical shield combo", guard: "raises the shield in a perfect block" } },
    quizAffinity: { leader: 4, rebel: 1, scholar: 1, heart: 3, mystic: 0, feral: 0, speedster: 0 },
    trivia: [
      { question: "What made Captain America special?", choices: ["Super-soldier physiology", "Cosmic magic", "Gamma mutation", "Time travel"], answer: 0 },
      { question: "Which sidearm is most associated with Captain America?", choices: ["Mjolnir", "Shield", "Ring", "Web shooters"], answer: 1 }
    ]
  },
  hulk: {
    id: "hulk",
    name: "Hulk",
    universe: "Marvel",
    tag: "Gamma rage, survival, and unstoppable power",
    story: "Bruce Banner and the Hulk are science and rage fused into one impossible contradiction.",
    badges: ["Gamma giant", "Avenger wildcard", "Unstoppable force"],
    colors: { primary: "#58d26a", secondary: "#25412a", accent: "#d7ff9e", bg: "#07110c" },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 100, Speed: 72, Strategy: 72, Durability: 100, Charisma: 75 },
    abilities: ["Gamma strength", "Rapid healing", "Shockwave leaps", "Rage escalation"],
    villains: [
      { name: "Abomination", threat: "Gamma rival", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "Abomination proves that power without restraint becomes a permanent threat.", back: "He is the clearest answer to Hulk's question: what happens when rage wins?" },
      { name: "The Leader", threat: "Gamma intellect", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "The Leader weaponizes intelligence and turns Bruce's genius into a battlefield.", back: "He shows that intellect without empathy can be monstrous too." }
    ],
    timeline: [
      { year: "1962", title: "First appearance", text: "The Hulk arrives as a tragic monster with emotional depth." },
      { year: "1970s", title: "TV icon", text: "The live-action era turns Hulk into a mainstream symbol of rage and sympathy." },
      { year: "2006", title: "Planet Hulk", text: "The character gains an epic, gladiatorial scale." },
      { year: "2018", title: "Immortal Hulk", text: "Modern stories lean into horror, myth, and persistence." }
    ],
    teamup: { partner: "Doctor Strange", synergy: 88, title: "Mind and monster", text: "Strange handles the impossible structures while Hulk provides the force that breaks through them." },
    battle: { hp: 150, attack: 26, special: 34, moves: { attack: "hammers the ground in a gamma surge", special: "erupts into a seismic smash combo", guard: "braces behind an impossible bulk" } },
    quizAffinity: { leader: 0, rebel: 1, scholar: 2, heart: 2, mystic: 0, feral: 4, speedster: 0 },
    trivia: [
      { question: "What event created the Hulk?", choices: ["Gamma exposure", "Magic storm", "Alien blood transfusion", "Vibranium serum"], answer: 0 },
      { question: "What is Bruce Banner's greatest struggle?", choices: ["Speed", "Control", "Flight", "Telepathy"], answer: 1 }
    ]
  },
  batman: {
    id: "batman",
    name: "Batman",
    universe: "DC",
    tag: "The Dark Knight who turned grief into a mission",
    story: "Bruce Wayne becomes Batman after the murder of his parents and keeps Gotham alive by treating fear like a tool.",
    badges: ["World's Greatest Detective", "Master Martial Artist", "Gotham's Guardian"],
    colors: { primary: "#d64545", secondary: "#121212", accent: "#ffb84d", bg: "#050505" },
    image: "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg",
    stats: { Power: 18, Speed: 72, Strategy: 98, Durability: 80, Charisma: 75 },
    abilities: ["World-class detective", "Peak human conditioning", "Gadget mastery", "Psychological warfare"],
    villains: [
      { name: "The Joker", threat: "Agent of chaos", image: "https://upload.wikimedia.org/wikipedia/en/1/17/Joker_%28DC_Comics_character%29.jpg", front: "The Joker tests whether Batman can protect a city that keeps reinventing madness.", back: "He turns every appearance into a moral stress test." },
      { name: "Bane", threat: "The breaker", image: "https://upload.wikimedia.org/wikipedia/en/3/3e/Bane_%28DC_Comics_character%29.png", front: "Bane is the strategist who proves Batman can be beaten physically and mentally at the same time.", back: "Knightfall exposed the cost of carrying Gotham alone." }
    ],
    timeline: [
      { year: "1939", title: "First appearance", text: "Batman debuts in Detective Comics #27 and reshapes crime fiction in caped form." },
      { year: "1987", title: "Year One", text: "Frank Miller's origin focuses the legend on detective work and discipline." },
      { year: "1993", title: "Knightfall", text: "Bane breaks Batman and forces him to confront his limits." },
      { year: "2011", title: "The New 52", text: "The Court of Owls era pushes Batman deeper into conspiracy and urban myth." }
    ],
    teamup: { partner: "Superman", synergy: 92, title: "World's Finest", text: "Batman gives the plan, Superman gives the lift, and the world gets a team that can handle anything." },
    battle: { hp: 100, attack: 17, special: 27, moves: { attack: "disappears into shadow and strikes", special: "deploys a tactical gauntlet combo", guard: "raises an armored cape shield" } },
    quizAffinity: { leader: 4, scholar: 4, rebel: 2, heart: 1, mystic: 0, feral: 1, speedster: 0 },
    trivia: [
      { question: "Which comic introduced Batman's origin in a modern form?", choices: ["Year One", "Hush", "The Long Halloween", "The Killing Joke"], answer: 0 },
      { question: "What makes Batman most dangerous against metahumans?", choices: ["Hidden power source", "Preparation and analysis", "Magic training", "Alien technology"], answer: 1 }
    ]
  },
  superman: {
    id: "superman",
    name: "Superman",
    universe: "DC",
    tag: "Hope given a human face",
    story: "Kal-El was raised by the Kents to use godlike power with human compassion.",
    badges: ["Symbol of Hope", "Last Son of Krypton", "The Man of Tomorrow"],
    colors: { primary: "#4d94ff", secondary: "#12223d", accent: "#ffd84d", bg: "#05070d" },
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png",
    stats: { Power: 100, Speed: 96, Strategy: 88, Durability: 100, Charisma: 95 },
    abilities: ["Solar-powered strength", "Flight", "Heat vision", "X-ray vision"],
    villains: [
      { name: "Lex Luthor", threat: "Human genius", image: "https://upload.wikimedia.org/wikipedia/en/0/09/Lex_Luthor.png", front: "Lex turns intellect into ego, then into an argument against alien power and public trust.", back: "The rivalry is a duel over what humanity should admire." },
      { name: "Brainiac", threat: "Collector of worlds", image: "https://upload.wikimedia.org/wikipedia/en/6/64/Brainiac_DC_Comics.png", front: "Brainiac threatens the idea that knowledge should be used with empathy.", back: "He gives Superman an enemy that is cold and impossible to intimidate." }
    ],
    timeline: [
      { year: "1938", title: "First appearance", text: "Superman launches in Action Comics #1 and defines the superhero archetype." },
      { year: "1978", title: "Cinematic hope", text: "The Reeve films make the world believe a man can fly." },
      { year: "1992", title: "Death and Return", text: "The Death of Superman arc proves the symbol matters even when the man falls." },
      { year: "2003", title: "All-Star voice", text: "All-Star Superman turns the character into a pure statement on hope and legacy." }
    ],
    teamup: { partner: "Batman", synergy: 95, title: "World's Finest", text: "Batman supplies the contingency plan. Superman supplies the impossible lift." },
    battle: { hp: 150, attack: 22, special: 36, moves: { attack: "delivers a thunderous blitz", special: "fires heat vision at full power", guard: "anchors the battlefield with calm force" } },
    quizAffinity: { leader: 4, scholar: 1, rebel: 0, heart: 5, mystic: 0, feral: 0, speedster: 0 },
    trivia: [
      { question: "What city does Superman protect?", choices: ["Gotham", "Metropolis", "Central City", "Star City"], answer: 1 },
      { question: "Which symbol best defines Superman?", choices: ["Revenge", "Hope", "Chaos", "Secrecy"], answer: 1 }
    ]
  },
  wonderwoman: {
    id: "wonderwoman",
    name: "Wonder Woman",
    universe: "DC",
    tag: "Truth, compassion, and warrior grace",
    story: "Diana was raised among the Amazons and steps into the world as its champion, carrying truth into spaces built on war and fear.",
    badges: ["Amazon champion", "Champion of truth", "Justice League founder"],
    colors: { primary: "#f4c84a", secondary: "#6f1125", accent: "#ff7d66", bg: "#070508" },
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Wonder_Woman.jpg",
    stats: { Power: 98, Speed: 86, Strategy: 84, Durability: 92, Charisma: 93 },
    abilities: ["Lasso of Truth", "Super strength", "Bracelet deflection", "Flight"],
    villains: [
      { name: "Ares", threat: "God of war", image: "https://upload.wikimedia.org/wikipedia/en/7/72/AresMarvel.jpg", front: "Ares personifies the seduction of conflict and the myth that war is inevitable.", back: "Wonder Woman's mission is fundamentally anti-war without being naive." },
      { name: "Cheetah", threat: "Predatory rival", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", front: "Cheetah is speed, envy, and ferocity turned against Diana's ideals.", back: "The rivalry pits compassion against corruption from within." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Wonder Woman arrives in All Star Comics #8 and becomes a pillar of the DC Trinity." },
      { year: "2011", title: "New 52 era", text: "Modern stories keep truth at the center of her myth." },
      { year: "2017", title: "Cinematic breakthrough", text: "Wonder Woman becomes a global blockbuster and a major superhero milestone." },
      { year: "Present", title: "Trinity legacy", text: "Diana remains one of the core DC icons alongside Batman and Superman." }
    ],
    teamup: { partner: "Batman", synergy: 88, title: "Justice League founders", text: "Batman brings strategy, Diana brings moral clarity." },
    battle: { hp: 124, attack: 19, special: 31, moves: { attack: "cuts through with Amazonian precision", special: "binds foes with the Lasso of Truth", guard: "crosses the bracelets in a shining block" } },
    quizAffinity: { leader: 3, scholar: 1, rebel: 2, heart: 4, mystic: 2, feral: 0, speedster: 0 },
    trivia: [
      { question: "What principle most defines Wonder Woman?", choices: ["Conquest", "Truth", "Secrecy", "Speed"], answer: 1 },
      { question: "Which team is she a founding member of?", choices: ["Avengers", "Justice League", "X-Men", "Fantastic Four"], answer: 1 }
    ]
  },
  aquaman: {
    id: "aquaman",
    name: "Aquaman",
    universe: "DC",
    tag: "King of Atlantis and bridge between worlds",
    story: "Arthur Curry rules the sea with one foot in Atlantis and one in the surface world.",
    badges: ["King of Atlantis", "Sea commander", "Trident heir"],
    colors: { primary: "#32d3c6", secondary: "#15354f", accent: "#f2c94c", bg: "#07131a" },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 92, Speed: 78, Strategy: 82, Durability: 90, Charisma: 88 },
    abilities: ["Ocean command", "Trident strikes", "Pressure resistance", "Sea-sense"],
    villains: [
      { name: "Black Manta", threat: "Vengeful hunter", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "Black Manta turns revenge into an ocean-spanning vendetta.", back: "He keeps Arthur's past from staying buried." },
      { name: "Ocean Master", threat: "Royal rival", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80", front: "Ocean Master turns claim and grievance into civil war.", back: "Their rivalry asks whether rule comes from blood or consent." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Aquaman enters DC as a sea-bound adventurer." },
      { year: "1990s", title: "Royal reinvention", text: "Modern stories turn him into a true king rather than a novelty." },
      { year: "2011", title: "New 52 rebirth", text: "Atlantis becomes central to his identity and scale." },
      { year: "2018", title: "Cinematic tide", text: "The solo film makes Atlantis feel epic, strange, and alive." }
    ],
    teamup: { partner: "Wonder Woman", synergy: 88, title: "Mythic rulers", text: "Arthur brings tide-born power while Diana brings moral clarity." },
    battle: { hp: 122, attack: 21, special: 30, moves: { attack: "thrusts the trident in a tidal sweep", special: "calls an oceanic pressure surge", guard: "raises a wall of surging water" } },
    quizAffinity: { leader: 2, rebel: 1, scholar: 1, heart: 2, mystic: 0, feral: 0, speedster: 0 },
    trivia: [
      { question: "Where does Aquaman rule?", choices: ["Atlantis", "Themyscira", "Metropolis", "Central City"], answer: 0 },
      { question: "What element is tied to Aquaman's power?", choices: ["Fire", "Earth", "Water", "Lightning"], answer: 2 }
    ]
  },
  greenlantern: {
    id: "greenlantern",
    name: "Green Lantern",
    universe: "DC",
    tag: "Willpower made visible",
    story: "Hal Jordan turns courage and imagination into a weapon against cosmic scale.",
    badges: ["Green Lantern Corps", "Willpower oath", "Sector defender"],
    colors: { primary: "#47d86b", secondary: "#173021", accent: "#d9ff8f", bg: "#08110b" },
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 88, Speed: 81, Strategy: 89, Durability: 85, Charisma: 84 },
    abilities: ["Constructs", "Flight", "Force fields", "Willpower focus"],
    villains: [
      { name: "Sinestro", threat: "Fallen mentor", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Sinestro proves that order without empathy becomes a trap.", back: "He is what Hal could become if fear wins." },
      { name: "Parallax", threat: "Fear incarnate", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", front: "Parallax is fear given shape, scale, and cosmic appetite.", back: "The rivalry turns willpower into a survival test." }
    ],
    timeline: [
      { year: "1940", title: "First appearance", text: "Green Lantern starts as a Golden Age idea before evolving into cosmic law." },
      { year: "1959", title: "Hal Jordan arrives", text: "The Silver Age rings in the modern Corps mythology." },
      { year: "2004", title: "Rebirth", text: "The character's identity and myth are rebuilt around willpower." },
      { year: "2010s", title: "Cosmic legacy", text: "The Corps expands into one of DC's biggest space epics." }
    ],
    teamup: { partner: "Superman", synergy: 90, title: "Hope and willpower", text: "Superman inspires belief while Green Lantern turns belief into tangible form." },
    battle: { hp: 118, attack: 20, special: 33, moves: { attack: "forms a precision construct strike", special: "erupts into a willpower barrage", guard: "wraps the ring in a hard-light shield" } },
    quizAffinity: { leader: 2, rebel: 0, scholar: 2, heart: 1, mystic: 0, feral: 0, speedster: 0 },
    trivia: [
      { question: "What power fuels a Green Lantern ring?", choices: ["Fear", "Willpower", "Speed", "Magic"], answer: 1 },
      { question: "What is the Corps' role?", choices: ["Political council", "Space police", "Secret society", "Treasure hunters"], answer: 1 }
    ]
  },
  nightwing: {
    id: "nightwing",
    name: "Nightwing",
    universe: "DC",
    tag: "The leader who learned to fly solo",
    story: "Dick Grayson grows from Robin into a hero strong enough to build a name of his own.",
    badges: ["Former Robin", "Bludhaven guardian", "Bat-Family leader"],
    colors: { primary: "#4bb3ff", secondary: "#111820", accent: "#8bf0ff", bg: "#060b12" },
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 76, Speed: 82, Strategy: 86, Durability: 76, Charisma: 93 },
    abilities: ["Escrima expertise", "Aerial combat", "Stealth", "Leadership"],
    villains: [
      { name: "Deathstroke", threat: "Mercenary master", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Deathstroke tests whether Dick can outthink a weapon built for precision violence.", back: "The rivalry forces leadership to stay personal." },
      { name: "Blockbuster", threat: "Crime titan", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", front: "Blockbuster turns Bludhaven's streets into a test of endurance and nerve.", back: "He matters because Nightwing's city is as important as Gotham." }
    ],
    timeline: [
      { year: "1940", title: "Robin origins", text: "Dick Grayson enters the myth as the first Robin." },
      { year: "1984", title: "Nightwing debut", text: "He steps out of Batman's shadow and claims his own identity." },
      { year: "2010s", title: "Bludhaven guardian", text: "Nightwing grows into a city-scale protector." },
      { year: "Present", title: "Bat-Family leader", text: "He becomes the clearest bridge between legacy and independence." }
    ],
    teamup: { partner: "Batman", synergy: 93, title: "Legacy with a pulse", text: "Batman built the foundation. Nightwing proves the mission can evolve." },
    battle: { hp: 104, attack: 18, special: 25, moves: { attack: "whips through with an escrima rush", special: "launches a soaring acrobatic combo", guard: "drops into a spinning staff block" } },
    quizAffinity: { leader: 3, rebel: 2, scholar: 1, heart: 3, mystic: 0, feral: 0, speedster: 1 },
    trivia: [
      { question: "What was Nightwing's first heroic identity?", choices: ["Robin", "Aqualad", "Kid Flash", "Speedy"], answer: 0 },
      { question: "Which city is Nightwing tied to?", choices: ["Bludhaven", "Metropolis", "Central City", "Atlantis"], answer: 0 }
    ]
  },
  martianmanhunter: {
    id: "martianmanhunter",
    name: "Martian Manhunter",
    universe: "DC",
    tag: "Last son of Mars and guardian of two worlds",
    story: "J'onn J'onzz carries Martian exile and Justice League leadership into one role.",
    badges: ["Last son of Mars", "Telepathic sentinel", "Justice League cornerstone"],
    colors: { primary: "#5de07a", secondary: "#123026", accent: "#f2c94c", bg: "#07120d" },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    stats: { Power: 95, Speed: 88, Strategy: 90, Durability: 96, Charisma: 84 },
    abilities: ["Shapeshifting", "Telepathy", "Phasing", "Flight"],
    villains: [
      { name: "M'comm", threat: "White Martian threat", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "M'comm turns species conflict into personal grief and keeps J'onn's past alive.", back: "He weaponizes what J'onn lost." },
      { name: "Lobo", threat: "Chaotic hunter", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Lobo is the loud, destructive opposite of J'onn's restraint.", back: "The rivalry pits cosmic patience against pure chaos." }
    ],
    timeline: [
      { year: "1955", title: "First appearance", text: "Martian Manhunter arrives as one of DC's earliest sci-fi heroes." },
      { year: "1960s", title: "Justice League core", text: "He becomes a foundational League member and strategic anchor." },
      { year: "1990s", title: "Identity deepens", text: "Stories lean into exile, grief, and belonging." },
      { year: "Present", title: "Telepathic sentinel", text: "J'onn remains one of DC's most quietly essential protectors." }
    ],
    teamup: { partner: "Superman", synergy: 92, title: "Two guardians, one planet", text: "Clark inspires hope while J'onn brings patience, strategy, and a second alien perspective." },
    battle: { hp: 126, attack: 22, special: 33, moves: { attack: "strikes with a phased telekinetic blow", special: "unleashes a psychic shockwave", guard: "melds into an intangible defensive veil" } },
    quizAffinity: { leader: 2, rebel: 0, scholar: 2, heart: 3, mystic: 1, feral: 0, speedster: 0 },
    trivia: [
      { question: "What species is Martian Manhunter?", choices: ["Kryptonian", "Martian", "Atlantean", "Amazonian"], answer: 1 },
      { question: "Which power is most associated with Martian Manhunter?", choices: ["Telepathy", "Speed Force", "Lightning", "Ring constructs"], answer: 0 }
    ]
  }
};

const rosterOrder = ["batman", "superman", "ironman", "spiderman", "wonderwoman", "captainamerica", "thor", "hulk", "doctorstrange", "blackpanther", "wolverine", "flash", "aquaman", "greenlantern", "nightwing", "martianmanhunter"];
const voteRoster = [
  "ironman",
  "thor",
  "blackpanther",
  "flash",
  "wolverine",
  "other"
];

function toHeroArray() {
  return Object.values(heroes).map((hero) => ({ ...hero }));
}

function getHeroById(id) {
  return heroes[id] || null;
}

module.exports = { heroes, rosterOrder, voteRoster, toHeroArray, getHeroById };
