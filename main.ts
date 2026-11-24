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
import { mkdirSync, writeFileSync } from "node:fs";

const EMOJI = "\u{1F917}"; // 🤗 Hugging Face

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EMOJI, "utf8");
