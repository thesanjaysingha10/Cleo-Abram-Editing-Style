import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import '../../cleo/fonts';
import {
	BrandBug,
	C,
	ClayObject,
	DashedConnector,
	DepthGauge,
	F,
	HeroWord,
	LabelBox,
	LabelChip,
	LightLeak,
	S,
	Stage,
	Starfield,
	Typewriter,
	limeType,
	mix,
	pop,
	prog,
	setMotionFeel,
} from '../../cleo';
import {CameraRig, CutawaySun, Nuclei, Scene3D, Sun} from './Sun3D';
import {FPS, SHOTS, TOTAL, W} from './storyboard';

export {FPS, TOTAL};
const MARK = 'STUDIO*';
const SHIFT = -12; // 3D canvases sit left of centre so hero type owns the right third
const CX = 50 + SHIFT; // screen x (%) of the Sun's centre in shifted shots

const Shifted: React.FC<{children: React.ReactNode}> = ({children}) => (
	<AbsoluteFill style={{transform: `translateX(${SHIFT}%)`}}>{children}</AbsoluteFill>
);

/** Fade a child out (eased) starting at `at` instead of letting it vanish. */
const FadeOut: React.FC<{at: number; len?: number; children: React.ReactNode}> = ({at, len = 10, children}) => {
	const frame = useCurrentFrame();
	if (frame >= at + len) return null;
	return <AbsoluteFill style={{opacity: 1 - prog(frame, at, len)}}>{children}</AbsoluteFill>;
};

/** Eased fade-in used for the cross-dissolve at the head of every shot. */
const XF = 10;
const FadeIn: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{opacity: prog(frame, 0, XF)}}>{children}</AbsoluteFill>;
};

const micro = (h: number): React.CSSProperties => ({fontFamily: F.ui, fontWeight: 700, fontSize: S.label * h, letterSpacing: '0.08em', color: C.micro, textTransform: 'uppercase'});

// ── Shot 01 — cold open ───────────────────────────────────────────────────
const Open: React.FC = () => {
	const frame = useCurrentFrame();
	const z = mix(prog(frame, 0, 77, 'inOut'), 7.4, 5.8);
	return (
		<AbsoluteFill>
			<Starfield seed="sun" />
			<Shifted>
				<Scene3D>
					<CameraRig pos={[0, 0.15, z]} />
					<Sun />
				</Scene3D>
			</Shifted>
			<HeroWord lines={['Nuclear', 'fusion']} x={80} y={50} start={W.nuclear} gap={W.fusion - W.nuclear} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 02 — into the core: 15 million °C, immense pressure ──────────────
const TempCounter: React.FC<{start: number; end: number; hideAt: number}> = ({start, end, hideAt}) => {
	const frame = useCurrentFrame();
	const {height} = useVideoConfig();
	if (frame < start || frame >= hideAt) return null;
	const v = Math.round(mix(prog(frame, start, end - start, 'linear'), 0, 15_000_000));
	const p = pop(frame, start, 3);
	return (
		<div style={{position: 'absolute', left: '81%', top: '46%', transform: `translate(-50%,-50%) scale(${p.scale})`, textAlign: 'center'}}>
			<div style={{...limeType(0.062 * height), fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>{v.toLocaleString('en-US')}°C</div>
			<div style={{...micro(height), marginTop: 10}}>Core temperature</div>
		</div>
	);
};

const PressureArrows: React.FC<{start: number}> = ({start}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	if (frame < start) return null;
	const fade = prog(frame, start, 8);
	const cx = (CX / 100) * width;
	const cy = height / 2;
	const p = prog(frame, start, 18, 'inOut');
	const pulse = 1 + 0.04 * Math.sin((frame - start) / 3);
	return (
		<svg width={width} height={height} style={{position: 'absolute', inset: 0, opacity: fade}}>
			{Array.from({length: 8}, (_, i) => {
				const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
				const r0 = 0.36 * height * pulse;
				const r1 = mix(p, r0, 0.15 * height);
				const [x0, y0, x1, y1] = [cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1];
				const hl = 0.022 * height;
				return (
					<g key={i}>
						<line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#FFFFFF" strokeWidth={0.008 * height} strokeLinecap="round" />
						<path
							d={`M ${x1 + Math.cos(a + 0.55) * hl} ${y1 + Math.sin(a + 0.55) * hl} L ${x1} ${y1} L ${x1 + Math.cos(a - 0.55) * hl} ${y1 + Math.sin(a - 0.55) * hl}`}
							fill="none"
							stroke="#FFFFFF"
							strokeWidth={0.008 * height}
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
				);
			})}
		</svg>
	);
};

const Core: React.FC = () => {
	const frame = useCurrentFrame();
	const from = 77;
	const r = (abs: number) => abs - from;
	const t = prog(frame, 0, r(W.gravity), 'inOut');
	const pos: [number, number, number] = [mix(t, 2.9, 2.2), mix(t, 1.3, 0.9), mix(t, 5.6, 4.3)];
	const heat = prog(frame, r(W.fifteen), r(W.celsius) - r(W.fifteen), 'linear');
	return (
		<AbsoluteFill>
			<Stage />
			<Shifted>
				<Scene3D>
					<CameraRig pos={pos} />
					<CutawaySun spin={frame * 0.0015} />
				</Scene3D>
			</Shifted>
			<FadeOut at={r(W.gravity) - 6}>
				<LabelChip text="Core" at={[CX, 50]} to={[CX - 20, 20]} start={r(W.core)} tone="lime" />
				{frame >= r(W.fifteen) - 4 ? <DepthGauge progress={heat * 0.92} label={`${Math.round(heat * 15)} million °C`} /> : null}
				<TempCounter start={r(W.fifteen)} end={r(W.celsius)} hideAt={r(W.gravity) + 10} />
			</FadeOut>
			<PressureArrows start={r(W.gravity)} />
			<HeroWord lines={['Immense', 'pressure']} x={81} y={50} start={r(W.immense)} gap={r(W.pressure) - r(W.immense)} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 03 — fusion up close ─────────────────────────────────────────────
const Fusion: React.FC = () => {
	const frame = useCurrentFrame();
	const from = 259;
	const fuse = W.fuse - from;
	const tIn = Math.min(1, frame / fuse);
	const e = (tIn < 0.5 ? 4 * tIn ** 3 : 1 - (-2 * tIn + 2) ** 3 / 2) * 0.94; // ease in AND out (matches Nuclei)
	// screen position of the upper-left proton (camera z=6, fov 32 → half-extent 3.06 × 1.72 units)
	const px = 50 + ((-3.2 * (1 - e)) / 3.06) * 50;
	const py = 50 - ((1.7 * (1 - e)) / 1.72) * 50;
	const flash = frame < fuse - 3 ? 0 : frame < fuse ? prog(frame, fuse - 3, 3) * 0.55 : 0.55 * (1 - prog(frame, fuse, 12));
	return (
		<AbsoluteFill>
			<Stage />
			<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 50%, rgba(255,190,90,0.28) 0%, rgba(0,0,0,0) 60%)'}} />
			<Scene3D>
				<CameraRig pos={[0, 0, 6]} />
				<Nuclei fuseAt={fuse} />
			</Scene3D>
			<FadeOut at={fuse - 8} len={8}>
				<LabelChip text="Hydrogen nuclei" at={[px + 2.5, py + 4]} to={[px + 14, py + 16]} start={W.hydrogen - from} tone="red" />
			</FadeOut>
			<LabelChip text="Helium" at={[52.5, 46]} to={[70, 26]} start={W.helium - from} tone="lime" />
			<AbsoluteFill style={{background: '#FFF6DA', opacity: flash}} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 04 — the mass check (2D balance) ─────────────────────────────────
const Ball: React.FC<{x: number; y: number; r: number; kind: 'p' | 'n'}> = ({x, y, r, kind}) => (
	<circle cx={x} cy={y} r={r} fill={`url(#${kind === 'p' ? 'gp' : 'gn'})`} stroke="rgba(0,0,0,0.35)" strokeWidth={1.5} />
);

const Balance: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const from = 365;
	const tip = W.less - from;
	const a = -7 * prog(frame, tip - 4, 18, 'inOut');
	const rad = (a * Math.PI) / 180;
	const [cx, cy, L] = [width / 2, height * 0.42, width * 0.26];
	const lx = cx - Math.cos(rad) * L;
	const ly = cy - Math.sin(rad) * L;
	const rx = cx + Math.cos(rad) * L;
	const ry = cy + Math.sin(rad) * L;
	const hang = height * 0.17;
	const r = height * 0.03;
	const panIn = (i: number) => pop(frame, 4 + i * 6, 3);
	return (
		<AbsoluteFill>
			<Stage />
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<defs>
					<radialGradient id="gp" cx="35%" cy="30%" r="70%">
						<stop offset="0%" stopColor="#FF9AA0" />
						<stop offset="55%" stopColor="#E2464F" />
						<stop offset="100%" stopColor="#8E1C25" />
					</radialGradient>
					<radialGradient id="gn" cx="35%" cy="30%" r="70%">
						<stop offset="0%" stopColor="#F2F6FB" />
						<stop offset="55%" stopColor="#AEBBCB" />
						<stop offset="100%" stopColor="#5D6B7D" />
					</radialGradient>
				</defs>
				<polygon points={`${cx - 60},${height * 0.86} ${cx + 60},${height * 0.86} ${cx},${cy}`} fill={C.teal} stroke={C.tealLight} strokeWidth={3} />
				<line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.micro} strokeWidth={10} strokeLinecap="round" />
				<circle cx={cx} cy={cy} r={12} fill={C.lime} />
				{[
					[lx, ly],
					[rx, ry],
				].map(([x, y], i) => (
					<g key={i}>
						<line x1={x} y1={y} x2={x - 70} y2={y + hang} stroke="rgba(241,241,243,0.6)" strokeWidth={2} />
						<line x1={x} y1={y} x2={x + 70} y2={y + hang} stroke="rgba(241,241,243,0.6)" strokeWidth={2} />
						<path d={`M ${x - 95} ${y + hang} Q ${x} ${y + hang + 50} ${x + 95} ${y + hang}`} fill={C.tealLight} stroke={C.micro} strokeWidth={3} />
					</g>
				))}
				{[0, 1, 2, 3].map((i) =>
					panIn(i).visible ? <Ball key={i} x={lx - 54 + i * 36} y={ly + hang - r * 0.9} r={r * panIn(i).scale} kind="p" /> : null,
				)}
				{panIn(4).visible ? (
					<g transform={`translate(${rx} ${ry + hang - r * 1.6}) scale(${panIn(4).scale})`}>
						<Ball x={-r * 0.7} y={-r * 0.7} r={r} kind="p" />
						<Ball x={r * 0.7} y={-r * 0.7} r={r} kind="n" />
						<Ball x={-r * 0.7} y={r * 0.6} r={r} kind="n" />
						<Ball x={r * 0.7} y={r * 0.6} r={r} kind="p" />
					</g>
				) : null}
			</svg>
			<div style={{...micro(height), position: 'absolute', left: lx, top: ly + hang + 70, transform: 'translateX(-50%)'}}>4 × hydrogen</div>
			<div style={{...micro(height), position: 'absolute', left: rx, top: ry + hang + 70, transform: 'translateX(-50%)'}}>1 × helium</div>
			<LabelBox text="−0.7% mass" x={(rx / width) * 100} y={((ry - height * 0.1) / height) * 100} start={W.mass - from} size={0.045} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 05 — missing mass → energy → E = mc² ─────────────────────────────
const MassToEnergy: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const from = 470;
	const burst = W.energy - from;
	const [cx, cy] = [width * 0.38, height * 0.5];
	const R = height * 0.13;
	const draw = prog(frame, 2, 10);
	const b = prog(frame, burst - 2, 20, 'out');
	return (
		<AbsoluteFill>
			<Stage />
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				{frame < burst + 8 ? (
					<circle opacity={1 - prog(frame, burst - 2, 10)} cx={cx} cy={cy} r={R} fill="rgba(198,255,1,0.06)" stroke={C.lime} strokeWidth={5} strokeDasharray="18 14" pathLength={1000} strokeDashoffset={(1 - draw) * 1000} />
				) : null}
				{frame >= burst - 2
					? Array.from({length: 16}, (_, i) => {
							const a = (i / 16) * Math.PI * 2;
							const r0 = R * mix(b, 0.2, 1.1);
							const r1 = R * mix(b, 0.4, 3.6);
							return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke="#FFF6DA" strokeWidth={6 * (1 - b * 0.5)} strokeLinecap="round" />;
						})
					: null}
				{frame >= burst - 2 ? <circle cx={cx} cy={cy} r={R * mix(b, 0.6, 0.25)} fill="#FFF6DA" opacity={prog(frame, burst - 2, 8) * (1 - b * 0.4)} /> : null}
			</svg>
			<FadeOut at={burst - 6}>
				<LabelChip text="Missing mass" at={[38 + 6.8, 50 - 9]} to={[60, 24]} start={W.missing - from} tone="lime" />
			</FadeOut>
			<HeroWord lines={['Energy']} x={76} y={50} start={burst} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

const Term: React.FC<{sym: React.ReactNode; caption?: string; start: number; depth?: number; color?: string}> = ({sym, caption, start, depth = 0, color = C.lime}) => {
	const frame = useCurrentFrame();
	const {height} = useVideoConfig();
	const p = pop(frame, start, 3);
	const size = 0.2 * height;
	const line = prog(frame, start + 3, 6);
	return (
		<div style={{position: 'relative', visibility: p.visible ? 'visible' : 'hidden', opacity: p.opacity, transform: `scale(${p.scale})`, margin: `0 ${size * 0.08}px`}}>
			<span style={{...limeType(size, color), textTransform: 'none', textShadow: color === C.lime ? limeType(size).textShadow : 'none'}}>{sym}</span>
			{caption ? (
				<>
					<div style={{position: 'absolute', left: '50%', top: size * 1.05, width: 3, height: (size * 0.35 + depth) * line, background: C.micro}} />
					<div style={{...micro(height), position: 'absolute', left: '50%', top: size * 1.1 + size * 0.35 + depth, transform: 'translateX(-50%)', whiteSpace: 'nowrap', opacity: line}}>{caption}</div>
				</>
			) : null}
		</div>
	);
};

const Equation: React.FC = () => {
	const from = 556;
	const r = (abs: number) => abs - from;
	return (
		<AbsoluteFill>
			<Starfield seed="emc" />
			<AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(255,140,40,0.22) 0%, rgba(0,0,0,0) 55%)'}} />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingBottom: '6%'}}>
				<Term sym="E" caption="Energy" start={r(W.E)} />
				<Term sym="=" start={r(W.equals)} color="#C9CFC8" />
				<Term sym="m" caption="Mass" start={r(W.mc)} depth={60} />
				<Term
					sym={
						<>
							c<sup style={{fontSize: '0.5em'}}>2</sup>
						</>
					}
					caption="Speed of light, squared"
					start={r(W.squared)}
				/>
			</AbsoluteFill>
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 06 — back in the Sun: radiative → convective ──────────────────────
const WayOut: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const from = 610;
	const r = (abs: number) => abs - from;
	const orbit = mix(prog(frame, 0, 144, 'inOut'), -0.35, 0.25);
	const D = 4.6;
	const cam: [number, number, number] = [Math.sin(orbit + 0.55) * D, 0.9, Math.cos(orbit + 0.55) * D];
	// 2D overlay geometry: screen radius of the Sun at distance ≈ 4.68 → 0.745 of half-height
	const R = 0.745 * (height / 2);
	const [cx, cy] = [(CX / 100) * width, height / 2];
	const dir = -0.6; // radians, up-right
	// random walk: a seeded zig-zag that drifts outward through the radiative zone
	const zig: number[][] = [];
	let [zx, zy] = [cx + Math.cos(dir) * 0.27 * R, cy + Math.sin(dir) * 0.27 * R];
	for (let i = 0; i < 34; i++) {
		zig.push([zx, zy]);
		const a = dir + Math.sin(i * 12.9898) * 1.9;
		zx += Math.cos(a) * R * 0.045 + Math.cos(dir) * R * 0.011;
		zy += Math.sin(a) * R * 0.045 + Math.sin(dir) * R * 0.011;
	}
	const zp = prog(frame, r(W.travels), r(W.convective) - r(W.travels) - 6, 'linear');
	const shown = zig.slice(0, Math.max(1, Math.ceil(zp * zig.length)));
	const loopP = prog(frame, r(W.convective) - 4, 16, 'out');
	return (
		<AbsoluteFill>
			<Stage />
			<Shifted>
				<Scene3D>
					<CameraRig pos={cam} />
					<CutawaySun />
				</Scene3D>
			</Shifted>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				<polyline points={shown.map((p) => p.join(',')).join(' ')} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeLinejoin="round" />
				{zp > 0 ? <circle cx={shown[shown.length - 1][0]} cy={shown[shown.length - 1][1]} r={9} fill={C.lime} /> : null}
				{[-1.35, -0.6, 0.15].map((a, i) => {
					const rr = 0.83 * R;
					const [x, y] = [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
					const rl = 0.11 * R;
					return (
						<circle key={i} cx={x} cy={y} r={rl} fill="none" stroke="#FFFFFF" strokeWidth={5} strokeDasharray={`${2 * Math.PI * rl * 0.8 * loopP} 999`} transform={`rotate(${(frame * 6 + i * 90) % 360} ${x} ${y})`} />
					);
				})}
			</svg>
			<LabelChip text="Radiative zone" at={[CX + 9, 41]} to={[74, 28]} start={r(W.radiative)} tone="white" />
			<LabelChip text="Convective zone" at={[CX + 15, 30]} to={[74, 14]} start={r(W.convective)} tone="lime" />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 07 — the photosphere ─────────────────────────────────────────────
const Photosphere: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const from = 754;
	const r = (abs: number) => abs - from;
	const drift = frame * 0.0025;
	const streak = prog(frame, r(W.light) - 2, 30, 'out');
	return (
		<AbsoluteFill>
			<Starfield seed="ph" />
			<Scene3D>
				<CameraRig pos={[0.15 + drift, -0.35, 1.75]} look={[0.1 + drift, 0.55, 0]} fov={40} />
				<Sun spin={0.0015} />
			</Scene3D>
			<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
				{streak > 0
					? Array.from({length: 9}, (_, i) => {
							const x = width * (0.12 + i * 0.1);
							const y0 = height * 0.42;
							return <line key={i} x1={x} y1={y0} x2={x + 40} y2={y0 - height * 0.35 * streak} stroke="#FFF3D0" strokeWidth={4} strokeLinecap="round" opacity={0.8 * (1 - streak * 0.4)} />;
						})
					: null}
			</svg>
			<Typewriter text="Photosphere" sub="The Sun's visible surface · ~5,500 °C" x={6} y={84} start={r(W.photosphere)} />
			<HeroWord lines={['Light & heat']} x={50} y={16} start={r(W.light)} gap={Math.round((r(W.heat) - r(W.light)) / 2)} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

// ── Shot 08 — eight minutes to Earth ──────────────────────────────────────
const ToEarth: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const from = 869;
	const r = (abs: number) => abs - from;
	const t = prog(frame, r(W.reaches), r(W.eight) - r(W.reaches), 'linear');
	const [x0, x1] = [0.27 * width, 0.82 * width];
	return (
		<AbsoluteFill>
			<Starfield seed="earth" />
			<Scene3D>
				<CameraRig pos={[0, 0, 8]} />
				<Sun position={[-2.65, 0, 0]} scale={0.82} />
			</Scene3D>
			<DashedConnector a={[27, 50]} b={[82, 50]} start={2} frames={12} color="rgba(241,241,243,0.7)" label="150 million km" />
			{frame >= r(W.reaches) ? (
				<div style={{position: 'absolute', left: mix(t, x0, x1), top: height / 2, width: 26, height: 26, marginLeft: -13, marginTop: -13, borderRadius: 13, background: '#FFF3D0', boxShadow: '0 0 30px 12px rgba(255,220,140,0.75)', opacity: 1 - prog(frame, r(W.eight) - 4, 10)}} />
			) : null}
			<ClayObject x={86} y={50} r={0.045} color="#3B82C4" />
			<AbsoluteFill style={{opacity: prog(frame, r(W.eight) - 4, 14), background: 'radial-gradient(circle at 86% 50%, rgba(255,240,200,0.35) 0%, rgba(0,0,0,0) 14%)'}} />
			<div style={{...micro(height), position: 'absolute', left: '86%', top: '58%', transform: 'translateX(-50%)'}}>Earth</div>
			<LabelBox text="~8 min" x={86} y={34} start={r(W.eight)} size={0.05} />
			<LightLeak start={0} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

const NODES: Record<string, React.ReactNode> = {
	'01': <Open />,
	'02': <Core />,
	'03': <Fusion />,
	'04': <Balance />,
	'06': <WayOut />,
	'07': <Photosphere />,
	'08': <ToEarth />,
};

// Every shot overlaps the next by XF frames; the incoming shot fades in over it (eased cross-dissolve).
type Cut = {name: string; from: number; to: number; node: React.ReactNode};
const CUTS: Cut[] = SHOTS.flatMap((s): Cut[] =>
	s.id === '05'
		? [
				{name: '05a mass→energy', from: 470, to: 556, node: <MassToEnergy />},
				{name: '05b E=mc²', from: 556, to: 610, node: <Equation />},
			]
		: [{name: `${s.id} ${s.title}`, from: s.from, to: s.to, node: NODES[s.id]}],
);

export const SunFusion: React.FC = () => {
	setMotionFeel('smooth'); // this film: every move eases in and out, nothing snaps
	return (
		<AbsoluteFill style={{background: C.stageBottom}}>
			{CUTS.map((c, i) => (
				<Sequence key={c.name} name={c.name} from={c.from} durationInFrames={c.to - c.from + (i < CUTS.length - 1 ? XF : 0)}>
					{i === 0 ? c.node : <FadeIn>{c.node}</FadeIn>}
				</Sequence>
			))}
			<Audio src={staticFile('audio/cleo-vo.mp3')} />
		</AbsoluteFill>
	);
};
