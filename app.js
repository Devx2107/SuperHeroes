const heroOrder = ["batman", "superman", "ironman", "spiderman", "wonderwoman"];
const rosterHeroOrder = [
  ...heroOrder,
  "captainamerica",
  "thor",
  "hulk",
  "doctorstrange",
  "blackpanther",
  "wolverine",
  "flash",
  "aquaman",
  "greenlantern",
  "nightwing",
  "martianmanhunter"
];
const universeFilters = ["all", "Marvel", "DC"];
const featureNavLinks = [
  { href: "heroes.html", label: "Heroes / Roster", key: "roster" },
  { href: "battle.html", label: "Battle", key: "battle" },
  { href: "quiz.html", label: "Quiz", key: "quiz" },
  { href: "trivia.html", label: "Trivia", key: "trivia" },
  { href: "votes.html", label: "Votes", key: "votes" }
];
const fallbackVoteEntries = [
  { id: "ironman", label: "Iron Man" },
  { id: "thor", label: "Thor" },
  { id: "blackpanther", label: "Black Panther" },
  { id: "flash", label: "The Flash" },
  { id: "wolverine", label: "Wolverine" },
  { id: "other", label: "Other" }
];

const heroData = {
  batman: {
    id: "batman",
    name: "Batman",
    universe: "DC",
    title: "THE DARK KNIGHT",
    subtitle: "THE DETECTIVE WHO TURNED GRIEF INTO A MISSION",
    bgText: "BATMAN",
    cityLabel: "GOTHAM CITY",
    image: "https://cdnb.artstation.com/p/assets/images/images/049/406/453/large/tomyt-batman-cinematic-wallpaper.jpg?1652412024",
    wiki: "https://en.wikipedia.org/wiki/Batman",
    colors: { primary: "#d64545", secondary: "#121212", accent: "#ffb84d", bg: "#050505" },
    stats: { "TACTICAL EDGE": "MAX", "FEAR FACTOR": "HIGH", "LEGACY": "85+ YEARS" },
    abilities: ["World-class detective", "Peak human conditioning", "Gadget mastery", "Psychological warfare"],
    badges: ["World's Greatest Detective", "Master Martial Artist", "Gotham's Guardian"],
    storyLeft: "Bruce Wayne watched his parents die in Crime Alley and turned that wound into a lifelong vow. He trained across the world, studied every angle of fear and crime, then came home to Gotham as a symbol criminals could not ignore.",
    storyRight: "Batman succeeds by outthinking enemies who often outgun him. He plans for the impossible, trusts the evidence, and keeps standing when the city has every reason to fall apart.",
    ctaLabel: "ENTER THE NIGHT",
    versions: [
      { actor: "MICHAEL KEATON", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Michael_Keaton_October_2014.jpg/440px-Michael_Keaton_October_2014.jpg", quote: "I'm Batman." },
      { actor: "CHRISTIAN BALE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Christian_Bale-7837.jpg/250px-Christian_Bale-7837.jpg", quote: "It's not who I am underneath, but what I do that defines me." },
      { actor: "BEN AFFLECK", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/440px-Ben_Affleck_by_Gage_Skidmore_3.jpg", quote: "Tell me, do you bleed?" }
    ],
    villains: [
      { name: "The Joker", threat: "Agent of chaos", image: "https://upload.wikimedia.org/wikipedia/en/1/17/Joker_%28DC_Comics_character%29.jpg", front: "Anarchy with a grin. The Joker tests whether Batman can protect a city that keeps reinventing madness.", back: "Every appearance turns into a moral stress test for Gotham's protector and the line he refuses to cross." },
      { name: "Bane", threat: "The breaker", image: "https://upload.wikimedia.org/wikipedia/en/3/3e/Bane_%28DC_Comics_character%29.png", front: "Bane is the strategist who proves Batman can be beaten physically and mentally at the same time.", back: "Knightfall made Bane part of Batman's myth because he exposed the cost of carrying a city alone." }
    ],
    timeline: [
      { year: "1939", title: "First appearance", text: "Batman debuts in Detective Comics #27 and reshapes crime fiction in caped form." },
      { year: "1987", title: "Year One", text: "Frank Miller's origin focuses the legend on detective work, corruption, and discipline." },
      { year: "1993", title: "Knightfall", text: "Bane breaks Batman, forcing Gotham's protector to confront his own limits." },
      { year: "2011", title: "The New 52", text: "The Court of Owls era pushes Batman deeper into conspiracy and urban myth." }
    ],
    teamup: { partner: "Superman", synergy: 92, title: "World's Finest", text: "Strategy meets hope. Batman gives the plan, Superman gives the lift, and the world gets a team that can handle anything from a street-level crisis to a cosmic invasion." },
    comparison: { strength: 78, speed: 72, intelligence: 98, durability: 80, combat: 100, power: 18 },
    battle: { hp: 100, attack: 17, special: 27, moves: { attack: "disappears into shadow and strikes", special: "deploys a tactical gauntlet combo", guard: "raises an armored cape shield" } },
    quizAffinity: { leader: 4, scholar: 4, rebel: 2, heart: 1, speedster: 0, mystic: 0, feral: 1 },
    lore: {
      origin: [
        "Bruce Wayne's origin is a study in grief weaponized into discipline. After the murder of Thomas and Martha Wayne, he committed himself to a life built around detection, endurance, and fear as a tool against criminals.",
        "He did not become Batman because he wanted power. He became Batman because Gotham needed a symbol that could survive corruption, mob power, and supervillains without losing its nerve."
      ],
      powers: [
        "Batman has no superhuman powers, and that is the point. His strength comes from peak physical training, forensic reasoning, planning, infiltration, and an unmatched ability to stay three moves ahead.",
        "The utility belt, bat-gadgets, vehicles, and contingency plans are extensions of his mind. He fights like a detective, a soldier, and a strategist folded into one."
      ],
      storylines: [
        "Year One defines his early war on crime. The Long Halloween turns Gotham into a detective mystery. Knightfall breaks his body, while The Court of Owls reminds him that the city has hidden rulers older than his mission.",
        "No Man's Land, Hush, and countless modern arcs show the same thing: Batman is at his most interesting when Gotham itself becomes the adversary."
      ],
      allies: [
        "Alfred Pennyworth anchors Bruce with honesty and dry wit. Gordon gives him a public ally inside the system. Robin, Batgirl, Nightwing, and the wider Bat-Family turn the mission from solitary obsession into a living network.",
        "His Justice League alliances prove that the man who works best alone still understands trust when the stakes rise."
      ],
      legacy: [
        "Batman set the modern template for grounded superheroes: trauma, consequence, urban atmosphere, and a hero whose brilliance is as important as his punch.",
        "He remains one of comics' most flexible icons because every era can ask a different question of him: how much pain can a person carry, and still choose not to become the thing they fight?"
      ],
      funFacts: [
        "Batman first appeared in Detective Comics #27 in 1939.",
        "The Bat-Signal is as much a symbol of trust as it is a warning.",
        "His greatest weapon is often the thing criminals forget to fear: patience."
      ]
    },
    trivia: [
      {
        question: "Which comic famously introduced Batman's origin in a definitive modern form?",
        choices: ["Year One", "Hush", "The Long Halloween", "The Killing Joke"],
        answer: 0,
        explanation: "Batman: Year One is the landmark modern retelling of Bruce Wayne's early years."
      },
      {
        question: "What makes Batman most dangerous in a room full of metahumans?",
        choices: ["A hidden power source", "Preparation and analysis", "Magic training", "Alien technology"],
        answer: 1,
        explanation: "He wins by preparation, not by powers."
      }
    ]
  },
  superman: {
    id: "superman",
    name: "Superman",
    universe: "DC",
    title: "MAN OF STEEL",
    subtitle: "HOPE GIVEN A HUMAN FACE",
    bgText: "SUPERMAN",
    cityLabel: "METROPOLIS",
    image: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png",
    wiki: "https://en.wikipedia.org/wiki/Superman",
    colors: { primary: "#4d94ff", secondary: "#12223d", accent: "#ffd84d", bg: "#05070d" },
    stats: { "SPEED": "LIGHTNING", "MIGHT": "PLANETARY", "LEGACY": "85+ YEARS" },
    abilities: ["Solar-powered strength", "Flight", "Heat vision", "X-ray vision"],
    badges: ["Symbol of Hope", "Last Son of Krypton", "The Man of Tomorrow"],
    storyLeft: "Kal-El was sent from Krypton to survive the end of his world and was raised in Smallville as Clark Kent. The Kents taught him that power only matters if it is guided by compassion.",
    storyRight: "Superman represents what happens when a godlike being chooses restraint, empathy, and public service. He does not rule the world; he protects it and tries to inspire it to do better.",
    ctaLabel: "RISE ABOVE",
    versions: [
      { actor: "CHRISTOPHER REEVE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Christopher_Reeve_in_September_1978.jpg/440px-Christopher_Reeve_in_September_1978.jpg", quote: "Easy, miss. I've got you." },
      { actor: "HENRY CAVILL", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Henry_Cavill_%2848429838422%29_%28cropped%29.jpg/440px-Henry_Cavill_%2848429838422%29_%28cropped%29.jpg", quote: "You will give the people of Earth an ideal to strive towards." },
      { actor: "TYLER HOECHLIN", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tyler_Hoechlin_by_Gage_Skidmore.jpg/440px-Tyler_Hoechlin_by_Gage_Skidmore.jpg", quote: "Hope is bigger than fear." }
    ],
    villains: [
      { name: "Lex Luthor", threat: "Human genius", image: "https://upload.wikimedia.org/wikipedia/en/0/09/Lex_Luthor.png", front: "Lex turns intellect into ego, then into an argument against alien power and public trust.", back: "The rivalry matters because it is a duel over what humanity should admire: compassion or control." },
      { name: "Brainiac", threat: "Collector of worlds", image: "https://upload.wikimedia.org/wikipedia/en/6/64/Brainiac_DC_Comics.png", front: "Brainiac threatens not just Metropolis but the idea that knowledge should be used with empathy.", back: "He gives Superman an enemy that is cold, brilliant, and impossible to intimidate." }
    ],
    timeline: [
      { year: "1938", title: "First appearance", text: "Superman launches in Action Comics #1 and defines the superhero archetype." },
      { year: "1978", title: "Cinematic hope", text: "The Reeve films make the world believe a man can fly." },
      { year: "1992", title: "Death and Return", text: "The Death of Superman arc proves that the symbol matters even when the man falls." },
      { year: "2003", title: "All-Star voice", text: "All-Star Superman turns the character into a perfect statement on hope and legacy." }
    ],
    teamup: { partner: "Batman", synergy: 95, title: "World's Finest", text: "Batman supplies the contingency plan. Superman supplies the impossible lift. Together they balance inspiration with realism." },
    comparison: { strength: 100, speed: 96, intelligence: 88, durability: 100, combat: 85, power: 100 },
    battle: { hp: 150, attack: 22, special: 36, moves: { attack: "delivers a thunderous blitz", special: "fires heat vision at full power", guard: "anchors the battlefield with calm force" } },
    quizAffinity: { leader: 4, scholar: 1, rebel: 0, heart: 5, speedster: 0, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Superman's origin is built on two homes: Krypton, the world he lost, and Earth, the world that raised him. Jor-El and Lara save their son by sending him away, while Jonathan and Martha Kent teach him how to become a good man.",
        "The entire myth works because Clark Kent is not a disguise for weakness. He is the daily proof that immense power can coexist with humility."
      ],
      powers: [
        "Under a yellow sun, Superman becomes one of the most powerful beings in comics. Flight, super strength, speed, invulnerability, heat vision, and sensory powers are only the beginning of what Kryptonian biology can do.",
        "His most important power is restraint. The story only works when he is strong enough to solve almost anything, but wise enough to choose the solution that preserves lives and hope."
      ],
      storylines: [
        "The Death of Superman and its aftermath turned him into a cultural event. Kingdom Come reframed him as a moral ideal in a broken future. All-Star Superman distilled the character into one of comics' purest reflections on hope.",
        "More recent stories keep returning to the same core question: how does a near-perfect hero remain human, relatable, and compassionate while the world constantly demands more?"
      ],
      allies: [
        "Lois Lane keeps Clark honest. Jimmy Olsen keeps him grounded in the messiest, funniest corners of Metropolis. The Justice League lets him be the first responder to cosmic disasters without losing his humanity.",
        "The Super-Family and the Kent family ensure that Superman's life is not only about what he can lift, but who he listens to."
      ],
      legacy: [
        "Superman is the blueprint for heroic optimism. He made it possible to imagine superheroes as public symbols rather than just vigilantes or adventurers.",
        "Every generation revisits him because the world always needs a version of hope that is visible, generous, and strong enough to be credible."
      ],
      funFacts: [
        "Superman first appeared in Action Comics #1 in 1938.",
        "Clark Kent's glasses are not the real disguise; the persona is.",
        "He is most compelling when his compassion feels more powerful than his fists."
      ]
    },
    trivia: [
      {
        question: "What city does Superman protect as his main home base?",
        choices: ["Gotham", "Metropolis", "Central City", "Star City"],
        answer: 1,
        explanation: "Metropolis is the bright city that pairs naturally with Superman's hopeful image."
      },
      {
        question: "Which symbol best defines Superman's myth across eras?",
        choices: ["Revenge", "Hope", "Chaos", "Secrecy"],
        answer: 1,
        explanation: "Superman endures because he stands for hope first."
      }
    ]
  },
  ironman: {
    id: "ironman",
    name: "Iron Man",
    universe: "Marvel",
    title: "THE INVINCIBLE IRON MAN",
    subtitle: "GENIUS, BILLIONAIRE, AND THE MAN WHO TURNED PANIC INTO FLIGHT",
    bgText: "IRON MAN",
    cityLabel: "STARK TOWER",
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
    wiki: "https://en.wikipedia.org/wiki/Iron_Man",
    colors: { primary: "#ff6a3d", secondary: "#1b2433", accent: "#ffe27a", bg: "#06080c" },
    stats: { "TECH LEVEL": "EXTREME", "RISK TOLERANCE": "UNMATCHED", "LEGACY": "60+ YEARS" },
    abilities: ["Powered armor", "Repulsor blasts", "Flight systems", "AI-assisted combat"],
    badges: ["Avengers founder", "Armor architect", "Arc reactor pioneer"],
    storyLeft: "Tony Stark was a weapons billionaire who had to look directly at the consequences of his own industry. Captured and badly wounded, he built the first armor to survive, then kept building because survival was never the final goal.",
    storyRight: "Iron Man is an arc of growth through invention, accountability, and sacrifice. Tony's brilliance makes him powerful; his willingness to change makes him heroic.",
    ctaLabel: "SUIT UP",
    versions: [
      { actor: "ROBERT DOWNEY JR.", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg/440px-Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg", quote: "I am Iron Man." },
      { actor: "COMIC CLASSIC", image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png", quote: "The suit and I are one." }
    ],
    villains: [
      { name: "Whiplash", threat: "Engineered revenge", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "Whiplash turns Stark's own technology culture into a personal vendetta.", back: "The rivalry works because it asks whether invention creates safety or just more elegant violence." },
      { name: "Ultron", threat: "Runaway intelligence", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", front: "Ultron is the nightmare that says Tony's logic can survive without his ethics.", back: "That makes Ultron one of Stark's sharpest mirrors: progress without conscience." }
    ],
    timeline: [
      { year: "1963", title: "First appearance", text: "Iron Man debuts in Tales of Suspense #39 and turns industrial tech into superhero mythology." },
      { year: "2008", title: "MCU ignition", text: "The first Iron Man film launches the Marvel Cinematic Universe with a gamble that pays off instantly." },
      { year: "2009", title: "Demon in a Bottle", text: "One of Marvel's essential stories confronts Tony's flaws without pretending genius solves everything." },
      { year: "2019", title: "Endgame", text: "Tony closes the Infinity Saga with a sacrifice that redefines the character's legacy." }
    ],
    teamup: { partner: "Spider-Man", synergy: 94, title: "Mentor and student", text: "Tony gives Peter resources, standards, and occasional sarcasm. Peter gives Tony the reminder that heroism still needs wonder." },
    comparison: { strength: 85, speed: 82, intelligence: 100, durability: 88, combat: 84, power: 86 },
    battle: { hp: 118, attack: 20, special: 33, moves: { attack: "fires a repulsor barrage", special: "launches a nanotech overdrive", guard: "locks in a kinetic shield" } },
    quizAffinity: { leader: 4, scholar: 5, rebel: 2, heart: 1, speedster: 0, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Tony Stark built his first armor in captivity after a life-changing injury forced him to see the consequences of his own weapons empire. The escape suit became a turning point that transformed him from arms dealer to armored protector.",
        "His origin is powerful because it is not about destiny. It is about responsibility, shame, and the decision to improve the world using the same brilliance that helped create the problem."
      ],
      powers: [
        "Iron Man's strength comes from engineering. Powered armor gives him flight, heavy artillery, AI support, sensor suites, battlefield adaptation, and specialized loadouts for almost any threat.",
        "Tony's real superpower is iteration. He treats every failure like a design brief and every victory like a prototype for the next impossible challenge."
      ],
      storylines: [
        "Demon in a Bottle remains the essential Tony Stark story because it forces him to face self-destruction. Armor Wars turns his tech into a liability he must clean up. Civil War places his ethics under public scrutiny. Endgame rewards his growth with sacrifice.",
        "Each major arc asks the same question differently: can Tony stay heroic when the world keeps rewarding the worst parts of his personality?"
      ],
      allies: [
        "Pepper Potts, James Rhodes, and the Avengers are the people who keep Tony honest when his ego tries to outrun his judgment. Friday, Jarvis, and the wider Stark circle turn the suit into a team effort rather than a solo fantasy.",
        "His best alliances work because people challenge him, not because they flatter him."
      ],
      legacy: [
        "Iron Man modernized the idea of the technological superhero. He made armor feel like a character in itself and helped define the sleek, high-tech side of the Marvel universe.",
        "The MCU elevated Tony Stark into a global icon of charisma and sacrifice, but the comic version remains just as important: a flawed genius trying to be worthy of his own inventions."
      ],
      funFacts: [
        "Iron Man first appeared in Tales of Suspense #39 in 1963.",
        "The armor has taken hundreds of forms, from bulky prototypes to elegant nano-tech designs.",
        "Tony's best stories are usually the ones where his brilliance cannot outrun his conscience."
      ]
    },
    trivia: [
      {
        question: "What powered Tony Stark's first life-saving prototype?",
        choices: ["Arc reactor", "Vibranium core", "Gamma cell", "Cosmic shard"],
        answer: 0,
        explanation: "The arc reactor was the core that kept Tony alive and powered the first armor."
      },
      {
        question: "Which storyline is a classic Tony Stark character study?",
        choices: ["Demon in a Bottle", "Kingdom Come", "Crisis on Infinite Earths", "Kraven's Last Hunt"],
        answer: 0,
        explanation: "Demon in a Bottle is a landmark exploration of Tony's flaws and accountability."
      }
    ]
  },
  spiderman: {
    id: "spiderman",
    name: "Spider-Man",
    universe: "Marvel",
    title: "YOUR FRIENDLY NEIGHBORHOOD SPIDER-MAN",
    subtitle: "POWERED BY RESPONSIBILITY, HUMOR, AND A LOT OF BAD LUCK",
    bgText: "SPIDER-MAN",
    cityLabel: "NEW YORK CITY",
    image: "https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png",
    wiki: "https://en.wikipedia.org/wiki/Spider-Man",
    colors: { primary: "#ff5b57", secondary: "#183c7a", accent: "#5cb7ff", bg: "#05070c" },
    stats: { "SPIDER-SENSE": "ALWAYS ON", "AGILITY": "INSANE", "LEGACY": "60+ YEARS" },
    abilities: ["Spider-sense", "Wall-crawling", "Webbing", "Enhanced agility"],
    badges: ["Neighborhood hero", "Web-slinger", "Spider-Sense icon"],
    storyLeft: "Peter Parker was bitten by a radioactive spider and got power before he understood responsibility. That mistake and Uncle Ben's death made him the hero who can never separate saving people from paying a personal price.",
    storyRight: "Spider-Man works because he is brilliant, funny, anxious, and still willing to swing back into danger. He is the hero of the late homework, the bad day, and the impossible save.",
    ctaLabel: "SWING IN",
    versions: [
      { actor: "TOM HOLLAND", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/440px-Tom_Holland_by_Gage_Skidmore.jpg", quote: "I'm just a friendly neighborhood Spider-Man." },
      { actor: "TOBEY MAGUIRE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tobey_Maguire_2014.jpg/440px-Tobey_Maguire_2014.jpg", quote: "With great power comes great responsibility." }
    ],
    villains: [
      { name: "Green Goblin", threat: "Chaos in a mask", image: "https://upload.wikimedia.org/wikipedia/en/e/e9/Green_Goblin_%28Alex_Ross%27s_art%29.jpg", front: "Norman Osborn turns wealth, obsession, and madness into Spider-Man's most personal tragedy machine.", back: "The Goblin matters because he knows exactly where Peter hurts." },
      { name: "Doc Ock", threat: "Twisted intellect", image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80", front: "Otto Octavius weaponizes brilliance and resentment, making Spider-Man fight a scientist who thinks he is the superior mind.", back: "Doc Ock stories are so strong because they turn the battle into a debate over who deserves to wear the hero's body or symbol." }
    ],
    timeline: [
      { year: "1962", title: "First appearance", text: "Spider-Man debuts in Amazing Fantasy #15 and rewrites what a teenage superhero can be." },
      { year: "1987", title: "Kraven's Last Hunt", text: "One of Marvel's darkest Spider-Man stories explores identity, mortality, and resilience." },
      { year: "2014", title: "Spider-Verse", text: "The multiverse expands Spider-Man into a legacy bigger than one person." },
      { year: "2023", title: "Across the Spider-Verse", text: "Miles and Peter continue pushing the idea that responsibility can evolve across generations." }
    ],
    teamup: { partner: "Iron Man", synergy: 90, title: "Mentor and student", text: "Tony gives Peter a framework and advanced tech. Peter gives Tony the kind of hopeful energy he often forgets to protect." },
    comparison: { strength: 75, speed: 98, intelligence: 85, durability: 78, combat: 89, power: 74 },
    battle: { hp: 92, attack: 14, special: 24, moves: { attack: "throws a web-and-kick combo", special: "unleashes a spider-sense counterburst", guard: "dodges into a webbed evasive stance" } },
    quizAffinity: { leader: 1, scholar: 3, rebel: 2, heart: 5, speedster: 3, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Peter Parker's life changed the moment a radioactive spider turned a smart, awkward teenager into someone powerful enough to help people and scared enough to get it wrong. Uncle Ben's death taught him that power without responsibility is a disaster waiting to happen.",
        "Spider-Man's origin remains powerful because it blends science, guilt, humor, and adolescence in a way that never ages out of relevance."
      ],
      powers: [
        "Spider-Man combines wall-crawling, superhuman agility, enhanced strength, web-shooting ingenuity, and a spider-sense that warns him before danger lands. His intellect is just as important as the powers.",
        "He builds his own web fluid, improvises constantly, and fights like somebody who survives by instinct and creativity as much as by muscle."
      ],
      storylines: [
        "The original Lee and Ditko stories established the responsibility mantra. Kraven's Last Hunt pushed the character into psychological depth. Spider-Verse turned his myth into a whole multiverse. Superior Spider-Man and related arcs tested what happens when identity is challenged from the inside.",
        "Peter's greatest stories usually work because they balance joke, heartbreak, and sacrifice in the same breath."
      ],
      allies: [
        "Mary Jane, Aunt May, the Fantastic Four, Miles Morales, and the wider Marvel community all reinforce the idea that Spider-Man is never truly alone, even when he feels that way.",
        "His support system matters because the character is strongest when the audience sees how much he gives up to keep showing up."
      ],
      legacy: [
        "Spider-Man is the archetypal relatable superhero. He made comics feel personal, urban, and emotionally accessible to a broader audience.",
        "Every generation gets its own Spider-Man because the core idea is timeless: growing up is hard, but responsibility can still be heroic and fun."
      ],
      funFacts: [
        "Spider-Man first appeared in Amazing Fantasy #15 in 1962.",
        "He was one of the first major teenage superheroes to headline a title on his own.",
        "His mask is iconic because it lets anyone imagine themselves behind it."
      ]
    },
    trivia: [
      {
        question: "Which idea defines Spider-Man more than any web gadget?",
        choices: ["Science", "Responsibility", "Luck", "Secrecy"],
        answer: 1,
        explanation: "Spider-Man is built on the responsibility lesson."
      },
      {
        question: "What kind of warning system does Spider-Man rely on in a fight?",
        choices: ["Spider-sense", "X-ray vision", "Telepathy", "Super hearing"],
        answer: 0,
        explanation: "Spider-sense is his early-warning reflex that makes him feel impossible to ambush."
      }
    ]
  },
  wonderwoman: {
    id: "wonderwoman",
    name: "Wonder Woman",
    universe: "DC",
    title: "DIANA OF THEMYSCIRA",
    subtitle: "TRUTH, COMPASSION, AND WARRIOR GRACE",
    bgText: "WONDER WOMAN",
    cityLabel: "THEMYSCIRA",
    image: "https://upload.wikimedia.org/wikipedia/en/9/93/Wonder_Woman.jpg",
    wiki: "https://en.wikipedia.org/wiki/Wonder_Woman",
    colors: { primary: "#f4c84a", secondary: "#6f1125", accent: "#ff7d66", bg: "#070508" },
    stats: { "WARRIOR SKILL": "ELITE", "TRUTH": "UNBREAKABLE", "LEGACY": "80+ YEARS" },
    abilities: ["Lasso of Truth", "Super strength", "Bracelet deflection", "Flight"],
    badges: ["Amazon champion", "Champion of truth", "Justice League founder"],
    storyLeft: "Diana was raised among the Amazons of Themyscira, trained in combat, diplomacy, and compassion before stepping into the world of men as its champion. Depending on the era, her origin shifts in detail, but her purpose stays constant: she brings truth into spaces built on war and fear.",
    storyRight: "Wonder Woman is not just a warrior. She is a bridge between myth and humanity, proving that mercy and strength are not opposites when they are guided by conviction.",
    ctaLabel: "TRUTH AWAITS",
    versions: [
      { actor: "GAL GADOT", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Gal_Gadot_%2833646498484%29_%28cropped2%29.jpg/440px-Gal_Gadot_%2833646498484%29_%28cropped2%29.jpg", quote: "I will fight for those who cannot fight for themselves." },
      { actor: "LYNDA CARTER", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Lynda_Carter_1977.jpg/440px-Lynda_Carter_1977.jpg", quote: "All the world is waiting for you." }
    ],
    villains: [
      { name: "Ares", threat: "God of war", image: "https://upload.wikimedia.org/wikipedia/en/7/72/AresMarvel.jpg", front: "Ares personifies the seduction of conflict and the myth that war is inevitable.", back: "He matters because Wonder Woman's mission is fundamentally anti-war without being naive." },
      { name: "Cheetah", threat: "Predatory rival", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", front: "Cheetah is speed, envy, and ferocity turned against Diana's ideals.", back: "The rivalry is tragic because it often pits compassion against corruption from within." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Wonder Woman arrives in All Star Comics #8 and becomes a pillar of the DC Trinity." },
      { year: "1970s", title: "A cultural icon", text: "The television era makes Diana a mainstream symbol of strength and justice." },
      { year: "2011", title: "New 52 era", text: "Modern stories rework her mythic ties while keeping truth at the center." },
      { year: "2017", title: "Cinematic breakthrough", text: "Wonder Woman becomes a global blockbuster and a major superhero milestone." }
    ],
    teamup: { partner: "Batman", synergy: 88, title: "Justice League founders", text: "Batman brings strategy, Diana brings moral clarity. Their contrast makes them natural allies when the stakes turn global." },
    comparison: { strength: 98, speed: 86, intelligence: 84, durability: 92, combat: 98, power: 94 },
    battle: { hp: 124, attack: 19, special: 31, moves: { attack: "cuts through with Amazonian precision", special: "binds foes with the Lasso of Truth", guard: "crosses the bracelets in a shining block" } },
    quizAffinity: { leader: 3, scholar: 1, rebel: 2, heart: 4, speedster: 0, mystic: 2, feral: 0 },
    lore: {
      origin: [
        "Wonder Woman's origin has shifted across continuities, but the essence remains clear: Diana is an Amazon princess raised to be both a warrior and a diplomat. She leaves Themyscira because the world beyond the island needs truth, courage, and healing.",
        "Her power is rooted in myth, but her mission is human. She enters war zones to end cycles of violence, not to glorify them."
      ],
      powers: [
        "Diana combines divine strength, elite combat training, flight, indestructible bracelets, and the Lasso of Truth. In many stories she is one of the strongest heroes in the DC universe, but her discipline matters as much as raw force.",
        "Her weapons and skills are symbols of authority, but her greatest advantage is the moral clarity she brings into conflict."
      ],
      storylines: [
        "A League of One, The Hiketeia, and modern origin retellings emphasize Diana's role as a protector first and a warrior second. Stories involving Ares and the gods often test whether she can hold onto compassion when the world rewards aggression.",
        "Across eras, Wonder Woman remains most powerful when the narrative gives her both mythic scale and emotional intelligence."
      ],
      allies: [
        "Steve Trevor, the Justice League, the Amazons, Donna Troy, Nubia, and her wider circle give Diana a world beyond battle. They help keep the character connected to community and diplomacy.",
        "She is often the moral center of a team because she can speak with authority without losing warmth."
      ],
      legacy: [
        "Wonder Woman is one of the defining superheroes of the medium. She expanded what a superhero icon could look like and what a heroic voice could sound like.",
        "Her legacy lives in action, but also in the idea that truth is not passive. It is something you stand for, even when it costs you."
      ],
      funFacts: [
        "Wonder Woman first appeared in All Star Comics #8 in 1941.",
        "The Lasso of Truth is one of the most recognizable objects in comics.",
        "She is one of the core DC Trinity alongside Batman and Superman."
      ]
    },
    trivia: [
      {
        question: "What principle most defines Wonder Woman's mission?",
        choices: ["Conquest", "Truth", "Secrecy", "Speed"],
        answer: 1,
        explanation: "Truth is at the center of Diana's mythology and her tactics."
      },
      {
        question: "Which team is Wonder Woman famously part of as a foundational member?",
        choices: ["Avengers", "Justice League", "X-Men", "Fantastic Four"],
        answer: 1,
        explanation: "Wonder Woman is a foundational member of the Justice League."
      }
    ]
  },
  captainamerica: {
    id: "captainamerica",
    name: "Captain America",
    universe: "Marvel",
    title: "CAPTAIN AMERICA",
    subtitle: "A SHIELD, A PROMISE, AND A WORLD AT WAR",
    bgText: "CAPTAIN AMERICA",
    cityLabel: "BROOKLYN",
    image: "https://images.unsplash.com/photo-1516321310764-8d15de5d0cb0?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Captain_America",
    colors: { primary: "#d74a4a", secondary: "#173b63", accent: "#f7f1d1", bg: "#050816" },
    stats: { "LEADERSHIP": "UNBREAKABLE", "DISCIPLINE": "ELITE", "LEGACY": "80+ YEARS" },
    abilities: ["Vibranium shield throws", "Peak human conditioning", "Battlefield leadership", "Tactical reads"],
    badges: ["Super-soldier", "Shield bearer", "Avengers founder"],
    storyLeft: "Steve Rogers was a determined underdog long before the serum gave him strength. He kept standing because he believed courage mattered more than size.",
    storyRight: "Captain America turns defense into defiance. He leads with empathy, strategy, and a shield that always comes back when the fight is worth it.",
    ctaLabel: "RAISE THE SHIELD",
    versions: [
      { actor: "CHRIS EVANS", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80", quote: "I can do this all day." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80", quote: "Freedom needs a defender." }
    ],
    villains: [
      { name: "Red Skull", threat: "Ideological enemy", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80", front: "Red Skull turns hate into doctrine and makes Cap fight for the future as much as the present.", back: "The rivalry matters because it pits democratic hope against fascist control." },
      { name: "Crossbones", threat: "Relentless assassin", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Crossbones is the ugly, close-range violence that never stops testing Steve's restraint.", back: "He matters because he forces Captain America to stay disciplined when chaos gets personal." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Captain America debuts as a wartime symbol with a moral center." },
      { year: "1964", title: "Modern return", text: "Steve returns to present-day stories and becomes a leader for a new age." },
      { year: "2006", title: "Civil War", text: "Cap stands against registration and pays the price for principle." },
      { year: "2011", title: "A Man Out of Time", text: "The character becomes a study in legacy, loss, and adaptation." }
    ],
    teamup: { partner: "Black Panther", synergy: 90, title: "Disciplined leaders", text: "Steve and T'Challa bring different traditions, but both understand that power means responsibility and restraint." },
    comparison: { strength: 78, speed: 74, intelligence: 84, durability: 82, combat: 97, power: 62 },
    battle: {
      hp: 114,
      attack: 19,
      special: 28,
      moves: {
        attack: "ricochets a shield strike",
        special: "launches a tactical shield combo",
        guard: "raises the shield in a perfect block"
      }
    },
    quizAffinity: { leader: 4, scholar: 1, rebel: 1, heart: 3, speedster: 0, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Steve Rogers volunteered for the Super-Soldier program because he wanted to help in a world at war. The serum changed his body, but his convictions were already in place.",
        "Captain America works because the symbol and the person are aligned. He becomes idealistic without becoming naive."
      ],
      powers: [
        "The serum gives Steve peak physical condition, reflexes, endurance, and recovery far beyond normal human limits. The shield adds precision, protection, and devastating versatility.",
        "His greatest edge is not raw power. It is decision-making under pressure."
      ],
      storylines: [
        "Winter Soldier tests his loyalty, Civil War tests his principles, and modern political stories test whether America deserves the ideals he carries.",
        "His best arcs are never just about fighting. They are about what kind of country or team he is willing to protect."
      ],
      allies: [
        "Bucky Barnes, Peggy Carter, Sam Wilson, Sharon Carter, and the Avengers all frame Steve as someone defined by trust as much as duty.",
        "He works best when the people around him challenge him to stay honest without losing hope."
      ],
      legacy: [
        "Captain America remains one of Marvel's clearest symbols of civic idealism. He is the hero of principles held under pressure.",
        "The character endures because every era can ask whether courage still means the same thing."
      ],
      funFacts: [
        "Captain America first appeared in 1941.",
        "His shield is as much a symbol of protection as offense.",
        "Steve is at his best when he leads by example, not command."
      ]
    },
    trivia: [
      {
        question: "What makes Captain America special beyond his shield?",
        choices: ["Super-soldier physiology", "Cosmic magic", "Gamma mutation", "Time travel"],
        answer: 0,
        explanation: "The Super-Soldier Serum gave Steve his enhanced abilities."
      },
      {
        question: "Which sidearm is most associated with Captain America?",
        choices: ["Mjolnir", "Shield", "Ring", "Web shooters"],
        answer: 1,
        explanation: "Captain America is defined by his shield."
      }
    ]
  },
  thor: {
    id: "thor",
    name: "Thor",
    universe: "Marvel",
    title: "GOD OF THUNDER",
    subtitle: "ROYAL DUTY WITH STORM-SIZED CONSEQUENCES",
    bgText: "THOR",
    cityLabel: "NEW ASGARD",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Thor_(Marvel_Comics)",
    colors: { primary: "#66c9ff", secondary: "#1a2f5f", accent: "#ffd66b", bg: "#06111f" },
    stats: { "THUNDER": "COSMIC", "ENDURANCE": "MYTHIC", "LEGACY": "ASGARDIAN" },
    abilities: ["Mjolnir recall", "Storm channeling", "Flight", "God-tier strength"],
    badges: ["Asgardian royalty", "Storm wielder", "Mjolnir lineage"],
    storyLeft: "Thor entered the world as a prince who had to earn humility before he could earn greatness. His story keeps turning on whether power serves pride or protection.",
    storyRight: "He is strongest when thunder becomes mercy. Thor fights like a legend, but he learns like a mortal who has lost too much to waste another chance.",
    ctaLabel: "SUMMON THE STORM",
    versions: [
      { actor: "CHRIS HEMSWORTH", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80", quote: "Bring me Thanos!" },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", quote: "For Asgard." }
    ],
    villains: [
      { name: "Loki", threat: "Chaos tactician", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80", front: "Loki turns love, envy, and mischief into a weapon that only family can fully understand.", back: "He constantly tests whether Thor's strength includes forgiveness." },
      { name: "Hela", threat: "Death sovereign", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80", front: "Hela strips away certainty and forces Thor to define himself without his old symbols.", back: "Her arrival reframes him as the god of thunder, not the god of hammers." }
    ],
    timeline: [
      { year: "1962", title: "First appearance", text: "Thor enters Marvel as a god among heroes." },
      { year: "2011", title: "Earth exile", text: "Worthiness becomes the key to his return and growth." },
      { year: "2017", title: "Ragnarok", text: "The fall of Asgard pushes Thor into reinvention." },
      { year: "2022", title: "Love and Thunder", text: "He rediscovers tenderness while confronting god-level grief." }
    ],
    teamup: { partner: "The Flash", synergy: 90, title: "Lightning in two tempos", text: "Thor brings force while Flash controls pace. Together they overwhelm the field before it can stabilize." },
    comparison: { strength: 97, speed: 76, intelligence: 78, durability: 96, combat: 86, power: 95 },
    battle: {
      hp: 128,
      attack: 24,
      special: 34,
      moves: {
        attack: "swings Mjolnir with thunderous force",
        special: "calls down a bifrost stormbreaker combo",
        guard: "summons a storm barrier"
      }
    },
    quizAffinity: { leader: 2, scholar: 0, rebel: 1, heart: 2, speedster: 0, mystic: 3, feral: 0 },
    lore: {
      origin: [
        "Thor began as a prince who had to be humbled before he could be trusted with power. His exile to Earth taught him that worthiness is earned through action.",
        "He works as a mythic hero because his growth never feels optional. Every thunderstorm is a character test."
      ],
      powers: [
        "As an Asgardian, Thor commands superhuman strength, durability, and endurance far beyond mortal limits. Mjolnir and Stormbreaker add flight, lightning, and cosmic force.",
        "His greatest ability is not raw damage. It is the ability to stand back up and keep leading when the gods themselves have failed."
      ],
      storylines: [
        "The original hammer era defined him. Ragnarok and Jason Aaron's runs pushed him into mythic reinvention. Love and Thunder leaned into loss, love, and renewed purpose.",
        "Thor stories usually work best when they ask whether a god can remain kind without becoming weak."
      ],
      allies: [
        "Loki, the Avengers, Valkyrie, and the people of New Asgard keep Thor connected to both family and responsibility.",
        "He matters most when he is protecting others rather than proving himself."
      ],
      legacy: [
        "Thor gave Marvel a god-sized hero who still had to learn humility. That contrast keeps the character fresh across decades.",
        "He remains a bridge between fantasy spectacle and emotional vulnerability."
      ],
      funFacts: [
        "Thor first appeared in 1962.",
        "Mjolnir's worthiness enchantment is central to his myth.",
        "Few heroes can make thunder feel noble and personal at once."
      ]
    },
    trivia: [
      {
        question: "What makes Thor worthy of Mjolnir?",
        choices: ["Royal blood", "Worthiness enchantment", "Gamma exposure", "Speed Force"],
        answer: 1,
        explanation: "Mjolnir responds to worthiness, not lineage."
      },
      {
        question: "Which realm is Thor most closely tied to?",
        choices: ["Asgard", "Wakanda", "Atlantis", "Krypton"],
        answer: 0,
        explanation: "Thor is the prince of Asgard."
      }
    ]
  },
  hulk: {
    id: "hulk",
    name: "Hulk",
    universe: "Marvel",
    title: "THE INCREDIBLE HULK",
    subtitle: "GAMMA RAGE, SURVIVAL, AND UNSTOPPABLE POWER",
    bgText: "HULK",
    cityLabel: "WORLDWIDE",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Hulk",
    colors: { primary: "#58d26a", secondary: "#25412a", accent: "#d7ff9e", bg: "#07110c" },
    stats: { "RAGE": "INFINITE", "STRENGTH": "CATACLYSMIC", "LEGACY": "GAMMA ERA" },
    abilities: ["Gamma strength", "Rapid healing", "Shockwave leaps", "Rage escalation"],
    badges: ["Gamma giant", "Avenger wildcard", "Unstoppable force"],
    storyLeft: "Bruce Banner became the Hulk after gamma exposure turned a brilliant scientist into a living contradiction. The monster is also a survival response, which is why the story never stays simple.",
    storyRight: "Hulk is about the fight between control and release. When Bruce stops trying to suppress every emotion, he becomes a force the world cannot ignore.",
    ctaLabel: "SMASH THROUGH",
    versions: [
      { actor: "MARK RUFFALO", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80", quote: "I am always angry." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", quote: "Hulk smash." }
    ],
    villains: [
      { name: "Abomination", threat: "Gamma rival", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "Abomination proves that power without restraint becomes a permanent threat.", back: "He is the clearest answer to Hulk's question: what happens when rage wins?" },
      { name: "The Leader", threat: "Gamma intellect", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "The Leader weaponizes intelligence and turns Bruce's own genius into a battlefield.", back: "He matters because he shows that intellect without empathy can be monstrous too." }
    ],
    timeline: [
      { year: "1962", title: "First appearance", text: "The Hulk arrives as a tragic monster with emotional depth." },
      { year: "1970s", title: "A TV icon", text: "The live-action era turns Hulk into a mainstream symbol of rage and sympathy." },
      { year: "2006", title: "Planet Hulk", text: "The character gains an epic, gladiatorial scale." },
      { year: "2018", title: "Immortal Hulk", text: "Modern stories lean into horror, myth, and the persistence of trauma." }
    ],
    teamup: { partner: "Doctor Strange", synergy: 88, title: "Mind and monster", text: "Strange handles the impossible structures while Hulk provides the force that breaks through them." },
    comparison: { strength: 100, speed: 72, intelligence: 72, durability: 100, combat: 88, power: 100 },
    battle: {
      hp: 150,
      attack: 26,
      special: 34,
      moves: {
        attack: "hammers the ground in a gamma surge",
        special: "erupts into a seismic smash combo",
        guard: "braces behind an impossible bulk"
      }
    },
    quizAffinity: { leader: 0, scholar: 2, rebel: 1, heart: 2, speedster: 0, mystic: 0, feral: 4 },
    lore: {
      origin: [
        "Bruce Banner's life changed when gamma exposure merged genius with a second, furious self. The Hulk is both accident and coping mechanism.",
        "The origin works because it asks how much damage a person can contain before the body invents a monster."
      ],
      powers: [
        "Hulk grows stronger as anger rises. He combines overwhelming strength, durability, and healing with a terrifying ability to survive forces that should end him.",
        "He is not just power. He is escalation with a heartbeat."
      ],
      storylines: [
        "Planet Hulk gives him kingdom-scale tragedy. World War Hulk turns his pain outward. Immortal Hulk reframes him as horror, myth, and persistence.",
        "The best Hulk stories let the monster be both threat and victim."
      ],
      allies: [
        "Betty Ross, the Avengers, and Bruce's own scientific work anchor the character beyond the smash.",
        "He is most compelling when people treat the monster like a person first."
      ],
      legacy: [
        "Hulk made emotional volatility into superhero spectacle.",
        "He remains one of Marvel's clearest examples of a hero whose power is inseparable from trauma."
      ],
      funFacts: [
        "The Hulk first appeared in 1962.",
        "Different Hulk eras have explored rage as tragedy, horror, and comedy.",
        "The character always grows when the emotional stakes are personal."
      ]
    },
    trivia: [
      {
        question: "What event created the Hulk?",
        choices: ["Gamma exposure", "Magic storm", "Alien blood transfusion", "Vibranium serum"],
        answer: 0,
        explanation: "Gamma radiation created the Hulk."
      },
      {
        question: "What is Bruce Banner's greatest recurring struggle?",
        choices: ["Speed", "Control", "Flight", "Telepathy"],
        answer: 1,
        explanation: "Bruce's story is driven by the struggle to control the Hulk."
      }
    ]
  },
  doctorstrange: {
    id: "doctorstrange",
    name: "Doctor Strange",
    universe: "Marvel",
    title: "SORCERER SUPREME",
    subtitle: "THE DOCTOR WHO MADE MAGIC INTO STRATEGY",
    bgText: "DOCTOR STRANGE",
    cityLabel: "SANCTUM SANCTORUM",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Doctor_Strange",
    colors: { primary: "#ff7d3b", secondary: "#1f294d", accent: "#ffd27f", bg: "#100d18" },
    stats: { "MYSTIC CONTROL": "MASTERED", "STRATEGY": "COSMIC", "LEGACY": "ARCANE" },
    abilities: ["Eldritch shields", "Portals", "Astral projection", "Time-loop tactics"],
    badges: ["Sorcerer Supreme", "Mystic guardian", "Sanctum protector"],
    storyLeft: "Stephen Strange lost the hands that defined his surgical genius and found a larger calling in mysticism. His power comes from discipline, curiosity, and the willingness to accept impossible rules.",
    storyRight: "Doctor Strange turns magic into a battlefield language. He protects reality by thinking in shapes, dimensions, and consequences other heroes barely see.",
    ctaLabel: "OPEN THE PORTAL",
    versions: [
      { actor: "BENEDICT CUMBERBATCH", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80", quote: "By the Hoary Hosts of Hoggoth." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1505672678657-cc7037095e02?auto=format&fit=crop&w=900&q=80", quote: "Reality bends to focus." }
    ],
    villains: [
      { name: "Dormammu", threat: "Dimension tyrant", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80", front: "Dormammu is bigger than direct force and turns Strange's intellect into a survival tool.", back: "He matters because Strange's wins often come from outlasting the impossible." },
      { name: "Baron Mordo", threat: "Former ally", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80", front: "Mordo weaponizes knowledge and turns mentorship into a philosophical grudge.", back: "The rivalry stays sharp because it is about the ethics of power, not just the power itself." }
    ],
    timeline: [
      { year: "1963", title: "First appearance", text: "Doctor Strange debuts as Marvel's doorway into the occult." },
      { year: "1970s", title: "Mystic expansion", text: "The character grows into a cornerstone of Marvel's cosmic weirdness." },
      { year: "2016", title: "MCU arrival", text: "Magic gets a sleek cinematic language and a new mainstream audience." },
      { year: "2022", title: "Multiverse fracture", text: "Strange becomes central to reality-spanning consequences." }
    ],
    teamup: { partner: "Iron Man", synergy: 91, title: "Calculation on two frequencies", text: "Tony solves the machine and Strange solves the impossible. Together they cover every axis of disaster." },
    comparison: { strength: 82, speed: 68, intelligence: 95, durability: 74, combat: 80, power: 97 },
    battle: {
      hp: 104,
      attack: 20,
      special: 33,
      moves: {
        attack: "lashes out with a sigil strike",
        special: "folds the arena with eldritch geometry",
        guard: "casts a rotating mandala shield"
      }
    },
    quizAffinity: { leader: 1, scholar: 3, rebel: 0, heart: 1, speedster: 0, mystic: 4, feral: 0 },
    lore: {
      origin: [
        "Stephen Strange began as a brilliant surgeon who lost the hands he depended on. The search for healing led him to the mystic arts and a much bigger responsibility.",
        "The origin works because it replaces ego with discipline and asks what knowledge is for."
      ],
      powers: [
        "Doctor Strange can wield spells, shields, portals, astral projection, and dimensional techniques that make him one of Marvel's most versatile protectors.",
        "His real power is precision. He handles chaos by treating magic like a system."
      ],
      storylines: [
        "Classic Strange stories focus on mystic threats beyond ordinary science. Modern multiverse arcs turn him into the person holding reality together while it tears apart.",
        "His best stories always balance cosmic scale with a very human need to keep the world intact."
      ],
      allies: [
        "Wong, the Avengers, and the Sanctum's guardians keep Strange grounded in responsibility.",
        "He works best when the team trusts him to make the weird call."
      ],
      legacy: [
        "Doctor Strange opened the door for Marvel's supernatural side and made magic feel structured rather than random.",
        "He remains the character you call when physics stops being enough."
      ],
      funFacts: [
        "Doctor Strange first appeared in 1963.",
        "The Eye of Agamotto is among his most recognizable artifacts.",
        "He often wins by knowing the rule before the enemy knows the game."
      ]
    },
    trivia: [
      {
        question: "What title is Doctor Strange known by?",
        choices: ["Master Builder", "Sorcerer Supreme", "Omega Herald", "High King"],
        answer: 1,
        explanation: "Doctor Strange is best known as the Sorcerer Supreme."
      },
      {
        question: "What kind of threat is Dormammu to Strange?",
        choices: ["Pure speed", "Dimensional power", "Street crime", "Political corruption"],
        answer: 1,
        explanation: "Dormammu is a dimensional tyrant and one of Strange's greatest mystical threats."
      }
    ]
  },
  blackpanther: {
    id: "blackpanther",
    name: "Black Panther",
    universe: "Marvel",
    title: "THE BLACK PANTHER",
    subtitle: "KING OF WAKANDA, STRATEGIST OF THE SHADOWS",
    bgText: "BLACK PANTHER",
    cityLabel: "WAKANDA",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Black_Panther_(character)",
    colors: { primary: "#8d7dff", secondary: "#20323a", accent: "#f5e663", bg: "#0b1020" },
    stats: { "VIBRANIUM": "ADVANCED", "STRATEGY": "MASTERFUL", "LEGACY": "WAKANDAN" },
    abilities: ["Kinetic storage", "Enhanced senses", "Vibranium claws", "Royal strategy"],
    badges: ["King of Wakanda", "Vibranium suit", "Ancestral line"],
    storyLeft: "T'Challa carries the weight of a throne, a nation, and a legacy that demands both strength and wisdom. He moves like a shadow but rules with careful intent.",
    storyRight: "Black Panther is where heritage meets precision. He protects Wakanda by turning intellect, discipline, and ancestry into one seamless defense.",
    ctaLabel: "FOR WAKANDA",
    versions: [
      { actor: "CHADWICK BOSEMAN", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80", quote: "Wakanda forever." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80", quote: "The king must endure." }
    ],
    villains: [
      { name: "Killmonger", threat: "Revolutionary insurgent", image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80", front: "Killmonger weaponizes shared history and turns Wakanda's isolation into an accusation.", back: "He forces T'Challa to confront the moral cost of protecting paradise alone." },
      { name: "Namor", threat: "Ocean empire ruler", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80", front: "Namor is a sovereign threat with grief, principle, and impossible leverage.", back: "This rivalry measures diplomacy against vengeance and asks how far a kingdom should go." }
    ],
    timeline: [
      { year: "1966", title: "First appearance", text: "Black Panther debuts and opens a new chapter in Marvel history." },
      { year: "2016", title: "Civil War arrival", text: "T'Challa enters the spotlight as a poised force of vengeance and restraint." },
      { year: "2018", title: "Wakanda opened", text: "The character becomes a cultural milestone and global icon." },
      { year: "2022", title: "Wakanda Forever", text: "Legacy shifts from one king to a people carrying memory forward." }
    ],
    teamup: { partner: "Iron Man", synergy: 95, title: "Brains, resources, and battlefield calm", text: "T'Challa complements Stark's improvisation with discipline. One engineers the future, the other decides how it should be used." },
    comparison: { strength: 84, speed: 86, intelligence: 93, durability: 82, combat: 90, power: 88 },
    battle: {
      hp: 112,
      attack: 22,
      special: 28,
      moves: {
        attack: "slashes with vibranium claws",
        special: "releases stored kinetic force",
        guard: "crosses his suit into a vibranium brace"
      }
    },
    quizAffinity: { leader: 3, scholar: 2, rebel: 0, heart: 2, speedster: 0, mystic: 1, feral: 0 },
    lore: {
      origin: [
        "T'Challa inherited the Black Panther mantle and the kingship of Wakanda. His origin ties personal duty to national responsibility.",
        "He stands out because he is both warrior and strategist, never only one or the other."
      ],
      powers: [
        "The heart-shaped herb and vibranium suit enhance T'Challa's strength, speed, senses, and resilience. His claws and suit store and redirect force.",
        "His real power is leadership under pressure."
      ],
      storylines: [
        "Civil War introduces him as a poised avenger. The Black Panther film expands Wakanda's myth. Wakanda Forever turns legacy into a communal responsibility.",
        "Black Panther stories thrive when politics, family, and nationhood all matter at once."
      ],
      allies: [
        "Shuri, Okoye, the Dora Milaje, and the ancestors all frame T'Challa as a ruler who never acts alone.",
        "He is strongest when the kingdom itself is treated as part of the hero's identity."
      ],
      legacy: [
        "Black Panther changed how superhero royalty could be portrayed.",
        "The character remains one of Marvel's clearest intersections of myth, technology, and cultural pride."
      ],
      funFacts: [
        "Black Panther first appeared in 1966.",
        "Wakanda's technology is rooted in vibranium.",
        "The mantle is bigger than any one person."
      ]
    },
    trivia: [
      {
        question: "What metal is central to Black Panther's suit and kingdom?",
        choices: ["Adamantium", "Vibranium", "Uru", "Promethium"],
        answer: 1,
        explanation: "Vibranium powers Wakanda's advanced technology."
      },
      {
        question: "Which nation does T'Challa rule?",
        choices: ["Atlantis", "Genosha", "Wakanda", "Latveria"],
        answer: 2,
        explanation: "T'Challa is king of Wakanda."
      }
    ]
  },
  wolverine: {
    id: "wolverine",
    name: "Wolverine",
    universe: "Marvel | X-Men",
    title: "WOLVERINE",
    subtitle: "FERAL RESOLVE BONDED TO ADAMANTIUM",
    bgText: "WOLVERINE",
    cityLabel: "MADRIPOOR",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Wolverine_(character)",
    colors: { primary: "#f2c94c", secondary: "#4a6fa5", accent: "#ffd9a0", bg: "#110f1d" },
    stats: { "SURVIVAL": "EXTREME", "HEALING": "MUTANT", "LEGACY": "X-MEN" },
    abilities: ["Adamantium claws", "Regenerative healing", "Enhanced senses", "Berserker bursts"],
    badges: ["Mutant healing", "Adamantium skeleton", "X-Men icon"],
    storyLeft: "Logan is claws, scars, and survival instinct wrapped around a life he can never fully leave behind. He is at his best when grit becomes a promise to keep going.",
    storyRight: "Wolverine is ferocity with a conscience. The rage is real, but so is the refusal to let the worst parts of him win the whole story.",
    ctaLabel: "UNLEASH THE CLAWS",
    versions: [
      { actor: "HUGH JACKMAN", image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80", quote: "I'm the best there is." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", quote: "Don't push me." }
    ],
    villains: [
      { name: "Sabretooth", threat: "Savage counterpart", image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=900&q=80", front: "Sabretooth turns every Wolverine fight into family trauma with claws out.", back: "Victor is the version of Logan who never learned restraint." },
      { name: "Weapon X", threat: "Program, not person", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Weapon X is the machinery that turned Logan's body into a battlefield.", back: "Sometimes the villain is the institution that stole identity and commodified pain." }
    ],
    timeline: [
      { year: "1974", title: "First appearance", text: "Wolverine arrives as a feral wildcard in Marvel's expanding world." },
      { year: "1970s", title: "X-Men breakout", text: "He becomes the line's most dangerous and popular edge case." },
      { year: "2000s", title: "Origins retold", text: "Weapon X history and memory scars move to the center." },
      { year: "2017", title: "Logan", text: "The character reaches a raw, elegiac peak in a future-western finale." }
    ],
    teamup: { partner: "Black Panther", synergy: 84, title: "Instinct sharpened by discipline", text: "Wolverine absorbs pressure while Black Panther picks the moment where Logan's ferocity becomes mission-winning leverage." },
    comparison: { strength: 87, speed: 74, intelligence: 76, durability: 98, combat: 92, power: 78 },
    battle: {
      hp: 135,
      attack: 25,
      special: 27,
      moves: {
        attack: "slashes in a berserker burst",
        special: "dives into an adamantium frenzy",
        guard: "drops into a low feral defense"
      }
    },
    quizAffinity: { leader: 0, scholar: 0, rebel: 3, heart: 1, speedster: 0, mystic: 0, feral: 4 },
    lore: {
      origin: [
        "Logan's history is tangled with trauma, experiments, and memory damage. Weapon X turned him into a living weapon, but not a willing one.",
        "The origin works because his healing factor keeps the body alive while the past keeps trying to kill the man."
      ],
      powers: [
        "Wolverine's adamantium claws and skeleton make him lethal in close quarters. His healing factor, senses, and stamina let him outlast fights that should end him.",
        "He is a survival engine with a conscience he keeps trying to prove."
      ],
      storylines: [
        "Weapon X defines the horror of his transformation. Old Man Logan and Logan lean into age, guilt, and legacy. X-Men stories keep him in the heart of mutant conflict.",
        "Wolverine works best when the story lets him be both monster and protector."
      ],
      allies: [
        "The X-Men, Jean Grey, Professor X, and even uneasy team-ups give Logan a place to channel the rage.",
        "He is most interesting when found family gives him something to defend."
      ],
      legacy: [
        "Wolverine turned the antihero into a mainstream Marvel icon.",
        "He remains the model for a hero whose violence is always balanced by pain and loyalty."
      ],
      funFacts: [
        "Wolverine first appeared in 1974.",
        "His healing factor makes him nearly impossible to stop for long.",
        "The character's popularity made the X-Men lineup feel dangerous and personal."
      ]
    },
    trivia: [
      {
        question: "What metal coats Wolverine's skeleton?",
        choices: ["Vibranium", "Carbonadium", "Adamantium", "Promethium"],
        answer: 2,
        explanation: "Adamantium is the metal bonded to Wolverine's skeleton."
      },
      {
        question: "Which team is Wolverine most famously part of?",
        choices: ["Avengers", "X-Men", "Fantastic Four", "Guardians"],
        answer: 1,
        explanation: "Wolverine is one of the defining members of the X-Men."
      }
    ]
  },
  flash: {
    id: "flash",
    name: "The Flash",
    universe: "DC",
    title: "THE FLASH",
    subtitle: "FASTEST MAN ALIVE WITH A HEART THAT OUTRUNS TIME",
    bgText: "FLASH",
    cityLabel: "CENTRAL CITY",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Flash_(character)",
    colors: { primary: "#ffd449", secondary: "#ff5f45", accent: "#ffeec2", bg: "#190a07" },
    stats: { "SPEED": "LIGHTSPEED", "FOCUS": "RELENTLESS", "LEGACY": "SPEED FORCE" },
    abilities: ["Speed Force", "Phasing", "Time remnant tactics", "Lightning acceleration"],
    badges: ["Speed Force link", "Forensic scientist", "Temporal wildcard"],
    storyLeft: "Barry Allen races through grief, timelines, and impossible rescues. Every choice is measured in microseconds and consequence.",
    storyRight: "The Flash turns velocity into empathy. He is the hero who makes the impossible feel close enough to reach.",
    ctaLabel: "RUN FORWARD",
    versions: [
      { actor: "EZRA MILLER", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80", quote: "I should've been faster." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1505672678657-cc7037095e02?auto=format&fit=crop&w=900&q=80", quote: "The future is now." }
    ],
    villains: [
      { name: "Reverse-Flash", threat: "Temporal stalker", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80", front: "No villain makes heroism feel more intimate and invasive than a speedster who lives to ruin Barry's life.", back: "Reverse-Flash weaponizes obsession itself." },
      { name: "Zoom", threat: "Predatory speed god", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80", front: "Zoom doesn't just chase the Flash. He tries to define what pain should teach him.", back: "He treats suffering as a curriculum and forces Barry to reject brutality as growth." }
    ],
    timeline: [
      { year: "1956", title: "Modern debut", text: "Barry Allen reboots speedster mythology for the Silver Age." },
      { year: "2014", title: "TV breakout", text: "The CW era turns speed into emotional serial storytelling." },
      { year: "2017", title: "Justice League entry", text: "Barry becomes the awkward heartbeat of a world-scale team-up." },
      { year: "2023", title: "Flashpoint cinema", text: "The film doubles down on multiverse consequence and family loss." }
    ],
    teamup: { partner: "Thor", synergy: 89, title: "One redirects weather, the other redirects time", text: "Flash handles chaos control and impossible saves while Thor turns every opening into thunderous impact." },
    comparison: { strength: 79, speed: 100, intelligence: 81, durability: 72, combat: 85, power: 76 },
    battle: {
      hp: 96,
      attack: 21,
      special: 30,
      moves: {
        attack: "lands a blur-speed combo",
        special: "detonates a Speed Force vortex",
        guard: "phases between incoming strikes"
      }
    },
    quizAffinity: { leader: 1, scholar: 1, rebel: 1, heart: 3, speedster: 4, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Barry Allen became the Flash after a lightning accident changed his connection to the Speed Force. His story is built on science, hope, and the weight of mistakes.",
        "The origin works because Barry is both a forensic analyst and a symbol of second chances."
      ],
      powers: [
        "The Speed Force gives Barry speed, phasing, accelerated thought, and the ability to outrun danger itself. He can rescue, repair, and rearrange a battlefield in moments.",
        "His greatest power is the ability to choose compassion at impossible speed."
      ],
      storylines: [
        "Flashpoint remains the key multiverse warning. Rebirth stories focus on legacy and loss. Modern runs keep asking how much a speedster should change the timeline.",
        "Barry's best stories are always about what happens when speed has a heart."
      ],
      allies: [
        "Iris West, Team Flash, and the wider Justice League keep Barry grounded.",
        "He is most compelling when the people he saves are the reason he keeps running."
      ],
      legacy: [
        "The Flash made speed into a full superhero philosophy.",
        "Barry's myth is simple: move fast enough to save, but not so fast that you forget why."
      ],
      funFacts: [
        "Barry Allen first became the Flash in 1956.",
        "The Speed Force is the heart of his myth.",
        "Every Flash story asks what speed costs."
      ]
    },
    trivia: [
      {
        question: "What power source fuels The Flash?",
        choices: ["Speed Force", "Omega Radiation", "Solar Energy", "Hex magic"],
        answer: 0,
        explanation: "The Speed Force powers the Flash."
      },
      {
        question: "What is Barry Allen's day job?",
        choices: ["Forensic scientist", "Journalist", "Pilot", "Detective"],
        answer: 0,
        explanation: "Barry Allen is a forensic scientist."
      }
    ]
  },
  aquaman: {
    id: "aquaman",
    name: "Aquaman",
    universe: "DC",
    title: "KING OF ATLANTIS",
    subtitle: "TIDE, THRONE, AND TRIDENT",
    bgText: "AQUAMAN",
    cityLabel: "ATLANTIS",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Aquaman",
    colors: { primary: "#32d3c6", secondary: "#15354f", accent: "#f2c94c", bg: "#07131a" },
    stats: { "TIDE": "TITANIC", "COMMAND": "ROYAL", "LEGACY": "ATLANTIC" },
    abilities: ["Ocean command", "Trident strikes", "Pressure resistance", "Sea-sense"],
    badges: ["King of Atlantis", "Sea commander", "Trident heir"],
    storyLeft: "Arthur Curry bridges the surface world and the deep sea by living in both. His power is royal, but his responsibility is shared across two worlds.",
    storyRight: "Aquaman rules with force when he has to and diplomacy when he can. The ocean is his kingdom, but people are his reason.",
    ctaLabel: "RISE WITH THE TIDE",
    versions: [
      { actor: "JASON MOMOA", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80", quote: "My man." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80", quote: "The sea answers." }
    ],
    villains: [
      { name: "Black Manta", threat: "Vengeful hunter", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "Black Manta turns revenge into a lifelong ocean-spanning vendetta.", back: "He matters because he keeps Arthur's past from staying buried." },
      { name: "Ocean Master", threat: "Royal rival", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80", front: "Ocean Master is the brother who turns claim, grievance, and ambition into civil war.", back: "Their rivalry asks whether rule comes from blood, strength, or consent." }
    ],
    timeline: [
      { year: "1941", title: "First appearance", text: "Aquaman enters DC as a sea-bound adventurer." },
      { year: "1990s", title: "Royal reinvention", text: "Modern stories turn him into a true king rather than a novelty." },
      { year: "2011", title: "New 52 rebirth", text: "Atlantis becomes central to his identity and scale." },
      { year: "2018", title: "Cinematic tide", text: "The solo film makes Atlantis feel epic, strange, and alive." }
    ],
    teamup: { partner: "Wonder Woman", synergy: 88, title: "Mythic rulers, shared burden", text: "Arthur brings tide-born power while Diana brings moral clarity. Together they balance kingdoms and compassion." },
    comparison: { strength: 92, speed: 78, intelligence: 82, durability: 90, combat: 88, power: 85 },
    battle: {
      hp: 122,
      attack: 21,
      special: 30,
      moves: {
        attack: "thrusts the trident in a tidal sweep",
        special: "calls an oceanic pressure surge",
        guard: "raises a wall of surging water"
      }
    },
    quizAffinity: { leader: 2, scholar: 1, rebel: 1, heart: 2, speedster: 0, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Arthur Curry was born between worlds and raised to understand both surface and sea. That dual heritage defines everything about him.",
        "His origin works because he can belong to neither side fully and still protect both."
      ],
      powers: [
        "Aquaman commands sea life, swims at impossible speeds, survives crushing pressure, and wields the trident as both weapon and symbol.",
        "His power is as much authority as muscle."
      ],
      storylines: [
        "Modern stories elevate him from punchline to king. His best arcs deal with identity, sovereignty, and the politics of the ocean.",
        "Aquaman works best when the sea feels like an empire, not a backdrop."
      ],
      allies: [
        "Mera, the Justice League, and Atlantis itself keep Arthur grounded in responsibility.",
        "He is strongest when diplomacy and duty move together."
      ],
      legacy: [
        "Aquaman's reputation changed because stories gave him scale and seriousness.",
        "He now stands as DC's bridge between mythic spectacle and environmental power."
      ],
      funFacts: [
        "Aquaman first appeared in 1941.",
        "He can communicate with sea life in many continuities.",
        "The trident is both crown and weapon."
      ]
    },
    trivia: [
      {
        question: "Where does Aquaman rule?",
        choices: ["Atlantis", "Themyscira", "Metropolis", "Central City"],
        answer: 0,
        explanation: "Aquaman is king of Atlantis."
      },
      {
        question: "What element is most closely tied to Aquaman's power?",
        choices: ["Fire", "Earth", "Water", "Lightning"],
        answer: 2,
        explanation: "Water and the sea define Aquaman's myth."
      }
    ]
  },
  greenlantern: {
    id: "greenlantern",
    name: "Green Lantern",
    universe: "DC",
    title: "GREEN LANTERN",
    subtitle: "WILLPOWER MADE VISIBLE",
    bgText: "GREEN LANTERN",
    cityLabel: "SECTOR 2814",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Green_Lantern",
    colors: { primary: "#47d86b", secondary: "#173021", accent: "#d9ff8f", bg: "#08110b" },
    stats: { "WILL": "UNBREAKABLE", "IMAGINATION": "LIMITLESS", "LEGACY": "CORPS" },
    abilities: ["Constructs", "Flight", "Force fields", "Willpower focus"],
    badges: ["Green Lantern Corps", "Willpower oath", "Sector defender"],
    storyLeft: "Hal Jordan turns courage and imagination into a weapon against cosmic scale. The ring only works when his will stays sharper than fear.",
    storyRight: "Green Lantern is a hero of creativity under pressure. He makes belief visible and then uses it to defend a sector that never sleeps.",
    ctaLabel: "LIGHT THE GREEN",
    versions: [
      { actor: "RYAN REYNOLDS", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80", quote: "In brightest day..." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", quote: "...in blackest night." }
    ],
    villains: [
      { name: "Sinestro", threat: "Fallen mentor", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Sinestro proves that order without empathy becomes a trap.", back: "He matters because he is what Hal could become if fear wins." },
      { name: "Parallax", threat: "Fear incarnate", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", front: "Parallax is fear given shape, scale, and cosmic appetite.", back: "The rivalry turns willpower into a literal survival test." }
    ],
    timeline: [
      { year: "1940", title: "First appearance", text: "Green Lantern starts as a Golden Age idea before evolving into cosmic law." },
      { year: "1959", title: "Hal Jordan arrives", text: "The Silver Age rings in the modern Corps mythology." },
      { year: "2004", title: "Rebirth", text: "The character's identity and myth are rebuilt around willpower." },
      { year: "2010s", title: "Cosmic legacy", text: "The Corps expands into one of DC's biggest space epics." }
    ],
    teamup: { partner: "Superman", synergy: 90, title: "Hope and willpower", text: "Superman inspires belief while Green Lantern turns belief into tangible form." },
    comparison: { strength: 88, speed: 81, intelligence: 89, durability: 85, combat: 86, power: 96 },
    battle: {
      hp: 118,
      attack: 20,
      special: 33,
      moves: {
        attack: "forms a precision construct strike",
        special: "erupts into a willpower barrage",
        guard: "wraps the ring in a hard-light shield"
      }
    },
    quizAffinity: { leader: 2, scholar: 2, rebel: 0, heart: 1, speedster: 0, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Hal Jordan was chosen by a power ring because his will and fearlessness made him fit for the Corps. The ring is a test as much as a gift.",
        "Green Lantern works because imagination and discipline must be equal partners."
      ],
      powers: [
        "A Green Lantern ring creates hard-light constructs, flight, force fields, and almost any shape the wielder can focus into existence.",
        "The weakness is not the ring. It is doubt."
      ],
      storylines: [
        "Sinestro Corps War and Blackest Night turned the Lantern myth into cosmic event storytelling. Rebirth rebuilt Hal around courage rather than recklessness.",
        "The best Lantern stories ask what someone can imagine when fear is the obstacle."
      ],
      allies: [
        "The Green Lantern Corps, the Justice League, and fellow Lanterns keep Hal connected to a larger mission.",
        "He is strongest when he acts like a guardian, not a hotshot."
      ],
      legacy: [
        "Green Lantern gave DC a hero powered by will and creativity rather than brute force.",
        "The concept remains one of the clearest superhero metaphors for belief under pressure."
      ],
      funFacts: [
        "The Green Lantern oath is one of comics' most famous lines.",
        "The Corps spans the universe in many continuities.",
        "Willpower is treated as a literal force in Lantern mythology."
      ]
    },
    trivia: [
      {
        question: "What power fuels a Green Lantern ring?",
        choices: ["Fear", "Willpower", "Speed", "Magic"],
        answer: 1,
        explanation: "Willpower powers the ring."
      },
      {
        question: "What is the Corps' role in the universe?",
        choices: ["Political council", "Space police", "Secret society", "Treasure hunters"],
        answer: 1,
        explanation: "The Green Lantern Corps acts as a galactic peacekeeping force."
      }
    ]
  },
  nightwing: {
    id: "nightwing",
    name: "Nightwing",
    universe: "DC",
    title: "NIGHTWING",
    subtitle: "THE LEADER WHO LEARNED TO FLY SOLO",
    bgText: "NIGHTWING",
    cityLabel: "BLUDHAVEN",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Nightwing",
    colors: { primary: "#4bb3ff", secondary: "#111820", accent: "#8bf0ff", bg: "#060b12" },
    stats: { "ACROBATICS": "ELITE", "LEADERSHIP": "MATURE", "LEGACY": "BAT-FAMILY" },
    abilities: ["Escrima expertise", "Aerial combat", "Stealth", "Leadership"],
    badges: ["Former Robin", "Bludhaven guardian", "Bat-Family leader"],
    storyLeft: "Dick Grayson grew from circus acrobat to Robin and then into a hero strong enough to build a name of his own. He is proof that legacy can become independence without losing heart.",
    storyRight: "Nightwing moves with confidence, humor, and a rare kind of warmth. He protects Bludhaven by being the kind of leader who can still jump first.",
    ctaLabel: "FLY CLEAN",
    versions: [
      { actor: "ANIMATED LEGEND", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80", quote: "Trust the swing." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1505672678657-cc7037095e02?auto=format&fit=crop&w=900&q=80", quote: "No cape, no problem." }
    ],
    villains: [
      { name: "Deathstroke", threat: "Mercenary master", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Deathstroke tests whether Dick can outthink someone built for precision violence.", back: "The rivalry matters because it forces leadership to stay personal." },
      { name: "Blockbuster", threat: "Crime titan", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", front: "Blockbuster turns Bludhaven's streets into a test of endurance and nerve.", back: "He matters because Nightwing's city is as important as Gotham is to Batman." }
    ],
    timeline: [
      { year: "1940", title: "Robin origins", text: "Dick Grayson enters the myth as the first Robin." },
      { year: "1984", title: "Nightwing debut", text: "He steps out of Batman's shadow and claims his own identity." },
      { year: "2010s", title: "Bludhaven guardian", text: "Nightwing grows into a city-scale protector." },
      { year: "Present", title: "Bat-Family leader", text: "He becomes the clearest bridge between legacy and independence." }
    ],
    teamup: { partner: "Batman", synergy: 93, title: "Legacy with a pulse", text: "Batman built the foundation. Nightwing proves the mission can evolve without losing its edge." },
    comparison: { strength: 76, speed: 82, intelligence: 86, durability: 76, combat: 95, power: 58 },
    battle: {
      hp: 104,
      attack: 18,
      special: 25,
      moves: {
        attack: "whips through with an escrima rush",
        special: "launches a soaring acrobatic combo",
        guard: "drops into a spinning staff block"
      }
    },
    quizAffinity: { leader: 3, scholar: 1, rebel: 2, heart: 3, speedster: 1, mystic: 0, feral: 0 },
    lore: {
      origin: [
        "Dick Grayson began as Robin after tragedy pushed him into Batman's orbit. He later claimed the Nightwing identity as a statement of independence.",
        "His origin works because he becomes a leader without rejecting where he came from."
      ],
      powers: [
        "Nightwing relies on elite acrobatics, martial arts, stealth, and improvised gear rather than powers. He wins by movement and confidence.",
        "His charisma is part of the toolkit."
      ],
      storylines: [
        "Nightwing stories often focus on leadership, trust, and the weight of living in Batman's shadow. Bludhaven gives him a city that belongs to him.",
        "The best arcs let him be the heart of the Bat-Family without reducing him to sidekick history."
      ],
      allies: [
        "The Bat-Family, Titans, and close relationships like Barbara Gordon keep Dick grounded.",
        "He thrives when his optimism is treated as strength, not softness."
      ],
      legacy: [
        "Nightwing is the proof that a sidekick can become an icon without losing the original appeal.",
        "He remains one of DC's most beloved characters because he feels fully grown and still hopeful."
      ],
      funFacts: [
        "Nightwing debuted in 1984.",
        "Dick Grayson was the first Robin.",
        "His blue emblem became a signature look for sleek heroism."
      ]
    },
    trivia: [
      {
        question: "What was Nightwing's first heroic identity?",
        choices: ["Robin", "Aqualad", "Kid Flash", "Speedy"],
        answer: 0,
        explanation: "Dick Grayson began as Robin."
      },
      {
        question: "Which city is Nightwing most closely tied to?",
        choices: ["Bludhaven", "Metropolis", "Central City", "Atlantis"],
        answer: 0,
        explanation: "Bludhaven is Nightwing's home base."
      }
    ]
  },
  martianmanhunter: {
    id: "martianmanhunter",
    name: "Martian Manhunter",
    universe: "DC",
    title: "MARTIAN MANHUNTER",
    subtitle: "LAST SON OF MARS, GUARDIAN OF TWO WORLDS",
    bgText: "MARTIAN MANHUNTER",
    cityLabel: "MARS",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    wiki: "https://en.wikipedia.org/wiki/Martian_Manhunter",
    colors: { primary: "#5de07a", secondary: "#123026", accent: "#f2c94c", bg: "#07120d" },
    stats: { "TELEPATHY": "POWERFUL", "SHAPESHIFT": "TOTAL", "LEGACY": "JUSTICE LEAGUE" },
    abilities: ["Shapeshifting", "Telepathy", "Phasing", "Flight"],
    badges: ["Last son of Mars", "Telepathic sentinel", "Justice League cornerstone"],
    storyLeft: "J'onn J'onzz is an exile who lost his home world and rebuilt his purpose on Earth. He carries grief quietly, then uses it to protect others from the same loss.",
    storyRight: "Martian Manhunter is a guardian who sees more than most heroes ever can. His calm hides the ache of being the last witness to a dead world.",
    ctaLabel: "ANSWER THE CALL",
    versions: [
      { actor: "JUSTICE LEAGUE ANIMATED", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80", quote: "I am J'onn J'onzz." },
      { actor: "COMIC CLASSIC", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", quote: "Earth is my second home." }
    ],
    villains: [
      { name: "M'comm", threat: "White Martian threat", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80", front: "M'comm turns species conflict into personal grief and keeps J'onn's past alive.", back: "He matters because he weaponizes what J'onn lost." },
      { name: "Lobo", threat: "Chaotic hunter", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", front: "Lobo is the loud, destructive opposite of J'onn's quiet restraint.", back: "The rivalry works because it pits cosmic patience against pure chaos." }
    ],
    timeline: [
      { year: "1955", title: "First appearance", text: "Martian Manhunter arrives as one of DC's earliest sci-fi heroes." },
      { year: "1960s", title: "Justice League core", text: "He becomes a foundational League member and strategic anchor." },
      { year: "1990s", title: "Identity deepens", text: "Stories lean into exile, grief, and belonging." },
      { year: "Present", title: "Telepathic sentinel", text: "J'onn remains one of DC's most quietly essential protectors." }
    ],
    teamup: { partner: "Superman", synergy: 92, title: "Two guardians, one planet", text: "Clark inspires hope while J'onn brings patience, strategy, and a second alien perspective." },
    comparison: { strength: 95, speed: 88, intelligence: 90, durability: 96, combat: 89, power: 98 },
    battle: {
      hp: 126,
      attack: 22,
      special: 33,
      moves: {
        attack: "strikes with a phased telekinetic blow",
        special: "unleashes a psychic shockwave",
        guard: "melds into an intangible defensive veil"
      }
    },
    quizAffinity: { leader: 2, scholar: 2, rebel: 0, heart: 3, speedster: 0, mystic: 1, feral: 0 },
    lore: {
      origin: [
        "J'onn J'onzz is the last surviving Martian in many continuities, exiled to Earth after tragedy destroyed his home. His arrival turns loneliness into guardianship.",
        "The origin works because he chooses compassion even after losing almost everything."
      ],
      powers: [
        "Martian Manhunter can shapeshift, fly, phase, and read minds, making him one of DC's most versatile heroes.",
        "His power is immense, but his restraint is what keeps him heroic."
      ],
      storylines: [
        "Justice League stories make him the quiet stabilizer. Solo stories often focus on alienation, memory, and finding a home.",
        "He shines when the story lets him be the heart of a team without making him loud."
      ],
      allies: [
        "The Justice League, Superman, and the people who accept J'onn as family give him purpose on Earth.",
        "He values connection because he has lost a world already."
      ],
      legacy: [
        "Martian Manhunter remains one of DC's most emotionally rich science-fiction heroes.",
        "He proves that empathy can be just as powerful as force."
      ],
      funFacts: [
        "Martian Manhunter first appeared in 1955.",
        "He is often one of the League's most powerful members.",
        "Identity and belonging are core to his myth."
      ]
    },
    trivia: [
      {
        question: "What species is Martian Manhunter?",
        choices: ["Kryptonian", "Martian", "Atlantean", "Amazonian"],
        answer: 1,
        explanation: "J'onn J'onzz is a Martian."
      },
      {
        question: "Which power is most associated with Martian Manhunter?",
        choices: ["Telepathy", "Speed Force", "Lightning", "Ring constructs"],
        answer: 0,
        explanation: "Martian Manhunter is famous for telepathy."
      }
    ]
  }
};

const quizQuestions = [
  {
    prompt: "A crisis hits your city and the cameras are already rolling. What do you do first?",
    answers: [
      { label: "Map the threat, assign roles, and build a plan", weights: { leader: 3, scholar: 2 } },
      { label: "Get to street level and improvise from the first impact", weights: { rebel: 2, feral: 1, speedster: 1 } },
      { label: "Find the civilians who need a shield before the battle starts", weights: { heart: 3, leader: 1 } },
      { label: "Read the symbols, the timing, and the hidden meaning behind it", weights: { scholar: 2, mystic: 2 } }
    ]
  },
  {
    prompt: "Which line sounds most like the code you would leave behind?",
    answers: [
      { label: "Never let fear make the decisions", weights: { leader: 2, rebel: 1 } },
      { label: "If the answer is broken, rebuild it better", weights: { scholar: 3, leader: 1 } },
      { label: "Power only matters when it helps people stay human", weights: { heart: 3, mystic: 1 } },
      { label: "Rule one: get back up harder than before", weights: { feral: 2, rebel: 2 } }
    ]
  },
  {
    prompt: "What kind of reputation do you secretly want?",
    answers: [
      { label: "The person everyone calls when the plan matters", weights: { leader: 3, scholar: 1 } },
      { label: "The legend who makes impossible things look effortless", weights: { speedster: 2, rebel: 1, feral: 1 } },
      { label: "The ally who never stops showing up", weights: { heart: 3 } },
      { label: "The one who sees what others miss", weights: { mystic: 2, scholar: 2 } }
    ]
  },
  {
    prompt: "How do you deal with an enemy who is stronger than you?",
    answers: [
      { label: "Outthink them and use their momentum against them", weights: { scholar: 3, leader: 1 } },
      { label: "Outlast them with grit and raw will", weights: { feral: 2, rebel: 2 } },
      { label: "Reach people first so the fight is never isolated", weights: { heart: 2, leader: 2 } },
      { label: "Lean into a bigger truth they cannot control", weights: { mystic: 3, heart: 1 } }
    ]
  },
  {
    prompt: "What matters most after the battle ends?",
    answers: [
      { label: "The next plan", weights: { leader: 2, scholar: 2 } },
      { label: "The people who made it through", weights: { heart: 3 } },
      { label: "The chance to improve the system", weights: { rebel: 2, scholar: 1 } },
      { label: "The promise to keep moving forward", weights: { speedster: 2, feral: 1 } }
    ]
  },
  {
    prompt: "When a teammate starts losing confidence, what do you offer?",
    answers: [
      { label: "A contingency plan and a quiet reminder that they're not alone", weights: { leader: 2, scholar: 1, heart: 1 } },
      { label: "A bold push to remind them of their own fire", weights: { rebel: 2, speedster: 1 } },
      { label: "Patience, honesty, and the space to breathe again", weights: { heart: 3 } },
      { label: "A strange angle nobody else thought to use", weights: { mystic: 2, scholar: 2 } }
    ]
  },
  {
    prompt: "If your city had to survive one impossible night, what would you protect first?",
    answers: [
      { label: "The command center and the people steering the response", weights: { leader: 3, scholar: 1 } },
      { label: "The rooftops, alleys, and evacuation routes", weights: { rebel: 2, speedster: 2 } },
      { label: "The families still waiting for someone to show up", weights: { heart: 3 } },
      { label: "The hidden truth behind whoever planned it", weights: { mystic: 2, scholar: 2 } }
    ]
  },
  {
    prompt: "What kind of technology feels most like your style?",
    answers: [
      { label: "Precision gear built for a flawless operation", weights: { leader: 2, scholar: 2 } },
      { label: "A sleek upgrade that turns chaos into motion", weights: { speedster: 2, rebel: 2 } },
      { label: "Something handcrafted and a little imperfect", weights: { heart: 2, rebel: 1 } },
      { label: "A tool with a secret history and a bigger purpose", weights: { mystic: 2, scholar: 1 } }
    ]
  },
  {
    prompt: "Your toughest enemy exposes one weakness. How do you respond?",
    answers: [
      { label: "Study the pattern until it becomes useful", weights: { scholar: 3, leader: 1 } },
      { label: "Turn the weakness into a daring surprise", weights: { rebel: 2, speedster: 1 } },
      { label: "Accept it, then keep the promise anyway", weights: { heart: 3 } },
      { label: "Fight harder until they realize you won't break", weights: { feral: 3 } }
    ]
  },
  {
    prompt: "Which kind of victory feels most satisfying?",
    answers: [
      { label: "Everyone survives and the plan worked", weights: { leader: 3 } },
      { label: "The underdog gets a shot they were denied", weights: { heart: 2, rebel: 1 } },
      { label: "The impossible machine finally runs", weights: { scholar: 3 } },
      { label: "You outpaced the odds and never stopped moving", weights: { speedster: 3 } }
    ]
  },
  {
    prompt: "What do you trust most when everything gets weird?",
    answers: [
      { label: "The people who have stayed loyal through the worst of it", weights: { heart: 3 } },
      { label: "The data, evidence, and a clean tactical read", weights: { scholar: 3 } },
      { label: "Instinct, even when it looks reckless", weights: { rebel: 2, feral: 1 } },
      { label: "The bigger moral line you refuse to cross", weights: { leader: 2, mystic: 1 } }
    ]
  },
  {
    prompt: "Which version of a legend do you respect most?",
    answers: [
      { label: "The one who keeps the city safe without asking for credit", weights: { leader: 2, heart: 1 } },
      { label: "The one who changes the system from the inside", weights: { scholar: 2, rebel: 2 } },
      { label: "The one who is as inspiring in person as in stories", weights: { heart: 3 } },
      { label: "The one whose style is so sharp it becomes myth", weights: { speedster: 1, rebel: 2 } }
    ]
  },
  {
    prompt: "How do you recharge after a brutal mission?",
    answers: [
      { label: "Review the mission and sharpen the next plan", weights: { scholar: 3, leader: 1 } },
      { label: "Disappear somewhere loud, fast, and alive", weights: { speedster: 3, rebel: 1 } },
      { label: "Call the people who make the work feel worth it", weights: { heart: 3 } },
      { label: "Train until the frustration becomes focus", weights: { feral: 2, leader: 1 } }
    ]
  },
  {
    prompt: "What does a real symbol need most?",
    answers: [
      { label: "Consistency", weights: { leader: 3 } },
      { label: "Curiosity", weights: { scholar: 3 } },
      { label: "Compassion", weights: { heart: 3 } },
      { label: "Momentum", weights: { speedster: 3 } }
    ]
  },
  {
    prompt: "If someone challenged your identity, what would you lean on?",
    answers: [
      { label: "The values I keep showing up for", weights: { heart: 2, leader: 1 } },
      { label: "The work I’ve already done", weights: { scholar: 3 } },
      { label: "The courage to reinvent myself", weights: { rebel: 2, speedster: 1 } },
      { label: "The fact that I can survive the answer", weights: { feral: 3 } }
    ]
  },
  {
    prompt: "Which sidekick trait would help you most?",
    answers: [
      { label: "Loyal and steady under pressure", weights: { leader: 2, heart: 2 } },
      { label: "Smart enough to solve the second problem too", weights: { scholar: 3 } },
      { label: "Quick enough to keep up with chaos", weights: { speedster: 3 } },
      { label: "Brave enough to say the hard truth", weights: { rebel: 2, heart: 1 } }
    ]
  },
  {
    prompt: "What kind of legacy do you want?",
    answers: [
      { label: "A safer world for the next generation", weights: { heart: 3 } },
      { label: "A smarter world that learns from its mistakes", weights: { scholar: 3 } },
      { label: "A freer world that refuses to stay broken", weights: { rebel: 3 } },
      { label: "A world that never stops moving toward hope", weights: { leader: 2, speedster: 1 } }
    ]
  },
  {
    prompt: "If the public only remembered one thing about you, what would you hope it was?",
    answers: [
      { label: "That I never stopped showing up", weights: { heart: 3 } },
      { label: "That I solved problems nobody else could untangle", weights: { scholar: 3 } },
      { label: "That I challenged a broken system and made it move", weights: { rebel: 3 } },
      { label: "That I kept people together when everything fell apart", weights: { leader: 3 } }
    ]
  },
  {
    prompt: "Which kind of sacrifice feels most heroic to you?",
    answers: [
      { label: "Giving up recognition", weights: { heart: 2, leader: 1 } },
      { label: "Giving up comfort to keep learning", weights: { scholar: 2, rebel: 1 } },
      { label: "Giving up control so someone else can grow", weights: { leader: 2, heart: 1 } },
      { label: "Giving up the easy path and taking the harder one", weights: { rebel: 2, feral: 1 } }
    ]
  },
  {
    prompt: "What kind of headline would make you smile the most?",
    answers: [
      { label: "City saved, no casualties", weights: { heart: 3 } },
      { label: "Impossible strategy succeeds", weights: { scholar: 3 } },
      { label: "Hero breaks the rules to do the right thing", weights: { rebel: 3 } },
      { label: "Fastest response in the city’s history", weights: { speedster: 3 } }
    ]
  }
];

const triviaDecks = {
  easy: [
    {
      question: "Which hero first appeared in Detective Comics #27?",
      choices: ["Batman", "Superman", "Spider-Man", "Iron Man"],
      answer: 0,
      explanation: "Batman made his debut in Detective Comics #27 in 1939."
    },
    {
      question: "What is Wonder Woman's most famous truth-based weapon?",
      choices: ["The Shield of Athena", "The Lasso of Truth", "The Sword of Olympus", "The Bracelets of Victory"],
      answer: 1,
      explanation: "The Lasso of Truth is one of Wonder Woman's signature tools."
    },
    {
      question: "What city is Superman most closely tied to?",
      choices: ["Gotham", "Metropolis", "Central City", "Atlantis"],
      answer: 1,
      explanation: "Metropolis is Superman's principal city and symbolically bright home base."
    },
    {
      question: "What metal is most associated with Wakanda's advanced technology in the wider Marvel mythos?",
      choices: ["Adamantium", "Vibranium", "Nth metal", "Titanium"],
      answer: 1,
      explanation: "Vibranium is the signature resource that powers Wakanda's advanced engineering."
    },
    {
      question: "Which hero first appeared in Detective Comics #27?",
      choices: ["Batman", "Superman", "Spider-Man", "Iron Man"],
      answer: 0,
      explanation: "Batman debuted in Detective Comics #27 in 1939."
    },
    {
      question: "What city is Spider-Man most closely tied to?",
      choices: ["New York City", "Chicago", "Gotham", "Metropolis"],
      answer: 0,
      explanation: "Spider-Man is defined by New York City."
    },
    {
      question: "Which hero carries the Lasso of Truth?",
      choices: ["Wonder Woman", "Captain Marvel", "Black Widow", "Storm"],
      answer: 0,
      explanation: "The Lasso of Truth belongs to Wonder Woman."
    },
    {
      question: "What is Tony Stark's superhero identity?",
      choices: ["Iron Man", "War Machine", "Falcon", "Hawkeye"],
      answer: 0,
      explanation: "Tony Stark is Iron Man."
    },
    {
      question: "Which city is Batman's home base?",
      choices: ["Gotham", "Metropolis", "Central City", "Atlantis"],
      answer: 0,
      explanation: "Batman protects Gotham City."
    },
    {
      question: "Which hero is the Last Son of Krypton?",
      choices: ["Superman", "Thor", "Cyclops", "Aquaman"],
      answer: 0,
      explanation: "Superman is the famous Kryptonian hero."
    },
    {
      question: "What item is most closely linked with Wonder Woman's honesty powers?",
      choices: ["The Lasso of Truth", "A magic ring", "A vibranium shield", "A speed belt"],
      answer: 0,
      explanation: "Wonder Woman's Lasso of Truth compels honesty."
    },
    {
      question: "Which Marvel hero uses web-shooters?",
      choices: ["Spider-Man", "Wolverine", "Doctor Strange", "Thor"],
      answer: 0,
      explanation: "Spider-Man is famous for his web-shooters."
    },
    {
      question: "Who is known as the World's Greatest Detective?",
      choices: ["Batman", "Superman", "The Flash", "Green Lantern"],
      answer: 0,
      explanation: "Batman is widely known as the World's Greatest Detective."
    },
    {
      question: "Which hero's symbol stands for hope?",
      choices: ["Superman", "Venom", "Joker", "Ultron"],
      answer: 0,
      explanation: "Superman's emblem is one of the most enduring symbols of hope in comics."
    },
    {
      question: "Which city is Superman most associated with?",
      choices: ["Metropolis", "Gotham", "Star City", "Krypton"],
      answer: 0,
      explanation: "Metropolis is Superman's primary city."
    },
    {
      question: "What is the name of Wonder Woman's homeland?",
      choices: ["Themyscira", "Asgard", "Latveria", "Genosha"],
      answer: 0,
      explanation: "Wonder Woman comes from Themyscira."
    }
  ],
  medium: [
    {
      question: "Which story is a landmark exploration of Tony Stark's flaws and self-destruction?",
      choices: ["Demon in a Bottle", "Civil War", "Secret Wars", "Armor Wars"],
      answer: 0,
      explanation: "Demon in a Bottle is the classic Tony Stark character study."
    },
    {
      question: "What idea sits at the heart of Spider-Man's origin?",
      choices: ["Duty before comfort", "Power before identity", "Secrets before family", "Luck before planning"],
      answer: 0,
      explanation: "Spider-Man is built on the lesson that power means responsibility."
    },
    {
      question: "Which Batman storyline is known for breaking him physically and symbolically?",
      choices: ["Knightfall", "Hush", "The Long Halloween", "Earth One"],
      answer: 0,
      explanation: "Knightfall is the story where Bane breaks Batman's body and his myth is tested."
    },
    {
      question: "Which Marvel event is most associated with a fractured superhero community forcing Tony Stark into the center of the debate?",
      choices: ["Civil War", "Infinity Gauntlet", "Secret Invasion", "House of M"],
      answer: 0,
      explanation: "Civil War is the defining event for Tony's public ethical crisis."
    },
    {
      question: "Which Batman story is known for breaking him physically and symbolically?",
      choices: ["Knightfall", "Hush", "Year Two", "Black Mirror"],
      answer: 0,
      explanation: "Knightfall is the story where Bane breaks Batman's body and the myth is tested."
    },
    {
      question: "Which Superman story is often praised for distilling the character into hope and sacrifice?",
      choices: ["All-Star Superman", "The Killing Joke", "Infinite Crisis", "Secret Wars"],
      answer: 0,
      explanation: "All-Star Superman is a landmark meditation on hope and legacy."
    },
    {
      question: "What lesson defines Spider-Man more than any other?",
      choices: ["Great power means responsibility", "Power without limits", "Fear is the only truth", "Victory at any cost"],
      answer: 0,
      explanation: "Spider-Man's defining lesson is that great power requires responsibility."
    },
    {
      question: "Which city is central to The Court of Owls in Batman lore?",
      choices: ["Gotham", "Metropolis", "Central City", "Atlantis"],
      answer: 0,
      explanation: "The Court of Owls is a Gotham-centric conspiracy."
    },
    {
      question: "What best describes Iron Man's combat edge?",
      choices: ["Biological mutation", "Powered armor and rapid iteration", "Mystic training", "Speed Force manipulation"],
      answer: 1,
      explanation: "Iron Man's edge is powered armor plus constant design improvement."
    },
    {
      question: "Which Wonder Woman story is a famous mediation between sacred duty and mortal conflict?",
      choices: ["The Hiketeia", "No Man's Land", "Armor Wars", "Spider-Verse"],
      answer: 0,
      explanation: "The Hiketeia is one of Wonder Woman's most praised mythic stories."
    },
    {
      question: "Who is most likely to serve as Superman's emotional anchor in Metropolis?",
      choices: ["Lois Lane", "The Joker", "Bane", "Riddler"],
      answer: 0,
      explanation: "Lois Lane is a core emotional and narrative anchor for Superman."
    },
    {
      question: "Which Marvel hero's origin is tied to an accident that heightened his senses rather than giving him flight or armor?",
      choices: ["Daredevil", "Iron Man", "Thor", "Captain America"],
      answer: 0,
      explanation: "Daredevil's accident leads to his heightened senses."
    },
    {
      question: "What is the most accurate description of Ultron as an Iron Man adversary?",
      choices: ["A magic clone", "A mirror of Tony's logic without his conscience", "A Kryptonian warlord", "A mutant assassin"],
      answer: 1,
      explanation: "Ultron is Stark-like intelligence stripped of empathy."
    },
    {
      question: "Which superhero team is Wonder Woman a founding member of in DC continuity?",
      choices: ["Justice League", "Avengers", "X-Men", "Guardians of the Galaxy"],
      answer: 0,
      explanation: "Wonder Woman is a foundational Justice League member."
    },
    {
      question: "What is the defining dramatic tension of Batman stories?",
      choices: ["Whether speed beats time", "Whether trauma can become justice without becoming cruelty", "Whether magic can be outlawed", "Whether aliens can vote"],
      answer: 1,
      explanation: "Batman stories constantly test whether discipline can turn trauma into justice."
    },
    {
      question: "Which Marvel event pushed Iron Man into the center of a public superhero conflict over accountability?",
      choices: ["Civil War", "Flashpoint", "Blackest Night", "Zero Hour"],
      answer: 0,
      explanation: "Civil War is the key event for Tony's ethics under public scrutiny."
    },
    {
      question: "What is the best description of Batman's greatest advantage in a fight against stronger opponents?",
      choices: ["Luck", "Preparation and analysis", "Alien blood", "Infinite stamina"],
      answer: 1,
      explanation: "Batman wins many impossible fights by planning better than everyone else."
    }
  ],
  hard: [
    {
      question: "Which Wonder Woman story is often praised for treating Diana as a mediator among gods and mortals?",
      choices: ["The Hiketeia", "Kingdom Come", "Flashpoint", "Superman: Red Son"],
      answer: 0,
      explanation: "The Hiketeia is a standout Wonder Woman story about duty, truth, and consequences."
    },
    {
      question: "What is the primary reason Ultron is such a strong Iron Man rival?",
      choices: ["He copies Tony's armor line", "He reflects Tony's logic without his conscience", "He is Tony's older brother", "He controls the Avengers"],
      answer: 1,
      explanation: "Ultron is terrifying because he is Stark-like intelligence stripped of empathy."
    },
    {
      question: "Which Spider-Man event expanded the character into a broader legacy rather than a single identity?",
      choices: ["Spider-Verse", "House of M", "Inferno", "Age of Ultron"],
      answer: 0,
      explanation: "Spider-Verse turns Spider-Man into a multi-hero legacy across realities."
    },
    {
      question: "Which Batman era is most associated with the discovery that Gotham has a hidden aristocracy watching from the shadows?",
      choices: ["The Court of Owls", "No Man's Land", "Zero Year", "Black Mirror"],
      answer: 0,
      explanation: "The Court of Owls arc reframes Gotham as a city with a secret ruling class."
    },
    {
      question: "What makes Brainiac such a strong Superman rival conceptually?",
      choices: ["He is faster than Superman", "He embodies cold collection without empathy", "He was raised by the Kents", "He commands the Bat-Family"],
      answer: 1,
      explanation: "Brainiac turns intelligence into a machine for control and extraction."
    },
    {
      question: "Which Spider-Man storyline expands his myth into a multiversal legacy?",
      choices: ["Spider-Verse", "Armor Wars", "Knightfall", "Infinite Crisis"],
      answer: 0,
      explanation: "Spider-Verse turns Spider-Man into a legacy across realities."
    },
    {
      question: "Which Wonder Woman story is often praised for mythic and moral tension between gods and mortals?",
      choices: ["The Hiketeia", "Demon in a Bottle", "Crisis on Infinite Earths", "Age of Ultron"],
      answer: 0,
      explanation: "The Hiketeia is a standout Wonder Woman story about duty and sacred obligation."
    },
    {
      question: "Why is Ultron such a powerful Iron Man adversary conceptually?",
      choices: ["He is Tony's clone", "He is Tony's technology without Tony's conscience", "He created the arc reactor", "He is from Krypton"],
      answer: 1,
      explanation: "Ultron is Stark-like intelligence stripped of ethics and empathy."
    },
    {
      question: "Which Batman storyline is especially famous for Gotham being effectively cut off and left to fend for itself?",
      choices: ["No Man's Land", "Hush", "Year One", "Dark Nights: Metal"],
      answer: 0,
      explanation: "No Man's Land turns Gotham into a fractured survival state."
    },
    {
      question: "Which Marvel storyline is the classic Tony Stark character study about addiction and accountability?",
      choices: ["Demon in a Bottle", "The Long Halloween", "Kingdom Come", "Blackest Night"],
      answer: 0,
      explanation: "Demon in a Bottle is the landmark Tony Stark character study."
    },
    {
      question: "Which Superman event is most remembered for the cultural shock of losing his greatest symbol?",
      choices: ["The Death of Superman", "Civil War", "Spider-Verse", "Flashpoint"],
      answer: 0,
      explanation: "The Death of Superman became a defining comics moment beyond the story itself."
    },
    {
      question: "Which teamup best represents Batman and Superman's contrasting strengths?",
      choices: ["World's Finest", "Secret Wars", "X-Force", "Legion of Doom"],
      answer: 0,
      explanation: "World's Finest is the classic Batman-Superman partnership."
    },
    {
      question: "What is the most accurate reason Superman remains relatable despite near-limitless power?",
      choices: ["He constantly loses every fight", "His restraint and compassion define the character", "He is secretly a human detective", "He never speaks to civilians"],
      answer: 1,
      explanation: "Superman remains relatable because his restraint matters as much as his power."
    },
    {
      question: "Which Marvel hero is most closely associated with the phrase 'genius, billionaire, playboy, philanthropist'?",
      choices: ["Tony Stark", "Peter Parker", "Bruce Banner", "Steve Rogers"],
      answer: 0,
      explanation: "That public persona belongs to Tony Stark."
    },
    {
      question: "Which DC concept frames Wonder Woman as a mediator between mythic authority and modern ethics?",
      choices: ["Ambassadorial diplomacy", "Speed Force training", "Kryptonian inheritance", "Lantern oath"],
      answer: 0,
      explanation: "Wonder Woman often functions as a bridge between gods, mortals, and ideals."
    },
    {
      question: "Which Batman era is most associated with the idea that Gotham hides older power structures than the hero can easily see?",
      choices: ["The Court of Owls", "The Age of Apocalypse", "Infinity Crisis", "The Red Zone"],
      answer: 0,
      explanation: "The Court of Owls arc exposes Gotham's hidden aristocracy."
    },
    {
      question: "Which character is most central to the emotional core of Superman's life on Earth?",
      choices: ["Lois Lane", "Bane", "Whiplash", "Brainiac"],
      answer: 0,
      explanation: "Lois Lane is one of the key emotional anchors in Superman stories."
    }
  ]
};

const appState = {
  selectedHeroId: "batman",
  selectedVersionIndex: 0,
  selectedUniverse: "all",
  loreExpanded: false,
  quiz: { index: 0, traits: {}, score: 0, complete: false, resultId: null, feedback: "" },
  trivia: {
    difficulty: "medium",
    deck: [],
    index: 0,
    score: 0,
    streak: 0,
    answered: 0,
    correct: 0,
    timerSeconds: 0,
    locked: false,
    complete: false,
    message: ""
  },
  battle: {
    active: false,
    heroId: "batman",
    enemyId: "superman",
    heroHp: 0,
    enemyHp: 0,
    heroGuarded: false,
    enemyGuarded: false,
    ended: false
  },
  vote: { board: [], total: 0, message: "Loading shared totals...", lockedHeroId: null }
};

const STORAGE_KEY = "legendrium-selection-v2";
const UNIVERSE_KEY = "legendrium-universe-v2";
const VOTE_LOCK_KEY = "legendrium-vote-lock-v1";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const elements = {};
let revealObserver = null;

function heroTag(hero) {
  return hero.tag || hero.subtitle || hero.title || hero.name;
}

function heroSummary(hero) {
  return hero.storyRight || hero.storyLeft || hero.subtitle || hero.name;
}

function cacheElements() {
  const ids = [
    "siteNav",
    "heroUniverseSelector",
    "heroRosterGrid",
    "heroDossier",
    "dossierTitle",
    "dossierSubtitle",
    "dossierStoryLeft",
    "dossierStoryRight",
    "dossierImage",
    "dossierStats",
    "dossierBadges",
    "exploreLoreBtn",
    "loreSection",
    "loreContent",
    "villainGrid",
    "timelineRail",
    "versionSelector",
    "teamupCard",
    "posterBackdropWord",
    "posterBackdropLine",
    "posterBackdropCaption",
    "battleOpponent",
    "battleStatus",
    "battleHeroName",
    "battleEnemyName",
    "battleHeroImage",
    "battleEnemyImage",
    "battleHeroHealth",
    "battleEnemyHealth",
    "battleLog",
    "quizCard",
    "quizProgress",
    "quizStage",
    "quizScore",
    "quizFeedback",
    "quizTraitBars",
    "triviaCard",
    "triviaScore",
    "triviaStreak",
    "triviaTimer",
    "triviaAccuracy",
    "triviaProgress",
    "triviaStage",
    "triviaDifficulty",
    "triviaDifficultyButtons",
    "voteButtons",
    "voteMessage",
    "voteTotal",
    "voteBoard",
    "heroPicker",
    "pickerNote"
  ];
  ids.forEach((id) => {
    elements[id] = document.getElementById(id);
  });
}

function currentHero() {
  return heroData[appState.selectedHeroId];
}

function saveSelection() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selectedHeroId: appState.selectedHeroId,
      selectedVersionIndex: appState.selectedVersionIndex
    })
  );
}

function restoreSelection() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const savedUniverse = localStorage.getItem(UNIVERSE_KEY);
      if (savedUniverse && universeFilters.includes(savedUniverse)) {
        appState.selectedUniverse = savedUniverse;
      }
      return;
    }
    const saved = JSON.parse(raw);
    if (saved.selectedHeroId && heroData[saved.selectedHeroId]) {
      appState.selectedHeroId = saved.selectedHeroId;
    }
    if (Number.isInteger(saved.selectedVersionIndex)) {
      appState.selectedVersionIndex = saved.selectedVersionIndex;
    }
    const savedUniverse = localStorage.getItem(UNIVERSE_KEY);
    if (savedUniverse && universeFilters.includes(savedUniverse)) {
      appState.selectedUniverse = savedUniverse;
    }
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function restoreVoteLock() {
  try {
    const lockedHeroId = localStorage.getItem(VOTE_LOCK_KEY);
    if (lockedHeroId) {
      appState.vote.lockedHeroId = lockedHeroId;
      appState.vote.message = `You already voted for ${heroData[lockedHeroId] ? heroData[lockedHeroId].name : "a hero"} on this browser.`;
    }
  } catch (_error) {
    localStorage.removeItem(VOTE_LOCK_KEY);
  }
}

function saveVoteLock(heroId) {
  localStorage.setItem(VOTE_LOCK_KEY, heroId);
  appState.vote.lockedHeroId = heroId;
}

function setHeroTheme(hero) {
  document.documentElement.style.setProperty("--primary", hero.colors.primary);
  document.documentElement.style.setProperty("--secondary", hero.colors.secondary);
  document.documentElement.style.setProperty("--accent", hero.colors.accent);
  document.documentElement.style.setProperty("--bg", hero.colors.bg);
}

function refreshLayoutOffset() {
  const topbar = document.querySelector(".topbar");
  const offset = (topbar ? topbar.offsetHeight : 96) + 24;
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
}

function smoothScrollToElement(element) {
  if (!element) return;
  const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-offset")) || 120;
  const top = window.scrollY + element.getBoundingClientRect().top - offset;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function buildSharedNav() {
  if (!elements.siteNav) return;
  const pageKey = document.body.dataset.page;
  elements.siteNav.innerHTML = featureNavLinks
    .map((link) => {
      const active = pageKey === link.key ? " active" : "";
      return `<a class="nav-link${active}" href="${link.href}">${link.label}</a>`;
    })
    .join("");
}

function observeRevealNodes(scope = document) {
  if (!scope || typeof scope.querySelectorAll !== "function") return;
  const nodes = scope.querySelectorAll ? scope.querySelectorAll(".reveal") : [];
  if (!nodes.length) return;
  if (!revealObserver) {
    nodes.forEach((node) => node.classList.add("visible"));
    return;
  }
  nodes.forEach((node) => revealObserver.observe(node));
}

function buildUniverseSelector() {
  if (!elements.heroUniverseSelector) return;
  elements.heroUniverseSelector.innerHTML = universeFilters
    .map((filter) => {
      const active = appState.selectedUniverse === filter ? " active" : "";
      const label = filter === "all" ? "All Heroes" : filter;
      return `<button class="universe-chip${active}" type="button" data-universe="${filter}" aria-pressed="${appState.selectedUniverse === filter}">${label}</button>`;
    })
    .join("");

  elements.heroUniverseSelector.querySelectorAll("[data-universe]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.selectedUniverse = button.dataset.universe;
      localStorage.setItem(UNIVERSE_KEY, appState.selectedUniverse);
      buildUniverseSelector();
      renderRosterGrid();
    });
  });
}

function renderRosterGrid() {
  if (!elements.heroRosterGrid) return;
  const heroes = rosterHeroOrder.map((id) => heroData[id]).filter((hero) => appState.selectedUniverse === "all" || hero.universe === appState.selectedUniverse);
  elements.heroRosterGrid.innerHTML = heroes
    .map((hero, index) => {
      const active = hero.id === appState.selectedHeroId ? " selected" : "";
      const delayClass = ` reveal-delay-${Math.min(index + 1, 3)}`;
      return `
        <button class="roster-card reveal${active}${delayClass}" type="button" data-hero="${hero.id}" aria-pressed="${hero.id === appState.selectedHeroId}">
          <span class="roster-card-universe">${hero.universe}</span>
          <span class="roster-card-title">${hero.name}</span>
          <span class="roster-card-tag">${hero.tag || hero.subtitle}</span>
        </button>
      `;
    })
    .join("");

  elements.heroRosterGrid.querySelectorAll("[data-hero]").forEach((button) => {
    button.addEventListener("click", () => selectHero(button.dataset.hero, { fromRoster: true }));
  });
  observeRevealNodes(elements.heroRosterGrid);
}

function renderLore(hero) {
  if (!elements.loreContent) return;
  const sections = [
    ["Origin", hero.lore.origin],
    ["Powers & Abilities", hero.lore.powers],
    ["Major Storylines", hero.lore.storylines],
    ["Allies", hero.lore.allies],
    ["Legacy", hero.lore.legacy],
    ["Fun Facts", hero.lore.funFacts]
  ];

  elements.loreContent.innerHTML = sections
    .map(
      ([title, lines], index) => `
        <article class="lore-block reveal reveal-delay-${Math.min(index + 1, 3)}">
          <p class="eyebrow">${title}</p>
          <div class="lore-copy">
            ${lines.map((line) => `<p>${line}</p>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
  observeRevealNodes(elements.loreContent);
}

function setLoreExpanded(expanded) {
  appState.loreExpanded = expanded;
  if (elements.loreSection) {
    elements.loreSection.dataset.open = String(expanded);
    elements.loreSection.setAttribute("aria-hidden", String(!expanded));
    elements.loreSection.style.maxHeight = expanded ? `${elements.loreSection.scrollHeight}px` : "0px";
  }
  if (elements.exploreLoreBtn) {
    elements.exploreLoreBtn.setAttribute("aria-expanded", String(expanded));
    elements.exploreLoreBtn.innerHTML = `${expanded ? "Hide Lore" : "Explore Lore"} <span class="arrow">&rarr;</span>`;
  }
}

function renderDossier() {
  const hero = currentHero();

  setHeroTheme(hero);

  if (elements.posterBackdropWord) elements.posterBackdropWord.textContent = hero.bgText || hero.name;
  if (elements.posterBackdropLine) elements.posterBackdropLine.textContent = hero.title || hero.subtitle;
  if (elements.posterBackdropCaption) elements.posterBackdropCaption.textContent = hero.cityLabel || hero.universe;
  if (elements.dossierTitle) elements.dossierTitle.textContent = hero.name;
  if (elements.dossierSubtitle) elements.dossierSubtitle.textContent = hero.subtitle;
  if (elements.dossierStoryLeft) elements.dossierStoryLeft.textContent = hero.storyLeft;
  if (elements.dossierStoryRight) elements.dossierStoryRight.textContent = hero.storyRight;
  if (elements.dossierImage) {
    elements.dossierImage.src = hero.image;
    elements.dossierImage.alt = `${hero.name} cinematic poster`;
  }
  if (elements.dossierStats) {
    const metadata = [
      ["Universe", hero.universe],
      ["Base", hero.cityLabel]
    ].concat(Object.entries(hero.stats));

    elements.dossierStats.innerHTML = metadata
      .map(
        ([label, value]) => `
          <dt class="reveal">${label}</dt>
          <dd class="reveal">${value}</dd>
        `
      )
      .join("");
  }
  if (elements.dossierBadges) {
    elements.dossierBadges.innerHTML = hero.badges
      .map((badge) => `<span class="badge-pill">${badge}</span>`)
      .join("");
    observeRevealNodes(elements.dossierBadges);
  }
  if (elements.versionSelector) {
    elements.versionSelector.innerHTML = hero.versions
      .map(
        (version, index) => `
          <button class="version-btn${index === appState.selectedVersionIndex ? " active" : ""}" type="button" data-version="${index}" aria-pressed="${index === appState.selectedVersionIndex}">
            <span>${version.actor}</span>
            <small>${version.quote}</small>
          </button>
        `
      )
      .join("");
    elements.versionSelector.querySelectorAll("[data-version]").forEach((button) => {
      button.addEventListener("click", () => {
        appState.selectedVersionIndex = Number(button.dataset.version);
        saveSelection();
        renderDossier();
      });
    });
  }
  observeRevealNodes(elements.dossierStats);
}

function renderVillains(hero) {
  if (!elements.villainGrid) return;
  elements.villainGrid.innerHTML = hero.villains
    .map(
      (villain) => `
        <article class="villain-card reveal" tabindex="0">
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
      `
    )
    .join("");
  observeRevealNodes(elements.villainGrid);
}

function renderTimeline(hero) {
  if (!elements.timelineRail) return;
  elements.timelineRail.innerHTML = hero.timeline
    .map(
      (entry) => `
        <article class="timeline-card reveal">
          <time>${entry.year}</time>
          <h3>${entry.title}</h3>
          <p>${entry.text}</p>
        </article>
      `
    )
    .join("");
  observeRevealNodes(elements.timelineRail);
}

function renderTeamUp(hero) {
  if (!elements.teamupCard) return;
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
    </div>
  `;
}

function updateHeroSelection(heroId, { fromRoster = false } = {}) {
  if (!heroData[heroId]) return;
  appState.selectedHeroId = heroId;
  appState.selectedVersionIndex = 0;
  saveSelection();
  renderAppHeroExperience();
  if (elements.battleOpponent) {
    prepareBattle();
  }
  if (fromRoster && elements.heroDossier) {
    smoothScrollToElement(elements.heroDossier);
  }
}

function selectHero(heroId, options = {}) {
  updateHeroSelection(heroId, options);
}

function renderAppHeroExperience() {
  const hero = currentHero();
  buildUniverseSelector();
  renderRosterGrid();
  renderDossier();
  renderLore(hero);
  renderVillains(hero);
  renderTimeline(hero);
  renderTeamUp(hero);
  renderBattleHeroName();
  renderPicker();
  syncLoreSectionHeight();
}

function syncLoreSectionHeight() {
  if (!elements.loreSection) return;
  elements.loreSection.style.maxHeight = appState.loreExpanded ? `${elements.loreSection.scrollHeight}px` : "0px";
}

function initLoreToggle() {
  if (!elements.exploreLoreBtn) return;
  setLoreExpanded(false);
  elements.exploreLoreBtn.addEventListener("click", () => {
    const expanded = !appState.loreExpanded;
    setLoreExpanded(expanded);
    syncLoreSectionHeight();
    if (expanded) {
      requestAnimationFrame(() => {
        smoothScrollToElement(elements.loreSection);
      });
    }
  });
}

function renderBattleHeroName() {
  if (!elements.battleHeroName) return;
  const hero = currentHero();
  elements.battleHeroName.textContent = hero.name;
  if (elements.battleHeroImage) {
    elements.battleHeroImage.src = hero.image;
    elements.battleHeroImage.alt = hero.name;
  }
}

function buildBattleOpponents() {
  if (!elements.battleOpponent) return;
  const opponentIds = heroOrder.filter((id) => id !== appState.selectedHeroId);
  elements.battleOpponent.innerHTML = opponentIds
    .map((id) => `<option value="${id}">${heroData[id].name}</option>`)
    .join("");
  if (!opponentIds.length) return;
  if (!opponentIds.includes(elements.battleOpponent.value)) {
    elements.battleOpponent.value = opponentIds[0];
  }
}

function prepareBattle() {
  if (!elements.battleOpponent) return;
  buildBattleOpponents();
  const heroId = appState.selectedHeroId;
  const enemyId = elements.battleOpponent.value || heroOrder.find((id) => id !== heroId);
  appState.battle = {
    active: false,
    heroId,
    enemyId,
    heroHp: heroData[heroId].battle.hp,
    enemyHp: heroData[enemyId].battle.hp,
    heroGuarded: false,
    enemyGuarded: false,
    ended: false,
    heroScore: 0,
    enemyScore: 0,
    winnerId: null,
    reason: ""
  };
  renderBattleComparison();
}

function getBattleComparisonStats(hero) {
  return hero.comparison || {
    strength: 0,
    speed: 0,
    intelligence: 0,
    durability: 0,
    combat: 0,
    power: 0
  };
}

function getBattleReason(hero, enemy) {
  const heroStats = getBattleComparisonStats(hero);
  const enemyStats = getBattleComparisonStats(enemy);
  const advantages = Object.keys(heroStats)
    .map((stat) => ({
      stat,
      delta: heroStats[stat] - enemyStats[stat]
    }))
    .filter((entry) => entry.delta > 0)
    .sort((left, right) => right.delta - left.delta);
  if (!advantages.length) {
    return `${hero.name} and ${enemy.name} are evenly matched, but ${hero.name} edges it on consistency.`;
  }
  const labels = advantages.slice(0, 2).map((entry) => entry.stat);
  const formatted = labels
    .map((label) => label.charAt(0).toUpperCase() + label.slice(1))
    .join(" and ");
  return `${hero.name} leads on ${formatted}.`;
}

function renderBattleComparison() {
  if (!elements.battleStatus || !elements.battleResult || !elements.battleOpponent) return;
  const heroId = appState.selectedHeroId;
  const enemyId = elements.battleOpponent.value;
  const hero = heroData[heroId];
  const enemy = heroData[enemyId];
  if (!hero || !enemy) {
    elements.battleStatus.textContent = "Choose two valid heroes to compare.";
    elements.battleResult.innerHTML = "";
    return;
  }
  if (heroId === enemyId) {
    elements.battleStatus.textContent = "Pick two different heroes to compare.";
    elements.battleResult.innerHTML = "";
    return;
  }

  const heroStats = getBattleComparisonStats(hero);
  const enemyStats = getBattleComparisonStats(enemy);
  const heroScore = Object.values(heroStats).reduce((sum, value) => sum + value, 0);
  const enemyScore = Object.values(enemyStats).reduce((sum, value) => sum + value, 0);
  const winner = heroScore >= enemyScore ? hero : enemy;
  const loser = winner.id === hero.id ? enemy : hero;
  const reason = getBattleReason(winner, loser);
  appState.battle = {
    ...appState.battle,
    heroId,
    enemyId,
    heroScore,
    enemyScore,
    winnerId: winner.id,
    reason
  };

  elements.battleStatus.textContent = `${hero.name} vs ${enemy.name}`;
  if (elements.battleHeroName) elements.battleHeroName.textContent = hero.name;
  if (elements.battleEnemyName) elements.battleEnemyName.textContent = enemy.name;
  if (elements.battleHeroImage) {
    elements.battleHeroImage.src = hero.image;
    elements.battleHeroImage.alt = hero.name;
  }
  if (elements.battleEnemyImage) {
    elements.battleEnemyImage.src = enemy.image;
    elements.battleEnemyImage.alt = enemy.name;
  }
  if (elements.battleHeroHealth) {
    elements.battleHeroHealth.style.width = `${Math.max(10, (heroScore / Math.max(heroScore, enemyScore)) * 100)}%`;
  }
  if (elements.battleEnemyHealth) {
    elements.battleEnemyHealth.style.width = `${Math.max(10, (enemyScore / Math.max(heroScore, enemyScore)) * 100)}%`;
  }

  if (elements.battleResult) {
    const heroWinnerClass = winner.id === hero.id ? " winner-panel" : "";
    const enemyWinnerClass = winner.id === enemy.id ? " winner-panel" : "";
    const heroRows = Object.entries(heroStats)
      .map(([stat, value]) => `<div class="comparison-row"><span>${stat.toUpperCase()}</span><strong>${value}</strong></div>`)
      .join("");
    const enemyRows = Object.entries(enemyStats)
      .map(([stat, value]) => `<div class="comparison-row"><span>${stat.toUpperCase()}</span><strong>${value}</strong></div>`)
      .join("");
    elements.battleResult.innerHTML = `
      <article class="battle-result-card reveal visible">
        <div class="battle-result-head">
          <p class="eyebrow">Winner</p>
          <span class="badge-pill">${winner.name}</span>
        </div>
        <h3>${winner.name}</h3>
        <p class="battle-reason">${reason}</p>
        <div class="battle-scoreline">
          <div>
            <span>${hero.name}</span>
            <strong>${heroScore}</strong>
          </div>
          <div>
            <span>${enemy.name}</span>
            <strong>${enemyScore}</strong>
          </div>
        </div>
        <div class="battle-comparison-grid">
          <div class="battle-compare-panel${heroWinnerClass}">
            <p class="eyebrow">${hero.name}</p>
            ${heroRows}
          </div>
          <div class="battle-compare-panel${enemyWinnerClass}">
            <p class="eyebrow">${enemy.name}</p>
            ${enemyRows}
          </div>
        </div>
      </article>
    `;
    observeRevealNodes(elements.battleResult);
  }

  if (elements.battleLog) {
    elements.battleLog.innerHTML = `
      <p>${winner.name} wins by overall battlefield score.</p>
      <p>${reason}</p>
    `;
  }
}

function enemyTurn() {
  const state = appState.battle;
  const enemy = heroData[state.enemyId];
  const roll = Math.random();
  state.enemyGuarded = false;
  if (roll < 0.3) {
    state.enemyGuarded = true;
    logBattle(`${enemy.name} ${enemy.battle.moves.guard}.`);
  } else {
    const special = roll > 0.8;
    const damage = Math.floor((special ? enemy.battle.special : enemy.battle.attack) * (state.heroGuarded ? 0.6 : 1));
    state.heroHp = Math.max(0, state.heroHp - damage);
    state.heroGuarded = false;
    logBattle(`${enemy.name} ${enemy.battle.moves[special ? "special" : "attack"]} for ${damage}.`);
  }
  if (state.heroHp <= 0) {
    state.ended = true;
    renderBattleState(`${enemy.name} wins the showdown.`);
    return;
  }
  renderBattleState("Your turn.");
}

function performHeroAction(type) {
  const state = appState.battle;
  if (!state.active || state.ended) return;
  const hero = heroData[state.heroId];
  state.heroGuarded = false;
  if (type === "guard") {
    state.heroGuarded = true;
    logBattle(`${hero.name} ${hero.battle.moves.guard}.`);
  } else {
    const damageBase = type === "special" ? hero.battle.special : hero.battle.attack;
    const damage = Math.floor(damageBase * (state.enemyGuarded ? 0.6 : 1));
    state.enemyHp = Math.max(0, state.enemyHp - damage);
    state.enemyGuarded = false;
    logBattle(`${hero.name} ${hero.battle.moves[type]} for ${damage}.`);
  }
  if (state.enemyHp <= 0) {
    state.ended = true;
    renderBattleState(`${hero.name} wins the showdown.`);
    return;
  }
  enemyTurn();
}

function initBattleEvents() {
  const startButton = document.getElementById("battleStart");
  if (startButton) {
    startButton.addEventListener("click", renderBattleComparison);
  }
  ["Attack", "Special", "Guard"].forEach((type) => {
    const button = document.getElementById(`action${type}`);
    if (button) {
      button.addEventListener("click", () => {
        if (type === "Attack") {
          renderBattleComparison();
        } else if (type === "Special") {
          if (!elements.battleOpponent) return;
          const options = Array.from(elements.battleOpponent.options).map((option) => option.value);
          if (!options.length) return;
          const randomOpponent = options[Math.floor(Math.random() * options.length)];
          elements.battleOpponent.value = randomOpponent;
          renderBattleComparison();
        } else {
          prepareBattle();
        }
      });
    }
  });
  if (elements.battleOpponent) {
    elements.battleOpponent.addEventListener("change", renderBattleComparison);
  }
}

function getQuizLeader() {
  const entries = Object.entries(appState.quiz.traits);
  if (!entries.length) return heroData[appState.selectedHeroId];
  let bestHero = heroData[appState.selectedHeroId];
  let bestScore = -Infinity;
  heroOrder.forEach((heroId) => {
    const hero = heroData[heroId];
    const score = Object.entries(hero.quizAffinity).reduce((total, [trait, weight]) => total + (appState.quiz.traits[trait] || 0) * weight, 0);
    if (score > bestScore) {
      bestScore = score;
      bestHero = hero;
    }
  });
  return bestHero;
}

function renderQuizTraits() {
  if (!elements.quizTraitBars) return;
  const traits = ["leader", "scholar", "rebel", "heart", "speedster", "mystic", "feral"];
  const max = Math.max(1, ...traits.map((trait) => appState.quiz.traits[trait] || 0));
  elements.quizTraitBars.innerHTML = traits
    .map((trait) => {
      const value = appState.quiz.traits[trait] || 0;
      const percent = Math.max(8, (value / max) * 100);
      return `
        <div class="trait-row">
          <div class="trait-row-head">
            <strong>${trait.toUpperCase()}</strong>
            <span>${value}</span>
          </div>
          <div class="meter"><span style="width:${percent}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderQuizStage() {
  if (!elements.quizCard) return;
  if (elements.quizScore) {
    elements.quizScore.textContent = String(appState.quiz.score);
  }
  if (appState.quiz.complete) {
    const resultHero = heroData[appState.quiz.resultId];
    const runnerUp = heroOrder
      .filter((heroId) => heroId !== resultHero.id)
      .map((heroId) => {
        const hero = heroData[heroId];
        const score = Object.entries(hero.quizAffinity).reduce((total, [trait, weight]) => total + (appState.quiz.traits[trait] || 0) * weight, 0);
        return score;
      })
      .sort((a, b) => b - a)[0] || 0;
    const resultScore = Object.entries(resultHero.quizAffinity).reduce((total, [trait, weight]) => total + (appState.quiz.traits[trait] || 0) * weight, 0);
    const percentage = Math.max(68, Math.min(99, Math.round((resultScore / (resultScore + runnerUp * 0.45 + 1)) * 100)));
    const heroStats = [
      ["Leadership", resultHero.quizAffinity.leader || 0],
      ["Intellect", resultHero.quizAffinity.scholar || 0],
      ["Heart", resultHero.quizAffinity.heart || 0],
      ["Momentum", resultHero.quizAffinity.speedster || 0],
      ["Edge", (resultHero.quizAffinity.rebel || 0) + (resultHero.quizAffinity.feral || 0)]
    ];
    elements.quizCard.innerHTML = `
      <article class="result-card reveal">
        <div class="result-topline">
          <p class="eyebrow">Match complete</p>
          <span class="badge-pill">${resultHero.universe}</span>
        </div>
        <div class="result-hero-name">
          <h4>You are ${percentage}% ${resultHero.name}</h4>
          <p class="result-hero-subtitle">${heroSummary(resultHero)}</p>
        </div>
        <div class="result-score-ring">
          <strong>${percentage}%</strong>
          <span>hero match</span>
        </div>
        <div class="result-hero-meta">
          <span class="badge-pill">${heroTag(resultHero)}</span>
          <span class="badge-pill">${runnerUp ? `Closest rival score ${runnerUp}` : "No close runner-up"}</span>
          <span class="badge-pill">Scan score ${appState.quiz.score}</span>
        </div>
        <div class="result-stats">
          ${heroStats
            .map(
              ([label, value]) => `
                <div class="trait-row">
                  <div class="trait-row-head">
                    <strong>${label}</strong>
                    <span>${value}</span>
                  </div>
                  <div class="meter"><span style="width:${Math.max(12, value * 20)}%"></span></div>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="result-actions">
          <button class="button button-secondary" type="button" id="quizRestart">Try Again</button>
        </div>
      </article>
    `;
    const restart = document.getElementById("quizRestart");
    if (restart) restart.addEventListener("click", resetQuiz);
    if (elements.quizFeedback) elements.quizFeedback.textContent = `Your dominant match is ${resultHero.name}.`;
    if (elements.quizProgress) {
      elements.quizProgress.querySelector("span").style.width = "100%";
    }
    if (elements.quizStage) {
      elements.quizStage.textContent = "Match complete";
    }
    observeRevealNodes(elements.quizCard);
    return;
  }

  const question = quizQuestions[appState.quiz.index];
  const progress = ((appState.quiz.index) / quizQuestions.length) * 100;
  if (elements.quizProgress) {
    elements.quizProgress.querySelector("span").style.width = `${progress}%`;
  }
  if (elements.quizStage) {
    elements.quizStage.textContent = `Question ${appState.quiz.index + 1} of ${quizQuestions.length}`;
  }
  elements.quizCard.innerHTML = `
    <article class="question-card reveal">
      <p class="eyebrow">Personality scan</p>
      <h4>${question.prompt}</h4>
      <div class="option-list" id="quizOptions"></div>
    </article>
  `;
  const container = document.getElementById("quizOptions");
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "button button-secondary option-button";
    button.type = "button";
    button.textContent = answer.label;
    button.addEventListener("click", () => handleQuizAnswer(index));
    container.appendChild(button);
  });
  observeRevealNodes(elements.quizCard);
}

function updateQuizFeedback() {
  const leader = getQuizLeader();
  if (elements.quizFeedback) {
    const traits = Object.entries(appState.quiz.traits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([trait]) => trait)
      .filter(Boolean);
    const traitLine = traits.length ? `Your strongest signals are ${traits.join(" and ")}.` : "The match is still forming.";
    elements.quizFeedback.textContent = `${traitLine} Current lead: ${leader.name}.`;
  }
  renderQuizTraits();
}

function scoreQuizAnswer(weights) {
  const answerScore = Object.values(weights).reduce((total, value) => total + value, 0);
  appState.quiz.score += answerScore;
  Object.entries(weights).forEach(([trait, value]) => {
    appState.quiz.traits[trait] = (appState.quiz.traits[trait] || 0) + value;
  });
  updateQuizFeedback();
  appState.quiz.index += 1;
  if (appState.quiz.index >= quizQuestions.length) {
    appState.quiz.complete = true;
    appState.quiz.resultId = getQuizLeader().id;
  }
  renderQuizStage();
}

function handleQuizAnswer(answerIndex) {
  const question = quizQuestions[appState.quiz.index];
  const answer = question.answers[answerIndex];
  if (elements.quizCard) {
    const buttons = elements.quizCard.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === answerIndex) button.classList.add("picked");
    });
  }
  if (elements.quizFeedback) {
    elements.quizFeedback.textContent = `Selected: ${answer.label}. ${getQuizLeader().name} is starting to pull ahead.`;
  }
  setTimeout(() => scoreQuizAnswer(answer.weights), prefersReducedMotion ? 0 : 450);
}

function resetQuiz() {
  appState.quiz = { index: 0, traits: {}, score: 0, complete: false, resultId: null, feedback: "" };
  renderQuizTraits();
  renderQuizStage();
  updateQuizFeedback();
}

function buildTriviaDeck() {
  const deck = triviaDecks[appState.trivia.difficulty] || triviaDecks.medium;
  appState.trivia.deck = deck.map((entry) => ({ ...entry }));
  appState.trivia.index = 0;
  appState.trivia.score = 0;
  appState.trivia.streak = 0;
  appState.trivia.answered = 0;
  appState.trivia.correct = 0;
  appState.trivia.complete = false;
  appState.trivia.locked = false;
  appState.trivia.message = "The challenge is live.";
  const baseSeconds = appState.trivia.difficulty === "easy" ? 18 : appState.trivia.difficulty === "hard" ? 10 : 14;
  appState.trivia.timerSeconds = baseSeconds;
}

function renderTriviaHud() {
  if (elements.triviaScore) elements.triviaScore.textContent = String(appState.trivia.score);
  if (elements.triviaStreak) elements.triviaStreak.textContent = String(appState.trivia.streak);
  if (elements.triviaDifficulty) elements.triviaDifficulty.textContent = appState.trivia.difficulty.toUpperCase();
  if (elements.triviaTimer) elements.triviaTimer.textContent = `${appState.trivia.timerSeconds}s`;
  if (elements.triviaAccuracy) {
    const accuracy = appState.trivia.answered === 0 ? 0 : Math.round((appState.trivia.correct / appState.trivia.answered) * 100);
    elements.triviaAccuracy.textContent = `${accuracy}%`;
  }
  if (elements.triviaProgress) {
    const total = Math.max(1, appState.trivia.deck.length);
    elements.triviaProgress.querySelector("span").style.width = `${(appState.trivia.index / total) * 100}%`;
  }
  if (elements.triviaStage) {
    elements.triviaStage.textContent = `Question ${Math.min(appState.trivia.index + 1, appState.trivia.deck.length)} of ${appState.trivia.deck.length}`;
  }
}

function stopTriviaTimer() {
  if (appState.trivia.timerId) {
    clearInterval(appState.trivia.timerId);
    appState.trivia.timerId = null;
  }
}

function startTriviaTimer() {
  stopTriviaTimer();
  appState.trivia.timerId = setInterval(() => {
    if (appState.trivia.complete || appState.trivia.locked) return;
    appState.trivia.timerSeconds -= 1;
    if (appState.trivia.timerSeconds <= 0) {
      handleTriviaAnswer(-1, true);
    } else {
      renderTriviaHud();
    }
  }, 1000);
}

function renderTriviaCard(feedback = "") {
  if (!elements.triviaCard) return;
  if (elements.triviaDifficulty) elements.triviaDifficulty.textContent = appState.trivia.difficulty.toUpperCase();
  if (appState.trivia.complete) {
    const totalPoints = appState.trivia.score;
    elements.triviaCard.innerHTML = `
      <article class="result-card reveal">
        <p class="eyebrow">Challenge complete</p>
        <h4>${totalPoints} points earned</h4>
        <p>Your final streak peaked at ${Math.max(appState.trivia.streak, 0)} and the difficulty was ${appState.trivia.difficulty.toUpperCase()}.</p>
        <div class="result-hero-meta">
          <span class="badge-pill">${appState.trivia.difficulty.toUpperCase()}</span>
          <span class="badge-pill">${appState.trivia.streak} streak</span>
          <span class="badge-pill">${Math.round((appState.trivia.correct / Math.max(1, appState.trivia.answered)) * 100)}% accuracy</span>
        </div>
        <button class="button button-secondary" type="button" id="triviaRestart">Play Again</button>
      </article>
    `;
    const restart = document.getElementById("triviaRestart");
    if (restart) restart.addEventListener("click", resetTrivia);
    if (elements.triviaDifficulty) elements.triviaDifficulty.textContent = appState.trivia.difficulty.toUpperCase();
    renderTriviaHud();
    observeRevealNodes(elements.triviaCard);
    return;
  }

  const current = appState.trivia.deck[appState.trivia.index];
  elements.triviaCard.innerHTML = `
    <article class="question-card trivia-question reveal">
      <p class="eyebrow">${appState.trivia.difficulty} challenge</p>
      <h4>${current.question}</h4>
      <div class="option-list" id="triviaOptions"></div>
      <p class="trivia-feedback ${feedback ? "visible" : ""}">${feedback || current.explanation || ""}</p>
    </article>
  `;
  const container = document.getElementById("triviaOptions");
  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "button button-secondary option-button trivia-option";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => handleTriviaAnswer(index, false));
    container.appendChild(button);
  });
  renderTriviaHud();
  startTriviaTimer();
  observeRevealNodes(elements.triviaCard);
}

function advanceTrivia(feedback) {
  stopTriviaTimer();
  appState.trivia.index += 1;
  if (appState.trivia.index >= appState.trivia.deck.length) {
    appState.trivia.complete = true;
    appState.trivia.message = feedback;
    renderTriviaCard(feedback);
    return;
  }
  appState.trivia.locked = false;
  const baseSeconds = appState.trivia.difficulty === "easy" ? 18 : appState.trivia.difficulty === "hard" ? 10 : 14;
  appState.trivia.timerSeconds = baseSeconds;
  renderTriviaCard(feedback);
}

function handleTriviaAnswer(answerIndex, timedOut) {
  if (appState.trivia.locked || appState.trivia.complete) return;
  appState.trivia.locked = true;
  stopTriviaTimer();
  const current = appState.trivia.deck[appState.trivia.index];
  const correct = answerIndex === current.answer;
  appState.trivia.answered += 1;
  const points = appState.trivia.difficulty === "easy" ? 1 : appState.trivia.difficulty === "hard" ? 3 : 2;
  if (correct) {
    appState.trivia.score += points;
    appState.trivia.streak += 1;
    appState.trivia.correct += 1;
  } else {
    appState.trivia.streak = 0;
  }

  if (elements.triviaCard) {
    const buttons = elements.triviaCard.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === answerIndex) button.classList.add(timedOut ? "timed-out" : correct ? "correct" : "wrong");
      if (index === current.answer) button.classList.add("correct");
    });
  }

  if (elements.triviaScore) elements.triviaScore.textContent = String(appState.trivia.score);
  if (elements.triviaStreak) elements.triviaStreak.textContent = String(appState.trivia.streak);
  if (elements.triviaTimer) elements.triviaTimer.textContent = "0s";
  if (elements.triviaAccuracy) {
    elements.triviaAccuracy.textContent = `${Math.round((appState.trivia.correct / appState.trivia.answered) * 100)}%`;
  }

  const message = timedOut
    ? `Time expired. ${current.explanation}`
    : correct
      ? `Correct. ${current.explanation}`
      : `Not quite. ${current.explanation}`;

  appState.trivia.message = message;
  const feedback = elements.triviaCard ? elements.triviaCard.querySelector(".trivia-feedback") : null;
  if (feedback) {
    feedback.textContent = message;
    feedback.classList.add("visible");
  }

  setTimeout(() => advanceTrivia(message), prefersReducedMotion ? 0 : 900);
}

function resetTrivia() {
  stopTriviaTimer();
  buildTriviaDeck();
  renderTriviaHud();
  renderTriviaCard();
}

function buildTriviaDifficultyButtons() {
  if (!elements.triviaDifficultyButtons) return;
  const options = [
    { key: "easy", label: "Easy" },
    { key: "medium", label: "Medium" },
    { key: "hard", label: "Hard" }
  ];
  elements.triviaDifficultyButtons.innerHTML = options
    .map(
      (option) => `
        <button class="difficulty-chip${appState.trivia.difficulty === option.key ? " active" : ""}" type="button" data-difficulty="${option.key}">
          ${option.label}
        </button>
      `
    )
    .join("");
  elements.triviaDifficultyButtons.querySelectorAll("[data-difficulty]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.trivia.difficulty = button.dataset.difficulty;
      buildTriviaDifficultyButtons();
      resetTrivia();
    });
  });
  if (elements.triviaDifficulty) elements.triviaDifficulty.textContent = appState.trivia.difficulty.toUpperCase();
}

function renderPicker() {
  if (!elements.heroPicker) return;
  elements.heroPicker.innerHTML = heroOrder
    .map(
      (id) => `
        <button class="hero-picker-btn${appState.selectedHeroId === id ? " active" : ""}" type="button" data-picker-hero="${id}" aria-selected="${appState.selectedHeroId === id}">
          <strong>${heroData[id].name}</strong>
          <span>${heroData[id].universe}</span>
        </button>
      `
    )
    .join("");
  elements.heroPicker.querySelectorAll("[data-picker-hero]").forEach((button) => {
    button.addEventListener("click", () => updateHeroSelection(button.dataset.pickerHero));
  });
  if (elements.pickerNote) {
    elements.pickerNote.textContent = `Your selected hero is ${currentHero().name}. The choice stays with you across pages.`;
  }
}

async function fetchVotes() {
  if (!elements.voteMessage) return;
  try {
    const response = await fetch("/api/votes");
    const data = await response.json();
    appState.vote.board = data.board || [];
    appState.vote.total = data.totalVotes || 0;
    if (appState.vote.lockedHeroId) {
      appState.vote.message = `Vote locked for ${heroData[appState.vote.lockedHeroId] ? heroData[appState.vote.lockedHeroId].name : "a hero"}.`;
    } else {
      appState.vote.message = "Live vote board connected.";
    }
    renderVoteBoard();
  } catch (_error) {
    appState.vote.message = "Vote board is offline right now.";
    renderVoteBoard();
  }
}

async function submitVote(heroId) {
  if (!heroData[heroId]) {
    appState.vote.message = "Invalid hero selection.";
    renderVoteBoard();
    return;
  }
  if (appState.vote.lockedHeroId) {
    appState.vote.message = `You already voted for ${heroData[appState.vote.lockedHeroId] ? heroData[appState.vote.lockedHeroId].name : "a hero"} on this browser.`;
    renderVoteBoard();
    return;
  }
  try {
    const response = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ heroId })
    });
    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      appState.vote.message = errorPayload.error || "That vote could not be saved.";
      renderVoteBoard();
      return;
    }
    const data = await response.json();
    appState.vote.board = data.board || [];
    appState.vote.total = data.totalVotes || 0;
    appState.vote.message = `Vote recorded for ${heroData[heroId] ? heroData[heroId].name : heroId}.`;
    saveVoteLock(heroId);
    renderVoteBoard();
  } catch (_error) {
    appState.vote.message = "That vote could not be saved.";
    renderVoteBoard();
  }
}

function renderVoteBoard() {
  if (!elements.voteButtons) return;
  const votingEntries = appState.vote.board.length
    ? appState.vote.board
    : fallbackVoteEntries;
  const leaderId = appState.vote.board.length ? appState.vote.board[0].id : null;
  elements.voteButtons.innerHTML = votingEntries
    .map(
      (entry) => {
        const hero = heroData[entry.id];
        const label = entry.label || (hero ? hero.name : entry.id);
        const tag = hero ? heroTag(hero) : label;
        const selected = appState.vote.lockedHeroId === entry.id;
        return `
        <button class="vote-choice${selected ? " selected" : ""}" type="button" data-vote="${entry.id}" aria-pressed="${selected}" ${appState.vote.lockedHeroId ? "disabled" : ""}>
          <span class="vote-choice-name">${label}</span>
          <span class="vote-choice-tag">${tag}</span>
        </button>
      `;
      }
    )
    .join("");
  elements.voteButtons.querySelectorAll("[data-vote]").forEach((button) => {
    button.addEventListener("click", () => submitVote(button.dataset.vote));
  });

  if (elements.voteBoard) {
    elements.voteBoard.innerHTML = appState.vote.board
      .map(
        (entry) => `
          <div class="leader-row${entry.id === leaderId ? " winner" : ""}">
            <div class="leader-row-head">
              <strong>${entry.label}</strong>
              <span>${entry.votes} votes (${entry.percent}%)</span>
            </div>
            <div class="leader-meter"><span style="width:${Math.min(100, (entry.votes / Math.max(1, appState.vote.total)) * 100)}%"></span></div>
          </div>
        `
      )
      .join("");
  }
  if (elements.voteTotal) {
    elements.voteTotal.textContent = `${appState.vote.total} total votes`;
  }
  if (elements.voteMessage) {
    elements.voteMessage.textContent = appState.vote.message;
  }
}

function initRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
}

function initQuiz() {
  if (!elements.quizCard) return;
  resetQuiz();
}

function initTrivia() {
  if (!elements.triviaCard) return;
  buildTriviaDifficultyButtons();
  resetTrivia();
}

function initVotes() {
  if (!elements.voteButtons) return;
  restoreVoteLock();
  fetchVotes();
}

function initFeaturePagePicker() {
  if (!elements.heroPicker) return;
  renderPicker();
}

function init() {
  cacheElements();
  restoreSelection();
  buildSharedNav();
  refreshLayoutOffset();
  initRevealObserver();
  renderAppHeroExperience();
  initLoreToggle();
  initFeaturePagePicker();
  if (elements.battleOpponent) {
    prepareBattle();
    initBattleEvents();
  }
  if (elements.quizCard) {
    initQuiz();
  }
  if (elements.triviaCard) {
    initTrivia();
  }
  if (elements.voteButtons) {
    initVotes();
  }
  window.addEventListener("resize", refreshLayoutOffset);
  window.addEventListener("resize", syncLoreSectionHeight);
}

window.submitVote = submitVote;
window.addEventListener("load", refreshLayoutOffset);
init();
