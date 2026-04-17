#!/usr/bin/env python3
"""Append LOCKUP block to concept-01..24 prompts so AI generates mark + 'humi' wordmark together."""
from pathlib import Path

HERE = Path(__file__).parent / "prompts"

LOCKUP = """

LOCKUP OVERRIDE (IMPORTANT — this is a mark + wordmark lockup, NOT a standalone mark):
The illustrated subject described above is the MARK of this logo. Below the mark, render the WORDMARK "humi" — exactly four lowercase letters h-u-m-i in that order, one word, no spaces, no punctuation, no other letters. The wordmark must be rendered in a clean modern bold sans-serif (weight 700-800, similar to Söhne, Inter Bold, Neue Haas Grotesk Bold, or Helvetica Bold) in solid deep navy (#0F172A). The wordmark must be spelled correctly and crisply — h, u, m, i — four letters only, no typos, no doubled letters, no extra glyphs.

LOCKUP COMPOSITION (this overrides any earlier composition instruction):
- Mark centered horizontally in the UPPER 55% of the canvas (not the full canvas). Mark sits with ~8% top margin.
- Below the mark, a 6-8% vertical gap.
- Then the "humi" wordmark centered horizontally, spanning approximately 32-42% of canvas width, sitting in the lower 30% of canvas.
- Entire lockup (mark above + wordmark below) occupies the vertical center with balanced top and bottom whitespace.
- Pure white background, square 1:1, no tagline, no extra marks besides the mark + "humi" wordmark. Must read as a single integrated brand logo at 256×256 preview size."""


patched = 0
for n in range(1, 25):
    p = HERE / f"concept-{n:02d}.md"
    if not p.exists():
        continue
    text = p.read_text()
    if "LOCKUP OVERRIDE" in text:
        continue
    p.write_text(text.rstrip() + LOCKUP + "\n")
    patched += 1

print(f"patched {patched} prompts")
