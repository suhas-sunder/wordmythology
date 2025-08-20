import * as React from "react";
import type { Route } from "./+types/home";

/* =========================================
   SEO
========================================= */
export function meta({}: Route.MetaArgs) {
  const title = "Word Mythology - Mythology Word Game";
  const description =
    "Play a mythology themed word game. Guess Greek myth words by description, quote, or category. Daily puzzle, on-screen keyboard, and per-letter tiles.";
  const url = "https://wordmythology.com/";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#0b132b" },
  ];
}

/* =========================================
   Loader
========================================= */
export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS ?? "welcome" };
}

/* =========================================
   Types
========================================= */
type MythEntry = {
  word: string; // canonical answer, uppercase no spaces
  category:
    | "Deity"
    | "Hero"
    | "Monster"
    | "Place"
    | "Artifact"
    | "Concept"
    | "Titan"
    | "Nymph"
    | "Group"
    | "Mortal"
    | "Primordial"
    | "Creature";
  hint: string;
  description: string;
  altSpellings?: string[];

  // Quote mode (optional)
  quoteText?: string; // text shown to the player
  quoteType?: "missing" | "author"; // fill the blank or guess speaker
  quoteAnswer?: string; // answer for quote mode, defaults to word if missing
  quoteAccepted?: string[]; // extra variants for quote mode
};

type Mode = "Description" | "Quote" | "Category";

/* =========================================
   Data
   Words must be uppercase without spaces
========================================= */
const MYTH_WORDS: MythEntry[] = [
  {
    word: "ZEUS",
    category: "Deity",
    hint: "King of the Olympians",
    description: "Sky and thunder, bearer of the thunderbolt.",
    quoteText: `"Let men know the will of the gods when the thunder speaks." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "ZEUS",
    quoteAccepted: ["ZEUS"],
  },
  {
    word: "HERA",
    category: "Deity",
    hint: "Queen of the gods",
    description: "Marriage and women, symbolized by the peacock.",
  },
  {
    word: "POSEIDON",
    category: "Deity",
    hint: "Earth shaker",
    description: "Lord of the sea and earthquakes, wielder of the trident.",
    quoteText: `"I stir the deeps and split the cliffs." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "POSEIDON",
  },
  {
    word: "ATHENA",
    category: "Deity",
    hint: "Wisdom and strategy",
    description: "Born fully armed, patron of Athens and the owl.",
    quoteText: `"Counsel well given guards better than any shield." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "ATHENA",
    quoteAccepted: ["ATHENA", "PALLAS", "PALLASATHENA"],
  },
  {
    word: "APOLLO",
    category: "Deity",
    hint: "Lyre and light",
    description: "Music, prophecy, archery, and healing.",
  },
  {
    word: "ARTEMIS",
    category: "Deity",
    hint: "Hunt and moon",
    description: "Protector of wildlife and twin of Apollo.",
  },
  {
    word: "ARES",
    category: "Deity",
    hint: "Frenzy of battle",
    description: "Embodiment of war and bloodlust.",
  },
  {
    word: "APHRODITE",
    category: "Deity",
    hint: "Born from sea foam",
    description: "Love and beauty, source of many entanglements.",
  },
  {
    word: "HERMES",
    category: "Deity",
    hint: "Winged sandals",
    description: "Messenger, boundaries, thieves, and trade.",
    quoteText: `"Travel swift, deal fair, and mind the border stones." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "HERMES",
  },
  {
    word: "HEPHAESTUS",
    category: "Deity",
    hint: "Divine smith",
    description: "Forge, fire, and craft.",
  },
  {
    word: "HADES",
    category: "Deity",
    hint: "Underworld ruler",
    description: "Guardian of hidden wealth below the earth.",
    altSpellings: ["PLUTO"],
  },
  {
    word: "PERSEPHONE",
    category: "Deity",
    hint: "Queen below",
    description: "Daughter of Demeter, split between seasons.",
  },
  {
    word: "HERACLES",
    category: "Hero",
    hint: "Twelve labors",
    description: "Strength and endurance across impossible tasks.",
    altSpellings: ["HERCULES"],
  },
  {
    word: "ACHILLES",
    category: "Hero",
    hint: "Heel of fate",
    description: "Peerless warrior of the Trojan War.",
    quoteText: `"There is nothing alive more agonized than man." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "HOMER",
  },
  {
    word: "ODYSSEUS",
    category: "Hero",
    hint: "Cunning voyager",
    description: "Inventor of the Trojan Horse, long journey home.",
    quoteText: `"My name is ______," he told the Cyclops.`,
    quoteType: "missing",
    quoteAnswer: "NOBODY",
    quoteAccepted: ["NOBODY", "NOONE", "NO-ONE"],
  },
  {
    word: "PERSEUS",
    category: "Hero",
    hint: "Gorgon slayer",
    description: "Beheaded Medusa with aid from the gods.",
  },
  {
    word: "THESEUS",
    category: "Hero",
    hint: "Labyrinth victor",
    description: "Defeated the Minotaur in Crete.",
  },
  {
    word: "MEDEA",
    category: "Mortal",
    hint: "Sorceress of Colchis",
    description: "Aided Jason, later a tragic figure with deep power.",
  },
  {
    word: "JASON",
    category: "Hero",
    hint: "Golden Fleece",
    description: "Leader of the Argonauts.",
  },
  {
    word: "PROMETHEUS",
    category: "Titan",
    hint: "Fire bringer",
    description: "Gave fire to humans and paid a bitter price.",
    quoteText: `"I gave them fire and taught them number and craft." - guess the speaker`,
    quoteType: "author",
    quoteAnswer: "PROMETHEUS",
  },
  {
    word: "KRONOS",
    category: "Titan",
    hint: "Sickle bearer",
    description: "Father of Zeus and leader of the Titans.",
    altSpellings: ["CRONUS"],
  },
  {
    word: "GAIA",
    category: "Primordial",
    hint: "Earth herself",
    description: "Ancient mother of many divine lines.",
  },
  {
    word: "NYX",
    category: "Primordial",
    hint: "Night personified",
    description: "Power older than Olympian order.",
  },
  {
    word: "OLYMPUS",
    category: "Place",
    hint: "Seat of the gods",
    description: "Mythic mountain of the Olympians.",
  },
  {
    word: "TARTARUS",
    category: "Place",
    hint: "Abyssal prison",
    description: "Deep pit where foes are confined.",
  },
  {
    word: "ELYSIUM",
    category: "Place",
    hint: "Blessed fields",
    description: "Paradise for the favored dead.",
    quoteText: `"The blessed rest in ______, far from grief and toil."`,
    quoteType: "missing",
    quoteAnswer: "ELYSIUM",
  },
  {
    word: "STYX",
    category: "Place",
    hint: "Oath bound river",
    description: "Vows sworn upon it cannot be broken.",
  },
  {
    word: "LETHE",
    category: "Place",
    hint: "River of forgetting",
    description: "Those who drink lose memory.",
  },
  {
    word: "MINOTAUR",
    category: "Monster",
    hint: "Bull of the maze",
    description: "Half man half bull within the Labyrinth.",
  },
  {
    word: "MEDUSA",
    category: "Monster",
    hint: "Gaze of stone",
    description: "One of the Gorgons, serpents for hair.",
  },
  {
    word: "CYCLOPS",
    category: "Monster",
    hint: "One eyed giants",
    description: "Makers of thunderbolts in some traditions.",
  },
  {
    word: "CHIMERA",
    category: "Monster",
    hint: "Lion goat serpent",
    description: "Fire breathing hybrid called Chimaera.",
  },
  {
    word: "CERBERUS",
    category: "Monster",
    hint: "Hound of Hades",
    description: "Three headed guardian at the gates.",
  },
  {
    word: "SIREN",
    category: "Monster",
    hint: "Songs that lure",
    description: "Voices that wreck ships and will.",
  },
  {
    word: "PEGASUS",
    category: "Creature",
    hint: "Winged horse",
    description: "Sprang from the blood of Medusa.",
  },
  {
    word: "LABYRINTH",
    category: "Artifact",
    hint: "Cretan maze",
    description: "Winding halls that confound the lost.",
  },
  {
    word: "AEGIS",
    category: "Artifact",
    hint: "Shield of terror",
    description: "Protective emblem of Zeus and Athena.",
  },
  {
    word: "CADUCEUS",
    category: "Artifact",
    hint: "Twined serpents",
    description: "Herald staff of Hermes.",
  },
  {
    word: "AMBROSIA",
    category: "Concept",
    hint: "Food of the gods",
    description: "Conveys longevity in many tellings.",
  },
  {
    word: "NECTAR",
    category: "Concept",
    hint: "Drink of the gods",
    description: "Served among the immortals.",
  },
];

/* =========================================
   Helpers
========================================= */
const LETTER_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const MAX_ATTEMPTS = 6;

function normalize(s: string) {
  return s.replace(/\s+/g, "").toUpperCase();
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomEntry(filter?: (e: MythEntry) => boolean): MythEntry {
  const pool = filter ? MYTH_WORDS.filter(filter) : MYTH_WORDS;
  return pickRandom(pool.length ? pool : MYTH_WORDS);
}

type LetterStatus = "correct" | "present" | "absent";
function scoreGuess(guess: string, answer: string): LetterStatus[] {
  const g = guess.split("");
  const a = answer.split("");
  const res: LetterStatus[] = Array(g.length).fill("absent");

  const counts: Record<string, number> = {};
  a.forEach((ch) => {
    counts[ch] = (counts[ch] || 0) + 1;
  });

  // correct
  for (let i = 0; i < g.length; i++) {
    if (g[i] === a[i]) {
      res[i] = "correct";
      counts[g[i]] -= 1;
    }
  }
  // present
  for (let i = 0; i < g.length; i++) {
    if (res[i] !== "correct" && counts[g[i]] > 0) {
      res[i] = "present";
      counts[g[i]] -= 1;
    }
  }
  return res;
}

/* =========================================
   Game Component: per letter tiles + keyboard
========================================= */
function MythGame() {
  const [mode, setMode] = React.useState<Mode>("Description");

  // Start with a RANDOM description entry on first load
  const [entry, setEntry] = React.useState<MythEntry>(() => pickRandomEntry());

  const [rows, setRows] = React.useState<string[]>([]);
  const [rowScores, setRowScores] = React.useState<LetterStatus[][]>([]);
  const [attempt, setAttempt] = React.useState<string>("");
  const [status, setStatus] = React.useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [lettersMap, setLettersMap] = React.useState<
    Record<string, LetterStatus>
  >({});

  // When switching modes, automatically load a random entry suitable for that mode
  React.useEffect(() => {
    if (mode === "Quote") {
      setEntry(
        pickRandomEntry(
          (e) =>
            !!e.quoteText &&
            (e.quoteType === "missing" || e.quoteType === "author")
        )
      );
    } else {
      setEntry(pickRandomEntry());
    }
  }, [mode]);

  // Answer switches by mode when quote fields exist
  const answerForMode = React.useMemo(() => {
    if (
      mode === "Quote" &&
      (entry.quoteType === "missing" || entry.quoteType === "author")
    ) {
      return normalize(entry.quoteAnswer || entry.word);
    }
    return entry.word;
  }, [mode, entry]);

  const acceptedSet = React.useMemo(() => {
    if (
      mode === "Quote" &&
      (entry.quoteType === "missing" || entry.quoteType === "author")
    ) {
      const base = [answerForMode, ...(entry.quoteAccepted ?? [])];
      return new Set(base.map(normalize));
    }
    const base = [entry.word, ...(entry.altSpellings ?? [])];
    return new Set(base.map(normalize));
  }, [mode, entry, answerForMode]);

  // Reset when entry or mode changes
  React.useEffect(() => {
    setRows([]);
    setRowScores([]);
    setAttempt("");
    setStatus("playing");
    setLettersMap({});
  }, [entry, mode]);

  const answerLen = answerForMode.length;

  const prompt =
    mode === "Quote"
      ? entry.quoteText || entry.description
      : mode === "Description"
        ? entry.description
        : `Category: ${entry.category}. Hint: ${entry.hint}`;

  function handleKey(k: string) {
    if (status !== "playing") return;
    if (k === "BACKSPACE") {
      setAttempt((p) => p.slice(0, -1));
      return;
    }
    if (k === "ENTER") {
      if (attempt.length !== answerLen) return;
      submitAttempt();
      return;
    }
    if (/^[A-Z]$/.test(k)) {
      setAttempt((p) => (p.length < answerLen ? p + k : p));
    }
  }

  function submitAttempt() {
    const normalized = normalize(attempt);
    const scored = scoreGuess(normalized, answerForMode);

    setRows((r) => [...r, attempt]);
    setRowScores((s) => [...s, scored]);

    // keyboard coloring
    setLettersMap((prev) => {
      const copy = { ...prev };
      const rank = { correct: 3, present: 2, absent: 1 } as const;
      for (let i = 0; i < normalized.length; i++) {
        const ch = normalized[i];
        const st = scored[i];
        copy[ch] = copy[ch] ? (rank[st] > rank[copy[ch]] ? st : copy[ch]) : st;
      }
      return copy;
    });

    setAttempt("");

    if (acceptedSet.has(normalized)) {
      setStatus("won");
      return;
    }
    if (rows.length + 1 >= MAX_ATTEMPTS) {
      setStatus("lost");
    }
  }

  function newRandom() {
    if (mode === "Quote") {
      setEntry(
        pickRandomEntry(
          (e) =>
            !!e.quoteText &&
            (e.quoteType === "missing" || e.quoteType === "author")
        )
      );
    } else {
      setEntry(pickRandomEntry());
    }
  }

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toUpperCase();
      if (key === "BACKSPACE") {
        e.preventDefault();
        handleKey("BACKSPACE");
      } else if (key === "ENTER") {
        e.preventDefault();
        handleKey("ENTER");
      } else if (/^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [attempt, status, answerLen]);

  // tighter, square tiles and locked board width
  const TILE = 48; // size for readability
  const GAP = 8;
  const boardWidth = answerLen * TILE + (answerLen - 1) * GAP;
  const currentTiles = Array.from(
    { length: answerLen },
    (_, i) => attempt[i] ?? ""
  );

  return (
    <section aria-labelledby="game-heading" style={styles.section}>
      {/* Header */}
      <div style={styles.sectionHead}>
        <h2 id="game-heading" style={styles.h2}>
          ⚡ Oracle of Words
        </h2>
        <div style={styles.pills}>
          <span style={styles.pill}>
            Attempts {rows.length}/{MAX_ATTEMPTS}
          </span>
          <span style={styles.pill}>Length {answerLen}</span>
          <span style={styles.pill}>{entry.category}</span>
        </div>
      </div>

      {/* Prompt */}
      <p style={styles.prompt}>{prompt}</p>
      {/* Previous guesses */}
      {rows.length > 0 && (
        <div
          aria-label="previous guesses"
          style={{ ...styles.board, width: boardWidth, marginTop: 10 }}
        >
          <div style={{ display: "grid", gap: GAP }}>
            {rows.map((g, ri) => (
              <div
                key={ri}
                style={{
                  ...styles.tileRow,
                  gridTemplateColumns: `repeat(${answerLen}, ${TILE}px)`,
                  gap: GAP,
                }}
              >
                {g
                  .padEnd(answerLen, " ")
                  .split("")
                  .map((ch, ci) => {
                    const score = rowScores[ri]?.[ci] || "absent";
                    return (
                      <div
                        key={ci}
                        style={{ ...styles.tilePast, ...scoreStyle(score) }}
                      >
                        {ch}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current row */}
      <div
        aria-label="board"
        style={{
          ...styles.board,
          width: boardWidth,
          marginTop: rows.length ? 10 : 0,
        }}
      >
        <div
          aria-label="current guess"
          style={{
            ...styles.tileRow,
            gridTemplateColumns: `repeat(${answerLen}, ${TILE}px)`,
            gap: GAP,
          }}
        >
          {currentTiles.map((ch, i) => (
            <div key={i} style={styles.tileCurrent} aria-live="polite">
              {ch || " "}
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar (Daily removed) */}
      <div style={styles.toolbar}>
        <label style={styles.labelInline}>
          Mode
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            style={styles.select}
          >
            <option>Description</option>
            <option>Quote</option>
            <option>Category</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" onClick={newRandom} style={styles.btnPrimary}>
            Random
          </button>
          <button
            type="button"
            onClick={() => {
              setRows([]);
              setRowScores([]);
              setAttempt("");
              setStatus("playing");
              setLettersMap({});
            }}
            style={styles.btnSecondary}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Keyboard */}
      <div aria-label="keyboard" style={styles.keyboardWrap}>
        {LETTER_ROWS.map((row, rIdx) => (
          <div key={rIdx} style={styles.kbRow}>
            {rIdx === 2 && (
              <button
                type="button"
                onClick={() => handleKey("BACKSPACE")}
                style={styles.keyWide}
              >
                ⌫
              </button>
            )}
            {row.split("").map((k) => {
              const st = lettersMap[k];
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKey(k)}
                  aria-label={`Key ${k}`}
                  style={{ ...styles.key, ...(st ? keyStyle(st) : {}) }}
                >
                  {k}
                </button>
              );
            })}
            {rIdx === 2 && (
              <button
                type="button"
                onClick={() => handleKey("ENTER")}
                style={{
                  ...styles.keyWide,
                  opacity: attempt.length !== answerLen ? 0.6 : 1,
                }}
                disabled={attempt.length !== answerLen}
                aria-disabled={attempt.length !== answerLen}
              >
                Enter
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="my-5" />

      {mode === "Quote" &&
        (entry.quoteType === "missing" || entry.quoteType === "author") && (
          <div
            style={{
              ...styles.pill,
              display: "inline-block",
              margin: "0 0 8px 0",
            }}
          >
            {entry.quoteType === "missing"
              ? "Quote mode: fill the blank"
              : "Quote mode: guess the speaker"}
          </div>
        )}

      {/* Result */}
      {status !== "playing" && (
        <div
          role="status"
          aria-live="polite"
          style={{
            ...styles.result,
            ...(status === "won" ? styles.resultWin : styles.resultLose),
          }}
        >
          {status === "won" ? (
            <p style={{ margin: 0 }}>
              Victory. The answer is <strong>{answerForMode}</strong>.
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              Out of attempts. The answer was <strong>{answerForMode}</strong>.
            </p>
          )}
        </div>
      )}

      {/* Help */}
      <details style={{ marginTop: 10 }}>
        <summary style={{ cursor: "pointer" }}>How to play</summary>
        <ul style={{ paddingLeft: 18, color: "#3b3b3b" }}>
          <li>Type with your keyboard or tap the on screen keys.</li>
          <li>
            Green means correct position, yellow means present elsewhere, gray
            means absent.
          </li>
          <li>
            Description and Category use the myth word. Quote can ask for a
            missing word or the speaker.
          </li>
        </ul>
      </details>
    </section>
  );
}

/* =========================================
   Landing
   (Header stays as you like it)
========================================= */
function Hero() {
  return (
    <header role="banner" style={styles.hero}>
      <div style={styles.heroInner}>
        <div style={styles.heroMark} aria-hidden>
          🏛️
        </div>
        <h1 style={styles.h1}>Word Mythology</h1>
        <p style={styles.heroText}>
          A fast mythology word game with daily puzzles, clean hints, and per
          letter tiles. Learn Greek myth while you play.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="#play" style={styles.btnPrimary}>
            Play the demo
          </a>
          <a href="#features" style={styles.btnSecondary}>
            See features
          </a>
        </div>
      </div>
    </header>
  );
}

function FeatureGrid() {
  const items = [
    {
      t: "Per-letter tiles",
      d: "See word length up front. Type letter by letter with clear feedback.",
    },
    { t: "Daily puzzle", d: "A deterministic puzzle that resets every day." },
    {
      t: "Myth packs",
      d: "Greek at launch. Norse, Egyptian, and Vedic to follow.",
    },
    {
      t: "Accessible play",
      d: "Works with keyboard and taps. No sound required.",
    },
    {
      t: "Lore friendly",
      d: "Short notes, accepted variants like Heracles or Hercules.",
    },
    { t: "Zero clutter", d: "No gradients, clean shapes, readable text." },
  ];
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={styles.section}
    >
      <h2 id="features-heading" style={styles.h2}>
        Features at a glance
      </h2>
      <div style={styles.grid}>
        {items.map((it) => (
          <article key={it.t} style={styles.card}>
            <h3 style={styles.cardTitle}>{it.t}</h3>
            <p style={styles.cardText}>{it.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SEOCollections() {
  return (
    <section aria-labelledby="collections-heading" style={styles.section}>
      <h2 id="collections-heading" style={styles.h2}>
        Mythology word lists and categories
      </h2>
      <div style={{ columns: 2, columnGap: 24, maxWidth: 980 }}>
        <ul style={styles.list}>
          <li>
            Deities: Zeus, Hera, Poseidon, Athena, Apollo, Artemis, Ares,
            Aphrodite, Hermes, Hephaestus, Hades, Demeter, Dionysus, Persephone
          </li>
          <li>
            Heroes: Heracles, Achilles, Odysseus, Perseus, Theseus, Jason,
            Hector, Atalanta
          </li>
          <li>
            Monsters: Medusa, Minotaur, Cyclops, Chimera, Cerberus, Siren,
            Scylla, Charybdis
          </li>
          <li>
            Places: Olympus, Tartarus, Elysium, Styx, Lethe, Delphi, Sparta,
            Mycenae
          </li>
          <li>
            Artifacts and concepts: Aegis, Caduceus, Ambrosia, Nectar,
            Labyrinth, Golden Fleece
          </li>
        </ul>
      </div>
    </section>
  );
}

/* =========================================
   Structured Data
========================================= */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Word Mythology",
    applicationCategory: "GameApplication",
    url: "https://wordmythology.com/",
    genre: ["Word", "Trivia", "Educational"],
    gamePlatform: ["Web"],
    description:
      "Play a mythology themed word game with daily puzzles and per letter tiles. Guess Greek myth words by description, quote, or category.",
    inLanguage: "en",
    operatingSystem: "Any",
    author: { "@type": "Organization", name: "Word Mythology" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* =========================================
   Page
========================================= */
export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main style={styles.page}>
      <Hero />
      <div id="play" style={styles.container}>
        <MythGame />
      </div>
      <div style={styles.container}>
        <FeatureGrid />
        <SEOCollections />
      </div>

      <div className="flex flex-col max-w-[950px] mx-auto">
        {/* About */}
        <section
          id="about-word-mythology"
          style={styles.section}
          aria-labelledby="about-heading"
        >
          <h2 id="about-heading" style={styles.h2}>
            What is Word Mythology?
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              <strong>Word Mythology</strong> is a fast, browser-based{" "}
              <em>mythology word game</em> where you guess Greek myth words,
              names, places, monsters, artifacts, and concepts. It blends the
              quick, tile-by-tile feedback of a modern word puzzle with short,
              readable lore so you learn as you play-no downloads, no logins.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              The game features multiple <strong>modes</strong>-
              <strong>Description</strong>, <strong>Quote</strong>, and
              <strong> Category</strong>-and supports accepted variants (e.g.,{" "}
              <em>Heracles</em> / <em>Hercules</em>). It’s built for casual
              play, classroom vocabulary warm-ups, and mythology enthusiasts who
              want a daily mental stretch.
            </p>
          </div>
        </section>
        {/* Modes */}
        <section
          id="game-modes"
          style={styles.section}
          aria-labelledby="modes-heading"
        >
          <h2 id="modes-heading" style={styles.h2}>
            Game Modes &amp; Scoring
          </h2>
          <ul style={{ ...styles.list, marginTop: 6 }}>
            <li style={{ marginBottom: 6 }}>
              <strong>Description:</strong> Read a concise clue about a god,
              hero, place, monster, or artifact and type the answer one letter
              at a time. Tile colors provide instant feedback.
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong>Quote:</strong> Two styles: <em>fill-the-blank</em> quotes
              where the missing myth word is the answer, and
              <em> guess-the-speaker</em> quotes where you type the name of the
              deity, hero, or author.
            </li>
            <li style={{ marginBottom: 0 }}>
              <strong>Category:</strong> You’re told the category (e.g., Titan,
              Place, Artifact) and a hint phrase-then you deduce the exact word.
            </li>
          </ul>
          <p style={{ marginTop: 10 }}>
            <strong>Scoring:</strong> Green = correct letter in the correct
            spot; Yellow = letter present elsewhere; Gray = letter not in the
            answer. You have a limited number of attempts, so every guess
            counts.
          </p>
        </section>
        {/* Topics */}
        <section
          id="mythology-topics"
          style={styles.section}
          aria-labelledby="topics-heading"
        >
          <h2 id="topics-heading" style={styles.h2}>
            Greek Mythology Topics Covered
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 12,
            }}
          >
            <ul style={styles.list}>
              <li style={{ marginBottom: 6 }}>
                <strong>Olympian gods:</strong> Zeus, Hera, Poseidon, Athena,
                Apollo, Artemis, Ares, Aphrodite, Hermes, Hephaestus, Demeter,
                Dionysus, Hestia
              </li>
              <li style={{ marginBottom: 6 }}>
                <strong>Titans &amp; Primordials:</strong> Kronos (Cronus),
                Rhea, Prometheus, Atlas, Gaia, Nyx, Uranus, Eros
              </li>
              <li style={{ marginBottom: 6 }}>
                <strong>Heroes:</strong> Heracles (Hercules), Achilles,
                Odysseus, Perseus, Theseus, Jason, Atalanta, Hector
              </li>
            </ul>
            <ul style={styles.list}>
              <li style={{ marginBottom: 6 }}>
                <strong>Monsters &amp; creatures:</strong> Medusa, Minotaur,
                Chimera, Cyclops, Cerberus, Siren, Scylla, Charybdis, Pegasus
              </li>
              <li style={{ marginBottom: 6 }}>
                <strong>Places:</strong> Olympus, Tartarus, Elysium, Styx,
                Lethe, Delphi, Mycenae, Sparta
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong>Artifacts &amp; concepts:</strong> Aegis, Caduceus,
                Labyrinth, Golden Fleece, Ambrosia, Nectar, Oracle
              </li>
            </ul>
          </div>
          <p style={{ marginTop: 10 }}>
            Future packs will expand into <strong>Norse</strong> (Odin, Thor,
            Freyja, Jörmungandr), <strong>Egyptian</strong> (Ra, Isis, Osiris,
            Anubis), and <strong>Vedic</strong> traditions, broadening the
            puzzle pool and vocabulary.
          </p>
        </section>
        {/* Word List */}
        <section
          id="sample-word-list"
          style={styles.section}
          aria-labelledby="wordlist-heading"
        >
          <h2 id="wordlist-heading" style={styles.h2}>
            Extended Mythology Word List (Sampler)
          </h2>
          <p style={{ marginTop: 0 }}>
            The demo includes a curated set to keep gameplay snappy. Below is a
            larger sampler to showcase the range of answers you might encounter
            in future updates:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            <ul style={styles.list}>
              <li>Zeus, Hera, Poseidon, Athena, Apollo, Artemis, Ares</li>
              <li>Aphrodite, Hermes, Hephaestus, Demeter, Dionysus, Hestia</li>
              <li>Hades, Persephone, Eros, Nike, Nemesis, Tyche</li>
              <li>Prometheus, Atlas, Kronos, Rhea, Hyperion, Oceanus</li>
            </ul>
            <ul style={styles.list}>
              <li>Heracles, Achilles, Odysseus, Perseus, Theseus, Jason</li>
              <li>Orpheus, Atalanta, Medea, Hector, Patroclus, Penelope</li>
              <li>Medusa, Minotaur, Chimera, Harpy, Hydra, Sphinx</li>
              <li>Cyclops, Cerberus, Gorgon, Siren, Centaur, Satyr</li>
            </ul>
            <ul style={styles.list}>
              <li>Olympus, Delphi, Elysium, Tartarus, Lethe, Styx</li>
              <li>Labyrinth, Aegis, Caduceus, Trident, Thunderbolt, Lyre</li>
              <li>Ambrosia, Nectar, Oracle, Fate, Hubris, Arete</li>
              <li>
                Golden Fleece, Trojan Horse, Pythia, Labors, Iliad, Odyssey
              </li>
            </ul>
          </div>
        </section>
        {/* Quotes */}
        <section
          id="famous-myth-quotes"
          style={styles.section}
          aria-labelledby="quotes-heading"
        >
          <h2 id="quotes-heading" style={styles.h2}>
            Famous Myth Lines &amp; In-Game Quote Prompts
          </h2>
          <p style={{ marginTop: 0 }}>
            Quote mode mixes recognizable myth lines with playful blanks and
            speaker prompts. Example prompts you may see:
          </p>
          <ul
            style={{
              ...styles.list,
              columns: 2 as any,
              columnGap: 24,
              marginTop: 6,
            }}
          >
            <li style={{ breakInside: "avoid", marginBottom: 6 }}>
              “My name is <strong>______</strong>,” he told the Cyclops.
              (Polyphemus episode)
            </li>
            <li style={{ breakInside: "avoid", marginBottom: 6 }}>
              “The blessed rest in <strong>______</strong>, far from grief and
              toil.”
            </li>
            <li style={{ breakInside: "avoid", marginBottom: 6 }}>
              “Counsel well given guards better than any shield.” -{" "}
              <em>guess the speaker</em>
            </li>
            <li style={{ breakInside: "avoid", marginBottom: 0 }}>
              “I gave them fire and taught them number and craft.” -{" "}
              <em>guess the speaker</em>
            </li>
          </ul>
          <p style={{ marginTop: 10 }}>
            These short lines keep the <strong>mythology quiz</strong> feel
            without slowing the pace of a letter-tile game.
          </p>
        </section>
        {/* How to Play */}
        <section
          id="how-to-play"
          style={styles.section}
          aria-labelledby="howto-heading"
        >
          <h2 id="howto-heading" style={styles.h2}>
            How to Play &amp; Tips
          </h2>
          <ol style={{ paddingLeft: 18, lineHeight: 1.7, margin: 0 }}>
            <li style={{ marginBottom: 4 }}>
              Read the prompt and note the <strong>answer length</strong> from
              the empty tiles.
            </li>
            <li style={{ marginBottom: 4 }}>
              Type letters or tap the on-screen keyboard to build your guess.
            </li>
            <li style={{ marginBottom: 4 }}>
              Use color feedback to refine: green = exact match; yellow = wrong
              spot; gray = not in the word.
            </li>
            <li style={{ marginBottom: 4 }}>
              Think through <strong>variants</strong> (e.g., <em>Heracles</em>{" "}
              vs <em>Hercules</em>), places vs. concepts, and common epithets.
            </li>
            <li style={{ marginBottom: 0 }}>
              Stuck? Switch modes or try a <strong>Random</strong> puzzle for a
              fresh clue set.
            </li>
          </ol>
        </section>
        {/* Education */}
        <section
          id="education"
          style={styles.section}
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading" style={styles.h2}>
            Teachers &amp; Learners
          </h2>
          <div style={{ display: "grid", gap: 10 }}>
            <p style={{ margin: 0, lineHeight: 1.7 }}>
              Word Mythology works well for <strong>classroom warm-ups</strong>,
              independent study, and quick
              <strong> vocabulary review</strong>. Each clue is intentionally
              short, readable, and tied to a single target term.
            </p>
            <ul style={{ ...styles.list, marginTop: 2 }}>
              <li style={{ marginBottom: 6 }}>
                <strong>Cross-curricular fit:</strong> literature (Homeric
                epics), history, art history, classics.
              </li>
              <li style={{ marginBottom: 6 }}>
                <strong>Low-friction:</strong> no accounts; play on laptops,
                tablets, or phones.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong>Discussion prompts:</strong> epithets, symbols,
                Roman/Greek name variants, geography of myth.
              </li>
            </ul>
          </div>
        </section>
        {/* Accessibility */}
        <section
          id="accessibility-privacy"
          style={styles.section}
          aria-labelledby="accessibility-heading"
        >
          <h2 id="accessibility-heading" style={styles.h2}>
            Accessibility &amp; Privacy
          </h2>
          <ul style={{ ...styles.list, marginTop: 6 }}>
            <li style={{ marginBottom: 6 }}>
              Keyboard and on-screen input; no audio required.
            </li>
            <li style={{ marginBottom: 6 }}>
              High-contrast tile colors for feedback without gradients.
            </li>
            <li style={{ marginBottom: 6 }}>
              Short hints and consistent tile sizing for readability.
            </li>
            <li style={{ marginBottom: 0 }}>
              No signup or tracking needed to try the demo.
            </li>
          </ul>
        </section>
        <section
          id="greek-myth-glossary"
          style={styles.section}
          aria-labelledby="glossary-heading"
        >
          <h2 id="glossary-heading" style={styles.h2}>
            Greek Mythology Glossary
          </h2>
          <p>
            A living glossary of <strong>myth terms</strong> makes Word
            Mythology more than just a game. As you play, you’ll naturally
            absorb vocabulary tied to gods, heroes, rituals, and cosmology.
          </p>
          <div style={{ columns: 2, columnGap: 24 }}>
            <ul style={styles.list}>
              <li>
                <strong>Aegis:</strong> the protective shield of Zeus and Athena
              </li>
              <li>
                <strong>Ambrosia:</strong> food of the gods, granting
                immortality
              </li>
              <li>
                <strong>Oracle:</strong> a prophetic figure or location like
                Delphi
              </li>
              <li>
                <strong>Tartarus:</strong> the deep abyss of punishment for
                Titans
              </li>
              <li>
                <strong>Arete:</strong> the Greek ideal of virtue and excellence
              </li>
              <li>
                <strong>Hubris:</strong> excessive pride punished by the gods
              </li>
            </ul>
          </div>
        </section>
        <section
          id="greek-vs-roman"
          style={styles.section}
          aria-labelledby="greekroman-heading"
        >
          <h2 id="greekroman-heading" style={styles.h2}>
            Greek vs Roman Names
          </h2>
          <p>
            Many myth words have <strong>Greek and Roman variants</strong>. Word
            Mythology accepts both when they fit the tile length, so you’ll
            never get tripped up for typing Hercules instead of Heracles.
          </p>
          <ul style={styles.list}>
            <li>Heracles = Hercules</li>
            <li>Aphrodite = Venus</li>
            <li>Poseidon = Neptune</li>
            <li>Zeus = Jupiter</li>
            <li>Ares = Mars</li>
            <li>Hades = Pluto</li>
          </ul>
        </section>
        <section
          id="educational-value"
          style={styles.section}
          aria-labelledby="value-heading"
        >
          <h2 id="value-heading" style={styles.h2}>
            Educational Value of Word Games
          </h2>
          <p>
            Research shows that <strong>vocabulary games</strong> boost
            retention, recall speed, and contextual understanding. Word
            Mythology doubles as both a <em>fun puzzle</em> and a{" "}
            <em>learning tool</em> for classics courses, homeschool units, and
            trivia buffs.
          </p>
          <ul style={styles.list}>
            <li>Reinforces cultural literacy about myths and epics</li>
            <li>Encourages spelling and variant recognition</li>
            <li>Improves memory through repetition and feedback</li>
            <li>Acts as a lightweight introduction to classical studies</li>
          </ul>
        </section>
        <section
          id="future-expansions"
          style={styles.section}
          aria-labelledby="expansions-heading"
        >
          <h2 id="expansions-heading" style={styles.h2}>
            Future Expansions
          </h2>
          <p>
            The roadmap for Word Mythology includes{" "}
            <strong>new pantheons</strong> and puzzle types:
          </p>
          <ul style={styles.list}>
            <li>
              <strong>Norse:</strong> Odin, Thor, Loki, Freyja, Ragnarok myths
            </li>
            <li>
              <strong>Egyptian:</strong> Ra, Anubis, Isis, Horus, the Duat
            </li>
            <li>
              <strong>Vedic:</strong> Indra, Agni, Vishnu, cosmic hymns
            </li>
            <li>
              <strong>Aztec & Mayan:</strong> Quetzalcoatl, Tlaloc, Popol Vuh
            </li>
          </ul>
          <p>
            These expansions will broaden the{" "}
            <strong>mythology word pool</strong> and attract fans of global
            folklore and world religions.
          </p>
        </section>
        <section
          id="mythology-in-popculture"
          style={styles.section}
          aria-labelledby="popculture-heading"
        >
          <h2 id="popculture-heading" style={styles.h2}>
            Mythology in Pop Culture
          </h2>
          <p>
            From <em>Percy Jackson</em> novels to Marvel’s <em>Thor</em> and
            <em>Wonder Woman</em>, myth references are everywhere in pop
            culture. Playing Word Mythology helps decode these stories by
            grounding them in the original gods, monsters, and epics.
          </p>
          <ul style={styles.list}>
            <li>Movies: Clash of the Titans, Immortals</li>
            <li>Books: Homer’s Iliad & Odyssey, Ovid’s Metamorphoses</li>
            <li>Games: God of War, Hades, Age of Mythology</li>
          </ul>
        </section>
        <section
          id="seo-keywords"
          style={styles.section}
          aria-labelledby="keywords-heading"
        >
          <h2 id="keywords-heading" style={styles.h2}>
            Mythology Word Game Keywords
          </h2>
          <p>
            For players searching online, Word Mythology is a mix of{" "}
            <strong>myth quiz</strong>, <strong>word puzzle</strong>,{" "}
            <strong>daily mythology challenge</strong>, and{" "}
            <strong>Greek gods trivia</strong>.
          </p>
          <p>
            Key topics covered: <em>Greek mythology game</em>,{" "}
            <em>educational word puzzle</em>, <em>guess-the-god quiz</em>,{" "}
            <em>trivia for classics students</em>,{" "}
            <em>browser-based word game</em>.
          </p>
        </section>

        <section
          id="greek-myth-glossary"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="glossary-heading"
        >
          <h2
            id="glossary-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Greek Mythology Glossary
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            A living glossary of <strong>myth terms</strong> makes Word
            Mythology more than just a game. As you play, you’ll naturally
            absorb vocabulary tied to gods, heroes, rituals, and cosmology.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Aegis:</strong> protective emblem or shield of Zeus and
                Athena
              </li>
              <li>
                <strong>Ambrosia:</strong> food of the gods said to grant
                longevity
              </li>
              <li>
                <strong>Oracle:</strong> prophetic figure or place (e.g.,{" "}
                <em>Delphi</em>)
              </li>
              <li>
                <strong>Tartarus:</strong> abyssal prison where divine foes are
                confined
              </li>
              <li>
                <strong>Arete:</strong> the ideal of virtue, excellence, and
                fulfillment of purpose
              </li>
              <li>
                <strong>Hubris:</strong> excessive pride that invites divine
                punishment
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Lyre:</strong> stringed instrument associated with
                Apollo and Orpheus
              </li>
              <li>
                <strong>Oath on Styx:</strong> the most binding vow sworn by the
                gods
              </li>
              <li>
                <strong>Chthonic:</strong> relating to gods/spirits of the
                Underworld
              </li>
              <li>
                <strong>Panoply:</strong> complete set of armor; Athena’s
                war-gear
              </li>
              <li>
                <strong>Omphalos:</strong> “navel of the world,” sacred stone at
                Delphi
              </li>
              <li>
                <strong>Epithets:</strong> honorific titles (e.g., “Pallas
                Athena,” “Earth-Shaker Poseidon”)
              </li>
            </ul>
          </div>
        </section>
        <section
          id="greek-vs-roman"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="greekroman-heading"
        >
          <h2
            id="greekroman-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Greek vs. Roman Names
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Many myth words have <strong>Greek and Roman variants</strong>. Word
            Mythology accepts both when they fit the tile length, so you won’t
            get tripped up entering Hercules instead of Heracles.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-800">
            <li>
              Heracles = <em>Hercules</em>
            </li>
            <li>
              Aphrodite = <em>Venus</em>
            </li>
            <li>
              Poseidon = <em>Neptune</em>
            </li>
            <li>
              Zeus = <em>Jupiter</em>
            </li>
            <li>
              Ares = <em>Mars</em>
            </li>
            <li>
              Hades = <em>Pluto</em>
            </li>
          </ul>
        </section>
        <section
          id="educational-value"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="value-heading"
        >
          <h2
            id="value-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Educational Value of Mythology Word Games
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            <strong>Vocabulary games</strong> boost retention, recall speed, and
            contextual understanding. Word Mythology doubles as a{" "}
            <em>fun puzzle</em> and a <em>learning tool</em> for classics
            courses, homeschool units, and trivia fans.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-800">
            <li>Reinforces cultural literacy about myths and epics</li>
            <li>
              Encourages spelling and recognition of{" "}
              <strong>variant names</strong>
            </li>
            <li>Improves memory via repetition and immediate feedback</li>
            <li>Lightweight introduction to classical studies and symbolism</li>
          </ul>
        </section>
        <section
          id="future-expansions"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="expansions-heading"
        >
          <h2
            id="expansions-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Future Expansions
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            The roadmap includes new <strong>pantheons</strong> and puzzle types
            to broaden the mythology word pool.
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Norse:</strong> Odin, Thor, Loki, Freyja, Ragnarok myths
              </li>
              <li>
                <strong>Egyptian:</strong> Ra, Anubis, Isis, Horus, the Duat
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Vedic:</strong> Indra, Agni, Vishnu, cosmic hymns
              </li>
              <li>
                <strong>Mesoamerican:</strong> Quetzalcoatl, Tlaloc, Popol Vuh
              </li>
            </ul>
          </div>
        </section>
        <section
          id="mythology-in-popculture"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="popculture-heading"
        >
          <h2
            id="popculture-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Mythology in Pop Culture
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            From <em>Percy Jackson</em> novels to modern films and games, myth
            references are everywhere. Playing Word Mythology helps decode these
            stories by grounding them in the original gods, monsters, and epics.
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-800">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Movies:</strong> <em>Clash of the Titans</em>,{" "}
                <em>Immortals</em>
              </li>
              <li>
                <strong>TV:</strong> <em>Hercules</em>, <em>Blood of Zeus</em>
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Books:</strong> Homer’s <em>Iliad</em> &amp;{" "}
                <em>Odyssey</em>, Ovid’s <em>Metamorphoses</em>
              </li>
              <li>
                <strong>Comics:</strong> <em>Wonder Woman</em> (Amazons),{" "}
                <em>Thor</em> (Norse)
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Games:</strong> <em>God of War</em>, <em>Hades</em>,{" "}
                <em>Age of Mythology</em>
              </li>
              <li>
                <strong>Art:</strong> Renaissance depictions of Olympus and the
                Underworld
              </li>
            </ul>
          </div>
        </section>
        <section
          id="seo-keywords"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="keywords-heading"
        >
          <h2
            id="keywords-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Mythology Word Game Keywords
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            For players searching online, Word Mythology blends{" "}
            <strong>myth quiz</strong>, <strong>word puzzle</strong>,
            <strong> daily mythology challenge</strong>, and{" "}
            <strong>Greek gods trivia</strong>.
          </p>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-800">
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              mythology word game
            </span>
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              greek mythology game
            </span>
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              word puzzle
            </span>
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              quote guessing game
            </span>
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              educational classics
            </span>
            <span className="inline-block px-2 py-1 rounded-lg bg-slate-100 border border-slate-200">
              greek gods trivia
            </span>
          </div>
        </section>
        <section
          id="greek-myth-legends"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="legends-heading"
        >
          <h2
            id="legends-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Famous Legends in Greek Mythology
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            From the epic trials of <strong>Heracles</strong> to the long voyage
            of <strong>Odysseus</strong>, Greek myths offer timeless stories-and
            a deep vocabulary well-for word games.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-800">
            <li>
              <strong>The Iliad:</strong> Achilles, Hector, and the siege of
              Troy
            </li>
            <li>
              <strong>The Odyssey:</strong> cyclopes, sirens, and homecoming
            </li>
            <li>
              <strong>The Labors of Heracles:</strong> tests of strength and
              wits
            </li>
            <li>
              <strong>The Argonauts:</strong> Jason’s quest for the Golden
              Fleece
            </li>
          </ul>
        </section>
        <section
          id="mythology-heroes"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="heroes-heading"
        >
          <h2
            id="heroes-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Heroes and Heroines of Myth
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Legendary figures add a human dimension to divine tales and
            highlight themes of bravery, sacrifice, and hubris.
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Perseus</strong> - slayer of Medusa
              </li>
              <li>
                <strong>Theseus</strong> - conqueror of the Minotaur
              </li>
              <li>
                <strong>Atalanta</strong> - swift-footed huntress
              </li>
              <li>
                <strong>Orpheus</strong> - musician who charmed Hades
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Achilles</strong> - hero of the Trojan War
              </li>
              <li>
                <strong>Jason</strong> - leader of the Argonauts
              </li>
              <li>
                <strong>Medea</strong> - powerful sorceress of Colchis
              </li>
              <li>
                <strong>Heracles</strong> - icon of endurance and strength
              </li>
            </ul>
          </div>
        </section>
        <section
          id="myth-creatures"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="creatures-heading"
        >
          <h2
            id="creatures-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Creatures and Monsters
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Mythic beasts challenge both heroes and players. Their names and
            traits appear across crosswords and vocabulary tests.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-800">
            <li>
              <strong>Medusa</strong> - Gorgon with a petrifying gaze
            </li>
            <li>
              <strong>Minotaur</strong> - bull-headed guardian of the Labyrinth
            </li>
            <li>
              <strong>Hydra</strong> - serpent with regenerating heads
            </li>
            <li>
              <strong>Chimera</strong> - lion-goat-serpent hybrid
            </li>
          </ul>
        </section>
        <section
          id="underworld"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="underworld-heading"
        >
          <h2
            id="underworld-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Hades and the Greek Underworld
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            The Underworld’s geography and figures provide rich vocabulary for
            puzzles.
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Hades/Pluto</strong> - ruler of the dead
              </li>
              <li>
                <strong>Persephone</strong> - queen of the Underworld
              </li>
              <li>
                <strong>Tartarus</strong> - abyss of punishment
              </li>
              <li>
                <strong>Elysium</strong> - fields of the blessed
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Styx</strong> - river of binding oaths
              </li>
              <li>
                <strong>Lethe</strong> - river of forgetting
              </li>
              <li>
                <strong>Cerberus</strong> - three-headed hound at the gates
              </li>
              <li>
                <strong>Charon</strong> - ferryman of souls
              </li>
            </ul>
          </div>
        </section>
        <section
          id="mythology-timeline"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="timeline-heading"
        >
          <h2
            id="timeline-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            A Quick Timeline of Greek Mythology
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Understanding the sequence of myth helps contextualize puzzle terms
            and epithets.
          </p>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-slate-800">
            <li>
              <strong>Primordials:</strong> Chaos, Gaia, Uranus
            </li>
            <li>
              <strong>Titans:</strong> Kronos, Rhea, Prometheus, Atlas
            </li>
            <li>
              <strong>Olympians:</strong> Zeus, Hera, Poseidon, Athena, etc.
            </li>
            <li>
              <strong>Heroic Age:</strong> Perseus, Heracles, Theseus, Odysseus,
              Jason
            </li>
            <li>
              <strong>Later Syncretism:</strong> Roman adaptations and beyond
            </li>
          </ol>
        </section>
        <section
          id="mythology-crossovers"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="crossovers-heading"
        >
          <h2
            id="crossovers-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Crossovers with Other Traditions
          </h2>
          <p className="mt-2 text-slate-700 leading-relaxed">
            Greek mythology connects to other world traditions. Many puzzle
            words overlap with Roman, Norse, and Egyptian stories.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-800">
            <li>
              <strong>Zeus</strong> ↔ <strong>Jupiter</strong> (Roman)
            </li>
            <li>
              <strong>Aphrodite</strong> ↔ <strong>Venus</strong> (Roman),
              parallels with <strong>Freyja</strong> (Norse)
            </li>
            <li>
              <strong>Hades</strong> ↔ <strong>Pluto</strong> (Roman) and
              aspects of <strong>Osiris</strong> (Egyptian)
            </li>
            <li>
              <strong>Hermes</strong> shares trickster motifs seen in{" "}
              <strong>Loki</strong> (Norse)
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" style={styles.section} aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            FAQ
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 12,
            }}
          >
            <div>
              <h3 style={{ margin: "6px 0 4px", fontSize: 16 }}>
                Do you accept alternate spellings?
              </h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                Yes. Common variants like <em>Heracles</em>/<em>Hercules</em> or{" "}
                <em>Kronos</em>/<em>Cronus</em> are supported when they match
                the puzzle’s letter length.
              </p>
            </div>

            <div>
              <h3 style={{ margin: "6px 0 4px", fontSize: 16 }}>
                Will there be other pantheons?
              </h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                Greek is the launch set. Norse, Egyptian, and Vedic packs are
                planned to expand the myth word lists and quotes.
              </p>
            </div>

            <div>
              <h3 style={{ margin: "6px 0 4px", fontSize: 16 }}>
                Is this a daily puzzle?
              </h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                The demo focuses on instant play with random puzzles and
                multiple modes; a rotating daily set is planned for the full
                release.
              </p>
            </div>

            <div>
              <h3 style={{ margin: "6px 0 4px", fontSize: 16 }}>
                Can I use this in class?
              </h3>
              <p style={{ margin: 0, lineHeight: 1.7 }}>
                Absolutely. It’s a quick, low-prep activity to reinforce names,
                places, and concepts from mythology units.
              </p>
            </div>
          </div>
        </section>
        <section
          id="mythology-faq-extended"
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 md:p-6 mt-4"
          aria-labelledby="faq2-heading"
        >
          <h2
            id="faq2-heading"
            className="text-2xl font-semibold text-slate-900"
          >
            Mythology Word Game - Extra FAQ
          </h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Is the game free?
              </h3>
              <p className="mt-1 text-slate-700 leading-relaxed">
                Yes. It’s fully free to play in your browser.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Do I need Greek spellings?
              </h3>
              <p className="mt-1 text-slate-700 leading-relaxed">
                No. Use common English forms; accepted variants are supported
                when lengths match.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Good for classrooms?
              </h3>
              <p className="mt-1 text-slate-700 leading-relaxed">
                Absolutely-great for warm-ups, vocabulary review, and quick myth
                quizzes.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Daily vs random puzzles?
              </h3>
              <p className="mt-1 text-slate-700 leading-relaxed">
                The demo focuses on instant play with Random; a rotating daily
                set is planned.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Word Mythology. Daily mythology word
          puzzles.
        </p>
      </footer>
      <StructuredData />

      {/* Breadcrumbs for new sections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Glossary",
                item: "https://wordmythology.com/#greek-myth-glossary",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Greek vs. Roman",
                item: "https://wordmythology.com/#greek-vs-roman",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Educational Value",
                item: "https://wordmythology.com/#educational-value",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Future Expansions",
                item: "https://wordmythology.com/#future-expansions",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Mythology in Pop Culture",
                item: "https://wordmythology.com/#mythology-in-popculture",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Keywords",
                item: "https://wordmythology.com/#seo-keywords",
              },
              {
                "@type": "ListItem",
                position: 7,
                name: "Famous Legends",
                item: "https://wordmythology.com/#greek-myth-legends",
              },
              {
                "@type": "ListItem",
                position: 8,
                name: "Heroes & Heroines",
                item: "https://wordmythology.com/#mythology-heroes",
              },
              {
                "@type": "ListItem",
                position: 9,
                name: "Creatures & Monsters",
                item: "https://wordmythology.com/#myth-creatures",
              },
              {
                "@type": "ListItem",
                position: 10,
                name: "Underworld",
                item: "https://wordmythology.com/#underworld",
              },
              {
                "@type": "ListItem",
                position: 11,
                name: "Myth Timeline",
                item: "https://wordmythology.com/#mythology-timeline",
              },
              {
                "@type": "ListItem",
                position: 12,
                name: "Crossovers",
                item: "https://wordmythology.com/#mythology-crossovers",
              },
              {
                "@type": "ListItem",
                position: 13,
                name: "Extra FAQ",
                item: "https://wordmythology.com/#mythology-faq-extended",
              },
            ],
          }),
        }}
      />

      {/* Glossary — DefinedTermSet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Greek Mythology Glossary",
            url: "https://wordmythology.com/#greek-myth-glossary",
            description: "Key terms used in the Word Mythology game.",
            hasDefinedTerm: [
              {
                "@type": "DefinedTerm",
                name: "Aegis",
                description: "Protective emblem or shield of Zeus and Athena.",
              },
              {
                "@type": "DefinedTerm",
                name: "Ambrosia",
                description: "Food of the gods said to grant longevity.",
              },
              {
                "@type": "DefinedTerm",
                name: "Oracle",
                description: "Prophetic figure or place such as Delphi.",
              },
              {
                "@type": "DefinedTerm",
                name: "Tartarus",
                description: "Abyssal prison for divine foes.",
              },
              {
                "@type": "DefinedTerm",
                name: "Arete",
                description: "Greek ideal of virtue and excellence.",
              },
              {
                "@type": "DefinedTerm",
                name: "Hubris",
                description: "Excessive pride punished by the gods.",
              },
              {
                "@type": "DefinedTerm",
                name: "Lyre",
                description: "Stringed instrument of Apollo and Orpheus.",
              },
              {
                "@type": "DefinedTerm",
                name: "Styx",
                description: "River on which the gods swear binding oaths.",
              },
              {
                "@type": "DefinedTerm",
                name: "Chthonic",
                description: "Relating to the Underworld.",
              },
              {
                "@type": "DefinedTerm",
                name: "Omphalos",
                description: "‘Navel of the world’, sacred stone at Delphi.",
              },
              {
                "@type": "DefinedTerm",
                name: "Epithets",
                description: "Honorific titles like Earth-Shaker or Pallas.",
              },
            ],
          }),
        }}
      />

      {/* Greek vs. Roman — ItemList mapping */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Greek and Roman Name Equivalents",
            url: "https://wordmythology.com/#greek-vs-roman",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Heracles = Hercules" },
              { "@type": "ListItem", position: 2, name: "Aphrodite = Venus" },
              { "@type": "ListItem", position: 3, name: "Poseidon = Neptune" },
              { "@type": "ListItem", position: 4, name: "Zeus = Jupiter" },
              { "@type": "ListItem", position: 5, name: "Ares = Mars" },
              { "@type": "ListItem", position: 6, name: "Hades = Pluto" },
            ],
          }),
        }}
      />

      {/* Educational Value — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Educational Value of Mythology Word Games",
            url: "https://wordmythology.com/#educational-value",
            about: ["vocabulary games", "retention", "classics education"],
            articleSection: "Education",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
          }),
        }}
      />

      {/* Future Expansions — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Future Mythology Packs and Expansions",
            url: "https://wordmythology.com/#future-expansions",
            about: [
              "Norse mythology",
              "Egyptian mythology",
              "Vedic mythology",
              "Mesoamerican mythology",
            ],
            articleSection: "Roadmap",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            keywords: [
              "Odin",
              "Thor",
              "Freyja",
              "Ra",
              "Anubis",
              "Indra",
              "Quetzalcoatl",
            ],
          }),
        }}
      />

      {/* Mythology in Pop Culture — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Mythology in Pop Culture",
            url: "https://wordmythology.com/#mythology-in-popculture",
            about: ["myth in movies", "myth in games", "modern retellings"],
            articleSection: "Pop Culture",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            keywords: [
              "Percy Jackson",
              "Clash of the Titans",
              "God of War",
              "Hades",
              "Wonder Woman",
              "Thor",
            ],
          }),
        }}
      />

      {/* Keywords — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Mythology Word Game Keywords",
            url: "https://wordmythology.com/#seo-keywords",
            about: ["SEO", "mythology word game"],
            articleSection: "Keywords",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            keywords: [
              "mythology word game",
              "greek mythology game",
              "word puzzle",
              "daily mythology challenge",
              "greek gods trivia",
              "quote guessing game",
              "educational classics",
            ],
          }),
        }}
      />

      {/* Famous Legends — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Famous Legends in Greek Mythology",
            url: "https://wordmythology.com/#greek-myth-legends",
            about: ["Iliad", "Odyssey", "Labors of Heracles", "Argonauts"],
            articleSection: "Legends",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
          }),
        }}
      />

      {/* Heroes & Heroines — CollectionPage with ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Heroes and Heroines of Myth",
            url: "https://wordmythology.com/#mythology-heroes",
            inLanguage: "en",
            hasPart: {
              "@type": "ItemList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Perseus" },
                { "@type": "ListItem", position: 2, name: "Theseus" },
                { "@type": "ListItem", position: 3, name: "Atalanta" },
                { "@type": "ListItem", position: 4, name: "Orpheus" },
                { "@type": "ListItem", position: 5, name: "Achilles" },
                { "@type": "ListItem", position: 6, name: "Jason" },
                { "@type": "ListItem", position: 7, name: "Medea" },
                { "@type": "ListItem", position: 8, name: "Heracles" },
              ],
            },
          }),
        }}
      />

      {/* Creatures & Monsters — CollectionPage with ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Creatures and Monsters",
            url: "https://wordmythology.com/#myth-creatures",
            inLanguage: "en",
            hasPart: {
              "@type": "ItemList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Medusa" },
                { "@type": "ListItem", position: 2, name: "Minotaur" },
                { "@type": "ListItem", position: 3, name: "Hydra" },
                { "@type": "ListItem", position: 4, name: "Chimera" },
              ],
            },
          }),
        }}
      />

      {/* Underworld — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hades and the Greek Underworld",
            url: "https://wordmythology.com/#underworld",
            about: [
              "Hades",
              "Persephone",
              "Tartarus",
              "Elysium",
              "Styx",
              "Lethe",
              "Cerberus",
              "Charon",
            ],
            articleSection: "Underworld",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
          }),
        }}
      />

      {/* Mythology Timeline — ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Greek Mythology Timeline",
            url: "https://wordmythology.com/#mythology-timeline",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Primordials: Chaos, Gaia, Uranus",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Titans: Kronos, Rhea, Prometheus, Atlas",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Olympians: Zeus, Hera, Poseidon, Athena, etc.",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Heroic Age: Perseus, Heracles, Theseus, Odysseus, Jason",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Later Syncretism: Roman adaptations and beyond",
              },
            ],
          }),
        }}
      />

      {/* Crossovers — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Crossovers with Other Traditions",
            url: "https://wordmythology.com/#mythology-crossovers",
            about: ["Roman parallels", "Norse parallels", "Egyptian parallels"],
            articleSection: "Comparative Mythology",
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            keywords: [
              "Zeus Jupiter",
              "Aphrodite Venus",
              "Hades Pluto",
              "Hermes Loki",
              "Osiris",
            ],
          }),
        }}
      />

      {/* Extra FAQ — FAQPage (extended block) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            url: "https://wordmythology.com/#mythology-faq-extended",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is the game free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, it’s fully free to play in your browser.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need Greek spellings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Common English forms are used, and accepted variants are supported when lengths match.",
                },
              },
              {
                "@type": "Question",
                name: "Is this good for classrooms?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes—great for warm-ups, vocabulary review, and quick mythology quizzes.",
                },
              },
              {
                "@type": "Question",
                name: "Daily vs random puzzles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The demo focuses on instant play with Random; a rotating daily set is planned.",
                },
              },
            ],
          }),
        }}
      />

      {/* Structured Data - WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Word Mythology",
            url: "https://wordmythology.com/",
            description:
              "Play a mythology themed word game. Guess Greek myth words by description, quote, or category. Daily puzzle, on-screen keyboard, and per-letter tiles.",
            inLanguage: "en",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://wordmythology.com/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Structured Data - VideoGame (the playable word game) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            name: "Word Mythology",
            url: "https://wordmythology.com/",
            applicationCategory: "GameApplication",
            genre: ["Word", "Trivia", "Educational"],
            gamePlatform: ["Web"],
            operatingSystem: "Any",
            description:
              "A fast mythology word game with Description, Quote, and Category modes. Learn Greek myth names, places, monsters, artifacts, and concepts while you play.",
            inLanguage: "en",
            author: { "@type": "Organization", name: "Word Mythology" },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              category: "Free",
            },
            playMode: "SinglePlayer",
            keywords: [
              "mythology word game",
              "greek mythology game",
              "word puzzle",
              "daily word game",
              "quote guessing game",
              "educational classics game",
            ],
            gameTip: [
              "Use color feedback to narrow letters.",
              "Consider variant spellings like Heracles/Hercules.",
              "Switch modes for a fresh style of hint.",
            ],
          }),
        }}
      />

      {/* Structured Data - Breadcrumbs for main sections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "About",
                item: "https://wordmythology.com/#about-word-mythology",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Game Modes",
                item: "https://wordmythology.com/#game-modes",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Topics",
                item: "https://wordmythology.com/#mythology-topics",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Word List",
                item: "https://wordmythology.com/#sample-word-list",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Quotes",
                item: "https://wordmythology.com/#famous-myth-quotes",
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "How to Play",
                item: "https://wordmythology.com/#how-to-play",
              },
              {
                "@type": "ListItem",
                position: 7,
                name: "Education",
                item: "https://wordmythology.com/#education",
              },
              {
                "@type": "ListItem",
                position: 8,
                name: "Accessibility",
                item: "https://wordmythology.com/#accessibility-privacy",
              },
              {
                "@type": "ListItem",
                position: 9,
                name: "FAQ",
                item: "https://wordmythology.com/#faq",
              },
              {
                "@type": "ListItem",
                position: 10,
                name: "Glossary",
                item: "https://wordmythology.com/#greek-myth-glossary",
              },
              {
                "@type": "ListItem",
                position: 11,
                name: "Greek vs Roman",
                item: "https://wordmythology.com/#greek-vs-roman",
              },
              {
                "@type": "ListItem",
                position: 12,
                name: "Educational Value",
                item: "https://wordmythology.com/#educational-value",
              },
              {
                "@type": "ListItem",
                position: 13,
                name: "Future Expansions",
                item: "https://wordmythology.com/#future-expansions",
              },
              {
                "@type": "ListItem",
                position: 14,
                name: "Mythology in Pop Culture",
                item: "https://wordmythology.com/#mythology-in-popculture",
              },
              {
                "@type": "ListItem",
                position: 15,
                name: "SEO Keywords",
                item: "https://wordmythology.com/#seo-keywords",
              },
            ],
          }),
        }}
      />

      {/* Structured Data - HowTo (matches How to Play section) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Play Word Mythology",
            description:
              "A quick guide to playing the Word Mythology puzzle with Description, Quote, and Category modes.",
            totalTime: "PT2M",
            step: [
              {
                "@type": "HowToStep",
                name: "Read the prompt",
                text: "Note the answer length from the empty tiles.",
              },
              {
                "@type": "HowToStep",
                name: "Enter letters",
                text: "Type or tap the on-screen keyboard to build your guess.",
              },
              {
                "@type": "HowToStep",
                name: "Use feedback",
                text: "Green = correct spot, Yellow = wrong spot, Gray = not in the word.",
              },
              {
                "@type": "HowToStep",
                name: "Consider variants",
                text: "Try common alternates like Heracles/Hercules if they fit the length.",
              },
              {
                "@type": "HowToStep",
                name: "Try another mode",
                text: "Switch modes or use Random for a fresh puzzle.",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "On-screen keyboard" },
              { "@type": "HowToTool", name: "Physical keyboard" },
            ],
            estimatedCost: {
              "@type": "MonetaryAmount",
              currency: "USD",
              value: "0",
            },
            supply: [{ "@type": "HowToSupply", name: "Web browser" }],
          }),
        }}
      />

      {/* Structured Data - Article: Greek Mythology Glossary */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Greek Mythology Glossary",
            url: "https://wordmythology.com/#greek-myth-glossary",
            about: ["Greek mythology", "myth glossary", "classics vocabulary"],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Glossary",
            keywords: [
              "Aegis",
              "Ambrosia",
              "Oracle",
              "Tartarus",
              "Arete",
              "Hubris",
            ],
          }),
        }}
      />

      {/* Structured Data - Article: Greek vs Roman Names */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Greek vs Roman Mythology Names",
            url: "https://wordmythology.com/#greek-vs-roman",
            about: ["Greek gods", "Roman gods", "name variants"],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Comparative Names",
            keywords: [
              "Heracles Hercules",
              "Aphrodite Venus",
              "Poseidon Neptune",
              "Zeus Jupiter",
              "Ares Mars",
              "Hades Pluto",
            ],
          }),
        }}
      />

      {/* Structured Data - Article: Educational Value of Word Games */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Educational Value of Mythology Word Games",
            url: "https://wordmythology.com/#educational-value",
            about: [
              "vocabulary games",
              "classics education",
              "learning with puzzles",
            ],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Education",
            keywords: [
              "vocabulary retention",
              "spelling practice",
              "cultural literacy",
              "classroom warm-ups",
            ],
          }),
        }}
      />

      {/* Structured Data - Article: Future Expansions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Future Mythology Packs and Expansions",
            url: "https://wordmythology.com/#future-expansions",
            about: [
              "Norse mythology",
              "Egyptian mythology",
              "Vedic mythology",
              "Aztec mythology",
              "Mayan mythology",
            ],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Roadmap",
            keywords: [
              "Odin",
              "Ra",
              "Indra",
              "Quetzalcoatl",
              "Ragnarok",
              "Duat",
              "Popol Vuh",
            ],
          }),
        }}
      />

      {/* Structured Data - Article: Mythology in Pop Culture */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Mythology in Pop Culture",
            url: "https://wordmythology.com/#mythology-in-popculture",
            about: ["myth in movies", "myth in games", "modern retellings"],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Pop Culture",
            keywords: [
              "Percy Jackson",
              "Thor",
              "Wonder Woman",
              "Clash of the Titans",
              "God of War",
              "Hades",
            ],
          }),
        }}
      />

      {/* Structured Data - CollectionPage: Extended Word List */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Extended Mythology Word List (Sampler)",
            url: "https://wordmythology.com/#sample-word-list",
            inLanguage: "en",
            about: ["mythology word list", "greek myth vocabulary"],
            isPartOf: "https://wordmythology.com/",
            hasPart: {
              "@type": "ItemList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Olympian gods" },
                { "@type": "ListItem", position: 2, name: "Heroes" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Monsters & creatures",
                },
                { "@type": "ListItem", position: 4, name: "Places" },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Artifacts & concepts",
                },
              ],
            },
          }),
        }}
      />

      {/* Structured Data - Article: SEO Keywords Explanation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Mythology Word Game Keywords",
            url: "https://wordmythology.com/#seo-keywords",
            about: ["SEO", "mythology word game keywords"],
            author: { "@type": "Organization", name: "Word Mythology" },
            inLanguage: "en",
            articleSection: "Keywords",
            keywords: [
              "mythology word game",
              "greek mythology game",
              "word puzzle",
              "daily mythology challenge",
              "greek gods trivia",
              "educational word puzzle",
              "guess-the-god quiz",
              "classics students",
              "browser-based word game",
            ],
          }),
        }}
      />

      {/* Structured Data - FAQPage (mirrors your on-page FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you accept alternate spellings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Common variants like Heracles/Hercules or Kronos/Cronus are supported when they match the puzzle’s letter length.",
                },
              },
              {
                "@type": "Question",
                name: "Will there be other pantheons?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Greek is the launch set. Norse, Egyptian, and Vedic packs are planned to expand the myth word lists and quotes.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a daily puzzle?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The demo focuses on instant play with random puzzles and multiple modes; a rotating daily set is planned for the full release.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this in class?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. It’s a quick, low-prep activity to reinforce names, places, and concepts from mythology units.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}

/* =========================================
   Styles
========================================= */
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    background: "#f2f4f7",
    color: "#0b132b",
  },
  container: { maxWidth: 980, margin: "0 auto", padding: "0 16px 24px" },

  // Header block - unchanged look
  hero: {
    background: "#0b132b",
    color: "#e6e8ec",
    borderBottom: "4px solid #1c2541",
    padding: "48px 16px 24px",
  },
  heroInner: { maxWidth: 980, margin: "0 auto", textAlign: "center" },
  heroMark: {
    fontSize: 40,
    lineHeight: 1,
    display: "inline-block",
    padding: 8,
    border: "2px solid #3a506b",
    borderRadius: 12,
    marginBottom: 10,
    background: "#1c2541",
  },
  h1: { fontSize: 38, margin: "6px 0 8px", letterSpacing: 0.5 },
  heroText: { margin: "8px auto 16px", maxWidth: 720, color: "#c7cbd4" },
  btnPrimary: {
    display: "inline-block",
    background: "#3a506b",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: 12,
    textDecoration: "none",
    border: "2px solid #517a9b",
    boxShadow: "0 2px 0 #1c2541",
  },
  btnSecondary: {
    display: "inline-block",
    background: "#1c2541",
    color: "#e6e8ec",
    padding: "10px 16px",
    borderRadius: 12,
    textDecoration: "none",
    border: "2px solid #3a506b",
    boxShadow: "0 2px 0 #0b132b",
  },

  // Game card
  section: {
    background: "#ffffff",
    border: "2px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
    marginTop: 16,
  },
  sectionHead: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  h2: { fontSize: 24, margin: 0 },
  pills: { display: "flex", gap: 8, flexWrap: "wrap" },
  pill: {
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    background: "#eef2f7",
    border: "1px solid #d6dde6",
  },

  // Prompt block
  prompt: {
    margin: "10px auto 12px",
    padding: 12,
    borderRadius: 12,
    background: "#f7f8fb",
    border: "1px solid #e4e7ec",
    maxWidth: 760,
  },

  // Board
  board: { marginInline: "auto" },
  tileRow: { display: "grid" },
  tileCurrent: {
    width: 48,
    height: 48,
    border: "2px solid #cdd6e0",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 20,
    textAlign: "center",
    lineHeight: "48px",
    background: "#ffffff",
  },
  tilePast: {
    width: 48,
    height: 48,
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 20,
    textAlign: "center",
    lineHeight: "48px",
    border: "2px solid #cdd6e0",
    background: "#ffffff",
    color: "#0b132b",
  },

  // Toolbar (Daily removed)
  toolbar: {
    margin: "14px auto 8px",
    padding: 10,
    border: "1px solid #d6dde6",
    background: "#f5f7fb",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    maxWidth: 760,
  },
  labelInline: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    border: "1px solid #e4e7ec",
    padding: "6px 10px",
    borderRadius: 10,
    background: "#ffffff",
  },
  select: {
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "6px 8px",
    background: "#ffffff",
  },

  // Keyboard
  keyboardWrap: {
    margin: "8px auto 0",
    maxWidth: 760,
    display: "grid",
    gap: 8,
  },
  kbRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    flexWrap: "nowrap",
  },
  key: {
    minWidth: 44,
    height: 52,
    border: "1px solid #c9d1db",
    background: "#e8ecf2",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
    padding: "0 8px",
    boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
  },
  keyWide: {
    minWidth: 74,
    height: 52,
    border: "1px solid #c9d1db",
    background: "#e8ecf2",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
    padding: "0 10px",
    boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
  },

  // Lists and cards
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  card: {
    border: "2px solid #e5e7eb",
    borderRadius: 16,
    padding: 14,
    background: "#ffffff",
  },
  cardTitle: { margin: "0 0 6px", fontSize: 18 },
  cardText: { margin: 0, color: "#3b3b3b" },
  list: { paddingLeft: 18, color: "#3b3b3b", breakInside: "avoid" },

  // Footer
  footer: {
    marginTop: 24,
    padding: "24px 16px",
    background: "#0b132b",
    color: "#e6e8ec",
    textAlign: "center",
    borderTop: "4px solid #1c2541",
  },

  // Result
  result: { marginTop: 12, padding: 12, borderRadius: 12, border: "2px solid" },
  resultWin: {
    borderColor: "#16865d",
    background: "#eaf7f1",
    color: "#0b3d2d",
  },
  resultLose: {
    borderColor: "#b43d3d",
    background: "#fdeeee",
    color: "#4a0f0f",
  },
};

function scoreStyle(s: LetterStatus): React.CSSProperties {
  if (s === "correct")
    return { background: "#16a34a", color: "#fff", borderColor: "#12833e" };
  if (s === "present")
    return { background: "#eab308", color: "#fff", borderColor: "#c28f06" };
  return { background: "#d1d5db", color: "#334155", borderColor: "#b8bec7" };
}
function keyStyle(s: LetterStatus): React.CSSProperties {
  if (s === "correct")
    return { background: "#16a34a", color: "#fff", borderColor: "#12833e" };
  if (s === "present")
    return { background: "#eab308", color: "#fff", borderColor: "#c28f06" };
  return { background: "#9ca3af", color: "#fff", borderColor: "#8b939e" };
}
