import React from 'react';
import {Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {bob, mix, pop, prog} from './motion';
import {C, F, S, T, f} from './tokens';

// ---------------------------------------------------------------------------
// Supers and labels: asterisk lower third, guest-question plates, label chips
// with leader lines, source credit, corner brand bug, AD badge.
// ---------------------------------------------------------------------------

/**
 * LowerThird — lime asterisk scales in (0-4f), NAME blur-slides from the right (+2f), ROLE fades (+8f),
 * then the whole block drifts ~3 % of width left for its hold. Bottom-left at x≈7 %, y≈88 %.
 */
export const LowerThird: React.FC<{name: string; role: string; start?: number; hold?: number; x?: number; y?: number}> = ({
	name,
	role,
	start = 0,
	hold = 96,
	x = 7,
	y = 86,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	if (frame < start) return null;
	const out = prog(frame, start + hold, f(6, fps), 'out');
	const ast = prog(frame, start, f(4, fps), 'out');
	const nm = prog(frame, start + f(2, fps), f(5, fps), 'out');
	const rl = prog(frame, start + f(8, fps), f(4, fps), 'out');
	const drift = -((frame - start) / Math.max(1, hold)) * width * 0.03 * 0.6;
	const nameSize = S.lowerName * height;
	return (
		<div style={{position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(${drift}px, -50%)`, opacity: 1 - out}}>
			<div style={{display: 'flex', alignItems: 'flex-start', gap: nameSize * 0.25}}>
				<span style={{fontFamily: F.display, color: C.lime, fontSize: nameSize * 1.1, lineHeight: 0.8, transform: `scale(${ast})`, display: 'inline-block'}}>*</span>
				<div>
					<div
						style={{
							fontFamily: F.label,
							fontWeight: 800,
							fontSize: nameSize,
							lineHeight: 1,
							color: '#FFFFFF',
							textTransform: 'uppercase',
							textShadow: '0 1px 6px rgba(0,0,0,0.45)',
							opacity: nm,
							transform: `translateX(${mix(nm, nameSize * 1.2, 0)}px)`,
							filter: `blur(${mix(nm, 6, 0)}px)`,
						}}
					>
						{name}
					</div>
					<div
						style={{
							fontFamily: F.label,
							fontWeight: 800,
							fontSize: S.lowerRole * height,
							color: '#F1F1F1',
							textTransform: 'uppercase',
							letterSpacing: '0.02em',
							marginTop: nameSize * 0.12,
							opacity: rl * 0.92,
							textShadow: '0 1px 4px rgba(0,0,0,0.45)',
						}}
					>
						{role}
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * QuestionPlate — circular avatar in a lime ring + two lime plates ("QUESTION FROM:" / "NAME, TITLE")
 * that unroll left→right with the text (19f, row 2 +3f). Top-right.
 */
export const QuestionPlate: React.FC<{lines: [string, string]; avatar?: string; start?: number; hold?: number}> = ({
	lines,
	avatar,
	start = 0,
	hold = 300,
}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	if (frame < start) return null;
	const out = prog(frame, start + hold, f(6, fps));
	const av = pop(frame, start, f(4, fps), 0.6);
	const px = S.plate * height;
	const d = 0.12 * height;
	return (
		<div style={{position: 'absolute', right: '4%', top: '8%', display: 'flex', alignItems: 'center', gap: px * 0.6, opacity: 1 - out}}>
			<div
				style={{
					width: d,
					height: d,
					borderRadius: '50%',
					border: `${px * 0.3}px solid ${C.lime}`,
					boxShadow: `0 0 0 2px ${C.teal}`,
					overflow: 'hidden',
					background: C.tealLight,
					transform: `scale(${av.scale})`,
				}}
			>
				{avatar ? <Img src={avatar} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : null}
			</div>
			<div style={{display: 'flex', flexDirection: 'column', gap: px * 0.25}}>
				{lines.map((l, i) => {
					const p = prog(frame, start + f(2, fps) + i * f(T.plateRowGap, fps), f(T.plateWipe, fps) - i * f(3, fps), 'linear');
					return (
						<div key={i} style={{clipPath: `inset(0 ${100 - p * 100}% 0 0)`}}>
							<span
								style={{
									fontFamily: F.cond,
									fontWeight: 800,
									fontSize: px,
									lineHeight: 1.15,
									background: C.lime,
									color: C.ink,
									padding: `0 ${px * 0.3}px`,
									border: `1.5px solid ${C.teal}`,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								{l}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

/**
 * LabelChip — small bold caps chip attached to a point by a leader line. The line draws first
 * (from the object), then the chip pops. `tone` picks the chip colour (match the region colour).
 */
export const LabelChip: React.FC<{
	text: string;
	at: [number, number]; // object point, % of frame
	to: [number, number]; // chip position, % of frame
	start?: number;
	tone?: 'lime' | 'blue' | 'red' | 'white';
}> = ({text, at, to, start = 0, tone = 'lime'}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	if (frame < start) return null;
	const line = prog(frame, start, f(6, fps), 'out');
	const p = pop(frame, start + f(5, fps), f(3, fps));
	const bg = {lime: C.lime, blue: '#2F7BFF', red: C.alert, white: C.micro}[tone];
	const fg = tone === 'lime' || tone === 'white' ? C.ink : '#FFFFFF';
	const [ax, ay] = [(at[0] / 100) * width, (at[1] / 100) * height];
	const [bx, by] = [(to[0] / 100) * width, (to[1] / 100) * height];
	const px = S.label * height;
	return (
		<>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				<line x1={ax} y1={ay} x2={mix(line, ax, bx)} y2={mix(line, ay, by)} stroke={C.micro} strokeWidth={2} />
				<circle cx={ax} cy={ay} r={4} fill={bg} />
			</svg>
			<div
				style={{
					position: 'absolute',
					left: bx,
					top: by,
					transform: `translate(${bx >= ax ? '0' : '-100%'}, -50%) scale(${p.scale})`,
					visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity,
					fontFamily: F.ui,
					fontWeight: 900,
					fontSize: px,
					letterSpacing: '0.06em',
					background: bg,
					color: fg,
					padding: `${px * 0.2}px ${px * 0.45}px`,
					textTransform: 'uppercase',
					whiteSpace: 'nowrap',
				}}
			>
				{text}
			</div>
		</>
	);
};

/** SourceCredit — tiny "* SOURCE: …" bottom-left on borrowed footage. */
export const SourceCredit: React.FC<{text: string}> = ({text}) => {
	const {height} = useVideoConfig();
	return (
		<div style={{position: 'absolute', left: '2.2%', bottom: '3.2%', fontFamily: F.ui, fontWeight: 700, fontSize: S.credit * height, color: 'rgba(235,235,235,0.75)', letterSpacing: '0.04em', textTransform: 'uppercase'}}>
			* Source: {text}
		</div>
	);
};

/** BrandBug — your mark in grey heavy caps, bottom-right, on every graphic (the HUGE* bug slot). */
export const BrandBug: React.FC<{mark: string}> = ({mark}) => {
	const {height} = useVideoConfig();
	return <div style={{position: 'absolute', right: '2.6%', bottom: '3%', fontFamily: F.display, fontSize: 0.02 * height, color: C.bug}}>{mark}</div>;
};

/** AdBadge — lime ring + "*AD", top corner, for the whole sponsor read. Ring draws on, then holds. */
export const AdBadge: React.FC<{start?: number; corner?: 'left' | 'right'}> = ({start = 0, corner = 'right'}) => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	if (frame < start) return null;
	const r = 0.045 * height;
	const p = prog(frame, start, f(10, fps));
	const circ = 2 * Math.PI * r;
	return (
		<div style={{position: 'absolute', top: '4%', [corner]: '3%', width: r * 2.4, height: r * 2.4, transform: `translateY(${bob(frame, fps, 1.5, 0.5)}px)`}}>
			<svg width={r * 2.4} height={r * 2.4} style={{position: 'absolute', inset: 0}}>
				<circle cx={r * 1.2} cy={r * 1.2} r={r} fill="none" stroke={C.lime} strokeWidth={r * 0.16} strokeDasharray={circ} strokeDashoffset={circ * (1 - p * 0.82)} transform={`rotate(-90 ${r * 1.2} ${r * 1.2})`} />
			</svg>
			<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontSize: r * 0.62, color: C.lime, textShadow: `0 2px 0 ${C.limeShadow}`, opacity: p}}>*AD</div>
		</div>
	);
};
