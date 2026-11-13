import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {limeType} from './Type';
import {mix, motionFeel, pop, prog} from './motion';
import {C, F, S, T, f} from './tokens';

// ---------------------------------------------------------------------------
// Moves from the second reference batch (Super shoes, Digging, Quantum):
// paper stage + gradient frames, glossy flowchart pills, rubber stamp,
// chapter card, pinned counter + depth gauge, light leak, achievement toast,
// sentence-case pill lower third, on-twos "boil" for held graphics.
// ---------------------------------------------------------------------------

/** On-twos boil: a tiny jitter that changes every 2 frames, for held titles and stamps. */
export const boil = (frame: number, amp = 1.2) => {
	const k = Math.floor(frame / 2);
	const r = (n: number) => (Math.sin(k * 12.9898 + n * 78.233) * 43758.5453) % 1;
	return {x: r(1) * amp, y: r(2) * amp, rot: r(3) * amp * 0.3};
};

/** PaperStage — crumpled off-white paper with a faint grid; optional red track mat with blue edges + grass strip. */
export const PaperStage: React.FC<{track?: boolean; children?: React.ReactNode}> = ({track = false, children}) => {
	const {height} = useVideoConfig();
	const cell = 0.035 * height;
	return (
		<AbsoluteFill style={{background: '#ECEBE7'}}>
			<AbsoluteFill
				style={{
					backgroundImage: `linear-gradient(rgba(60,80,110,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(60,80,110,0.08) 1px, transparent 1px)`,
					backgroundSize: `${cell}px ${cell}px`,
				}}
			/>
			<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.18) 100%)'}} />
			{track ? (
				<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '24%'}}>
					<div style={{position: 'absolute', inset: '0 0 38% 0', background: '#2F80D8'}} />
					<div style={{position: 'absolute', left: 0, right: 0, top: '8%', height: '46%', background: '#D5545A', boxShadow: 'inset 0 4px 0 rgba(255,255,255,0.25)'}} />
					<div style={{position: 'absolute', inset: '62% 0 0 0', background: 'linear-gradient(180deg,#3E9B3A,#2B6E2A)'}} />
				</div>
			) : null}
			{children}
		</AbsoluteFill>
	);
};

/** GradientFrame — footage/interview inside a thick orange→lime gradient border (the bleacher-stage frame). Slides up in ~10f. */
export const GradientFrame: React.FC<{x: number; y: number; w: number; h: number; start?: number; children: React.ReactNode}> = ({x, y, w, h, start = 0, children}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const p = prog(frame, start, f(10, fps));
	if (frame < start) return null;
	const b = 0.012 * height;
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				width: (w / 100) * width,
				height: (h / 100) * height,
				transform: `translate(-50%, -50%) translateY(${mix(p, 0.06 * height, 0)}px)`,
				opacity: p,
				padding: b,
				background: 'linear-gradient(135deg, #FF5A36 0%, #FFB21E 45%, #C6FF01 100%)',
				boxShadow: '0 18px 40px rgba(0,0,0,0.3)',
			}}
		>
			<div style={{width: '100%', height: '100%', overflow: 'hidden', background: '#111'}}>{children}</div>
		</div>
	);
};

export type PillTone = 'question' | 'banned' | 'allowed';
const pillBg: Record<PillTone, string> = {
	question: 'linear-gradient(90deg,#4F7FE0 0%,#C9506E 100%)',
	banned: 'linear-gradient(180deg,#F05A5A 0%,#C62F3A 100%)',
	allowed: 'linear-gradient(180deg,#D8FF3A 0%,#8FD000 100%)',
};

/** FlowPill — glossy 3D pill button (question / BANNED / ALLOWED). Pops 115→100 on `start`. */
export const FlowPill: React.FC<{text: string; tone?: PillTone; x: number; y: number; start?: number; size?: number}> = ({text, tone = 'question', x, y, start = 0, size = 0.03}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(T.pop, fps));
	const px = size * height;
	const italic = tone !== 'question';
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				transform: `translate(-50%,-50%) scale(${p.scale})`,
				visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity,
				background: pillBg[tone],
				borderRadius: px * 0.35,
				padding: `${px * 0.35}px ${px * 0.8}px`,
				boxShadow: `0 ${px * 0.18}px 0 rgba(0,0,0,0.35), inset 0 ${px * 0.12}px 0 rgba(255,255,255,0.35)`,
				border: '2px solid rgba(0,0,0,0.55)',
				fontFamily: tone === 'question' ? F.label : F.display,
				fontWeight: 800,
				fontStyle: italic ? 'italic' : 'normal',
				fontSize: px,
				color: tone === 'allowed' ? '#1C3A00' : '#FFFFFF',
				textTransform: 'uppercase',
				whiteSpace: 'nowrap',
				textShadow: tone === 'allowed' ? 'none' : '0 1px 0 rgba(0,0,0,0.4)',
			}}
		>
			{text}
		</div>
	);
};

/** FlowTree — a question pill with two answers below; connectors draw down first, then pills pop (~10f apart). */
export const FlowTree: React.FC<{question: string; left?: string; right?: string; x?: number; y?: number; start?: number; spread?: number}> = ({
	question,
	left = 'Banned',
	right = 'Allowed',
	x = 50,
	y = 34,
	start = 0,
	spread = 13,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const line = prog(frame, start + f(6, fps), f(6, fps), 'linear');
	const yA = y + 18;
	const X = (v: number) => (v / 100) * width;
	const Y = (v: number) => (v / 100) * height;
	const mid = (y + yA) / 2;
	return (
		<AbsoluteFill>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<path
					d={`M ${X(x)} ${Y(y + 3)} V ${Y(mid)} M ${X(x - spread)} ${Y(yA - 3)} V ${Y(mid)} H ${X(x + spread)} V ${Y(yA - 3)}`}
					fill="none"
					stroke="#55606E"
					strokeWidth={3}
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - line}
				/>
			</svg>
			<FlowPill text={question} tone="question" x={x} y={y} start={start} />
			<FlowPill text={left} tone="banned" x={x - spread} y={yA} start={start + f(12, fps)} />
			<FlowPill text={right} tone="allowed" x={x + spread} y={yA} start={start + f(22, fps)} />
		</AbsoluteFill>
	);
};

/** Stamp — red rubber stamp (e.g. PROTOTYPE) lands at 140 % → 100 % in 4f and holds with an on-twos boil. */
export const Stamp: React.FC<{text: string; x?: number; y?: number; start?: number; rot?: number}> = ({text, x = 50, y = 45, start = 0, rot = -14}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	if (frame < start) return null;
	const s = mix(prog(frame, start, f(4, fps), 'out'), 1.4, 1);
	const b = boil(frame - start, 1.5);
	const px = 0.075 * height;
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				transform: `translate(-50%,-50%) translate(${b.x}px,${b.y}px) rotate(${rot + b.rot}deg) scale(${s})`,
				border: `${px * 0.1}px solid #E8264A`,
				borderRadius: px * 0.25,
				padding: `${px * 0.08}px ${px * 0.3}px`,
				fontFamily: F.display,
				fontSize: px,
				color: '#E8264A',
				letterSpacing: '0.04em',
				textTransform: 'uppercase',
				opacity: 0.9,
				mixBlendMode: 'multiply',
			}}
		>
			{text}
		</div>
	);
};

/** ChapterCard — fire-textured stacked heavy caps on dark red ("THE / MANTLE"). Hard cut in/out; hold 24–36f. */
export const ChapterCard: React.FC<{lines: string[]}> = ({lines}) => {
	const frame = useCurrentFrame();
	const {height} = useVideoConfig();
	const flick = 0.85 + 0.15 * Math.sin(frame * 1.7);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, #4A0C05 0%, #1C0302 75%)', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
			{lines.map((l, i) => (
				<div
					key={i}
					style={{
						fontFamily: F.display,
						fontSize: (i === 0 && lines.length > 1 ? 0.16 : 0.22) * height,
						lineHeight: 0.92,
						textTransform: 'uppercase',
						background: 'linear-gradient(180deg, #FFD23A 0%, #FF7A1A 45%, #C81E05 100%)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						filter: `drop-shadow(0 0 ${18 * flick}px rgba(255,80,0,0.7)) drop-shadow(0 4px 0 #5A0A00)`,
					}}
				>
					{l}
				</div>
			))}
		</AbsoluteFill>
	);
};

/**
 * PinnedCounter — a value that counts from `from` to `to` (linear) pinned to a point with a lime dot,
 * the Digging "0.3 → 11.9 KM" move. Move `at` with your object to keep it pinned.
 */
export const PinnedCounter: React.FC<{from: number; to: number; unit: string; at: [number, number]; start?: number; frames?: number; decimals?: number; size?: number}> = ({
	from,
	to,
	unit,
	at,
	start = 0,
	frames = 120,
	decimals = 1,
	size = 0.045,
}) => {
	const frame = useCurrentFrame();
	const {height} = useVideoConfig();
	if (frame < start) return null;
	const v = interpolate(frame, [start, start + frames], [from, to], {extrapolateRight: 'clamp'});
	const px = size * height;
	return (
		<div style={{position: 'absolute', left: `${at[0]}%`, top: `${at[1]}%`, display: 'flex', alignItems: 'center', gap: px * 0.25, transform: 'translate(-' + px * 0.25 + 'px,-50%)'}}>
			<div style={{width: px * 0.4, height: px * 0.4, borderRadius: '50%', background: C.lime, border: `${px * 0.07}px solid #1E3A10`}} />
			<div style={{fontFamily: F.display, fontSize: px, color: '#FFFFFF', textShadow: '0 2px 0 rgba(0,0,0,0.45)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
				{v.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}
				{unit}
			</div>
		</div>
	);
};

/** DepthGauge — the left-edge thermometer HUD: red fill rises with `progress` (0..1), lime pin shows the reading. */
export const DepthGauge: React.FC<{progress: number; label: string}> = ({progress, label}) => {
	const {height} = useVideoConfig();
	const H = 0.72 * height;
	const w = 0.028 * height;
	return (
		<div style={{position: 'absolute', left: '2.6%', top: '12%', width: w, height: H + w}}>
			<div style={{position: 'absolute', inset: 0, borderRadius: w / 2, background: '#F3E6D2', border: '3px solid #3A2A20'}} />
			<div style={{position: 'absolute', left: 5, right: 5, top: 5, height: Math.max(0, (H - 10) * progress), borderRadius: w / 2, background: 'linear-gradient(180deg,#FF6A3D,#C4161C)'}} />
			<div style={{position: 'absolute', left: w * 0.15, top: (H - 10) * progress, display: 'flex', alignItems: 'center', gap: 6}}>
				<div style={{width: w * 0.55, height: w * 0.55, borderRadius: '50%', background: C.lime, border: '2px solid #1E3A10'}} />
				<span style={{fontFamily: F.label, fontWeight: 800, fontSize: S.label * height, color: C.lime, textShadow: '0 1px 2px #000', whiteSpace: 'nowrap'}}>{label}</span>
			</div>
		</div>
	);
};

/**
 * LightLeak — warm orange/magenta leak that sweeps in over 6f, a 2f white flash on the cut, and fades over 6f.
 * Centre `start + 6` on your cut frame.
 */
export const LightLeak: React.FC<{start?: number}> = ({start = 0}) => {
	const frame = useCurrentFrame();
	const k = frame - start;
	if (k < 0 || k > 14) return null;
	const inP = Math.min(1, k / 6);
	const flash = motionFeel() === 'smooth' ? 0 : k >= 6 && k < 8 ? 1 : 0;
	const outP = k >= 8 ? 1 - (k - 8) / 6 : 1;
	const sweep = mix(inP, -40, 20);
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<AbsoluteFill
				style={{
					mixBlendMode: 'screen',
					opacity: inP * outP * 0.95,
					background: `radial-gradient(ellipse at ${sweep + 30}% 55%, rgba(255,150,60,0.95) 0%, rgba(240,70,140,0.75) 35%, rgba(120,40,160,0.0) 70%)`,
				}}
			/>
			<AbsoluteFill style={{background: '#FFFFFF', opacity: flash}} />
		</AbsoluteFill>
	);
};

/** Toast — lime game "achievement" pill (NEW MATH UNLOCKED) that pops beside an object. */
export const Toast: React.FC<{text: string; x: number; y: number; start?: number}> = ({text, x, y, start = 0}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(T.pop, fps), 1.2);
	const px = 0.022 * height;
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				transform: `translate(-50%,-50%) scale(${p.scale})`,
				visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity,
				background: C.lime,
				border: `3px solid ${C.limeShadow}`,
				outline: '2px solid #FFFFFF',
				borderRadius: px * 0.4,
				padding: `${px * 0.3}px ${px * 0.7}px`,
				fontFamily: F.display,
				fontSize: px,
				color: C.ink,
				textTransform: 'uppercase',
				whiteSpace: 'nowrap',
			}}
		>
			{text}
		</div>
	);
};

/** PillLowerThird — crew/guest name in sentence case inside a dark rounded pill with a lime keyline, bottom-centre; wipes on L→R. */
export const PillLowerThird: React.FC<{text: string; start?: number; hold?: number}> = ({text, start = 0, hold = 72}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	if (frame < start) return null;
	const p = prog(frame, start, f(8, fps), 'out');
	const out = prog(frame, start + hold, f(5, fps));
	const px = 0.022 * height;
	return (
		<div style={{position: 'absolute', left: '50%', bottom: '6%', transform: 'translateX(-50%)', clipPath: `inset(0 ${100 - p * 100}% 0 0)`, opacity: 1 - out}}>
			<div
				style={{
					background: 'rgba(20,24,22,0.88)',
					border: `2px solid ${C.lime}`,
					borderRadius: px,
					padding: `${px * 0.35}px ${px * 0.9}px`,
					fontFamily: F.ui,
					fontWeight: 700,
					fontSize: px,
					color: '#FFFFFF',
					whiteSpace: 'nowrap',
				}}
			>
				{text}
			</div>
		</div>
	);
};

/** PaperTitle — slanted heavy italic caps, blue→lime gradient fill, dark outline + underline rule, boiling on twos. */
export const PaperTitle: React.FC<{lines: string[]; x?: number; y?: number; start?: number}> = ({lines, x = 30, y = 30, start = 0}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const p = pop(frame, start, f(4, fps));
	const b = boil(frame, 1);
	const px = 0.075 * height;
	return (
		<div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) translate(${b.x}px,${b.y}px) skewX(-10deg) scale(${p.scale})`, visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity}}>
			{lines.map((l, i) => (
				<div key={i} style={{...limeType(px, 'transparent'), textShadow: 'none', background: 'linear-gradient(90deg,#3F7FE0 0%,#9BE34A 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextStroke: '2px #1C2B44', fontStyle: 'italic'}}>
					{l}
				</div>
			))}
			<div style={{height: 5, marginTop: 8, background: 'linear-gradient(90deg,#7A2A3A,#2F7BFF)', borderRadius: 3}} />
		</div>
	);
};
