import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {bob, mix, pop, prog} from './motion';
import {limeType} from './Type';
import {C, F, S, T, f} from './tokens';

// ---------------------------------------------------------------------------
// "Point at it": hand-drawn arrows, magnifier insets with a cone, dashed
// connectors, highlighter swipes, the viewfinder bracket for borrowed footage.
// All coordinates are % of the frame.
// ---------------------------------------------------------------------------

type Pt = [number, number];
const px = (p: Pt, w: number, h: number): Pt => [(p[0] / 100) * w, (p[1] / 100) * h];

/**
 * DrawArrow — a hand-drawn curved arrow from `from` to `to` (tip). Draws on in ~8f (trim path),
 * then the head appears and the whole arrow idles with a small bob. Optional label at the tail.
 */
export const DrawArrow: React.FC<{from: Pt; to: Pt; bend?: number; start?: number; color?: 'lime' | 'white'; label?: string; width?: number}> = ({
	from,
	to,
	bend = 0.25,
	start = 0,
	color = 'lime',
	label,
	width: sw,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	if (frame < start) return null;
	const col = color === 'lime' ? C.lime : C.micro;
	const [a, b] = [px(from, width, height), px(to, width, height)];
	const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
	const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
	const c: Pt = [mx - dy * bend, my + dx * bend];
	const p = prog(frame, start, f(T.arrowDraw, fps), 'out');
	const head = prog(frame, start + f(T.arrowDraw - 2, fps), f(3, fps), 'out');
	const ang = Math.atan2(b[1] - c[1], b[0] - c[0]);
	const hl = 0.028 * height;
	const strokeW = sw ?? 0.008 * height;
	const yb = frame > start + f(T.arrowDraw, fps) ? bob(frame, fps, 3) : 0;
	return (
		<AbsoluteFill style={{transform: `translateY(${yb}px)`}}>
			<svg width={width} height={height} style={{overflow: 'visible'}}>
				<path d={`M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`} fill="none" stroke={col} strokeWidth={strokeW} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
				<g opacity={head} transform={`translate(${b[0]} ${b[1]}) rotate(${(ang * 180) / Math.PI})`}>
					<path d={`M ${-hl} ${-hl * 0.7} L 0 0 L ${-hl} ${hl * 0.7}`} fill="none" stroke={col} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
				</g>
			</svg>
			{label ? (
				<div style={{position: 'absolute', left: a[0], top: a[1], transform: 'translate(-50%, -120%)', ...limeType(S.label * height * 1.6, col), whiteSpace: 'nowrap', opacity: prog(frame, start, f(3, fps))}}>{label}</div>
			) : null}
		</AbsoluteFill>
	);
};

/**
 * MagnifierInset — a circle scales up out of a point (`from`), joined to it by a translucent lime cone,
 * holding a close-up (`children`). ~10f in, ease-out.
 */
export const MagnifierInset: React.FC<{from: Pt; center: Pt; radius?: number; start?: number; children: React.ReactNode}> = ({
	from,
	center,
	radius = 0.16,
	start = 0,
	children,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	if (frame < start) return null;
	const p = prog(frame, start, f(T.magnifier, fps), 'out');
	const [a, c] = [px(from, width, height), px(center, width, height)];
	const cx = mix(p, a[0], c[0]);
	const cy = mix(p, a[1], c[1]);
	const r = radius * height * p;
	const ang = Math.atan2(cy - a[1], cx - a[0]);
	const t1: Pt = [cx + r * Math.cos(ang + Math.PI / 2), cy + r * Math.sin(ang + Math.PI / 2)];
	const t2: Pt = [cx + r * Math.cos(ang - Math.PI / 2), cy + r * Math.sin(ang - Math.PI / 2)];
	return (
		<AbsoluteFill>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<polygon points={`${a[0]},${a[1]} ${t1[0]},${t1[1]} ${t2[0]},${t2[1]}`} fill={C.lime} opacity={0.28} />
				<circle cx={a[0]} cy={a[1]} r={5} fill={C.lime} />
			</svg>
			<div
				style={{
					position: 'absolute',
					left: cx - r,
					top: cy - r,
					width: r * 2,
					height: r * 2,
					borderRadius: '50%',
					overflow: 'hidden',
					border: `${Math.max(2, 0.006 * height)}px solid ${C.lime}`,
					background: '#0b141e',
				}}
			>
				<div style={{position: 'absolute', inset: 0, transform: `scale(${mix(p, 0.6, 1)})`}}>{children}</div>
			</div>
		</AbsoluteFill>
	);
};

/** DashedConnector — a dashed line that draws from a to b (tethers, comparison lines, trend lines). */
export const DashedConnector: React.FC<{a: Pt; b: Pt; start?: number; frames?: number; color?: string; label?: string}> = ({
	a,
	b,
	start = 0,
	frames = 12,
	color = C.lime,
	label,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	if (frame < start) return null;
	const p = prog(frame, start, f(frames, fps), 'linear');
	const [A, B] = [px(a, width, height), px(b, width, height)];
	return (
		<AbsoluteFill>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<line x1={A[0]} y1={A[1]} x2={mix(p, A[0], B[0])} y2={mix(p, A[1], B[1])} stroke={color} strokeWidth={0.0035 * height} strokeDasharray={`${0.012 * height} ${0.009 * height}`} />
			</svg>
			{label ? (
				<div
					style={{
						position: 'absolute',
						left: (A[0] + B[0]) / 2,
						top: (A[1] + B[1]) / 2,
						transform: 'translate(-50%, -160%)',
						fontFamily: F.ui,
						fontWeight: 700,
						fontSize: S.label * height,
						letterSpacing: '0.06em',
						color: C.micro,
						textTransform: 'uppercase',
						whiteSpace: 'nowrap',
						opacity: prog(frame, start + f(frames, fps), f(4, fps)),
					}}
				>
					{label}
				</div>
			) : null}
		</AbsoluteFill>
	);
};

/**
 * Highlighter — wrap the key words of a headline/document. A lime swipe wipes in left→right behind them.
 * Use inline: <Headline>First atmosphere found on <Highlighter start={10}>Earth-like</Highlighter> planet</Headline>
 */
export const Highlighter: React.FC<{start?: number; frames?: number; children: React.ReactNode}> = ({start = 0, frames = 6, children}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = prog(frame, start, f(frames, fps), 'out');
	return (
		<span style={{position: 'relative', whiteSpace: 'nowrap'}}>
			<span style={{position: 'absolute', left: '-0.08em', right: '-0.08em', top: '0.05em', bottom: '0.02em', background: C.lime, transformOrigin: '0 50%', transform: `scaleX(${p})`, zIndex: 0}} />
			<span style={{position: 'relative', zIndex: 1}}>{children}</span>
		</span>
	);
};

/** HeadlineCard — a white news card that pops into a collage (use with Highlighter). */
export const HeadlineCard: React.FC<{at: Pt; start?: number; width?: number; outlet?: string; tilt?: number; children: React.ReactNode}> = ({
	at,
	start = 0,
	width: w = 30,
	outlet,
	tilt = 0,
	children,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const p = pop(frame, start, f(4, fps), 1.08);
	if (!p.visible) return null;
	const drift = (frame - start) * 0.15;
	return (
		<div
			style={{
				position: 'absolute',
				left: `${at[0]}%`,
				top: `${at[1]}%`,
				width: (w / 100) * width,
				transform: `translate(-50%, -50%) translateY(${-drift}px) rotate(${tilt}deg) scale(${p.scale})`,
				opacity: p.opacity,
				background: '#FFFFFF',
				color: '#111',
				padding: 0.018 * height,
				boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
				fontFamily: 'Georgia, "Times New Roman", serif',
				fontSize: 0.032 * height,
				lineHeight: 1.2,
			}}
		>
			{outlet ? <div style={{fontFamily: F.ui, fontWeight: 900, fontSize: 0.014 * height, letterSpacing: '0.1em', marginBottom: 0.01 * height}}>{outlet}</div> : null}
			{children}
		</div>
	);
};

/** ViewfinderBracket — the gold rounded bracket at the left edge that marks borrowed/archival footage. */
export const ViewfinderBracket: React.FC = () => {
	const {height} = useVideoConfig();
	const h = 0.2 * height;
	return (
		<div style={{position: 'absolute', left: '1.6%', top: '50%', width: h * 0.62, height: h, transform: 'translateY(-50%)', border: `${0.004 * height}px solid #C9A86A`, borderRadius: h * 0.16}} />
	);
};
