import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {bob, mix, prog} from './motion';
import {C, F, T, f} from './tokens';

// ---------------------------------------------------------------------------
// Brand frame — the SYSTEM of the Huge If True title and end card, driven by
// YOUR mark. Never set the HUGE* wordmark itself; pass your own `mark`.
// ---------------------------------------------------------------------------

/** The brand face: lime, black outline, deep-teal block extrude down-left. */
export const markStyle = (px: number, fill: string = C.lime, extrude: string = C.teal): React.CSSProperties => {
	const steps = Math.max(3, Math.round(px * 0.06));
	const shadow = Array.from({length: steps}, (_, i) => `${-(i + 1)}px ${i + 1}px 0 ${extrude}`).join(', ');
	return {
		fontFamily: F.display,
		fontSize: px,
		lineHeight: 0.92,
		color: fill,
		WebkitTextStroke: `${Math.max(2, px * 0.02)}px #000`,
		paintOrder: 'stroke fill',
		textShadow: shadow,
		textTransform: 'uppercase',
		whiteSpace: 'nowrap',
	};
};

const ROWS: [string, string][] = [
	[C.mauve, '#3A2A32'],
	[C.blue, '#0A2C66'],
	[C.coral, '#6A2A22'],
	[C.lime, C.teal],
];

/**
 * TitleSwap — ~7–10 s title: (1) the asterisk huge → shrinking on blue, (2) rows of the mark stacking
 * in colourways over an outline pattern, (3) a pan across giant cropped letters on teal,
 * (4) the mark + optional subtitle ("CONVERSATIONS") on sage. Cuts every 3–6f (hard, on the beat).
 */
export const TitleSwap: React.FC<{mark: string; subtitle?: string; episode?: string}> = ({mark, subtitle, episode}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const word = mark.replace(/\*$/, '');
	const c = f(T.titleCut, fps);
	const A = f(13, fps); // asterisk beat
	const B = A + c * 4; // rows beat
	const M = B + f(62, fps); // letter pan until the final mark
	const E = M + f(36, fps); // episode card
	if (frame < A) {
		const s = mix(prog(frame, 0, A, 'out'), 9, 1.1);
		return (
			<AbsoluteFill style={{background: C.blue, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
				<div style={{...markStyle(0.22 * height), transform: `scale(${s}) translateY(${mix(prog(frame, 0, A), 0, 30)}%)`}}>*</div>
			</AbsoluteFill>
		);
	}
	if (frame < B) {
		const n = Math.min(ROWS.length, 1 + Math.floor((frame - A) / c));
		return (
			<AbsoluteFill style={{background: C.sage, overflow: 'hidden', justifyContent: 'center'}}>
				{Array.from({length: 6}, (_, r) => {
					const text = `${word} ${word} ${word}`;
					const solid = r < n ? ROWS[r] : null;
					const style: React.CSSProperties = solid
						? markStyle(0.16 * height, solid[0], solid[1])
						: {...markStyle(0.16 * height, 'transparent', 'transparent'), WebkitTextStroke: '2px rgba(255,255,255,0.75)', textShadow: 'none'};
					return (
						<div key={r} style={{...style, marginLeft: -0.02 * width}}>
							{text}
						</div>
					);
				})}
			</AbsoluteFill>
		);
	}
	if (frame < M) {
		const px = 0.95 * height;
		const t = prog(frame, B, M - B, 'linear');
		const step = Math.floor(t * 8) / 8; // stepped pan, reads as on-2s motion
		return (
			<AbsoluteFill style={{background: C.teal, overflow: 'hidden', justifyContent: 'center'}}>
				<div style={{...markStyle(px, '#FFFFFF', C.lime), transform: `translateX(${mix(step, 0.15 * width, -px * 0.62 * word.length + width * 0.7)}px)`}}>{word}</div>
			</AbsoluteFill>
		);
	}
	if (frame < E || !episode) {
		return (
			<AbsoluteFill style={{background: subtitle ? C.blue : C.sage, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
				<div style={markStyle(0.26 * height)}>{mark}</div>
				{subtitle ? <div style={{...markStyle(0.06 * height, C.lime, C.teal), marginTop: 0.02 * height}}>{subtitle}</div> : null}
			</AbsoluteFill>
		);
	}
	return (
		<AbsoluteFill style={{background: C.blue, alignItems: 'center', justifyContent: 'center'}}>
			<div style={markStyle(0.07 * height, C.lime, C.teal)}>{episode}</div>
		</AbsoluteFill>
	);
};

/** Frames TitleSwap needs (with an episode card) at this fps. */
export const titleSwapFrames = (fps: number, episode = false) => f(13, fps) + f(T.titleCut, fps) * 4 + f(62, fps) + f(36, fps) + (episode ? f(30, fps) : 0);

/**
 * EndCardSplit — teal left panel (credits fade in, then a "next video" slot), sage right panel with the
 * mark, a subscribe line and the host avatar in a lime ring between two lime arrows that bob inward.
 */
export const EndCardSplit: React.FC<{mark: string; line: string; avatar?: string; credits?: [string, string][]; next?: React.ReactNode}> = ({
	mark,
	line,
	avatar,
	credits = [],
	next,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const credIn = prog(frame, f(6, fps), f(10, fps));
	const credOut = prog(frame, f(96, fps), f(10, fps));
	const b = bob(frame, fps, 0.012 * width, 1.2);
	const arrow = (dir: 1 | -1) => (
		<svg width={0.05 * width} height={0.04 * width} viewBox="0 0 50 40" style={{transform: `translateX(${dir * b}px) scaleX(${dir})`}}>
			<path d="M2 14 H28 V4 L48 20 L28 36 V26 H2 Z" fill={C.lime} stroke="#000" strokeWidth={2} />
		</svg>
	);
	const d = 0.2 * height;
	return (
		<AbsoluteFill style={{flexDirection: 'row'}}>
			<div style={{flex: 1, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{opacity: credIn * (1 - credOut), display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${0.02 * height}px ${0.04 * width}px`, textAlign: 'center'}}>
					{credits.map(([n, r]) => (
						<div key={n}>
							<div style={{fontFamily: F.display, fontSize: 0.032 * height, color: '#FFFFFF', textTransform: 'uppercase'}}>{n}</div>
							<div style={{fontFamily: F.ui, fontWeight: 700, fontSize: 0.015 * height, color: '#CFE0DC', textTransform: 'uppercase', letterSpacing: '0.06em'}}>{r}</div>
						</div>
					))}
				</div>
				{next && credOut > 0 ? <div style={{position: 'absolute', opacity: credOut}}>{next}</div> : null}
			</div>
			<div style={{width: '50%', background: C.sage, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.03 * height}}>
				<div style={markStyle(0.13 * height)}>{mark}</div>
				<div style={{fontFamily: F.display, fontSize: 0.026 * height, color: C.teal, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.25, maxWidth: '80%'}}>{line}</div>
				<div style={{display: 'flex', alignItems: 'center', gap: 0.02 * width}}>
					{arrow(1)}
					<div style={{width: d, height: d, borderRadius: '50%', border: `${0.012 * height}px solid ${C.lime}`, boxShadow: '0 0 0 3px #000', overflow: 'hidden', background: C.tealLight}}>
						{avatar ? <Img src={avatar} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : null}
					</div>
					{arrow(-1)}
				</div>
			</div>
		</AbsoluteFill>
	);
};
