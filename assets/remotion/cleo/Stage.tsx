import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {C} from './tokens';

// ---------------------------------------------------------------------------
// Stages for the metaphor world. Real 3D (Blender/Spline renders) goes on top
// of / instead of these; they also work alone for 2D explainer beats.
// ---------------------------------------------------------------------------

/** Stage — the dark navy backdrop (vertical gradient + soft vignette). */
export const Stage: React.FC<{children?: React.ReactNode}> = ({children}) => (
	<AbsoluteFill style={{background: `linear-gradient(180deg, ${C.stageTop} 0%, ${C.stageBottom} 100%)`}}>
		<AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)'}} />
		{children}
	</AbsoluteFill>
);

/** BlueprintGrid — teal perspective grid floor that slowly scrolls toward camera (the "world" floor). */
export const BlueprintGrid: React.FC<{speed?: number; horizon?: number}> = ({speed = 0.6, horizon = 42}) => {
	const frame = useCurrentFrame();
	const {height} = useVideoConfig();
	const cell = 0.09 * height;
	return (
		<AbsoluteFill style={{background: `linear-gradient(180deg, #0B2735 0%, ${C.blueprint} 100%)`, overflow: 'hidden'}}>
			<div
				style={{
					position: 'absolute',
					left: '-50%',
					right: '-50%',
					top: `${horizon}%`,
					height: '140%',
					transformOrigin: '50% 0',
					transform: 'perspective(700px) rotateX(62deg)',
					backgroundImage: `linear-gradient(${C.gridLine} 2px, transparent 2px), linear-gradient(90deg, ${C.gridLine} 2px, transparent 2px)`,
					backgroundSize: `${cell}px ${cell}px`,
					backgroundPosition: `0 ${(frame * speed) % cell}px`,
				}}
			/>
			<AbsoluteFill style={{background: `linear-gradient(180deg, #0B2735 ${horizon - 2}%, rgba(11,39,53,0) ${horizon + 14}%)`}} />
		</AbsoluteFill>
	);
};

/** Starfield — seeded stars with slow twinkle, for space beats and scale analogies. */
export const Starfield: React.FC<{count?: number; seed?: string}> = ({count = 260, seed = 'cleo'}) => {
	const frame = useCurrentFrame();
	const stars = useMemo(
		() => Array.from({length: count}, (_, i) => ({x: random(`${seed}x${i}`) * 100, y: random(`${seed}y${i}`) * 100, r: 0.6 + random(`${seed}r${i}`) * 1.8, p: random(`${seed}p${i}`) * 6.28})),
		[count, seed],
	);
	return (
		<AbsoluteFill style={{background: '#05070C'}}>
			<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', inset: 0}}>
				{stars.map((s, i) => (
					<circle key={i} cx={s.x} cy={s.y} r={s.r * 0.06} fill="#fff" opacity={0.45 + 0.4 * Math.sin(frame / 14 + s.p)} />
				))}
			</svg>
		</AbsoluteFill>
	);
};

/**
 * ClayObject — a soft clay-shaded sphere/blob stand-in for the hero object (brain, planet, star).
 * Swap for a rendered PNG/video of the real object when you have one.
 */
export const ClayObject: React.FC<{x: number; y: number; r: number; color?: string; squash?: number}> = ({x, y, r, color = C.hero, squash = 0}) => {
	const {height} = useVideoConfig();
	const R = r * height;
	return (
		<div
			style={{
				position: 'absolute',
				left: `${x}%`,
				top: `${y}%`,
				width: R * 2,
				height: R * 2,
				marginLeft: -R,
				marginTop: -R,
				borderRadius: '50%',
				background: `radial-gradient(circle at 35% 30%, #fff8 0%, ${color} 38%, ${color} 62%, #00000066 100%)`,
				boxShadow: `0 ${R * 0.25}px ${R * 0.5}px rgba(0,0,0,0.45)`,
				transform: `scale(${1 + squash * 0.25}, ${1 - squash * 0.3})`,
				transformOrigin: '50% 100%',
			}}
		/>
	);
};

/** Defocus — blur + dim whatever is behind a diagram (the "stadium goes soft, chart draws on" move). */
export const Defocus: React.FC<{amount: number; children: React.ReactNode}> = ({amount, children}) => (
	<AbsoluteFill style={{filter: `blur(${amount * 14}px) brightness(${1 - amount * 0.35})`}}>{children}</AbsoluteFill>
);
