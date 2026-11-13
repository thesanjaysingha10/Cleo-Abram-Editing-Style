// ---------------------------------------------------------------------------
// "How the Sun Shines" — storyboard for the ElevenLabs VO (public/audio/cleo-vo.mp3,
// 39.1 s, WhisperX words in public/transcripts/cleo-vo.json). Cleo Abram skill.
// World: ONE cut-away 3D Sun we keep returning to (core → radiative → convective →
// photosphere), with flat 2D explainer beats in between. 24 fps.
// Frame numbers = round(word time × 24). Every shot's `key` frames are the storyboard stills.
// ---------------------------------------------------------------------------

export const FPS = 24;
export const TOTAL = 960; // 40.0 s (VO ends 38.8 s; 1 s tail on the last frame)

export type Shot = {
	id: string;
	from: number;
	to: number;
	vo: string;
	world: '3D' | '2D' | '3D + 2D';
	title: string;
	visual: string;
	motion: string;
	type: string;
	components: string[];
	key: number[]; // absolute frames to render as storyboard stills
};

const s = (t: number) => Math.round(t * FPS);

export const W = {
	nuclear: s(1.59),
	fusion: s(2.19),
	core: s(3.6),
	fifteen: s(5.62),
	celsius: s(6.98),
	gravity: s(8.1),
	immense: s(9.18),
	pressure: s(9.86),
	hydrogen: s(12.14),
	fuse: s(13.31),
	helium: s(14.27),
	helium2: s(15.41),
	less: s(17.21),
	mass: s(17.55),
	hydrogen2: s(18.19),
	missing: s(19.97),
	energy: s(21.78),
	E: s(23.54),
	equals: s(23.82),
	mc: s(24.26),
	squared: s(24.6),
	travels: s(26.34),
	radiative: s(28.36),
	convective: s(30.25),
	surface: s(31.91),
	photosphere: s(32.95),
	light: s(35.01),
	heat: s(35.59),
	reaches: s(37.01),
	earth: s(37.4),
	eight: s(38.22),
} as const;

export const SHOTS: Shot[] = [
	{
		id: '01',
		from: 0,
		to: 77,
		vo: 'The Sun is powered by nuclear fusion!',
		world: '3D',
		title: 'Cold open: the Sun',
		visual: 'Real-time 3D Sun (boiling granulation shader + corona glow) slowly turning on a star field. "NUCLEAR FUSION" pops in lime, right third, word by word on the VO.',
		motion: 'Slow 3D push-in (ease-in-out, 3 s). Hero words pop 115→100 % on "nuclear" and "fusion".',
		type: 'Hero word: Archivo Black caps, lime #C6FF01, hard dark drop.',
		components: ['Sun3D', 'Starfield', 'HeroWord', 'BrandBug'],
		key: [20, W.fusion + 8],
	},
	{
		id: '02',
		from: 77,
		to: 259,
		vo: 'In its core, the temperature is about 15 million degrees Celsius, and gravity creates immense pressure.',
		world: '3D + 2D',
		title: 'Into the core',
		visual: 'The Sun opens into a 3D cut-away (a quarter wedge removed, layers glowing). A "CORE" chip pins to the centre. A thermometer gauge fills on the left while 15,000,000 °C counts up. Then white 2D pressure arrows squeeze in on the core and "IMMENSE PRESSURE" pops.',
		motion: 'Camera dollies toward the core (ease-in-out). Counter runs linearly from "15" to "Celsius". Arrows draw inward on "gravity"; hero word on "immense".',
		type: 'Lime chip with leader line; lime counter numerals + white tracked unit; lime hero word.',
		components: ['CutawaySun3D', 'LabelChip', 'Thermo (DepthGauge)', 'TempCounter', 'PressureArrows', 'HeroWord'],
		key: [W.core + 10, W.celsius + 6, W.pressure + 10],
	},
	{
		id: '03',
		from: 259,
		to: 365,
		vo: 'Under these conditions, hydrogen nuclei fuse to form helium.',
		world: '3D',
		title: 'Fusion, up close',
		visual: 'We are inside the core: two clay 3D hydrogen nuclei (red protons) race together, hit with a white flash, and a 3D helium nucleus (2 protons + 2 neutrons) tumbles out. Chips "HYDROGEN" and "HELIUM" pin to the particles.',
		motion: 'Nuclei accelerate (ease-in), flash on "fuse" (2f white), helium spins out (ease-out). Chips pop on the words.',
		type: 'Red chip for hydrogen, lime chip for helium.',
		components: ['Nuclei3D', 'LabelChip', 'Flash'],
		key: [W.hydrogen + 6, W.fuse + 1, W.helium + 10],
	},
	{
		id: '04',
		from: 365,
		to: 470,
		vo: 'The helium produced has slightly less mass than the hydrogen that went in.',
		world: '2D',
		title: 'The mass check',
		visual: 'A flat 2D balance scale on the navy stage: four hydrogen nuclei on the left pan, one helium nucleus on the right. On "less" the beam tips toward hydrogen and a lime "−0.7 % MASS" box pops on the helium side.',
		motion: 'Pans drop in (pop), beam tilts with a soft overshoot on "less", label pops on "mass".',
		type: 'Lime box label, white micro caps under each pan.',
		components: ['BalanceScale', 'LabelBox'],
		key: [W.helium2 + 12, W.mass + 12],
	},
	{
		id: '05',
		from: 470,
		to: 610,
		vo: 'The missing mass is converted into energy, as described by E equals mc squared.',
		world: '2D',
		title: 'Missing mass → energy → E = mc²',
		visual: 'A dashed ghost circle marks the "MISSING MASS"; on "energy" it bursts into white light rays and "ENERGY" pops. Hard cut to the equation: E = m c², each term popping on the VO with a leader line to its caption (energy / mass / speed of light, squared).',
		motion: 'Ghost circle draws; rays burst outward (ease-out); equation terms pop exactly on "E", "equals", "mc", "squared".',
		type: 'Equation in lime Archivo Black, grey "=", tiny white caps captions.',
		components: ['GhostMass', 'LightBurst', 'HeroWord', 'EquationRow'],
		key: [W.missing + 14, W.energy + 10, W.squared + 10],
	},
	{
		id: '06',
		from: 610,
		to: 754,
		vo: 'This energy travels outward, first through the radiative zone and then through the convective zone.',
		world: '3D + 2D',
		title: 'Back in the Sun: the way out',
		visual: 'Return to the 3D cut-away. A photon path draws as a white zig-zag random walk through the radiative zone, then rides looping convection arrows in the convective zone. Chips: "RADIATIVE ZONE" (amber) and "CONVECTIVE ZONE" (lime).',
		motion: 'Camera orbits slowly (ease-in-out). Zig-zag draws linearly from "travels"; convection loops draw on "convective".',
		type: 'Region-coloured chips on leader lines.',
		components: ['CutawaySun3D', 'PhotonPath', 'ConvectionLoops', 'LabelChip'],
		key: [W.radiative + 10, W.convective + 14],
	},
	{
		id: '07',
		from: 754,
		to: 869,
		vo: 'At the surface, called the photosphere, it is released as light and heat.',
		world: '3D',
		title: 'The photosphere',
		visual: 'Camera skims the 3D Sun surface (granulation boiling). "PHOTOSPHERE" types in lime bottom-left with "THE SUN\'S VISIBLE SURFACE · ~5,500 °C". Then "LIGHT & HEAT" pops top-centre as light streaks leave the surface.',
		motion: 'Slow lateral drift over the surface. Typewriter 1 char/frame from "photosphere". Hero words on "light" / "heat".',
		type: 'Typewriter: lime caps + block cursor, white micro sub-line.',
		components: ['Sun3D (close)', 'Typewriter', 'HeroWord'],
		key: [W.photosphere + 24, W.heat + 10],
	},
	{
		id: '08',
		from: 869,
		to: TOTAL,
		vo: 'That light reaches Earth in about eight minutes.',
		world: '3D + 2D',
		title: '8 minutes to Earth',
		visual: 'Wide space shot: the 3D Sun on the left, a small blue Earth on the right. A light pulse travels along a dashed line labelled "150 MILLION KM"; it lands on Earth on "eight" and a lime "~8 MIN" box pops. Light leak on the cut in.',
		motion: 'Pulse travels linearly from "reaches" to "eight"; box pops on arrival.',
		type: 'White micro caps distance label; lime box.',
		components: ['Sun3D (small)', 'ClayObject (Earth)', 'DashedConnector', 'LabelBox', 'LightLeak'],
		key: [W.earth + 4, W.eight + 12],
	},
];
