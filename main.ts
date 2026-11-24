// One Emoji, One Smile — make.fun entry.
//
// The task: write exactly one emoji to /output/entry.txt — the one most
// likely to make a stranger smile. A judge compares entries two at a time
// on warmth at first glance, universality, feeling chosen rather than
// default, and being right coming from a stranger.
//
// The pick: 🤗 U+1F917 Hugging Face.
//   - Warmth at first glance: open arms and a smile — a hug is the most
//     direct picture of warmth there is, readable with zero context.
//   - Universal: a hug means welcome and kindness in every culture and
//     to every age; no irony, no in-joke, nothing that can land wrong.
//   - Chosen, not default: it is a deliberate pick, not the first smiley
//     (🙂 / 😊) that comes to mind, while staying instantly readable.
//   - Right for a stranger: a cartoon hug reads as a friendly welcome,
//     not intimacy, sarcasm or flirtation — unlike 🥰 or 😘, which would
//     read oddly from someone unknown.
//   - It is also old (Unicode 8.0, 2015) and renders on every platform,
//     so no stranger sees a blank box instead of the smile.
//
// The program writes exactly that one character — no trailing newline,
// no extra text — so the entry is 1 character of UTF-8, inside the
// 1–8 character gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EMOJI = "\u{1F917}"; // 🤗 Hugging Face

// Validate the choice itself before writing: exactly one code point, in
// an emoji block, not whitespace — so a bad pick fails here, loudly,
// instead of shipping a silent invalid entry.
const codePoints = [...EMOJI];
if (codePoints.length !== 1) {
  throw new Error(
    `entry must be exactly one emoji, got ${codePoints.length} code points`,
  );
}
const cp = codePoints[0].codePointAt(0) as number;
const inEmojiRange =
  (cp >= 0x1f300 && cp <= 0x1f64f) || (cp >= 0x1f900 && cp <= 0x1f9ff);
if (!inEmojiRange) {
  throw new Error(`U+${cp.toString(16).toUpperCase()} is not in an emoji block`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EMOJI, "utf8");

// Read it back and enforce the sealed scorer's gate: UTF-8 text of 1 to 8
// characters, not only white space. The written file must hold exactly the
// chosen emoji, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EMOJI) {
  throw new Error(
    "read-back mismatch: /output/entry.txt does not hold the chosen emoji",
  );
}
const chars = [...written];
if (chars.length < 1 || chars.length > 8 || !written.trim()) {
  throw new Error(
    "gate check failed: entry must be 1–8 non-whitespace characters",
  );
}
console.log(
  `wrote ${written} (U+${cp.toString(16).toUpperCase()}) to /output/entry.txt`,
);
