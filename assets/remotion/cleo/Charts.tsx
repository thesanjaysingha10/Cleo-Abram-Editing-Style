import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {mix, pop, prog, typed} from './motion';
import {limeType} from './Type';
import {C, F, S, T, f} from './tokens';

// ---------------------------------------------------------------------------
// Explain-with-data: a line chart that draws in lockstep with the action,
// the term-by-term equation build, the four-arrow axis diagram.
// ---------------------------------------------------------------------------

/**
 * LineChart — inset chart (dark translucent panel, thin grid, tiny caps axis labels) whose lime line
 * draws to `progress` (0..1). Drive `progress` from the same value that moves your object so the
 * plot stays in lockstep (the transit light-curve move). `callout` pops when the line passes `callout.at`.
 */
export const LineChart: React.FC<{
	points: [number, number][]; // x,y in 0..1 (y up)
	progress: number;
	box: {x: number; y: number; w: number; h: number}; // % of frame
	xLabel?: string;
	yLabel?: string;
	callout?: {at: number; text: string};
	color?: string;
}> = ({points, progress, box, xLabel, yLabel, callout, color = C.lime}) => {
	const {width, height} = useVideoConfig();
	const [bx, by, bw, bh] = [(box.x / 100) * width, (box.y / 100) * height, (box.w / 100) * width, (box.h / 100) * height];
	const pad = 0.04 * bh;
	const X = (v: number) => pad + v * (bw - pad * 2);
	const Y = (v: number) => bh - pad - v * (bh - pad * 2);
	const shown = points.filter(([x]) => x <= progress);
	const last = points.find(([x]) => x > progress);
	const prev = shown[shown.length - 1];
	if (last && prev) {
		const t = (progress - prev[0]) / (last[0] - prev[0]);
		shown.push([progress, mix(t, prev[1], last[1])]);
	}
	const d = shown.map(([x, y], i) => `${i ? 'L' : 'M'} ${X(x)} ${Y(y)}`).join(' ');
	const micro: React.CSSProperties = {position: 'absolute', fontFamily: F.ui, fontWeight: 700, fontSize: S.micro * height, letterSpacing: '0.08em', color: C.micro, textTransform: 'uppercase'};
	const cp = callout ? points.reduce((b, p) => (Math.abs(p[0] - callout.at) < Math.abs(b[0] - callout.at) ? p : b)) : null;
	return (
		<div style={{position: 'absolute', left: bx, top: by, width: bw, height: bh, background: 'rgba(30,60,55,0.55)', border: '1px solid rgba(255,255,255,0.35)'}}>
			<svg width={bw} height={bh} style={{position: 'absolute', inset: 0}}>
				{[0.25, 0.5, 0.75].map((g) => (
					<React.Fragment key={g}>
						<line x1={X(g)} x2={X(g)} y1={0} y2={bh} stroke="rgba(255,255,255,0.08)" />
						<line y1={Y(g)} y2={Y(g)} x1={0} x2={bw} stroke="rgba(255,255,255,0.08)" />
					</React.Fragment>
				))}
				<path d={d} fill="none" stroke={color} strokeWidth={0.006 * height} strokeLinejoin="round" strokeLinecap="round" />
				{cp && progress >= callout!.at ? <line x1={X(cp[0])} x2={X(cp[0])} y1={Y(1) + bh * 0.08} y2={Y(cp[1]) - 6} stroke={C.micro} strokeWidth={1.5} strokeDasharray="4 4" /> : null}
			</svg>
			{xLabel ? <div style={{...micro, left: '50%', bottom: -S.micro * height * 2, transform: 'translateX(-50%)'}}>{xLabel}</div> : null}
			{yLabel ? <div style={{...micro, left: -S.micro * height * 1.6, top: '50%', transform: 'translate(-50%,-50%) rotate(-90deg)', whiteSpace: 'nowrap'}}>{yLabel}</div> : null}
			{cp && progress >= callout!.at ? <div style={{...micro, left: X(cp[0]) + 8, top: Y(1) + bh * 0.04}}>{callout!.text}</div> : null}
		</div>
	);
};

export type EqTerm = {sym: string; sub?: string; sup?: string; caption: string};

/**
 * EquationBuild — heading types in, then terms pop one every ~12f (lime heavy, grey ×), each dropping
 * a leader line to a tiny caps caption that types under it. Captions alternate two depths.
 */
export const EquationBuild: React.FC<{title: string; subtitle?: string; terms: EqTerm[]; start?: number; y?: number}> = ({
	title,
	subtitle,
	terms,
	start = 0,
	y = 50,
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const size = S.equation * height;
	const gap = f(T.eqTermGap, fps);
	const termsStart = start + Math.ceil(title.length * 0.8);
	const micro: React.CSSProperties = {fontFamily: F.ui, fontWeight: 700, letterSpacing: '0.06em', color: C.micro, textTransform: 'uppercase'};
	return (
		<div style={{position: 'absolute', left: '50%', top: `${y}%`, transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
			<div style={{...micro, fontFamily: F.display, fontSize: 0.03 * height, letterSpacing: '0.01em', color: '#FFFFFF'}}>{typed(title, frame, start, 1.25)}</div>
			{subtitle ? <div style={{...micro, fontSize: S.micro * height, marginTop: 6, minHeight: S.micro * height * 1.3}}>{typed(subtitle, frame, start + 6, 2.5)}</div> : null}
			<div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: size * 0.35}}>
				{terms.map((t, i) => {
					const s = termsStart + i * gap;
					const p = pop(frame, s, f(T.pop, fps));
					const line = prog(frame, s + f(3, fps), f(6, fps));
					const deep = i % 2 === 1;
					return (
						<div key={i} style={{display: 'flex', alignItems: 'flex-start'}}>
							{i > 0 ? <span style={{...limeType(size * 0.55, '#C9CFC8'), textShadow: 'none', margin: `${size * 0.22}px ${size * 0.12}px 0`, visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity}}>×</span> : null}
							<div style={{position: 'relative', visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, transform: `scale(${p.scale})`}}>
								<span style={{...limeType(size), textTransform: 'none'}}>
									{t.sym}
									{t.sup ? <sup style={{fontSize: '0.55em'}}>{t.sup}</sup> : null}
									{t.sub ? <sub style={{fontSize: '0.55em'}}>{t.sub}</sub> : null}
								</span>
								<div style={{position: 'absolute', left: '50%', top: size * 1.15, width: 2, height: (deep ? size * 1.0 : size * 0.45) * line, background: C.micro}} />
								<div style={{...micro, position: 'absolute', left: '50%', top: size * 1.2 + (deep ? size * 1.0 : size * 0.45), transform: 'translateX(-50%)', fontSize: S.micro * height * 0.85, width: size * 2.6, lineHeight: 1.25}}>
									{typed(t.caption, frame, s + f(8, fps), 3)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

/**
 * AxisDiagram — four arrows grow from a centre point with lime/red end labels, then an optional dashed
 * trend line draws with labelled dots (the "signal vs invasiveness" chart). Put a defocused picture behind it.
 */
export const AxisDiagram: React.FC<{
	labels: {top: string; bottom: string; left: string; right: string};
	dots?: {x: number; y: number; label: string}[]; // -1..1 coords
	start?: number;
	size?: number; // half-length as fraction of height
}> = ({labels, dots = [], start = 0, size = 0.28}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const L = size * height;
	const [cx, cy] = [width / 2, height / 2];
	const g = prog(frame, start, f(8, fps));
	const lab = prog(frame, start + f(6, fps), f(4, fps));
	const trend = prog(frame, start + f(14, fps), f(14, fps), 'linear');
	const arrow = (dx: number, dy: number, col: string) => {
		const [x2, y2] = [cx + dx * L * g, cy + dy * L * g];
		const a = Math.atan2(dy, dx);
		const h = 0.022 * height;
		return (
			<g>
				<line x1={cx} y1={cy} x2={x2} y2={y2} stroke={col} strokeWidth={0.005 * height} />
				<polygon points={`${x2},${y2} ${x2 - h * Math.cos(a - 0.5)},${y2 - h * Math.sin(a - 0.5)} ${x2 - h * Math.cos(a + 0.5)},${y2 - h * Math.sin(a + 0.5)}`} fill={col} />
			</g>
		);
	};
	const word = (t: string, x: number, y: number, col: string) => (
		<div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', ...limeType(0.03 * height, col), textAlign: 'center', opacity: lab, whiteSpace: 'pre'}}>{t}</div>
	);
	return (
		<>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				{arrow(0, -1, C.lime)}
				{arrow(0, 1, C.alert)}
				{arrow(-1, 0, C.alert)}
				{arrow(1, 0, C.lime)}
				{dots.length ? (
					<line x1={cx - L * 0.95} y1={cy - L * 0.75} x2={mix(trend, cx - L * 0.95, cx + L * 0.95)} y2={mix(trend, cy - L * 0.75, cy + L * 0.75)} stroke={C.micro} strokeWidth={2.5} strokeDasharray="10 8" />
				) : null}
			</svg>
			{word(labels.top, cx, cy - L - 0.05 * height, C.lime)}
			{word(labels.bottom, cx, cy + L + 0.05 * height, C.alert)}
			{word(labels.left, cx - L - 0.09 * height, cy, C.alert)}
			{word(labels.right, cx + L + 0.09 * height, cy, C.lime)}
			{dots.map((d, i) => {
				const p = pop(frame, start + f(16, fps) + i * f(6, fps), f(3, fps));
				const [x, y] = [cx + d.x * L, cy + d.y * L];
				return (
					<div key={i} style={{position: 'absolute', left: x, top: y, visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, transform: `translate(-50%,-50%) scale(${p.scale})`}}>
						<div style={{width: 14, height: 14, borderRadius: 7, background: '#2F7BFF', boxShadow: '0 0 12px #2F7BFF'}} />
						<div style={{position: 'absolute', left: 20, top: -4, fontFamily: F.ui, fontWeight: 700, fontSize: S.micro * height, color: C.micro, whiteSpace: 'nowrap', textTransform: 'uppercase'}}>{d.label}</div>
					</div>
				);
			})}
		</>
	);
};
