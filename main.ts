// Make the AI Judge Laugh: Cat Reviews Its Human
// Writes a single one-line review to /output/entry.txt.
//
// The line: a one-star review by a house cat. The grievance only a
// cat would file — the human watches other cats on his glowing
// rectangle for hours, then acts surprised when the reviewer sits on
// it. Deadpan review shape, and the punch lands on the last words:
// "I am the content."

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. He watches other cats on his glowing rectangle for hours, " +
  "then acts surprised when I sit on it. I am the content.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, a single line, not only white
// space. An entry outside those limits is never judged and takes no
// prize, so validate the line against the same limits before writing
// it out — fail fast if the line ever drifts outside the gate.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
