# Cleo Abram (Huge If True): Animation & Typography Breakdown

Project name: **Cleo Abram skill**. Storyboard board: https://claude.ai/artifact/6WG69z9UbaL59mdnRtg4q1

Sources analysed (downloaded 2026-11-12, 1080p, 23.976 fps):

| Video | Runtime | Graphic scenes | Animated seconds |
|---|---|---|---|
| Neuralink's Newest Brain Chip Isn't What You Think (`Vna0hkq7U1g`) | 17:47 | 54 (48 animation + 6 overlays) | 389 s (36%) |
| The Most Likely Place to Find Aliens (`YkEwyFpxWFc`) | 39:06 | 84 (77 + 7) | 728 s (31%) |
| Sam Altman Shows Me GPT 5... And What's Next (`hmtuvNfytjM`) | 1:05:07 | 8 (6 + 2) | 44 s (1%) |

Two formats show up. **Explainer episodes** are about one-third animation: 3D worlds, diagrams and hero words. **Conversations** (the interview) are almost all camera, with graphics only in the cold open, the title, the guest-question supers and the end card.

## Folder map
- `downloads/`: source MP4s and auto-captions
- `<id>/shots/`: frame-accurate cut list + per-shot contact sheets (manual tagging source)
- `tagged_shots.json`: hand-tagged animation / overlay shot ids per video
- `<id>/scenes.json` + `<id>/notes.json`: scenes (grouped shots) with timings, keyframes and notes
- `<id>/clips/S##.mp4`: every animated scene cut out as its own clip; `<id>/animation_reel.mp4`: all of them back-to-back
- `<id>/evidence/`: video-style-analyzer output on the reel (summary.md, sheets, bursts, palette, OCR)
- `motion/`: frame-by-frame filmstrips used for the timing numbers below
- `type/`: type crops
- `board/`: the storyboard page and its images

## Signature moves
1. **One metaphor world per film.** Clay-shaded 3D on a dark navy stage (`#0E1823`→`#1A293C`) or a teal blueprint grid (`#19658B`). Neuralink builds "brain highways" and a stadium; Aliens builds a CRT-curved "Map of Known Exoplanets" HUD. The film keeps cutting back to the same world (Neuralink returns to the cable-highway world about 10 times).
2. **Lime is the voice.** `#C6FF01` heavy caps for every word that matters, with a dark drop or extrude. Arrows, highlighter swipes, check marks and magnifier rings use the same lime. It appears in 100% of hero words and labels across all three videos.
3. **Explaining on top of the picture.** Hand-drawn arrows (white or lime), magnifier circles joined by a cone, dashed connectors, orthogonal "circuit" lines with nodes, and charts that draw in lockstep with the 3D action. The same vocabulary sits on 3D, stock footage, scanned papers and live action.
4. **The HUGE\* brand frame.** A 0.12–0.25 s colour-swap title sequence, asterisk-bullet lower thirds, a grey `HUGE*` corner bug on every graphic in the Aliens episode, `* SOURCE:` credits bottom-left, and a split teal/sage end card.

## Structure
- **Cold open (0:00–1:00):** a fast montage of the film's own best graphics, like a trailer. Aliens S06 shows 7 explainers at 0.5 s each. The Altman open runs at 62 cuts/min.
- **Title (≈0:50–1:20):** HUGE\* or HUGE\* CONVERSATIONS, 7–11 s, then an episode title card for conversations ("\*SUPERINTELLIGENCE: PART 1").
- **Body:** host or interview footage alternating with explainer blocks of 5–30 s. Each new concept gets its name as a hero word (TRANSIT METHOD, DOPPLER METHOD, DIRECT IMAGING, ASTROMETRY, UTAH ARRAY, THE LINK, STARSHADE).
- **Mid-roll ad:** keeps the house style (lime highlighter on the sponsor UI, a lime-ring `*AD` badge top-left or top-right, a lime URL super). Ads reuse the explainer kit: an x-ray dog, icon callouts, free-radical circles.
- **End card:** 12–15 s split screen.

## Typography

| Role | Spec | Size / position | Font candidates (free match) |
|---|---|---|---|
| Brand / title | Ultra-black grotesque caps, lime fill, ~2 px black outline, deep-teal `#1B4247` block extrude down-left ≈5% of cap height | full-bleed to ~60% width | Obviously Black / Sharp Grotesk Black (Archivo Black), medium confidence |
| Hero word | Heavy grotesque caps, 1–3 words per line, leading ~0.95, lime with a 3–6 px dark drop. Sometimes 2 colours (white line + lime line: "LIFE AS WE / DON'T KNOW IT") | 6–9% frame height; centred, or right third next to the object | same family |
| Label chip / callout | Bold caps 1.2–2% height, white on dark or black on lime/colour chip, with a leader line to the object; region colour = chip colour (lime, blue, red) | beside the object | Barlow Semi Condensed ExtraBold |
| Stat | Big lime numerals + white tracked small caps unit line ("15-20% / OF CARDIO OUTPUT", "1.4KG / ~3LBS") | 5–7% height | Archivo Black + Inter Bold |
| Lower third | Lime `*` + NAME white heavy semi-condensed caps (~3.3%) + ROLE small caps (~1.8%, 90% opacity), soft shadow | bottom-left, x≈7%, y≈88% | Barlow Semi Condensed ExtraBold |
| Guest-question super | Circular avatar with a lime ring + 2 lime plates ("QUESTION FROM:" / "NAME, TITLE") in black condensed caps, 1 px dark keyline | top-right, y≈12% | Barlow Condensed ExtraBold |
| Statement word | White heavy sans caps, ~+30% tracking, locked centre over a flash montage | ~6% height | Inter Black / Helvetica Now Black |
| Equation | Lime heavy letters, grey ×, subscripts 55%, leader lines to tiny white caps captions; heading in white bold caps + small subtitle | equation ~7% height | Archivo Black |
| Planet name / typewriter | Lime caps typed with a cursor + white small distance line | bottom-left | Archivo Black |
| HUD / chart micro | Light thin sans headers (MAP OF KNOWN EXOPLANETS), bold tracked caps axes | 1–1.5% height | Inter |
| Sentence voice | Geometric sans in sentence case on coral `#FD7966` blocks (Altman end card); credits on grey plates | — | Futura PT (Jost Medium) |
| Ad / URL | Lime heavy caps URL bottom-centre ("MERCURY.COM") | ~4% height | Archivo Black |

**Emphasis system:** colour (lime) carries the emphasis, never italics or underline. On documents and news headlines the key word gets a lime highlighter swipe (5 of 5 headline and document moments).

## Motion & animation (measured, 24 fps)

| Element | Property | Frames / ms | Easing | Evidence |
|---|---|---|---|---|
| Lower third | `*` scale 0→100%, name blur-slide from right, role fade, then a slow ~3%-width drift for the hold | 12f / 500 ms in; name +2f, role +8f | fast ease-out + linear drift | `motion/lowerthird_in.jpg` |
| Label / stat pop | appears on the impact frame at 115%, settles to 100%; the object squashes on the same frame | 3–4f / 150 ms | overshoot ease-out, no fade | `motion/label_1p4kg.jpg` |
| Hero words | word-by-word pop 115→100% | 3f each, 9f / 375 ms apart | overshoot | `motion/tracked_ourstar.jpg` |
| Label → icon swap | label scales out, icon scales in, background defocuses | 8–12f | ease-out + DOF pull | `motion/heroword_bci.jpg` |
| Typewriter | letters L→R with a block cursor; HUD headers type too | ~1 char/frame | linear | `motion/typewriter_hd209458.jpg`, `motion/typewriter_transit.jpg` |
| Equation build | term every 12f, leader line drops ~6f, caption types | ~84f for 7 terms | hard-in | `motion/equation_drake.jpg` |
| 3D ribbon text | letters fly along a curved 3D path and flatten | 18f / 750 ms, 1 letter/f | strong ease-out | `motion/swoop_directimaging.jpg` |
| Plate unroll | lime plates mask-wipe L→R with text, row 2 +3f | 19f / 800 ms | linear | `motion/question_super.jpg` |
| Line / chart draw | plot line drawn in lockstep with the moving object; labels after the line | matches action | linear along path | `motion/chart_transit.jpg` |
| Magnifier inset | circle scales from a point + cone | ~10f | ease-out | board: Aliens S25/S28, Neuralink S16 |
| Arrow | hand-drawn arrow draws on, then idles with a small bob | ~8f + loop | ease-out | `motion/arrow_dan.jpg` |
| Title sequence | colourway swaps, row stacking, giant-letter pan, shrinking asterisk | cut every 3–6f | hard cuts on beat | `motion/title_huge_cadence.jpg` |
| Flash montage under locked word | background hard-cuts | every 5–6f | — | Altman S03 |
| Scratch transition | film-burn colour wash, white scratch lines, Kodak edge text, soft white bloom circle | 8–12f | hard in, fade out | `motion/scratch_transition.jpg` |
| 3D camera | dolly / orbit / fly-through; chase cams at constant speed | 4–10 s moves | slow ease-in-out | board: Neuralink S15, S41–S44 |
| Idle | wifi arcs pulse, arrows bob, data dots stream along cables | continuous | linear loops | board |

Not used: bounce-in springs on whole layouts, glitch as a style (only one 0.25 s glitch in a montage), whip pans, speed ramps (except one VHS "REW" gag).

## Editing & camera
- Explainer reel: 18.1 cuts/min, avg shot 3.3 s, median 2.8 s. Cold opens / titles: 62 cuts/min, median 0.17 s.
- 78 of 124 cuts in the Neuralink animation reel land within 80 ms of an audio onset (waveform statistics, not listening).
- Borrowed or stock footage is boxed: a gold rounded "viewfinder" bracket at the left edge plus a `* SOURCE:` credit (Aliens S17/S18/S47/S78).
- Comedy beats live inside the explainers: a rooster for scale, a giant cartoon glove, KUNG FU SKILLS, a "REW" rewind.

## Colour & look

| Role | Hex |
|---|---|
| Accent / voice | `#C6FF01` lime |
| Brand dark | `#1B4247` deep teal |
| Brand light | `#B2BCB1` sage |
| Title colourways | `#0766F3` blue, `#FD7966` coral, mauve (est. `#5E4652`) |
| 3D stage | `#0E1823` → `#1A293C` navy; blueprint `#19658B` |
| Hero object | `#D36699` brain pink |
| Micro labels / arrows | `#F1F1F3` |
| Warning | alert red (est. `#E8343A`) |

Grade: clean, slightly cool, high saturation only on the hero object and lime. Explainer frames average 0.28 brightness / 0.50 saturation: dark stages that make lime pop. A grey `HUGE*` bug sits bottom-right on every graphic in the Aliens episode.

## Layout
- The hero object sits centre or left third; the hero word goes right third or centre-top, never over the object's focal point.
- Labels attach to objects with leader lines; nothing floats without a pointer.
- Charts are inset over a defocused background (stadium blur) or docked as a corner PiP card.
- Supers: lower third bottom-left; guest question top-right; AD badge top corner; source credit bottom-left; HUGE\* bug bottom-right.

## Sound & sync (from waveform statistics only)
Music bed under all graphics. Rough onset tempo 158–177 bpm in the reels. Title and montage cuts sit on beats. Label pops coincide with impacts. Pop/whoosh SFX are implied but not verified by ear.

## How to recreate
**After Effects / Premiere:** Build the hero word as Archivo Black caps, fill `#C6FF01`, drop shadow 0° offset 4 px down, 0 blur, colour `#0B2A12`. Scale keyframes 115%→100% over 3 frames (Easy Ease Out, influence 80%), with no opacity fade. For the lower third: shape-layer asterisk scale 0→100 in 4f; the name slides from +40 px with Directional Blur 20→0 over 5f; the role starts 6f later and fades in 4f; give the whole group a linear −3% x drift for its hold. Draw lines and arrows with Trim Paths, linear. Make the magnifier from a circle mask scaled 0→100% in 10f, ease-out, plus a 30%-opacity lime cone.

**CapCut:** Text template: bold sans caps, lime `#C6FF01`, shadow on (distance 4, blur 0, dark green). Use the "Pop" in-animation set to 0.2 s and stagger words by 0.4 s. For arrows use stickers plus the "Wipe" in-animation. Lower third: "Slide right" in at 0.5 s.

**Remotion (this repo):** see `skill-draft/cleo-abram/SKILL.md` for the token block and spring values.

## Confidence & gaps
- **Measured:** timings (frame strips), colours (k-means and pixel medians on clean frames), pacing (frame-accurate cut lists), positions (approximate, from frames).
- **Estimated:** font identities (anatomy-based; the brand face is custom-looking and the free matches are approximations), the alert red and mauve hex values, sound design (no listening).
- **Classification:** animation scenes were tagged by hand from shot sheets. Real footage of products and labs was excluded, and some NASA/third-party renders were included because they are cut as part of the explainer (they carry a `* SOURCE:` tag).
- The Altman interview adds little animation. Another explainer episode would firm up the 2D diagram rules.


---

## Batch 2 (added 2026-11-12): three more videos

| Video | Runtime | Graphic scenes | Animated seconds |
|---|---|---|---|
| The Shoe That Broke Running (`pfIWxFIVP_Y`) | 15:45 | 39 (36 + 3) | 353 s (37%) |
| What If You Just Keep Digging? (`N0-ZZ9pLyWw`) | 10:29 | 30 (29 + 1) | 489 s (78%) |
| Quantum Computers, explained with MKBHD (`e3fz3dqhN44`) | 17:00 | 27 (25 + 2) | 310 s (30%) |

**Totals across six videos:** 242 scenes, 2,312 s (38.5 min) of animation.

### What the new videos change
- **The world's medium changes per film.**
  - *Digging* is a flat 2D vector cut-away with grain. A recurring blue drill-pod character makes the journey.
  - *Super shoes* uses a crumpled graph-paper stage with a running-track mat, and footage sits in orange→lime gradient frames on a 3D bleacher set.
  - *Quantum* builds a low-poly video-game island with menus ("CHOOSE YOUR MATH LEVEL"), a mathematical map and achievement toasts.

  So signature move 1 is now "one world per film, in whatever medium fits". Clay 3D is just one option.
- **Constant across all six:** lime `#C6FF01` as the voice, labels pinned to objects, lime highlighter on every document and headline, the HUGE* title sequence, and the split teal/sage end card (two variants: credits on grey plates, or coral blocks with Futura-like sentence case).

### New moves (measured from `motion/`)
| Move | Spec | Evidence |
|---|---|---|
| Flowchart pills | Connector draws (~6f), then glossy pills pop 115→100. Blue→pink question, red italic BANNED, lime italic ALLOWED. The camera pans down the branch; pills ~10f apart. | Super shoes 1:55–2:43 |
| Paper-stage title | Slanted heavy italic caps, blue→lime gradient fill, dark outline, underline rule. Holds with an on-twos boil (jitter every 2f). | `motion/pills_flowchart.jpg` |
| Rubber stamp | Red "PROTOTYPE" lands, then wobbles on twos; a pink flash cuts to the press release. | `motion/prototype_stamp.jpg` |
| Pinned counter | Value pinned to the drill tip counts 0.3→11.9 KM over ~126f (linear) while the camera pulls out to add the trench and Everest for scale. | `motion/depth_counter.jpg` |
| Depth gauge | A left-edge thermometer HUD with a lime pin and a km reading persists through every journey scene. | Digging S04–S30 |
| Chapter card | Fire-textured stacked caps (THE CRUST / THE MANTLE / THE OUTER CORE / THE INNER CORE) on dark red, hard cut. | Digging |
| Light leak | Orange/magenta leak 6f → white 2f on the cut → leak fades 6f. Used between cold-open headlines. | `motion/lightleak.jpg` |
| Pill lower third | Sentence case, white bold, in a dark rounded pill with a lime keyline, bottom-centre (crew members). | Quantum 3:36 |
| Remote-interview board | Video-call panels in dark-teal frames on cream paper (Digging), or in gradient frames on the stadium stage (Super shoes). Layouts swap between one and two panels. | Digging S09–S16, Super shoes S31–S38 |
| Card stacks / polaroids | Scanned figures or photos fan in from the side as a rotated stack. | Digging S20, Quantum S19 |
| Exploded product + numbered callouts | Layers separate vertically, with lime dots, dotted leaders and lime numerals 1–5. | Super shoes S01 |
| Gag cards | OFF-AIR glitch test card; game pause menu; mind-blown particle VFX. | Super shoes S28, Quantum S09/S13 |

These are implemented in `src/cleo/Worlds.tsx` (`PaperStage`, `GradientFrame`, `FlowPill`, `FlowTree`, `Stamp`, `ChapterCard`, `PinnedCounter`, `DepthGauge`, `LightLeak`, `Toast`, `PillLowerThird`, `PaperTitle`, `boil`).
