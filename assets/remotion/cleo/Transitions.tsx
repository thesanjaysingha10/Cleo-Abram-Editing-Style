import React, {useMemo} from 'react';
import {AbsoluteFill, Img, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {prog} from './motion';
import {T, f} from './tokens';

// ---------------------------------------------------------------------------
// Transitions and montage: the film-scratch / light-leak / bloom hit, and the
// flash montage that runs under a locked statement word.
// ---------------------------------------------------------------------------

/**
 * ScratchTransition — 8–12f overlay placed on top of a cut (centre it on the cut frame):
 * film-burn colour wash (f1–3), white scratch lines (f2–7), soft white bloom circle (f6–10).
 */
export const ScratchTransition: React.FC<{start?: number; seed?: string; bloomAt?: [number, number]}> = ({start = 0, seed = 'scr', bloomAt = [52, 55]}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const len = f(T.scratch, fps);
	const k = frame - start;
	const lines = useMemo(
		() =>
			Array.from({length: 26}, (_, i) => {
				const x1 = random(`${seed}a${i}`) * width;
				const y1 = random(`${seed}b${i}`) * height;
				const a = random(`${seed}c${i}`) * Math.PI;
				const l = (0.25 + random(`${seed}d${i}`) * 0.6) * height;
				return {x1, y1, x2: x1 + Math.cos(a) * l, y2: y1 + Math.sin(a) * l, w: 1 + random(`${seed}e${i}`) * 2.5};
			}),
		[seed, width, height],
	);
	if (k < 0 || k > len) return null;
	const wash = k <= 3 ? 1 - k / 4 : 0;
	const scr = k >= 1 && k <= 7 ? 1 : 0;
	const bloom = prog(frame, start + 5, 3) * (1 - prog(frame, start + 8, Math.max(1, len - 8)));
	const hue = (k * 47) % 360;
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<AbsoluteFill style={{mixBlendMode: 'screen', opacity: wash * 0.85, background: `radial-gradient(circle at 30% 40%, hsl(${hue} 80% 55%) 0%, hsl(${(hue + 120) % 360} 70% 40%) 45%, rgba(0,0,0,0) 80%)`}} />
			{scr ? (
				<svg width={width} height={height} style={{position: 'absolute', inset: 0, opacity: 0.8}}>
					{lines.filter((_, i) => (i + k) % 3 !== 0).map((l, i) => (
						<line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#F4F1E6" strokeWidth={l.w} strokeLinecap="round" />
					))}
				</svg>
			) : null}
			<div
				style={{
					position: 'absolute',
					left: `${bloomAt[0]}%`,
					top: `${bloomAt[1]}%`,
					width: 0.3 * height,
					height: 0.3 * height,
					transform: 'translate(-50%,-50%)',
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0) 72%)',
					opacity: bloom,
				}}
			/>
		</AbsoluteFill>
	);
};

/**
 * FlashMontage — background images hard-cut every `every` frames (default 5) for the whole Sequence.
 * Put a StatementWord on top; nothing else moves.
 */
export const FlashMontage: React.FC<{images: string[]; every?: number}> = ({images, every}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const n = every ?? f(T.flashCut, fps);
	const src = images[Math.floor(frame / n) % images.length];
	return (
		<AbsoluteFill style={{background: '#000'}}>
			<Img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.62) saturate(0.85)'}} />
		</AbsoluteFill>
	);
};
