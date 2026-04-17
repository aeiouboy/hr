# Humi Brand Logo System — Status

**Date**: 2026-04-17
**Requested by**: พี่บอย (Rungrote)
**Owner**: พี่เคน
**Location**: `/Users/tachongrak/stark/projects/hr-platform-replacement/logo-concepts/v2/`

## Hard constraints
- Brand name: **Humi** (next-gen HR platform replacing SAP SuccessFactors)
- **NO RED / NO CRIMSON** (avoid Central Group brand conflict)
- Warm, people-centric, enterprise-ready
- Target audience: executive review

## Current deliverable
**File**: `humi-brand-deck.png` (2120×11564, 4.5 MB master)
**Shareable variants**:
- `humi-brand-deck.jpg` — 921 KB · full res · email/Slack
- `humi-brand-deck-small.jpg` — 504 KB · 60% · LINE/Messenger
- `humi-brand-deck-small.png` — 2.1 MB · 60% · lossless backup

## 18 directions · 3 families

### Family A · Wordmark-led (01–06)
Typography IS the mark. Linear / Gusto / SuccessFactors territory.
- 01 The Minimal Dot — `humi.` (amber accent dot)
- 02 The Enterprise Wordmark — `Humi` (monochrome)
- 03 The Chip Lockup — `[h] humi` (teal chip)
- 04 The Humanist — `humi` (flared terminals)
- 05 The All-Caps — `HUMI` (purple-indigo)
- 06 The Dot Mark — `◯ humi` (i-dot extracted)

### Family B · Mark-led symmetric (07–12)
Symbol-first, wordmark supports. Airbnb Bélo / Mastercard / Asana territory.
- 07 The People Wreath — 6 persons radial (6-fold rotational)
- 08 The h-Chip — h inside teal rounded square
- 09 The Network Diamond — 4-node hub
- 10 The Growth Peaks — twin peaks + arrow
- 11 The Honeycomb Cell — concentric hexagons
- 12 The Orbital Dot — ring + top dot

### Family C · Horizontal gradient lockups (13–18) ← NEW
Mark left, wordmark right. Slack / Instagram / Linear territory.
- 13 The Gradient Chip — `[h] humi` (teal→amber diagonal)
- 14 The Sunrise Arc — `∩ humi` (amber→coral→plum sweep)
- 15 The Ascending Bars — 5 discrete-color bars
- 16 The Gradient Orb — vertical teal→amber circle
- 17 The Overlapping Circles — translucent teal/amber/plum blending
- 18 The Gradient Letter — standalone `h` with diagonal gradient

## Workflow
1. Prompt files: `prompts/01.md` – `prompts/18.md`
2. Batch JSONs: `batch.json` (01–06) · `batch-mark-led.json` (07–12) · `batch-gradient.json` (13–18)
3. Generator: OpenRouter `google/gemini-3.1-flash-image-preview` via baoyu-imagine skill
4. Deck composer: `make_deck.py` (PIL, 3 families + dark footer)

## Regenerate deck
```
python3 /Users/tachongrak/stark/projects/hr-platform-replacement/logo-concepts/v2/make_deck.py
```

## Next (after direction lock)
1. Color system (primary/secondary palette lock)
2. Typography pairings
3. Favicon + app icon
4. Dark mode
5. Usage guidelines
6. Business card + header template
