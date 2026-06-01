const rosterOrder = ["ironman", "thor", "blackpanther", "flash", "wolverine"];
const voteRoster = [...rosterOrder, "other"];

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
  },
  {
    prompt: "Your ideal power set would focus on...",
    answers: [
      { label: "Pure speed and rescue plays", weights: { speedster: 3, heart: 1 } },
      { label: "Magic, mystery, and forcefields", weights: { mystic: 3 } },
      { label: "Armor, tools, and tactical edge", weights: { scholar: 2, leader: 1 } },
      { label: "Instinct, grit, and close combat", weights: { feral: 3, rebel: 1 } }
    ]
  },
  {
    prompt: "What earns your loyalty fastest?",
    answers: [
      { label: "Competence under pressure", weights: { leader: 2, scholar: 1 } },
      { label: "Compassion and emotional honesty", weights: { heart: 3 } },
      { label: "Freedom to act on principle", weights: { rebel: 3 } },
      { label: "Respect for ancient wisdom", weights: { mystic: 2, leader: 1 } }
    ]
  },
  {
    prompt: "Pick a cinematic ending.",
    answers: [
      { label: "A sacrifice that saves everyone", weights: { leader: 2, heart: 2 } },
      { label: "A duel in the storm", weights: { mystic: 2, feral: 1 } },
      { label: "A brilliant last-second reversal", weights: { scholar: 3, speedster: 1 } },
      { label: "A brutal comeback nobody saw coming", weights: { feral: 2, rebel: 2 } }
    ]
  }
];

const appState = {
  selectedPickerId: "ironman",
  selectedHeroId: "ironman",
  revealedOtherId: null,
  otherIndex: 0,
  visiblePickerIds: [...rosterOrder, "other"],
  search: {
    query: "",
    universe: "all"
  },
  battle: {
    active: false,
    heroId: "ironman",
    enemyId: "thor",
    heroHp: 0,
    enemyHp: 0,
    heroGuarded: false,
    enemyGuarded: false,
    ended: false
  },
  quiz: {
    index: 0,
    scores: {},
    complete: false,
    resultId: null
  },
  trivia: {
    deck: [],
    index: 0,
    score: 0,
    answered: false,
    complete: false
  },
  vote: {
    hasLoaded: false,
    board: [],
    total: 0,
    message: "Loading shared totals..."
  }
};

const STORAGE_KEY = "hero-hub-selection-v1";
const THEME_KEY = "hero-hub-theme-v1";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageType = document.body?.dataset.page || "roster";

const elements = {
  heroPicker: document.getElementById("heroPicker"),
  pickerNote: document.getElementById("pickerNote"),
  heroSearch: document.getElementById("heroSearch"),
  heroUniverseFilter: document.getElementById("heroUniverseFilter"),
  searchFeedback: document.getElementById("searchFeedback"),
  spotlightUniverse: document.getElementById("spotlightUniverse"),
  spotlightName: document.getElementById("spotlightName"),
  spotlightTag: document.getElementById("spotlightTag"),
  spotlightStory: document.getElementById("spotlightStory"),
  spotlightBadges: document.getElementById("spotlightBadges"),
  spotlightImage: document.getElementById("spotlightImage"),
  powerBars: document.getElementById("powerBars"),
  signatureMoves: document.getElementById("signatureMoves"),
  villainGrid: document.getElementById("villainGrid"),
  timelineRail: document.getElementById("timelineRail"),
  teamupCard: document.getElementById("teamupCard"),
  battleOpponent: document.getElementById("battleOpponent"),
  battleStatus: document.getElementById("battleStatus"),
  battleHeroName: document.getElementById("battleHeroName"),
  battleEnemyName: document.getElementById("battleEnemyName"),
  battleHeroImage: document.getElementById("battleHeroImage"),
  battleEnemyImage: document.getElementById("battleEnemyImage"),
  battleHeroHealth: document.getElementById("battleHeroHealth"),
  battleEnemyHealth: document.getElementById("battleEnemyHealth"),
  battleLog: document.getElementById("battleLog"),
  quizCard: document.getElementById("quizCard"),
  triviaCard: document.getElementById("triviaCard"),
  voteButtons: document.getElementById("voteButtons"),
  voteMessage: document.getElementById("voteMessage"),
  voteTotal: document.getElementById("voteTotal"),
  voteBoard: document.getElementById("voteBoard"),
  externalHeroCard: document.getElementById("externalHeroCard"),
  themeToggle: document.getElementById("themeToggle"),
  cursorDot: document.getElementById("cursorDot"),
  cursorRing: document.getElementById("cursorRing")
};

restoreSelection();
restoreTheme();

function getSurpriseIds() {
  return Object.keys(heroes).filter((id) => !rosterOrder.includes(id));
}

function resolveDisplayHero() {
  return heroes[appState.selectedHeroId];
}

function persistSelection() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    selectedPickerId: appState.selectedPickerId,
    selectedHeroId: appState.selectedHeroId,
    revealedOtherId: appState.revealedOtherId,
    otherIndex: appState.otherIndex
  }));
}

function restoreSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const saved = JSON.parse(raw);
    if (saved.selectedPickerId) {
      appState.selectedPickerId = saved.selectedPickerId;
    }
    if (saved.selectedHeroId && heroes[saved.selectedHeroId]) {
      appState.selectedHeroId = saved.selectedHeroId;
    }
    if (saved.revealedOtherId && heroes[saved.revealedOtherId]) {
      appState.revealedOtherId = saved.revealedOtherId;
    }
    if (Number.isInteger(saved.otherIndex) && saved.otherIndex >= 0) {
      appState.otherIndex = saved.otherIndex;
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  if (elements.themeToggle) {
    elements.themeToggle.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
  }
}

function restoreTheme() {
  const theme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(theme);
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
}

function getCorePickerIds() {
  return [...rosterOrder, "other"];
}

function getHeroLabelForPicker(id) {
  if (id === "other") {
    return {
      title: "Other",
      detail: appState.revealedOtherId ? `Now revealing ${heroes[appState.revealedOtherId].name}` : "Preset surprise pool"
    };
  }
  return {
    title: heroes[id].name,
    detail: heroes[id].universe
  };
}

function setTheme(hero) {
  document.documentElement.style.setProperty("--primary", hero.colors.primary);
  document.documentElement.style.setProperty("--secondary", hero.colors.secondary);
  document.documentElement.style.setProperty("--accent", hero.colors.accent);
  document.documentElement.style.setProperty("--bg", hero.colors.bg);
}

function buildPicker() {
  if (!elements.heroPicker) {
    return;
  }
  const pickerIds = appState.visiblePickerIds.length ? appState.visiblePickerIds : getCorePickerIds();
  elements.heroPicker.innerHTML = "";
  pickerIds.forEach((id) => {
    const label = getHeroLabelForPicker(id);
    const button = document.createElement("button");
    button.className = "hero-picker-btn";
    button.type = "button";
    button.role = "tab";
    button.dataset.hero = id;
    button.setAttribute("aria-selected", String(appState.selectedPickerId === id));
    button.innerHTML = `<strong>${label.title}</strong><span>${label.detail}</span>`;
    button.addEventListener("click", () => {
      if (id === "other") {
        const surpriseIds = getSurpriseIds();
        const surpriseId = surpriseIds[appState.otherIndex % surpriseIds.length];
        appState.otherIndex += 1;
        appState.selectedPickerId = "other";
        appState.revealedOtherId = surpriseId;
        appState.selectedHeroId = surpriseId;
      } else {
        appState.selectedPickerId = id;
        appState.selectedHeroId = id;
      }
      persistSelection();
      renderPickerState();
      renderHeroExperience();
      if (elements.battleOpponent) {
        prepareBattle();
      }
    });
    elements.heroPicker.appendChild(button);
  });
}

function renderPickerState() {
  if (!elements.heroPicker && !elements.pickerNote) {
    return;
  }
  buildPicker();
  const hero = resolveDisplayHero();
  if (elements.pickerNote) {
    elements.pickerNote.textContent = appState.selectedPickerId === "other"
      ? `Other is a curated surprise pool. Current reveal: ${hero.name}. Pick Other again to rotate the reveal.`
      : `${hero.name} now drives this page and follows you across the other feature pages.`;
  }
}

function renderHeroExperience() {
  const hero = resolveDisplayHero();
  setTheme(hero);
  if (elements.spotlightUniverse) {
    elements.spotlightUniverse.textContent = appState.selectedPickerId === "other" ? "Surprise Pool Reveal" : hero.universe;
  }
  if (elements.spotlightName) {
    elements.spotlightName.textContent = hero.name;
  }
  if (elements.spotlightTag) {
    elements.spotlightTag.textContent = hero.tag;
  }
  if (elements.spotlightStory) {
    elements.spotlightStory.textContent = hero.story;
  }
  if (elements.spotlightImage) {
    elements.spotlightImage.src = hero.image;
    elements.spotlightImage.alt = `${hero.name} cinematic portrait`;
  }
  if (elements.spotlightBadges) {
    elements.spotlightBadges.innerHTML = hero.badges.map((badge) => `<span class="spotlight-badge">${badge}</span>`).join("");
  }
  renderPowerBars(hero);
  renderSignatureMoves(hero);
  renderVillains(hero);
  renderTimeline(hero);
  renderTeamUp(hero);
  renderBattleHeroName();
  fetchExternalHeroData(hero.id);
}

function renderPowerBars(hero) {
  if (!elements.powerBars) {
    return;
  }
  elements.powerBars.innerHTML = "";
  Object.entries(hero.stats).forEach(([label, value]) => {
    const wrap = document.createElement("div");
    wrap.className = "power-bar";
    wrap.innerHTML = `
      <div class="power-bar-head"><strong>${label}</strong><span>${value}</span></div>
      <div class="meter"><span data-width="${value}%"></span></div>
    `;
    elements.powerBars.appendChild(wrap);
  });
  requestAnimationFrame(() => {
    elements.powerBars.querySelectorAll(".meter span").forEach((span) => {
      span.style.width = span.dataset.width;
    });
  });
}

function renderSignatureMoves(hero) {
  if (!elements.signatureMoves) {
    return;
  }
  elements.signatureMoves.innerHTML = hero.abilities.map((move) => `<li>${move}</li>`).join("");
}

function renderVillains(hero) {
  if (!elements.villainGrid) {
    return;
  }
  elements.villainGrid.innerHTML = hero.villains.map((villain) => `
    <article class="villain-card reveal visible" tabindex="0">
      <div class="villain-card-inner">
        <div class="villain-face front">
          <img src="${villain.image}" alt="${villain.name}">
          <span class="threat">${villain.threat}</span>
          <h3>${villain.name}</h3>
          <p>${villain.front}</p>
        </div>
        <div class="villain-face back">
          <span class="threat">Why it matters</span>
          <h3>${villain.name}</h3>
          <p>${villain.back}</p>
        </div>
      </div>
    </article>
  `).join("");
}

function renderTimeline(hero) {
  if (!elements.timelineRail) {
    return;
  }
  elements.timelineRail.innerHTML = hero.timeline.map((entry) => `
    <article class="timeline-card">
      <time>${entry.year}</time>
      <h3>${entry.title}</h3>
      <p>${entry.text}</p>
    </article>
  `).join("");
}

function renderTeamUp(hero) {
  if (!elements.teamupCard) {
    return;
  }
  elements.teamupCard.innerHTML = `
    <div>
      <p class="eyebrow">Recommended pairing</p>
      <h3>${hero.teamup.partner}</h3>
      <p><strong>${hero.teamup.title}</strong></p>
      <p>${hero.teamup.text}</p>
    </div>
    <div class="synergy-meter">
      <strong>${hero.teamup.synergy}% synergy</strong>
      <div class="meter"><span style="width:${hero.teamup.synergy}%"></span></div>
      <p>This score blends style overlap, tactical complement, and narrative chemistry.</p>
    </div>
  `;
}

function buildBattleOpponents() {
  if (!elements.battleOpponent) {
    return;
  }
  const ids = [...rosterOrder, ...getSurpriseIds()];
  elements.battleOpponent.innerHTML = ids
    .filter((id) => id !== appState.selectedHeroId)
    .map((id) => `<option value="${id}">${heroes[id].name}</option>`)
    .join("");
}

function renderBattleHeroName() {
  if (elements.battleHeroName) {
    const hero = resolveDisplayHero();
    elements.battleHeroName.textContent = hero.name;
    if (elements.battleHeroImage) {
      elements.battleHeroImage.src = hero.image;
      elements.battleHeroImage.alt = `${hero.name} battle portrait`;
    }
  }
}

function prepareBattle() {
  if (!elements.battleOpponent) {
    return;
  }
  buildBattleOpponents();
  const heroId = appState.selectedHeroId;
  const defaultEnemy = elements.battleOpponent.value || rosterOrder.find((id) => id !== heroId) || getSurpriseIds()[0];
  appState.battle = {
    active: false,
    heroId,
    enemyId: defaultEnemy,
    heroHp: heroes[heroId].battle.hp,
    enemyHp: heroes[defaultEnemy].battle.hp,
    heroGuarded: false,
    enemyGuarded: false,
    ended: false
  };
  renderBattleState("Choose an opponent to initialize the arena.");
}

function startBattle() {
  if (!elements.battleOpponent) {
    return;
  }
  const heroId = appState.selectedHeroId;
  const enemyId = elements.battleOpponent.value;
  if (!enemyId) {
    renderBattleState("No opponent available for the current hero.");
    return;
  }
  appState.battle = {
    active: true,
    heroId,
    enemyId,
    heroHp: heroes[heroId].battle.hp,
    enemyHp: heroes[enemyId].battle.hp,
    heroGuarded: false,
    enemyGuarded: false,
    ended: false
  };
  elements.battleLog.innerHTML = "";
  logBattle(`${heroes[heroId].name} enters the arena against ${heroes[enemyId].name}.`);
  renderBattleState("Battle in progress. Pick an action.");
}

function calculateDamage(base, variance, guarded) {
  const raw = base + Math.floor(Math.random() * variance);
  return Math.max(6, Math.round(raw * (guarded ? 0.58 : 1)));
}

function logBattle(text) {
  if (!elements.battleLog) {
    return;
  }
  const item = document.createElement("li");
  item.textContent = text;
  elements.battleLog.prepend(item);
}

function renderBattleState(message) {
  if (!elements.battleStatus || !elements.battleHeroName || !elements.battleEnemyName || !elements.battleHeroHealth || !elements.battleEnemyHealth) {
    return;
  }
  const { heroId, enemyId, heroHp, enemyHp, active, ended } = appState.battle;
  elements.battleStatus.textContent = message;
  elements.battleHeroName.textContent = heroes[heroId].name;
  elements.battleEnemyName.textContent = enemyId ? heroes[enemyId].name : "No opponent";
  if (elements.battleHeroImage) {
    elements.battleHeroImage.src = heroes[heroId].image;
    elements.battleHeroImage.alt = `${heroes[heroId].name} battle portrait`;
  }
  if (elements.battleEnemyImage && enemyId) {
    elements.battleEnemyImage.src = heroes[enemyId].image;
    elements.battleEnemyImage.alt = `${heroes[enemyId].name} battle portrait`;
  }
  if (enemyId) {
    elements.battleHeroHealth.style.width = `${Math.max(0, (heroHp / heroes[heroId].battle.hp) * 100)}%`;
    elements.battleEnemyHealth.style.width = `${Math.max(0, (enemyHp / heroes[enemyId].battle.hp) * 100)}%`;
  }
  const disableActions = !active || ended;
  const attackButton = document.getElementById("actionAttack");
  const specialButton = document.getElementById("actionSpecial");
  const guardButton = document.getElementById("actionGuard");
  if (attackButton) attackButton.disabled = disableActions;
  if (specialButton) specialButton.disabled = disableActions;
  if (guardButton) guardButton.disabled = disableActions;
}

function performHeroAction(type) {
  const state = appState.battle;
  if (!state.active || state.ended) {
    return;
  }
  const hero = heroes[state.heroId];
  const enemy = heroes[state.enemyId];
  state.heroGuarded = false;
  if (type === "guard") {
    state.heroGuarded = true;
    logBattle(`${hero.name} ${hero.battle.moves.guard}.`);
  } else {
    const base = type === "special" ? hero.battle.special : hero.battle.attack;
    const damage = calculateDamage(base, type === "special" ? 10 : 8, state.enemyGuarded);
    state.enemyHp = Math.max(0, state.enemyHp - damage);
    state.enemyGuarded = false;
    logBattle(`${hero.name} ${hero.battle.moves[type]} for ${damage} damage.`);
  }

  if (state.enemyHp <= 0) {
    state.ended = true;
    state.active = false;
    renderBattleState(`${hero.name} wins the showdown.`);
    return;
  }

  enemyTurn();
}

function enemyTurn() {
  const state = appState.battle;
  if (state.ended) {
    return;
  }
  const enemy = heroes[state.enemyId];
  const hero = heroes[state.heroId];
  const roll = Math.random();

  if (roll < 0.22) {
    state.enemyGuarded = true;
    logBattle(`${enemy.name} ${enemy.battle.moves.guard}.`);
  } else {
    const useSpecial = roll > 0.74;
    const base = useSpecial ? enemy.battle.special : enemy.battle.attack;
    const damage = calculateDamage(base, useSpecial ? 9 : 7, state.heroGuarded);
    state.heroHp = Math.max(0, state.heroHp - damage);
    state.heroGuarded = false;
    logBattle(`${enemy.name} ${enemy.battle.moves[useSpecial ? "special" : "attack"]} for ${damage} damage.`);
  }

  if (state.heroHp <= 0) {
    state.ended = true;
    state.active = false;
    renderBattleState(`${enemy.name} wins the showdown.`);
    return;
  }

  renderBattleState(`${hero.name}'s turn. Choose the next move.`);
}

function resetQuiz() {
  appState.quiz = {
    index: 0,
    scores: {},
    complete: false,
    resultId: null
  };
  renderQuiz();
}

function scoreQuizAnswer(weights) {
  Object.entries(weights).forEach(([trait, value]) => {
    appState.quiz.scores[trait] = (appState.quiz.scores[trait] || 0) + value;
  });
  appState.quiz.index += 1;
  if (appState.quiz.index >= quizQuestions.length) {
    const candidateIds = [...rosterOrder, ...getSurpriseIds()];
    const ranked = candidateIds
      .map((id) => {
        const affinity = heroes[id].quizAffinity;
        const total = Object.entries(appState.quiz.scores).reduce((sum, [trait, value]) => {
          return sum + (affinity[trait] || 0) * value;
        }, 0);
        return { id, total };
      })
      .sort((a, b) => b.total - a.total || candidateIds.indexOf(a.id) - candidateIds.indexOf(b.id));

    appState.quiz.complete = true;
    appState.quiz.resultId = ranked[0].id;
  }
  renderQuiz();
}

function renderQuiz() {
  if (!elements.quizCard) {
    return;
  }
  if (appState.quiz.complete) {
    const hero = heroes[appState.quiz.resultId];
    const otherNote = getSurpriseIds().includes(hero.id) ? "Unlocked through the surprise pool archetype." : "Matched from the core roster.";
    elements.quizCard.innerHTML = `
      <div class="result-card">
        <p class="eyebrow">Your result</p>
        <h4>${hero.name}</h4>
        <p>${hero.tag}</p>
        <p>${otherNote}</p>
        <button class="button button-secondary" id="quizReset">Play Again</button>
      </div>
    `;
    document.getElementById("quizReset").addEventListener("click", resetQuiz);
    return;
  }

  const question = quizQuestions[appState.quiz.index];
  const progress = ((appState.quiz.index) / quizQuestions.length) * 100;
  elements.quizCard.innerHTML = `
    <div class="progress-line"><span style="width:${progress}%"></span></div>
    <div class="question-copy">
      <p class="eyebrow">Question ${appState.quiz.index + 1} / ${quizQuestions.length}</p>
      <h4>${question.prompt}</h4>
    </div>
    <div class="option-list" id="quizOptions"></div>
  `;
  const options = document.getElementById("quizOptions");
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "button button-secondary";
    button.type = "button";
    button.textContent = answer.label;
    button.addEventListener("click", () => scoreQuizAnswer(answer.weights));
    options.appendChild(button);
  });
}

function buildTriviaDeck() {
  const heroIds = [...rosterOrder, ...getSurpriseIds()];
  const deck = heroIds.flatMap((id) =>
    heroes[id].trivia.map((entry) => ({
      ...entry,
      heroId: id
    }))
  );
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const swap = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[swap]] = [deck[swap], deck[i]];
  }
  appState.trivia.deck = deck.slice(0, 6);
  appState.trivia.index = 0;
  appState.trivia.score = 0;
  appState.trivia.answered = false;
  appState.trivia.complete = false;
}

function answerTrivia(choiceIndex) {
  if (appState.trivia.complete || appState.trivia.answered) {
    return;
  }
  const current = appState.trivia.deck[appState.trivia.index];
  const correct = current.answer === choiceIndex;
  if (correct) {
    appState.trivia.score += 1;
  }
  appState.trivia.answered = true;
  renderTrivia(correct ? "Correct." : `Not quite. The answer was ${current.choices[current.answer]}.`);
}

function nextTrivia() {
  appState.trivia.index += 1;
  appState.trivia.answered = false;
  if (appState.trivia.index >= appState.trivia.deck.length) {
    appState.trivia.complete = true;
  }
  renderTrivia();
}

function renderTrivia(feedback = "") {
  if (!elements.triviaCard) {
    return;
  }
  if (appState.trivia.complete) {
    elements.triviaCard.innerHTML = `
      <div class="result-card">
        <p class="eyebrow">Trivia complete</p>
        <h4>${appState.trivia.score} / ${appState.trivia.deck.length}</h4>
        <p>You cleared the deck across the roster and surprise pool.</p>
        <button class="button button-secondary" id="triviaReset">Play Again</button>
      </div>
    `;
    document.getElementById("triviaReset").addEventListener("click", () => {
      buildTriviaDeck();
      renderTrivia();
    });
    return;
  }

  const current = appState.trivia.deck[appState.trivia.index];
  const hero = heroes[current.heroId];
  const progress = ((appState.trivia.index) / appState.trivia.deck.length) * 100;
  elements.triviaCard.innerHTML = `
    <div class="progress-line"><span style="width:${progress}%"></span></div>
    <div class="question-copy">
      <p class="eyebrow">${hero.name} trivia</p>
      <h4>${current.question}</h4>
    </div>
    <div class="option-list" id="triviaOptions"></div>
    <p class="trivia-feedback">${feedback}</p>
    ${appState.trivia.answered ? '<button class="button button-secondary" id="triviaNext">Next Question</button>' : ""}
  `;
  const options = document.getElementById("triviaOptions");
  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "button button-secondary";
    button.type = "button";
    button.textContent = choice;
    button.disabled = appState.trivia.answered;
    button.addEventListener("click", () => answerTrivia(index));
    options.appendChild(button);
  });
  const nextButton = document.getElementById("triviaNext");
  if (nextButton) {
    nextButton.addEventListener("click", nextTrivia);
  }
}

async function fetchVotes() {
  if (!elements.voteButtons || !elements.voteMessage || !elements.voteTotal || !elements.voteBoard) {
    return;
  }
  try {
    const response = await fetch("/api/votes");
    if (!response.ok) {
      throw new Error("Vote board unavailable.");
    }
    const data = await response.json();
    appState.vote = {
      hasLoaded: true,
      board: data.board,
      total: data.totalVotes,
      message: "Shared totals are live. Vote once, refresh anywhere, and the numbers remain."
    };
  } catch (error) {
    appState.vote.message = "Could not load shared totals. The API may not be running yet.";
  }
  renderVoteBoard();
}

async function submitVote(heroId) {
  if (!elements.voteMessage) {
    return;
  }
  elements.voteMessage.textContent = `Submitting vote for ${heroId === "other" ? "Other" : heroes[heroId].name}...`;
  try {
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroId })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Vote failed.");
    }
    appState.vote.board = data.board;
    appState.vote.total = data.totalVotes;
    appState.vote.message = `Vote counted for ${heroId === "other" ? "Other" : heroes[heroId].name}. Shared totals updated.`;
  } catch (error) {
    appState.vote.message = error.message;
  }
  renderVoteBoard();
}

function renderVoteBoard() {
  if (!elements.voteButtons || !elements.voteMessage || !elements.voteTotal || !elements.voteBoard) {
    return;
  }
  elements.voteButtons.innerHTML = "";
  voteRoster.forEach((id) => {
    const button = document.createElement("button");
    button.className = "button button-secondary";
    button.type = "button";
    button.textContent = id === "other" ? "Other" : heroes[id].name;
    button.addEventListener("click", () => submitVote(id));
    elements.voteButtons.appendChild(button);
  });
  elements.voteMessage.textContent = appState.vote.message;
  elements.voteTotal.textContent = `${appState.vote.total} total votes`;
  elements.voteBoard.innerHTML = appState.vote.board.map((entry, index) => `
    <div class="leader-row">
      <div class="leader-row-head">
        <strong>#${index + 1} ${entry.label}</strong>
        <span>${entry.votes} votes</span>
      </div>
      <small>${entry.percent}% of the board</small>
      <div class="leader-meter"><span style="width:${entry.percent}%"></span></div>
    </div>
  `).join("");
}

function initRevealObserver() {
  if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function initParallax() {
  if (prefersReducedMotion) {
    return;
  }
  const panels = document.querySelectorAll(".parallax-panel");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    panels.forEach((panel) => {
      const speed = Number(panel.dataset.speed || 0);
      panel.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}

function initCursor() {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer || prefersReducedMotion || !elements.cursorDot || !elements.cursorRing) {
    return;
  }
  document.body.classList.add("cursor-enabled");
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  elements.cursorDot.style.opacity = "1";
  elements.cursorRing.style.opacity = "0.6";
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    elements.cursorDot.style.left = `${mouseX}px`;
    elements.cursorDot.style.top = `${mouseY}px`;
  });
  const tick = () => {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    elements.cursorRing.style.left = `${ringX}px`;
    elements.cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(tick);
  };
  tick();
  document.querySelectorAll("button, a, select").forEach((node) => {
    node.addEventListener("mouseenter", () => {
      elements.cursorDot.style.transform = "translate(-50%, -50%) scale(1.8)";
    });
    node.addEventListener("mouseleave", () => {
      elements.cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
}

function initBattleEvents() {
  const battleStart = document.getElementById("battleStart");
  const actionAttack = document.getElementById("actionAttack");
  const actionSpecial = document.getElementById("actionSpecial");
  const actionGuard = document.getElementById("actionGuard");
  if (!battleStart || !actionAttack || !actionSpecial || !actionGuard || !elements.battleOpponent) {
    return;
  }
  battleStart.addEventListener("click", startBattle);
  actionAttack.addEventListener("click", () => performHeroAction("attack"));
  actionSpecial.addEventListener("click", () => performHeroAction("special"));
  actionGuard.addEventListener("click", () => performHeroAction("guard"));
  elements.battleOpponent.addEventListener("change", (event) => {
    appState.battle.enemyId = event.target.value;
  });
}

function buildUniverseFilter() {
  if (!elements.heroUniverseFilter) {
    return;
  }
  const universeOptions = ["all", ...new Set(Object.values(heroes).map((hero) => hero.universe))];
  elements.heroUniverseFilter.innerHTML = universeOptions
    .map((universe) => `<option value="${universe}">${universe === "all" ? "All Universes" : universe}</option>`)
    .join("");
  elements.heroUniverseFilter.value = appState.search.universe;
}

async function applySearchFilter() {
  if (!elements.heroSearch && !elements.heroUniverseFilter) {
    return;
  }
  const query = elements.heroSearch?.value?.trim() || "";
  const universe = elements.heroUniverseFilter?.value || "all";
  appState.search = { query, universe };

  if (!query && universe === "all") {
    appState.visiblePickerIds = getCorePickerIds();
    if (elements.searchFeedback) {
      elements.searchFeedback.textContent = "Showing the full roster.";
    }
    renderPickerState();
    return;
  }

  try {
    const params = new URLSearchParams({ q: query, universe });
    const response = await fetch(`/api/search?${params.toString()}`);
    const data = await response.json();
    const visible = [];
    const hasSurprise = data.results.some((hero) => !rosterOrder.includes(hero.id));
    data.results.forEach((hero) => {
      if (rosterOrder.includes(hero.id) && !visible.includes(hero.id)) {
        visible.push(hero.id);
      }
    });
    if (hasSurprise || query.toLowerCase().includes("other")) {
      visible.push("other");
    }
    appState.visiblePickerIds = visible.length ? visible : [];
    if (elements.searchFeedback) {
      elements.searchFeedback.textContent = visible.length
        ? `Found ${data.count} matching hero records for this filter.`
        : "No direct matches. Clear the search to restore the full roster.";
    }
  } catch (error) {
    const fallbackVisible = getCorePickerIds().filter((id) => {
      if (id === "other") {
        return query ? "other".includes(query.toLowerCase()) : true;
      }
      const hero = heroes[id];
      const inUniverse = universe === "all" || hero.universe === universe;
      const haystack = `${hero.name} ${hero.universe} ${hero.tag} ${hero.story}`.toLowerCase();
      return inUniverse && (!query || haystack.includes(query.toLowerCase()));
    });
    appState.visiblePickerIds = fallbackVisible;
    if (elements.searchFeedback) {
      elements.searchFeedback.textContent = "Search API unavailable, using in-page filtering instead.";
    }
  }
  renderPickerState();
}

function initSearchControls() {
  if (!elements.heroSearch || !elements.heroUniverseFilter) {
    return;
  }
  buildUniverseFilter();
  elements.heroSearch.addEventListener("input", applySearchFilter);
  elements.heroUniverseFilter.addEventListener("change", applySearchFilter);
}

async function fetchExternalHeroData(heroId) {
  if (!elements.externalHeroCard || pageType !== "roster") {
    return;
  }
  elements.externalHeroCard.innerHTML = '<p class="search-feedback">Fetching optional external hero data...</p>';
  try {
    const response = await fetch(`/api/heroes/${heroId}/external`);
    const data = await response.json();
    if (!data.available) {
      elements.externalHeroCard.innerHTML = `
        <p class="eyebrow">External source</p>
        <h3>${heroes[heroId].name}</h3>
        <p class="search-feedback">${data.message || "External hero API is not configured yet."}</p>
      `;
      return;
    }
    elements.externalHeroCard.innerHTML = `
      <p class="eyebrow">External source</p>
      <h3>${heroes[heroId].name}</h3>
      <p class="search-feedback">Connected to ${data.source}. This payload is available for future enrichment, comparisons, or stat overlays.</p>
      <pre class="api-preview">${JSON.stringify(data.payload, null, 2).slice(0, 800)}</pre>
    `;
  } catch (error) {
    elements.externalHeroCard.innerHTML = '<p class="search-feedback">External superhero API request failed.</p>';
  }
}

function initThemeToggle() {
  if (!elements.themeToggle) {
    return;
  }
  elements.themeToggle.addEventListener("click", toggleTheme);
}

function init() {
  initRevealObserver();
  initParallax();
  initCursor();
  initThemeToggle();
  buildPicker();
  initSearchControls();
  renderPickerState();
  renderHeroExperience();
  if (elements.battleOpponent) {
    prepareBattle();
    initBattleEvents();
  }
  if (elements.quizCard) {
    resetQuiz();
  }
  if (elements.triviaCard) {
    buildTriviaDeck();
    renderTrivia();
  }
  if (elements.voteButtons) {
    renderVoteBoard();
    fetchVotes();
  }
}

init();
