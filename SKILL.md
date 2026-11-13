---
name: cleo-abram
description: Edit or animate a video in the Cleo Abram / "Huge If True" science-explainer style. Clay-shaded 3D "metaphor worlds" on navy stages and blueprint grids; lime (#C6FF01) heavy-caps hero words, stat pops and label chips with leader lines; hand-drawn arrows, magnifier insets with a cone, charts that draw in lockstep with the action, Drake-style equation builds, highlighter swipes on headline collages; asterisk lower thirds and guest-question plates; a wide-tracked statement word over a flash montage; film-scratch transitions; and a colour-swap brand title plus a split end card driven by YOUR mark. Built on Remotion with a measured library (src/cleo/) and a playbook that says which move goes on which kind of line. Use whenever Sanjay asks for a "Cleo Abram style" / "Huge If True style" / "Cleo style" edit, science or tech explainer graphics, "explain this like Cleo", or wants concept names, stats, diagrams or equations animated in that look. For fast archival mini-docs use metro-media-style-edit; for startup doc-vlogs with chalkboard cutaways use science-of-scaling-style-edit.
---

# Cleo Abram skill

Optimistic science, explained by building a world. Each abstract idea becomes a place
you can fly through (a brain as cable highways, a skull as a stadium, the galaxy as a
curved star-map HUD). The stage stays dark and quiet, and **one loud colour, lime,
carries every word the viewer must remember**. Graphics point, circle, draw and
highlight, so the viewer never has to hunt for the point. The tone is playful (a rooster
for scale, KUNG FU SKILLS), but the information design is strict.

Measured from six reference videos (Neuralink 17:47, Aliens 39:06, Sam Altman 1:05:07,
The Shoe That Broke Running 15:45, What If You Just Keep Digging? 10:29, Quantum Computers
explained with MKBHD 17:00; 242 graphic scenes, 38.5 min of animation). Evidence: `references/style-report.md`, per-scene notes in
`references/scenes/*.json`, frame strips in `references/motion/`, type crops in
`references/type_sheet.jpg`. Storyboard board: https://claude.ai/artifact/6WG69z9UbaL59mdnRtg4q1.
Full analysis folder: `~/Studio/style-analysis/cleo-abram/` (clips of every animated scene in
`<video id>/clips/`).

**Copy the system, never the brand.** Don't use the HUGE\* wordmark, the reference channel's
asterisk branding, their 3D assets or footage. Every brand component takes your own `mark`.

## This skill's cluster

| | Cleo Abram (this skill) | Science of Scaling | Metro Media |
|---|---|---|---|
| Feel | optimistic science explainer, built worlds | warm startup doc-vlog | fast archival mini-doc |
| Picture | host/interview ↔ 5–30 s animated explainer blocks (~1/3 of an explainer episode) | footage holds; chalkboard / graph-paper cutaways | B-roll every 0.35–3 s |
| Type | lime heavy caps hero words + chips with leader lines | eased word captions | hard-cut white words dead centre |
| Library in Studio | `src/cleo/` | `src/effects/` | `src/metro/` |
| Studio example | `src/projects/cleo-demo/` (Studio folder `Cleo-Abram`) | `jigar-scale`, `wa-reel` | `metro-*`, `jigar` |

Never mix libraries inside one edit. One master may get one edit per style.

## Pick the world first (the medium changes, the voice doesn't)
Each film builds ONE world in the medium that suits the subject, then returns to it:

| World | Reference | Stage components | Signature props |
|---|---|---|---|
| Clay 3D on a navy stage | Neuralink | `Stage`, `BlueprintGrid`, `ClayObject` (or rendered 3D) | label chips, signal highways, magnifiers |
| Space HUD | Aliens | `Starfield` + HUD micro type | lime planet tags, typewriter names, equation builds |
| Flat 2D cut-away + ride-along vehicle | Digging | illustrated layers (After Effects/SVG) | `PinnedCounter`, `DepthGauge`, `ChapterCard`, white flow arrows |
| Paper + stadium stage | Super shoes | `PaperStage track`, `GradientFrame` | `FlowTree` / `FlowPill`, `Stamp`, `PaperTitle`, exploded product + numbered callouts |
| Low-poly game | Quantum | rendered low-poly island | game title, menu cards, `Toast`, mathematical-map route lines |

Constant across all six: lime `#C6FF01` as the voice, labels pinned to objects, highlighter swipes on
documents and headlines, the brand title (built from your own mark) and the split end card.

## Setup (Studio repo)
- The library is already in `~/Studio/src/cleo/`. In another Remotion project, copy
  `assets/remotion/cleo/` to `src/cleo/` and `npm i @remotion/google-fonts`.
- Import `'../../cleo/fonts'` once in the composition (Archivo Black, Barlow Semi Condensed,
  Barlow Condensed, Inter, Jost: free stand-ins for the reference faces).
- Work at **24 fps** (the references are 23.976). Timings in `T` are 24 fps frames; `f(n, fps)` rescales them.
- Keep `assets/remotion/cleo/` in sync with `~/Studio/src/cleo/` after every library change.

## Workflow
1. Transcribe the master (WhisperX, `--language en`). Mark every line that **names a concept,
   states a number, compares, describes a process, quotes coverage, or introduces a person**.
   Those lines are your candidates; the rest stay on camera.
2. Pick **one metaphor world** for the film (a rendered 3D world, or `Stage`/`BlueprintGrid`/
   `Starfield` + `ClayObject` stand-ins) and plan to return to it at least 3 times.
3. Map lines to moves with the playbook below. One idea per frame. Explainer blocks run 5–30 s
   at ~18 cuts/min. Cold open and title run ~60 cuts/min.
4. Build the cold open as a trailer of your own best graphics (0.5 s beats), then `TitleSwap`.
5. Write `src/projects/<name>/<Name>.tsx` as a `plan` of Sequences (copy `example/cleo-demo`),
   register it in `Root.tsx` inside `<Folder name="Cleo-Abram">`.
6. Check stills across each item's range (never put text over a face), render, add SFX with
   `real-sfx` (pop on every label/stat pop, whoosh on ribbon text and scratch transitions).

## Playbook: which move goes on which line

| The line… | Move | Component |
|---|---|---|
| names a new concept / method | lime hero word, word-by-word pop | `HeroWord` (space beats: `RibbonText`) |
| states a number | stat pop on an impact, or a lime box label | `StatCallout`, `LabelBox` |
| refers to a part of an object | chip on a leader line, chip colour = region colour | `LabelChip` |
| says "look closer / inside" | magnifier circle + cone | `MagnifierInset` |
| points at a person or thing in footage | hand-drawn arrow (+ name) | `DrawArrow` |
| compares two magnitudes | dashed line with a caps label | `DashedConnector` |
| describes a measurement over time | chart drawn in lockstep with the object | `LineChart` (drive `progress` from the motion) |
| multiplies factors / a formula | term-by-term equation build | `EquationBuild` |
| trades two qualities off | four-arrow axis diagram over defocused picture | `AxisDiagram` + `Defocus` |
| cites coverage / claims | headline card collage, lime highlighter on the key words | `HeadlineCard` + `Highlighter` |
| names a planet / object / place | lime typewriter + white distance line | `Typewriter` |
| is a theme word in the cold open | wide-tracked white word over a 5f flash montage | `StatementWord` + `FlashMontage` |
| introduces a person | asterisk lower third | `LowerThird` |
| reads a guest/viewer question | avatar + lime plates, top-right | `QuestionPlate` |
| cuts into a screen / UI / new section | film burn + scratches + bloom | `ScratchTransition` |
| uses borrowed footage | gold bracket + `* SOURCE:` | `ViewfinderBracket` + `SourceCredit` |
| is the sponsor read | ring badge + URL super | `AdBadge` + `UrlSuper` |
| a yes/no rule or decision | glossy pill flowchart on paper | `FlowTree`, `FlowPill` |
| something is unofficial / rejected / "prototype" | red rubber stamp | `Stamp` |
| a journey has stages (crust → mantle → core) | fire chapter card per stage | `ChapterCard` |
| a value grows while you travel (depth, time, speed) | counter pinned to the moving tip + edge gauge | `PinnedCounter`, `DepthGauge` |
| footage of an event / a remote guest | gradient-bordered frame on the paper/stadium stage | `PaperStage` + `GradientFrame` |
| a new ability or idea unlocks | lime game toast | `Toast` |
| a crew member appears on camera | sentence-case pill, bottom-centre | `PillLowerThird` |
| cold-open cuts between headlines | warm light leak + 2f white flash | `LightLeak` |
| every graphic | your mark bottom-right | `BrandBug` |
| show open / close | colour-swap title; split end card | `TitleSwap`, `EndCardSplit` |

## Design tokens (`src/cleo/tokens.ts`)
| token | value | use |
|---|---|---|
| `C.lime` | `#C6FF01` | the voice: hero words, labels, arrows, highlighter, rings, checks |
| `C.limeShadow` | `#0B2A12` | hard 0-blur drop under lime type |
| `C.teal` / `C.sage` | `#1B4247` / `#B2BCB1` | brand dark / light (extrude, title, end card) |
| `C.blue` `C.coral` `C.mauve` | `#0766F3` `#FD7966` `#5E4652` | title colourways, highlight blocks |
| `C.stageTop`→`C.stageBottom` | `#1A293C`→`#0E1823` | 3D stage |
| `C.blueprint` | `#19658B` | metaphor-world floor |
| `C.hero` | `#D36699` | clay hero object |
| `C.micro` / `C.alert` | `#F1F1F3` / `#E8343A` | micro labels, white arrows / warnings |
| `S.hero` | 7.5% of height (6–9%) | 1–3 words per line, leading 0.95 |
| `S.label` / `S.micro` | 1.9% / 1.3% | chips / HUD and axes |
| `S.lowerName` / `S.lowerRole` | 3.3% / 1.8% | at x 7%, y 86–88% |

## Motion spec (measured, 24 fps; all in the components)
| element | in | frames | feel |
|---|---|---|---|
| hero word / label / stat | **snap**: scale 74 → 100 %, **no fade**, plus a ~2 % rise that overshoots 8 % (`MEASURED.snap`, `snapRise`) | 2 (+6 for the rise) | ease-out; words 6–8f apart; lands 0–150 ms **before** the spoken noun |
| lower third | `*` scale 0→1, name blur-slide, role fade, slow −3% drift | 12 | name +2f, role +8f |
| question plates | mask wipe L→R | 19 | row 2 +3f |
| typewriter | 1 char/frame + block cursor | — | linear |
| equation | term every 12f, leader line 6f, caption types | ~84 for 7 terms | hard-in |
| ribbon text | letters fly on a curved 3D path and flatten | 18 | strong ease-out, 1 letter/f |
| magnifier inset | circle from a point + cone, **spring** (`MEASURED.spring`) | 4 to target, 10–11 to settle | 10–14 % overshoot, one bounce; same in two films |
| arrow | trim-path draw, then ±3 px bob | 8 | ease-out |
| title sequence | asterisk shrink → colour rows stack → stepped giant-letter pan → mark | cuts every 3–6 | hard cuts on the beat |
| scratch transition | burn f1–3, scratches f1–7, white bloom f5–10 | 10 | hard in, fade |
| flowchart pills | connector draws 10f, then pill springs 86 → 100 %; YES/NO fade 8f, 4f apart | 10 + 10 | 5 % overshoot; camera leaves on a 12f ease-in pan |
| pinned counter | linear count tied to the moving tip while the camera pulls out | ~120 | linear |
| light leak | leak in 6f → 2f white flash on the cut → leak out 6f | 14 | screen blend |
| stamp | lands 140%→100%, holds with an on-twos boil | 4 + hold | hard land |
| chapter card | hard cut in/out | 24–36 | flicker glow |
| held paper titles | on-twos boil (jitter every 2f) | hold | — |
| 3D camera | dolly / orbit / fly-through | 4–10 s | slow ease-in-out; chase cams linear |
| camera hand-off | pan or push away from a held title or UI (`MEASURED.handoff`) | 11–12 (459–500 ms) | **ease-in**, cut or caught at speed; blur on the last 3f |
| polaroid / photo object | drops 125 → 100 % | 9 (300 ms) | ease-out; the only thing that arrives large |
| arrow on footage | 17 % pull-back, then slides 2–3 % along its axis | 12–13 | arrows 0.67 s apart |

## Deep pass (2026-11-13): how it is actually made
Full evidence, tables and curve plots: `references/deep-pass.md`, `references/deep/`. The rules that change how you build:

**Three speeds, never mixed on one element.**
- **Snap** (type, chips, numerals): 2 frames, 74 → 100 %, no overshoot on scale. The first analysis said "115 → 100"; measured, type grows up into place.
- **Spring** (magnifiers, insets, pills, tiles, objects): target in 4 frames, 5–14 % overshoot, settled by frame 10–11.
- **Glide** (camera, stage): 459–500 ms ease-in hand-offs, 4–10 s journeys, linear counters and pulses.
Use `measured(frame, start, MEASURED.snap | spring | handoff | snapRise)` from `motion.ts` when Sanjay asks for the reference feel. His default stays `setMotionFeel('smooth')`, and for camera moves his ~1.7 s ease-in-out preference wins over the reference's ease-in.

**Placement (if / then).**
- Line names something on screen → label it, starting 0–150 ms before the noun. Never after the word.
- "Inside / zoom in / so small" → magnifier spring with a cone from a lime dot. It opens ~230 ms after the phrase ends.
- List or formula → one item every 12 frames, each with a leader and caption.
- Decision or rule → flowchart; the camera pans down the branch.
- "Everyone said…" → headline wall, 1.0 s per card, highlight already drawn on frame 1.
- Journey → linear counter pinned to the moving tip + pull-out.
- Nothing enters within 6 frames of something else. Once in, a graphic holds still.
- **Never animate an exit** (30 of 32 studied moments end on a cut or a camera move).

**Sound and sync.**
- Body cuts are not beat-locked (60 % within 80 ms of a hit = chance). Cut to the sentence.
- Only the title sequence and cold open sit on a grid (hits every ~0.55 s).
- Put a short sound on every snap and spring; a ~100 ms dropout before a world change, then a low thump on the first object.

**Textures.** Texture lives on the stage, never on the voice. Navy stage: clean gradient, grid on the floor only. Paper stages: two-weight grid + vignette, boil ±1 px on twos; torn tags with a hard offset shadow. Lime type is always a flat fill with a clean dark drop. Recipes per stage in `references/deep-pass.md`.

**The DNA** (must hold for anything to read as this style):
1. Text snaps, objects spring, cameras glide.
2. The label arrives just before the word.
3. Everything is attached (dot, leader, cone or track).
4. One at a time, half a second apart.
5. The stage carries the texture, lime carries the meaning.
6. Nothing leaves by itself.

**Idea bank** (proposals, not observed; full build specs in `references/deep-pass.md`, running list in the `motion-idea-library` skill): cleo-01 Spring-cone stat, cleo-02 Label ladder, cleo-03 Ease-in pan hand-off (these three are prototyped in `references/prototypes/`), cleo-04 Fixed stat moving world, cleo-05 Prop pair, cleo-06 Vertical equation, cleo-07 Verdict stamp on a flowchart, cleo-08 Headline wall with a tally, cleo-09 Texture swap word holds, cleo-10 Dolly down the cone, cleo-11 Carousel world. For fresh ideas, do not repeat these: cross the DNA with the lenses transfer, recombine, invert, push, new format, fill a gap; change at most two things at once.

## Motion feel: snappy vs smooth
The references snap hard (74 → 100 % in 2f, hard cuts; `pop()` keeps its older 115 % look, `MEASURED.snap` is the measured one). **Sanjay prefers smooth by default:**
call `setMotionFeel('smooth')` at the top of the composition's root component. Then every `prog()`
eases in AND out (`cubic-bezier(0.42,0,0.58,1)`), every `pop()` becomes a ~10f fade + settle from 92 %,
and `LightLeak` drops its white flash. Also cross-dissolve shots (overlap ~10f, eased fade-in on the
incoming shot), fade labels out instead of unmounting them, and ease counters, pulses and 3D moves
in and out — see `example/sun-fusion/SunFusion.tsx` (`FadeIn`, `FadeOut`, `XF`). Use `'snappy'` only
when he asks for the reference's punchy feel.

## 3D
Real-time 3D works via `@remotion/three` (installed in Studio). Render with `--gl=angle`.
`example/sun-fusion/Sun3D.tsx` has a boiling-sun shader, soft corona glow, a quarter-cut-away body with
flat coloured cut faces (2D-cut-away look on a 3D object), clay nucleons, and a `CameraRig`.

## Do / Don't
- **Do** keep the stage dark and quiet so lime does the talking. Lime is for meaning, never decoration.
- **Do** attach every label to its object (leader line, arrow, magnifier). Nothing floats.
- **Do** sync chart lines to the action and label pops to the spoken noun (0–150 ms early), not to a timer or the music.
- **Do** put one joke prop in each explainer block, and return to the metaphor world.
- **Don't** fade labels in slowly. They pop.
- **Don't** use glitch, whip pans, zoom-blur or bouncy whole-layout springs.
- **Don't** stack two hero ideas in one frame. Put text on the right third or top-centre, never on the object's focal point or a face.
- **Don't** use the reference channel's wordmark, asterisk logo or assets.

## Confidence & gaps
Timings, colours and pacing are measured. Typefaces are anatomy-matched free stand-ins (the
reference brand face looks custom). Sound was checked against 787 graphic cuts with band hits and spectrograms (no speech-to-text; word timings from auto-captions); SFX identity and mix are estimates. `ClayObject`,
`BlueprintGrid` and `Starfield` are 2D stand-ins: real explainers use rendered 3D (Blender /
Spline) with this library composited on top. The style report's `motion/*.jpg` paths
correspond to `references/motion/m_*.jpg` here.
