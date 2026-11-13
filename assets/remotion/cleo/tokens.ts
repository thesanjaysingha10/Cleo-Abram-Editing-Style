// ---------------------------------------------------------------------------
// Cleo Abram style — design tokens. Every value is measured from the three
// reference videos (see ~/.claude/skills/cleo-abram/references/style-report.md).
// Sizes are fractions of frame HEIGHT so they carry to any resolution.
// ---------------------------------------------------------------------------

export const C = {
	lime: '#C6FF01', // the voice: hero words, labels, arrows, highlighter, rings
	limeShadow: '#0B2A12', // hard drop under lime type
	teal: '#1B4247', // brand dark: extrude, end card, title BG
	tealLight: '#256269',
	sage: '#B2BCB1', // brand light panel
	blue: '#0766F3', // title colourway
	coral: '#FD7966', // highlight blocks, title colourway
	mauve: '#5E4652', // title colourway (est.)
	stageTop: '#1A293C', // 3D stage gradient
	stageBottom: '#0E1823',
	blueprint: '#19658B', // metaphor-world floor
	gridLine: 'rgba(120,200,235,0.28)',
	hero: '#D36699', // clay hero object
	micro: '#F1F1F3', // micro labels, white arrows
	alert: '#E8343A', // warnings (est.)
	ink: '#000000',
	bug: 'rgba(205,205,205,0.75)',
} as const;

export const F = {
	display: '"Archivo Black", "Arial Black", Impact, sans-serif', // brand + hero words + numbers
	label: '"Barlow Semi Condensed", "Arial Narrow", sans-serif', // lower thirds, chips, plates (weight 800)
	cond: '"Barlow Condensed", "Arial Narrow", sans-serif', // question plates (weight 800)
	ui: '"Inter", "Helvetica Neue", Arial, sans-serif', // micro labels, HUD, statement word
	sentence: '"Jost", Futura, "Century Gothic", sans-serif', // end-card sentences
} as const;

/** Sizes as a fraction of frame height. */
export const S = {
	hero: 0.075, // 6–9%
	stat: 0.065,
	label: 0.019, // chips 1.2–2%
	micro: 0.013,
	lowerName: 0.033,
	lowerRole: 0.018,
	plate: 0.024,
	statement: 0.06,
	equation: 0.1,
	credit: 0.0105,
} as const;

/** Measured timings in frames at 24 fps (scale with `f()` for other rates). */
export const T = {
	pop: 3, // 115% -> 100%, no fade
	wordGap: 9, // hero words 375 ms apart
	lowerIn: 12, // asterisk 0-4, name +2, role +8
	plateWipe: 19, // question plates unroll
	plateRowGap: 3,
	typePerChar: 1, // typewriter, chars per frame
	eqTermGap: 12, // equation term stagger
	ribbon: 18, // 3D ribbon text settle
	magnifier: 10,
	arrowDraw: 8,
	titleCut: 4, // title sequence cuts every 3–6f
	flashCut: 5, // montage under a locked word
	scratch: 10,
} as const;

/** Convert a 24 fps measured frame count to the composition's fps. */
export const f = (frames24: number, fps: number) => Math.round((frames24 * fps) / 24);
