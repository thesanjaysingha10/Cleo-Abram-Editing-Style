# Cleo Abram (Huge If True): deep pass, 2026-11-13

Second analysis of the same six videos with the updated video-style-analyzer: measured motion curves, sound and sync, textures, 3D, placement rules, the DNA, new ideas and prototypes. The first pass (242 scenes, typography, palette, pacing) is in `CREATOR_STYLE_REPORT.md` and is not repeated here.

Sources (1080p; five at 23.976 fps, Quantum at 29.97 fps). Copies also live in `/Volumes/Ulysses/Data for claude training/cleo abram/`.

Evidence for everything below: `deep/strips/` (32 labelled frame-by-frame strips), `deep/<id>/curves/<name>/curve.json + curve.png` (18 measured animations), `deep/<id>/audio/` (hits, word timings, sync table, spectrogram pages), `deep/tex/texture_sheet.jpg`, `deep/prototypes/`.

## What changed from the first pass

| First pass said | Measured now | Evidence |
|---|---|---|
| Labels and pills "pop 115 → 100 %" | Type and chips grow **up** into place: 74–76 % → 100 % in 2 frames (83 ms). Only photo objects (polaroids) come down from large: 125 % → 100 % over 300 ms. | `label_1p4kg`, `ourstar_our`, `polaroid_drop` |
| Magnifier "scales in ~10f, ease-out" | A spring: reaches target in 4 frames (167 ms), overshoots 10–14 %, settled by frame 10–11 (417–459 ms). Same numbers in two different films. | Neuralink `magnifier`, Digging `magnifier` |
| Camera moves "ease-in-out" | Hand-off pans and whip push-ins **ease in only**: they accelerate out of a hold and are cut or caught at full speed. 459–500 ms. | `title_pan`, `whip_push` |
| "Cuts on the music" | Only in the title sequence and cold open. Across the body, graphic cuts land within 80 ms of a sound hit 474 of 787 times (60 %), which is what chance gives (61–66 %). | `deep/<id>/audio/sync.json` |
| Sound: not analysed | See "Sound and sync". | |

## Motion curves (measured)

24 fps unless noted. "Settle" is the full time until the value stops moving; "travel" is the time to first reach the target.

| # | Animation | Property | From → to | Travel | Settle | Family | Overshoot | cubic-bezier (fit) | Evidence |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Label chip "1.4KG" (Neuralink 70.83 s) | scale | 74 → 100 % | 2 f / 83 ms | 2 f | ease-out snap | 0 | (0.15, 0.8, 0.6, 0.7) good | `Vna0hkq7U1g/curves/label_1p4kg` |
| 1 | same | y | rises 2.1 % of frame height | 3 f / 125 ms | 6 f / 250 ms | overshoot | 8 % | (0.4, 1.0, 0.15, 1.2) good | same |
| 2 | Stat "15-20 %" (Neuralink 98.78 s) | scale (reveal) | 0 → 100 % | 5 f / 209 ms | 5 f | ease-out | 0 | (0, 1.0, 0.25, 0.9) good | `curves/stat_15_20`. Reads as a left-to-right wipe: x centre travels 57 → 78 % in 375 ms. |
| 3 | Lower third (Neuralink 184.2 s) | x | drifts left 13.5 % of width | 17 f / 709 ms | 18 f | slow slide, eased both ends | 7 % (noise) | (0.3, 0.4, 0.25, 0) good | `curves/lowerthird`. Live-action background, treat as approximate. |
| 4 | Magnifier + cone (Neuralink 283.17 s) | scale | 58 → 100 % | 4 f / 167 ms | 10 f / 417 ms | spring | 10 % | (0.05, 1.1, 0.65, 1.2) good | `curves/magnifier` |
| 4 | same | x | 36 → 26.5 % | 4 f / 167 ms | 11 f / 459 ms | spring | 14 % | (0.15, 1.1, 0.55, 1.3) good | same |
| 5 | Magnifier + cone (Digging 500.99 s) | scale | 83 → 100 % | 7 f | 14 f / 584 ms | spring | 12 % | (0.15, 0, 0.25, 1.5) good | `N0-ZZ9pLyWw/curves/magnifier` |
| 6 | Icon tile on a lane (Neuralink 955.43 s) | y | drops 4.8 % | 6 f / 250 ms | 7 f / 292 ms | ease-out | 6 % | (0, 0.7, 0.8, 1.0) good | `curves/tile_pop`. Tiles 2–4 frames apart, left to right. |
| 7 | "OUR" on the prop (Aliens 186.53 s) | scale | 76 → 100 % | 2 f / 83 ms | 2 f | ease-out snap | 0 | (0.15, 1.0, 0.95, 0.7) good | `YkEwyFpxWFc/curves/ourstar_our` |
| 7 | same | y | rises 3.5 % | 3 f / 125 ms | 11 f / 459 ms | spring | 36 % | rough fit: use progress list | same. Text is tracked to a moving prop, so part of this is the track. |
| 8 | "STAR" (8 frames after "OUR") | scale | 29 → 100 % | 10 f / 417 ms | 10 f | ease-out | 0 | (0.35, 1.1, 0, 0.7) rough | `curves/ourstar_star`. Enters low and rotated, then settles. |
| 9 | Drake equation term (Aliens 1436.64 s) | scale | 18 → 100 % | 5 f / 209 ms | 5 f | ease-out | 0 | (0.45, 0, 0, 0.7) rough | `curves/drake_term`. Terms land 12 frames (0.5 s) apart: f4, 16, 28, 40, 52, 66, 78. |
| 10 | Whip push-in on a UI (Altman 25.60 s) | scale | 45 → 100 % | 11 f / 459 ms | 11 f | **ease-in** | 0 | (1.0, 0.3, 0.65, 0.7) good | `hmtuvNfytjM/curves/whip_push`. Heavy motion blur on the last 3 frames. |
| 11 | Flowchart pill (Shoe 628.92 s) | scale | 86 → 100 % | 4 f / 167 ms | 10 f / 417 ms | spring | 5 % | poor fit: use progress list | `pfIWxFIVP_Y/curves/pill_pop` |
| 11 | same | y | rises 5.5 % | 9 f / 375 ms | 9 f | ease-out | 0 | (0.15, 0.8, 0.95, 0.9) good | same |
| 12 | YES pill (Shoe 630.95 s) | opacity | 0 → 100 % | 8 f / 334 ms | 8 f | ease-out | 0 | (0.05, 0.6, 0.05, 0.8) good | `curves/pill_yes`. NO follows 4 frames later. Connector draws for 10 frames first. |
| 13 | Camera pan down off the title (Shoe 117.97 s) | y | 41 % of frame height | 12 f / 500 ms | 12 f | **ease-in** | 0 | (0.35, 0.1, 0.85, 0.3) good | `curves/title_pan` |
| 14 | Exploded shoe, top layer (Shoe 33.76 s) | scale / spread | 40 → 100 % | 7 f / 292 ms | 7 f | ease-out | 0 | (0.3, 0.1, 0, 0.9) good | `curves/explode_top`. Numbers 1–5 then pop 4 frames apart. |
| 15 | Arrow on footage (Quantum 216.00 s, 30 fps) | x/y | slides 2–3 % along its own axis | 12 f / 400 ms | 13 f / 434 ms | anticipation 17 %, then ease-out | 6 % | (0.25, −0.6, 0, 0.7) good | `e3fz3dqhN44/curves/arrow_pop`. Second arrow 20 frames (0.67 s) later. |
| 16 | Polaroid drop (Quantum 722.79 s, 30 fps) | scale | 125 → 100 % | 9 f / 300 ms | 9 f | ease-out | 0 | (0, 0.3, 0.1, 0.7) rough | `curves/polaroid_drop` |
| 17 | Achievement toast (Quantum 948.88 s, 30 fps) | width (mask) | grows outward from the island | ~10 f | 25 f / 834 ms | wipe, then items pop | n/a | not a single curve | `curves/toast` + `strips/q_S26.jpg`. Items pop 4–6 frames apart. |
| 18 | Depth counter + pull-out (Digging 6.5 s) | value | +0.1 km per frame, constant | linear | whole shot | **linear** | 0 | linear | `strips/d_S02.jpg`. The camera pulls out over ~1.5 s while the count never changes speed. |

Read from strips, not curve-fitted:
- **Typewriter hero word on an arc** (Aliens 280.28 s, `strips/a_S27.jpg`): 13 letters in 14 frames, warped on a curve while typing, flat by frame 20. Leaves on a 4-frame white bloom.
- **Equation title**: 1 character per frame. Leader lines drop in ~6 frames, linear, then the caption types under them.
- **"THE [object] LINK"** (Neuralink 497.19 s, `strips/n_S32.jpg`): product parts collapse for 2 s, then THE hard-cuts in, LINK 6 frames later. No fade, no scale.
- **Headline wall** (Shoe 232.5 s, `strips/s_S15.jpg`): each headline holds 24–26 frames (about 1.0 s), hard cut, highlight already drawn on frame 1. Only the first card fades up from white (4 frames).
- **Paper title** (Shoe 115.5 s): words arrive in 10 frames, hold 2.3 s, then the camera leaves (row 13).

### The three speeds

Everything measured falls into three groups. This is the most useful single finding.

| Group | What | Timing | Curve |
|---|---|---|---|
| **Snap** | Type, chips, numerals | 2 frames (83 ms), 75 → 100 % | ease-out, no overshoot on scale; a small 8 % rise overshoot on y |
| **Spring** | Insets, magnifiers, pills, tiles, objects | 4 frames to target (167 ms), settled in 10–11 (417–459 ms) | 5–14 % overshoot, one bounce |
| **Glide** | Camera and stage | 459–500 ms hand-offs; 1.5–5 s journeys | ease-in for hand-offs, linear for counts and travelling pulses |

Offsets between properties: scale finishes first (frame 2), position settles after (frame 6–11). Exits are not animated: 30 of 32 strips end on a hard cut or a camera move. The two exceptions are white bloom flashes (4 frames).

## Kinetic typography

- **Unit:** the word. Letters animate only in typewriter moments (names, coordinates, equation titles).
- **Order:** left to right, top to bottom. Never random, never centre-out.
- **Stagger between words:** 6–8 frames (THE → LINK 6 f; OUR → STAR 8 f). Between list items: 12 frames (0.5 s). Between arrows on footage: 0.67 s.
- **Reveal:** scale snap from 75 %. Typewriter at 1 char/frame for titles, about 1 letter/frame for hero words.
- **Hand-over:** hard replace or camera move. Text never slides out.
- **Text and footage:** tracked onto props (OUR STAR on the lamp), pinned to objects with a dot and leader, or attached to a moving tip (depth counter).

## Sound and sync

Speech-to-text was not run; word timings come from YouTube auto-captions (first word of each caption line is missing, so word offsets are ±100 ms at best). Taste, instruments and mix are estimates.

| Video | Hits/min | Graphic cuts within 80 ms of a hit | Animations within 80 ms of a hit | Chance |
|---|---|---|---|---|
| Neuralink | 400 | 77 / 125 | 15 / 19 | 66 % |
| Aliens | 408 | 125 / 207 | 8 / 12 | 63 % |
| Super shoes | 357 | 56 / 99 | 7 / 10 | 65 % |
| Digging | 369 | 68 / 127 | 8 / 10 | 65 % |
| Quantum | 331 | 100 / 161 | 5 / 6 | 61 % |
| Altman | 426 | 48 / 68 | 3 / 4 | 61 % |
| **All** | | **474 / 787 (60 %)** | **46 / 61 (75 %)** | 61–66 % |

What that means:
- **Body cuts are not beat-locked.** The mix is dense (6–7 hits a second from speech plus a music bed), so a 60 % hit rate is chance. Cut to the sentence, not the beat.
- **Animation starts sit slightly above chance** (75 % vs ~64 %): there is usually a small sound on a pop, but with 61 samples this is a lean, not a rule.
- **Labels land on the noun.** 1.4KG appears 15 ms before "as heavy"; the arrow lands 3 ms from "Cody"; OUR appears 147 ms before the word "our". Rule: the visual arrives 0–150 ms **before** the word, never after.
- **Explainer builds trail the sentence.** The magnifier opens 233 ms after "read those"; the stat arrives 223 ms after "a fifth". The object appears as the idea completes.
- **Title tail is on a grid:** regular full-height hits every ~0.55 s (≈110 bpm, estimate) at 60–63 s in Neuralink (`Vna0hkq7U1g/audio/spectro/page_00060s.jpg`). This is where the 3–6 frame colour swaps sit.
- **Silence before a world change:** a ~100 ms dropout at the cut into the flowchart (Shoe 628.35 s), then a low thump as the first pill lands (`pfIWxFIVP_Y/audio/spectro/page_00615s.jpg`).
- A continuous low music bed sits under speech in every explainer block; it does not duck audibly in the spectrogram (estimate).

## Textures and backgrounds

Tight crops in `deep/tex/texture_sheet.jpg`. "Grain" is the standard deviation of the high-pass of a flat area (0 = clean vector, 25 = heavy paper).

| Stage | Base | Grain | What it is | Rebuild |
|---|---|---|---|---|
| Navy clay stage (Neuralink) | #202C3E, vertical gradient #0E1823 → #1A293C | 0.2 | Clean render, faint blueprint grid on the floor only | Linear gradient + 1 px grid at 6 % white, no noise |
| Charcoal product stage | #282828 | 1.3 | Faint waveform etching in the backdrop | Solid + 4 % white line art, static |
| Graph paper (Shoe) | #E0E0E1 | 5.7 | Two grid weights (minor ~46 px, major ×5 at 1080p), strong radial vignette to #B8B8B8 | CSS grid lines + radial gradient; boil every 2 frames by ±1 px |
| Torn paper tags / headline paper | #E7E7E7–#F9F9F9 | 24–26 | Scanned paper fibres and specks, rough torn edge, hard offset shadow | Paper texture overlay (multiply, 60 %) + displacement on the mask edge |
| Flat 2D strata (Digging) | #A64A2E family | 4.0 | Vector shapes with hand-drawn dashes and dots inside each layer | Flat fills + a dash pattern per layer; no global grain |
| Dark felt (Digging core) | #312E2A | 1.1 | Fine square grid, big soft rings | Solid + 3 % grid |
| CRT star map (Aliens) | #28292B | n/a | Barrel distortion, rounded corners, vignette, lime HUD lines | Lens-distort −12 %, corner radius 3 %, vignette 40 % |
| Low-poly island (Quantum) | #1FA2E2 | 1.8 | Flat-shaded 3D, pixelation transition in (blocks shrink 32 → 1 px over 12 frames) | Mosaic effect keyed 32 → 1 |
| UI gradient (Altman) | #F2D0D9 | 4.7 | Pastel mesh gradient with fine scan lines | Mesh gradient + 2 px horizontal lines at 3 % |
| Polaroid board (Quantum) | #1C1712 | 8.7 | Dark cork/grid, white-bordered photos at ±6° | Solid + grid; photos with 14 px white border, 4 px bottom-heavy |

Rule: **texture lives on the stage, never on the voice.** Lime type and chips are flat fills with a clean dark drop on every stage, from grain 0.2 to grain 26.

## 3D and depth

- **Real 3D** (perspective changes with the camera, consistent lighting): Neuralink brain, head, product explode, highway; Super shoes exploded shoe and bleachers; Quantum island; Aliens map. Likely a full 3D package (Blender or Cinema 4D class), high confidence; not After Effects 3D layers.
- **Materials:** matte clay with soft specular (brain, head); glass/x-ray with a 2 s cross-dissolve from opaque (Neuralink 208.5–210.3 s, `strips/n_S13.jpg`); glossy plastic pills with a top highlight and a 4 px darker base (2.5D, drawn not rendered).
- **Lighting:** soft key from upper left, rim light on the right edge, contact shadow under objects, no hard shadows on the navy stage.
- **Camera:** slow push-ins (5 s), orbits around the hero object, fly-alongs that follow a travelling pulse at constant speed, a pull-out that keeps the counter linear. Hand-offs are ease-in (500 ms).
- **Depth of field:** shallow on product shots and document push-ins (surrounding text blurred); deep on diagram stages.
- **2.5D** everywhere else: flat layers with drop shadows on paper, footage in frames on a 3D stage.
- **Motion blur:** real on camera whips (3 frames), none on type snaps.

## Why the motion is where it is

| Trigger | Animation | Job |
|---|---|---|
| A concrete noun or number is spoken | Snap label or stat next to the object, 0–150 ms before the word | Name the thing |
| "Inside", "zoom in", "so small that…" | Magnifier spring with a cone from a lime dot | Change scale without losing the wide shot |
| A list or a formula | Terms 0.5 s apart, each with a leader and caption | Pace the reading to the voice |
| A decision or rule | Flowchart: connector draws 10 f, pills spring, camera pans down the branch | Show logic as a path |
| A claim about the world ("everyone said…") | Headline wall, 1.0 s per card, highlight pre-drawn | Proof by volume |
| A new chapter or a new scale | Hard cut to a chapter card, or an ease-in camera hand-off | Reset attention |
| A person is introduced | Asterisk lower third, slow 700 ms slide; or arrow + pill on a group shot, 0.67 s apart | Credit |
| A journey (depth, distance, time) | Linear counter pinned to the moving tip + camera pull-out | Feel the size |
| A joke | Gag card (stamp, OFF-AIR, pause menu), under 1 s | Release |

Placement rules:
- If the line names an object that is on screen, label it. If the object is not on screen, cut to the world first; never label empty space.
- If two things would enter within 6 frames of each other, stagger them. Nothing in 32 strips enters simultaneously with something else.
- If a graphic has finished, leave it still. Between entrances the only motion is the camera or a loop inside the world (pulses, orbits, wifi arcs).
- If the host is on camera, graphics sit beside or on a prop, never across the face. Full-screen worlds replace the host for 5–30 s.
- Density: cold open 1 graphic event every 0.5–1 s; body explainer blocks one every 0.5–2 s; interviews one every several minutes (supers only).
- Never animate an exit. Cut, or let the camera leave.

## The DNA

1. **Text snaps, objects spring, cameras glide.** Three speed classes, never mixed on one element (rows 1, 4, 13).
2. **The label arrives just before the word.** 0–150 ms early on nouns; builds trail the sentence by ~230 ms (sync table).
3. **Everything is attached.** Every label has a dot, leader, cone or track to a thing (`strips/s_S01.jpg`, `d_S21.jpg`, `a_S20.jpg`).
4. **One at a time, half a second apart.** Sequences run at 12 frames per item (Drake f4/16/28/40/52/66/78).
5. **The stage carries the texture, lime carries the meaning.** Grain 0.2 to 26 on the stage; the voice is always flat lime.
6. **Nothing leaves by itself.** Exits are cuts or camera moves (30 of 32 strips).

## New ideas (proposals, not observed in the source)

| id | Name | Pitch | From | What is new | Build spec | Where | Difficulty | Status |
|---|---|---|---|---|---|---|---|---|
| cleo-01 | Spring-cone stat | The magnifier cone opens onto a counting number instead of a picture | DNA 1, 3; row 4 | A stat gets a physical source point | Cone from a 12 px lime dot; circle scale uses the measured spring (0, .57, .78, .92, 1, 1.04, 1.08, 1.10, 1.08, 1.06, 1.03, 1); position clamps at 1; number counts linear over 30 f; unit line snaps 74 → 100 % at +10 f | A stat about a part of something | Remotion / AE | **prototyped** `deep/prototypes/spring-cone-stat/` |
| cleo-02 | Label ladder | One chip per spoken noun down a stacked object, each on its word | DNA 2, 4 | Word-locked timing as the layout rule | Dot → leader draws linear 6 f → chip snaps (74 → 100 %, 2 f) with the 8 % rise; minimum 12 f between chips; chip start = word start − 100 ms | "It has an upper, foam, a plate…" | Remotion / AE / CapCut | **prototyped** `deep/prototypes/label-ladder/` |
| cleo-03 | Ease-in pan hand-off | The hero word never exits; the camera accelerates away to the diagram already waiting below | DNA 1, 6; row 13 | Replaces a cut between a title and its diagram | World 2 screens tall; hold 40 f; pan 0.72 screen in 12 f on the measured ease-in list; a connector line runs from word to diagram | Concept name → how it works | Remotion / AE | **prototyped** `deep/prototypes/ease-in-pan-handoff/` |
| cleo-04 | Fixed stat, moving world | The lime number stays dead centre and counts while the 2D world scrolls under it | Invert of row 18 | Source moves the label; this moves the world | Counter linear; background translate linear; pull-out 1.5 s ease-in-out at the end to reveal scale objects | Any journey: money, distance, years | Remotion | proposed |
| cleo-05 | Prop pair | Two-word lime label tracked on something the host is holding, 8 frames apart | Transfer of row 7 to a talking head | Works with no 3D at all | Track a point; word 1 snaps; word 2 at +8 f enters 29 % and rotated −6°, settles in 10 f | Sanjay's A-roll with a phone, laptop or product in hand | AE (tracker) | proposed |
| cleo-06 | Vertical equation | The Drake build stacked for 9:16: terms top to bottom, captions to the right | New format of row 9 | Reads on a phone | Terms 12 f apart, scale 18 → 100 % in 5 f; leader runs right, linear 6 f; caption types 1 char/f | "Views = hook × retention × …" style business formulas in reels | Remotion / AE | proposed |
| cleo-07 | Verdict stamp on a flowchart | Pills branch, the losing branch dims to 40 %, a stamp lands on the winner | Recombine rows 11–12 with the stamp | The tree ends in a decision | Connector 10 f; pills spring (5 % overshoot); dim 6 f linear; stamp 140 → 100 % in 4 f with a ±2° wobble on twos | "Should you…?" segments | AE | proposed |
| cleo-08 | Headline wall with a tally | 1.0 s headline cards, plus a lime counter in the corner that snaps +1 on each cut | Push of the headline wall | Volume becomes a number | Cards hard cut every 24 f, highlight pre-drawn; counter snaps 74 → 100 % on the cut frame | "Everyone was saying it" | CapCut / AE | proposed |
| cleo-09 | Texture swap, word holds | The stage cross-fades from navy to paper while the lime word does not move | Fill a gap from DNA 5 | Uses the voice as the constant across worlds | 12 f cross-dissolve on the background only; word and its drop shadow untouched | Chapter change inside one topic | Remotion / AE | proposed |
| cleo-10 | Dolly down the cone | The camera travels along the magnifier cone into the inset, which becomes the new world | Push of row 4 into 3D | The inset is a place, not a picture | Spring opens the magnifier; hold 20 f; 500 ms ease-in dolly scaling the inset to full frame; breaks if the inset art is under 2× resolution | "Let's go inside" | Needs 3D or a 2.5D scale-through | proposed |
| cleo-11 | Carousel world | One world per carousel: the same object on every slide, a new chip and leader each swipe | New format | Still images that keep DNA 3 and 5 | 1080×1350; object fixed at 45 % x; chip positions follow the ladder layout | Instagram / LinkedIn carousels | Figma / Canva | proposed |

## Prototypes

Sketches drawn in Python (1280×720, 24 fps), built from the measured progress lists. Source: `deep/prototypes/build.py`.

| Idea | Clip | Intended | Measured on the prototype | Production version needs |
|---|---|---|---|---|
| cleo-01 | `spring-cone-stat/spring-cone-stat.mp4` | spring, 4 f to target, 10 % overshoot, settle 10 f | spring, 3 f to target, 11 % overshoot, settle 10 f / 417 ms | A real object instead of a pink disc; cone as a gradient with soft edge |
| cleo-02 | `label-ladder/label-ladder.mp4` | chips 14–18 f apart, 2 f snap | visible in the filmstrip; not curve-fitted (2-frame events) | Real word timings from the transcript |
| cleo-03 | `ease-in-pan-handoff/ease-in-pan-handoff.mp4` | 12 f / 500 ms ease-in | 12 f / 500 ms, ease-in (tracker fit poor because the blur is crude) | Proper directional blur; a real diagram |

## Confidence and gaps

- **Measured:** the 18 curves (durations to ±1 frame; curve fits marked good/rough/poor), stagger counts from strips, sound-hit rates, grain numbers, background hex values.
- **Approximate:** anything tracked on live footage (lower third, OUR STAR y), the digging pull-out duration, word offsets (caption timings).
- **Not determined:** exact SFX identity, music key and tempo beyond one 110 bpm reading, 3D package, fonts (unchanged from the first pass).
- **Not re-done:** the full-video extractor was not re-run on the 65-minute interview; local disk had 1.4 GB free. Curves and sound were measured directly on the sources instead.
