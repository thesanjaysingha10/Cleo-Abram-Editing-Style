import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {bob, mix, pop, prog, typed} from './motion';
import {C, F, S, T, f} from './tokens';

// ---------------------------------------------------------------------------
// Type moves: hero words, stats, typewriter names, 3D ribbon titles, the
// wide-tracked statement word. Positions are % of frame (x,y = anchor point).
// ---------------------------------------------------------------------------

type Pos = {x?: number; y?: number; align?: 'left' | 'center' | 'right'};

const anchor = ({x = 50, y = 50, align = 'center'}: Pos): React.CSSProperties => ({
	position: 'absolute',
	left: `${x}%`,
	top: `${y}%`,
	transform: `translate(${align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0'}, -50%)`,
	textAlign: align,
});

/** Lime heavy caps with the hard dark drop. */
export const limeType = (px: number, color: string = C.lime): React.CSSProperties => ({
	fontFamily: F.display,
	fontSize: px,
	lineHeight: 0.95,
	color,
	textTransform: 'uppercase',
	letterSpacing: '-0.005em',
	textShadow: `0 ${Math.max(2, px * 0.06)}px 0 ${C.limeShadow}`,
});

export type HeroLine = {text: string; color?: 'lime' | 'white'};

/**
 * HeroWord — the concept name. Lines pop in word by word (115→100 %, 3f, ~9f apart).
 * `lines` may mix white and lime ("LIFE AS WE" / "DON'T KNOW IT").
 */
export const HeroWord: React.FC<{lines: (string | HeroLine)[]; start?: number; gap?: number; size?: number} & Pos> = ({
	lines,
	start = 0,
	gap,
	size = S.hero,
	...pos
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const g = gap ?? f(T.wordGap, fps);
	let k = 0;
	return (
		<div style={anchor(pos)}>
			{lines.map((l, li) => {
				const line = typeof l === 'string' ? {text: l} : l;
				const col = line.color === 'white' ? '#FFFFFF' : C.lime;
				return (
					<div key={li} style={{whiteSpace: 'nowrap'}}>
						{line.text.split(' ').map((w, wi) => {
							const p = pop(frame, start + k++ * g, f(T.pop, fps));
							return (
								<span
									key={wi}
									style={{
										...limeType(size * height, col),
										display: 'inline-block',
										marginRight: '0.22em',
										visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity,
										transform: `scale(${p.scale})`,
										transformOrigin: '50% 60%',
									}}
								>
									{w}
								</span>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

/** StatCallout — big lime number + white tracked-caps unit line. Pops on `start` (land it on an impact). */
export const StatCallout: React.FC<{value: string; unit?: string; start?: number; size?: number} & Pos> = ({
	value,
	unit,
	start = 0,
	size = S.stat,
	...pos
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(4, fps));
	return (
		<div style={{...anchor(pos), visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, transform: `${anchor(pos).transform} scale(${p.scale})`}}>
			<div style={limeType(size * height)}>{value}</div>
			{unit ? (
				<div
					style={{
						fontFamily: F.ui,
						fontWeight: 700,
						fontSize: S.label * height,
						letterSpacing: '0.08em',
						color: C.micro,
						textTransform: 'uppercase',
						marginTop: size * height * 0.12,
					}}
				>
					{unit}
				</div>
			) : null}
		</div>
	);
};

/** LabelBox — lime box with black caps ("1.4KG"), small sub-line under it. Pops 115→100. */
export const LabelBox: React.FC<{text: string; sub?: string; start?: number; size?: number} & Pos> = ({
	text,
	sub,
	start = 0,
	size = 0.055,
	...pos
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(4, fps));
	const px = size * height;
	return (
		<div style={{...anchor(pos), visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, transform: `${anchor(pos).transform} scale(${p.scale})`}}>
			<div
				style={{
					fontFamily: F.display,
					fontSize: px,
					lineHeight: 1,
					color: C.ink,
					background: C.lime,
					padding: `${px * 0.12}px ${px * 0.22}px`,
					border: `${Math.max(2, px * 0.05)}px solid ${C.limeShadow}`,
					textTransform: 'uppercase',
				}}
			>
				{text}
			</div>
			{sub ? <div style={{fontFamily: F.ui, fontWeight: 700, fontSize: px * 0.32, color: C.micro, marginTop: px * 0.12}}>{sub}</div> : null}
		</div>
	);
};

/** Typewriter — lime caps typed ~1 char/frame with a block cursor, optional white sub-line typed after. */
export const Typewriter: React.FC<{text: string; sub?: string; start?: number; size?: number; perFrame?: number} & Pos> = ({
	text,
	sub,
	start = 0,
	size = 0.045,
	perFrame = 1,
	...pos
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const shown = typed(text, frame, start, perFrame);
	const doneAt = start + Math.ceil(text.length / perFrame);
	const subShown = sub ? typed(sub, frame, doneAt + f(4, fps), perFrame * 2) : '';
	const typing = frame >= start && frame < doneAt + f(10, fps);
	const blink = Math.floor(frame / f(6, fps)) % 2 === 0;
	return (
		<div style={anchor({align: 'left', ...pos})}>
			<div style={{...limeType(size * height), whiteSpace: 'pre'}}>
				{shown}
				{typing && blink ? <span style={{display: 'inline-block', width: '0.12em', height: '0.9em', background: C.lime, marginLeft: '0.06em', verticalAlign: '-0.08em'}} /> : null}
			</div>
			{sub ? (
				<div style={{fontFamily: F.ui, fontWeight: 700, fontSize: S.label * height, color: C.micro, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6}}>
					{subShown}
				</div>
			) : null}
		</div>
	);
};

/**
 * RibbonText — the "DIRECT IMAGING" move: letters fly along a curved 3D path and flatten into
 * place, revealed left→right 1 letter/frame, settled after ~18f.
 */
export const RibbonText: React.FC<{text: string; start?: number; size?: number} & Pos> = ({text, start = 0, size = S.hero * 0.85, ...pos}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const chars = text.split('');
	return (
		<div style={{...anchor(pos), perspective: 900, whiteSpace: 'nowrap'}}>
			{chars.map((ch, i) => {
				const s = start + i * (fps / 24);
				if (frame < s) return <span key={i} style={{...limeType(size * height), visibility: 'hidden'}}>{ch === ' ' ? ' ' : ch}</span>;
				const p = prog(frame, s, f(T.ribbon, fps) - i * 0.5, 'out');
				const rotY = mix(p, -70, 0);
				const z = mix(p, -600, 0);
				const y = mix(p, -size * height * 0.9 * Math.sin(((i + 1) / chars.length) * Math.PI), 0);
				return (
					<span
						key={i}
						style={{
							...limeType(size * height),
							display: 'inline-block',
							transform: `translate3d(0, ${y}px, ${z}px) rotateY(${rotY}deg)`,
							opacity: Math.min(1, p * 3),
						}}
					>
						{ch === ' ' ? ' ' : ch}
					</span>
				);
			})}
		</div>
	);
};

/** StatementWord — white heavy caps, ~+30 % tracking, locked dead centre (use over FlashMontage). */
export const StatementWord: React.FC<{text: string; size?: number}> = ({text, size = S.statement}) => {
	const {height} = useVideoConfig();
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
			<div
				style={{
					fontFamily: F.ui,
					fontWeight: 900,
					fontSize: size * height,
					letterSpacing: '0.3em',
					marginRight: '-0.3em',
					color: '#EFEFEF',
					textTransform: 'uppercase',
					textShadow: '0 2px 18px rgba(0,0,0,0.45)',
				}}
			>
				{text}
			</div>
		</AbsoluteFill>
	);
};

/** UrlSuper — lime heavy caps URL bottom-centre (sponsor reads). */
export const UrlSuper: React.FC<{text: string; start?: number}> = ({text, start = 0}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(T.pop, fps));
	return (
		<div style={{position: 'absolute', left: '50%', bottom: '6%', transform: `translateX(-50%) scale(${p.scale})`, visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, ...limeType(0.045 * height), whiteSpace: 'nowrap'}}>
			{text}
		</div>
	);
};

/** Bobbing helper re-export for one-off props. */
export const useBob = (amp = 4) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return bob(frame, fps, amp);
};
