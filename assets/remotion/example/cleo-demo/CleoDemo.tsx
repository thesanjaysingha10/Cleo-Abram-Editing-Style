import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import '../../cleo/fonts';
import {
	AxisDiagram,
	BrandBug,
	ClayObject,
	Defocus,
	DrawArrow,
	EndCardSplit,
	EquationBuild,
	FlashMontage,
	HeadlineCard,
	HeroWord,
	Highlighter,
	LabelBox,
	LabelChip,
	LineChart,
	LowerThird,
	MagnifierInset,
	QuestionPlate,
	RibbonText,
	ScratchTransition,
	Stage,
	Starfield,
	StatCallout,
	StatementWord,
	TitleSwap,
	Typewriter,
	BlueprintGrid,
	setMotionFeel,
	ChapterCard,
	DepthGauge,
	FlowTree,
	LightLeak,
	PaperStage,
	PaperTitle,
	PillLowerThird,
	PinnedCounter,
	Stamp,
	Toast,
	mix,
	prog,
	titleSwapFrames,
	C,
} from '../../cleo';

// ---------------------------------------------------------------------------
// Cleo demo — every move of the cleo-abram skill in one ~45 s reel (24 fps).
// Uses YOUR mark ("STUDIO*"), never the reference channel's wordmark.
// ---------------------------------------------------------------------------

export const FPS = 24;
const MARK = 'STUDIO*';
const master = staticFile('footage/random-wednesday.mp4');
const stills = ['01', '03', '06', '07', '09', '12', '14', '16', '18', '20'].map((n) => staticFile(`metro-demo/s${n}.jpg`));

const Drop: React.FC = () => {
	const frame = useCurrentFrame();
	const impact = 26;
	const fall = prog(frame, 0, impact, 'inQuad');
	const squash = frame >= impact ? Math.max(0, 1 - (frame - impact) / 4) : 0;
	return (
		<Stage>
			<div style={{position: 'absolute', left: '35%', right: '35%', top: '74%', height: 18, borderRadius: '50%', background: 'rgba(140,170,255,0.35)', filter: 'blur(4px)'}} />
			<ClayObject x={50} y={mix(fall, 18, 64)} r={0.12} squash={squash} />
			<LabelBox text="1.4KG" sub="~3LBS" x={50} y={40} start={impact} />
			<BrandBug mark={MARK} />
		</Stage>
	);
};

const Regions: React.FC = () => (
	<AbsoluteFill>
		<BlueprintGrid />
		<ClayObject x={34} y={50} r={0.2} />
		<LabelChip text="Motor cortex" at={[36, 36]} to={[18, 22]} start={8} tone="red" />
		<LabelChip text="Visual cortex" at={[44, 56]} to={[52, 70]} start={18} tone="lime" />
		<HeroWord lines={['Brain-computer', 'interfaces']} x={74} y={46} start={40} />
		<BrandBug mark={MARK} />
	</AbsoluteFill>
);

const Transit: React.FC = () => {
	const frame = useCurrentFrame();
	const t = prog(frame, 10, 90, 'linear');
	const px = mix(t, 34, 66);
	const covering = Math.max(0, 1 - Math.abs(px - 50) / 7);
	const curve: [number, number][] = Array.from({length: 41}, (_, i) => {
		const x = i / 40;
		const pp = mix(x, 34, 66);
		return [x, 0.75 - 0.4 * Math.max(0, Math.min(1, 1 - Math.abs(pp - 50) / 7) * 1.4)];
	});
	return (
		<AbsoluteFill>
			<Starfield />
			<ClayObject x={50} y={34} r={0.15} color="#9FD8FF" />
			<div style={{position: 'absolute', left: `${px}%`, top: '34%', width: 34, height: 34, marginLeft: -17, marginTop: -17, borderRadius: 17, background: '#000', opacity: 0.4 + 0.6 * covering}} />
			<LineChart points={curve} progress={t} box={{x: 32, y: 60, w: 36, h: 26}} xLabel="Time" yLabel="Brightness (%)" callout={{at: 0.5, text: '−1-2%'}} />
			<StatCallout value="Transit" unit="method" x={82} y={30} start={6} size={0.05} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

const Equation: React.FC = () => (
	<AbsoluteFill>
		<Starfield seed="eq" />
		<ClayObject x={8} y={96} r={0.2} color="#6FA35A" />
		<EquationBuild
			title="The Drake Equation"
			subtitle="Used to estimate the number of communicative civilizations in our galaxy"
			y={42}
			start={4}
			terms={[
				{sym: 'R', sup: '*', caption: 'Rate of star formation'},
				{sym: 'f', sub: 'p', caption: 'Fraction of stars with planets'},
				{sym: 'n', sub: 'e', caption: 'Planets per star that could host life'},
				{sym: 'f', sub: 'l', caption: 'Fraction where life emerges'},
				{sym: 'f', sub: 'i', caption: 'Fraction that become intelligent'},
				{sym: 'L', caption: 'How long they keep signalling'},
			]}
		/>
		<BrandBug mark={MARK} />
	</AbsoluteFill>
);

const Footage: React.FC<{from: number; children?: React.ReactNode}> = ({from, children}) => {
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill>
			<OffthreadVideo src={master} startFrom={Math.round(from * fps)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
			{children}
		</AbsoluteFill>
	);
};

const Montage: React.FC = () => (
	<AbsoluteFill>
		<FlashMontage images={stills} />
		<StatementWord text="Curiosity" />
		<ScratchTransition start={0} />
	</AbsoluteFill>
);

const Planet: React.FC = () => (
	<AbsoluteFill>
		<Starfield seed="pl" />
		<ClayObject x={30} y={52} r={0.26} color="#D07A4A" />
		<Typewriter text="Kepler-452 b" sub="1,400 light-years away" x={6} y={86} start={6} />
		<MagnifierInset from={[36, 42]} center={[74, 36]} radius={0.17} start={40}>
			<Stage>
				<ClayObject x={50} y={55} r={0.11} color="#7FC4E8" />
			</Stage>
		</MagnifierInset>
		<DrawArrow from={[62, 74]} to={[70, 56]} start={62} color="white" />
		<Toast text="New planet unlocked" x={74} y={14} start={84} />
		<BrandBug mark={MARK} />
	</AbsoluteFill>
);

const Ribbon: React.FC = () => (
	<AbsoluteFill>
		<Starfield seed="rb" />
		<ClayObject x={50} y={66} r={0.05} color="#EAF4FF" />
		<RibbonText text="Direct imaging" y={40} start={4} />
		<BrandBug mark={MARK} />
	</AbsoluteFill>
);

const Headlines: React.FC = () => (
	<AbsoluteFill>
		<Starfield seed="hl" />
		<HeadlineCard at={[30, 32]} start={2} outlet="THE DAILY" tilt={-2}>
			Scientists find a planet that could hold water
		</HeadlineCard>
		<HeadlineCard at={[68, 40]} start={10} outlet="SCIENCE WIRE" tilt={1.5}>
			Is anyone out there? The search gets serious
		</HeadlineCard>
		<HeadlineCard at={[48, 64]} start={20} width={40} outlet="WORLD NEWS">
			First atmosphere found on <Highlighter start={32}>Earth-like</Highlighter> planet
		</HeadlineCard>
		<BrandBug mark={MARK} />
	</AbsoluteFill>
);

const Diagram: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			<Defocus amount={prog(frame, 0, 10)}>
				<Footage from={30} />
			</Defocus>
			<AxisDiagram
				start={8}
				labels={{top: 'Clearer\nsignal', bottom: 'Fuzzier\nsignal', left: 'More\ninvasive', right: 'Less\ninvasive'}}
				dots={[
					{x: -0.7, y: -0.55, label: 'Implant'},
					{x: 0.05, y: 0.04, label: 'Stent'},
					{x: 0.7, y: 0.55, label: 'Headset'},
				]}
			/>
		</AbsoluteFill>
	);
};

const Banning: React.FC = () => (
	<PaperStage track>
		<PaperTitle lines={['A guide to', 'banning stuff:']} x={30} y={20} start={2} />
		<FlowTree question="Is it dangerous?" x={60} y={36} start={18} />
		<Stamp text="Prototype" x={78} y={20} start={70} />
	</PaperStage>
);

const Dig: React.FC = () => {
	const frame = useCurrentFrame();
	const t = prog(frame, 6, 110, 'linear');
	return (
		<AbsoluteFill style={{background: 'linear-gradient(180deg,#7EC8F0 0%,#7EC8F0 18%,#B0542A 18.5%,#8C3A22 45%,#6A2350 70%,#3A1630 100%)'}}>
			<div style={{position: 'absolute', left: '49%', top: '18%', width: '2%', height: `${mix(t, 2, 66)}%`, background: '#2A2A2E', borderRadius: '0 0 12px 12px'}} />
			<PinnedCounter from={0.3} to={11.9} unit="KM" at={[52, 18 + mix(t, 2, 66)]} start={6} frames={110} />
			<DepthGauge progress={t * 0.6} label={`${Math.round(mix(t, 300, 11900)).toLocaleString('en-US')} M`} />
			<BrandBug mark={MARK} />
		</AbsoluteFill>
	);
};

const T0 = titleSwapFrames(FPS, true);
const plan: [number, React.ReactNode, string][] = [
	[T0, <TitleSwap mark={MARK} subtitle="Explainers" episode="*Brains: part 1" />, 'title'],
	[64, <Drop />, 'drop'],
	[96, <Regions />, 'regions'],
	[110, <Transit />, 'transit'],
	[150, <Equation />, 'equation'],
	[150, (
		<Footage from={4}>
			<LightLeak start={0} />
			<LowerThird name="Sanjay Singha" role="Host, Studio" start={8} hold={60} />
			<PillLowerThird text="Studio, Associate Producer" start={120} hold={26} />
			<QuestionPlate lines={['Question from:', 'A viewer in Mumbai']} start={80} hold={34} />
		</Footage>
	), 'footage'],
	[60, <Montage />, 'montage'],
	[110, <Planet />, 'planet'],
	[60, <Ribbon />, 'ribbon'],
	[90, <Headlines />, 'headlines'],
	[110, <Diagram />, 'diagram'],
	[110, <Banning />, 'banning'],
	[36, <ChapterCard lines={['The', 'mantle']} />, 'chapter'],
	[124, <Dig />, 'dig'],
	[150, (
		<EndCardSplit
			mark={MARK}
			line="If this made you curious, subscribe"
			credits={[['Sanjay Singha', 'Host + writer'], ['Studio', 'Animation'], ['Remotion', 'Engine'], ['You', 'Curiosity']]}
		/>
	), 'end'],
];

export const totalFrames = plan.reduce((a, [d]) => a + d, 0);

export const CleoDemo: React.FC = () => {
	setMotionFeel('snappy'); // the measured reference feel
	let at = 0;
	return (
		<AbsoluteFill style={{background: C.stageBottom}}>
			{plan.map(([d, node, name]) => {
				const from = at;
				at += d;
				return (
					<Sequence key={name} name={name} from={from} durationInFrames={d}>
						{node}
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
