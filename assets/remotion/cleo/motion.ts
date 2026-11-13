import {Easing, interpolate} from 'remotion';

// ---------------------------------------------------------------------------
// Cleo Abram motion primitives. Self-contained — never import src/effects or
// src/metro from here (one library per edit).
// ---------------------------------------------------------------------------

/**
 * Motion feel. 'snappy' = the measured reference behaviour (hard 115 % pops, hard cuts).
 * 'smooth' = every move eases in AND out, pops become a gentle fade + settle. Call
 * setMotionFeel('smooth') once at module level in a composition that should never look jarring.
 */
export type MotionFeel = 'snappy' | 'smooth';
let FEEL: MotionFeel = 'snappy';
export const setMotionFeel = (f: MotionFeel) => {
	FEEL = f;
};
export const motionFeel = () => FEEL;
const SMOOTH = Easing.bezier(0.42, 0, 0.58, 1);

export const ease = {
	linear: Easing.linear,
	out: Easing.bezier(0.16, 1, 0.3, 1), // fast ease-out used for supers, insets
	inOut: Easing.inOut(Easing.cubic), // 3D-style camera moves
	outBack: Easing.out(Easing.back(1.6)),
	inQuad: Easing.in(Easing.quad), // gravity drops
} as const;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 0 → 1 over `frames` starting at `start` (frames relative to the Sequence). */
export const prog = (frame: number, start: number, frames: number, e: keyof typeof ease = 'out') =>
	frames <= 0
		? frame >= start
			? 1
			: 0
		: interpolate(frame, [start, start + frames], [0, 1], {...clamp, easing: FEEL === 'smooth' ? SMOOTH : ease[e]});

export const mix = (p: number, a: number, b: number) => a + (b - a) * p;

/**
 * The house "pop". Snappy: invisible before `start`, appears at 115 % on `start`, settles over `frames`
 * (default 3), no fade. Smooth: fades + settles from 92 % over ~10f, eased in and out.
 */
export const pop = (frame: number, start: number, frames = 3, from = 1.15) => {
	if (FEEL === 'smooth') {
		// gentle: fade + settle from 92 % over ~10f, eased in and out
		const len = Math.max(10, frames * 3);
		const s0 = Math.round(start - len * 0.3); // lead in slightly so the word is readable as it's spoken
		if (frame < s0) return {visible: false, scale: 0.92, opacity: 0};
		const e = interpolate(frame, [s0, s0 + len], [0, 1], {...clamp, easing: SMOOTH});
		return {visible: true, scale: mix(e, 0.92, 1), opacity: e};
	}
	if (frame < start) return {visible: false, scale: from, opacity: 1};
	return {visible: true, scale: mix(prog(frame, start, frames, 'out'), from, 1), opacity: 1};
};

/** Visible characters of a typewriter that starts at `start` and types `perFrame` chars/frame. */
export const typed = (text: string, frame: number, start: number, perFrame = 1) =>
	text.slice(0, Math.max(0, Math.floor((frame - start + 1) * perFrame)));

/** Small idle bob (px) for arrows and badges. */
export const bob = (frame: number, fps: number, amp = 4, hz = 1) => Math.sin((frame / fps) * Math.PI * 2 * hz) * amp;

// ---------------------------------------------------------------------------
// Measured curves (deep pass, 2026-11-13). Per-frame progress lists read off the
// reference at 24 fps with motion_curves.py — 0 = start, 1 = settled. Use with
// measured(); they ignore setMotionFeel() because they ARE the reference feel.
// Evidence: style-analysis/cleo-abram/deep/DEEP_PASS.md
// ---------------------------------------------------------------------------
export const MEASURED = {
	/** type, chips, numerals: scale 74 → 100 % in 2 frames (83 ms). Map to scale with mix(p, 0.74, 1). */
	snap: [0, 0.74, 1],
	/** the small rise that goes with a snap: target in 3f, 8 % over, settled by 6f. ~2 % of frame height. */
	snapRise: [0, 0.495, 0.938, 1.08, 1.053, 1.038, 1.025, 1],
	/** magnifier / inset / pill / object spring: target in 4f, 10 % over at f7, settled by f11 (459 ms). */
	spring: [0, 0.574, 0.78, 0.919, 1, 1.043, 1.081, 1.096, 1.081, 1.057, 1.029, 1],
	/** camera hand-off (pan or push away from a held title): ease-in, 12f / 500 ms. ≈ cubic-bezier(0.35,0.1,0.85,0.3). */
	handoff: [0.018, 0.045, 0.063, 0.081, 0.143, 0.19, 0.238, 0.296, 0.354, 0.516, 0.628, 0.74, 1],
} as const;

/** Progress of a measured curve `list`, starting at `start`. 24 fps lists are resampled for other frame rates. */
export const measured = (frame: number, start: number, list: readonly number[], fps = 24) => {
	const t = ((frame - start) * 24) / fps;
	if (t <= 0) return list[0];
	if (t >= list.length - 1) return 1;
	const i = Math.floor(t);
	return mix(t - i, list[i], list[i + 1]);
};

/** Reference stagger, in frames at 24 fps. */
export const STAGGER = {word: 7, listItem: 12, arrow: 16, tile: 3, labelLeadMs: 100} as const;
