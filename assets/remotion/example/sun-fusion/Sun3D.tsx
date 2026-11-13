import React, {useMemo} from 'react';
import {useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import * as THREE from 'three';
import {useCurrentFrame, useVideoConfig} from 'remotion';

// ---------------------------------------------------------------------------
// Real-time 3D pieces for the Sun storyboard (three.js via @remotion/three).
// Everything is driven by useCurrentFrame() — deterministic, renders frame-exact.
// ---------------------------------------------------------------------------

const NOISE = /* glsl */ `
float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
float n3(vec3 p){
  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){ float a=0.5, s=0.0; for(int k=0;k<5;k++){ s+=a*n3(p); p*=2.07; a*=0.5; } return s; }
`;

const sunVert = /* glsl */ `
varying vec3 vPos; varying vec3 vN; varying vec3 vView;
void main(){
  vPos = position; vN = normalize(normalMatrix*normal);
  vec4 mv = modelViewMatrix*vec4(position,1.0); vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix*mv;
}`;

const sunFrag = /* glsl */ `
uniform float uTime; varying vec3 vPos; varying vec3 vN; varying vec3 vView;
${NOISE}
void main(){
  vec3 p = normalize(vPos)*3.2;
  float g = fbm(p*1.6 + vec3(0.0, uTime*0.18, uTime*0.11));
  float cells = fbm(p*5.0 - vec3(uTime*0.3));
  float t = clamp(g*0.75 + cells*0.45, 0.0, 1.0);
  vec3 deep = vec3(0.70,0.16,0.02), mid = vec3(1.0,0.48,0.08), hot = vec3(1.0,0.86,0.42);
  vec3 col = mix(deep, mid, smoothstep(0.25,0.6,t));
  col = mix(col, hot, smoothstep(0.62,0.9,t));
  float mu = clamp(dot(vN, vView), 0.0, 1.0);
  col *= 0.55 + 0.6*pow(mu, 0.45);              // limb darkening
  col += vec3(1.0,0.55,0.15)*pow(1.0-mu, 3.0)*0.6; // hot rim
  gl_FragColor = vec4(col, 1.0);
}`;

const glowFrag = /* glsl */ `
uniform vec3 uColor; uniform float uPower; uniform float uGain; varying vec3 vN; varying vec3 vView;
void main(){
  float d = clamp(-dot(vN, vView), 0.0, 1.0);   // back faces: 1 at centre, 0 at the halo's rim
  float f = pow(d, uPower) * uGain;
  gl_FragColor = vec4(uColor*f, f);
}`;
const glowVert = /* glsl */ `
varying vec3 vN; varying vec3 vView;
void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vView = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`;

const useSunMaterial = (time: number) => {
	const m = useMemo(
		() => new THREE.ShaderMaterial({uniforms: {uTime: {value: 0}}, vertexShader: sunVert, fragmentShader: sunFrag, side: THREE.DoubleSide}),
		[],
	);
	m.uniforms.uTime.value = time;
	return m;
};

/** Camera placed and aimed every frame. */
export const CameraRig: React.FC<{pos: [number, number, number]; look?: [number, number, number]; fov?: number}> = ({pos, look = [0, 0, 0], fov}) => {
	const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
	camera.position.set(...pos);
	camera.lookAt(...look);
	if (fov && camera.fov !== fov) {
		camera.fov = fov;
		camera.updateProjectionMatrix();
	}
	return null;
};

/** Canvas sized to the composition, transparent so 2D stages show through. */
export const Scene3D: React.FC<{children: React.ReactNode}> = ({children}) => {
	const {width, height} = useVideoConfig();
	return (
		<ThreeCanvas width={width} height={height} gl={{alpha: true, antialias: true}} camera={{fov: 32, near: 0.05, far: 100, position: [0, 0, 6]}}>
			{children}
		</ThreeCanvas>
	);
};

const Glow: React.FC<{r: number; color?: string; power?: number; gain?: number}> = ({r, color = '#FF8A2A', power = 2.2, gain = 0.55}) => {
	const m = useMemo(
		() =>
			new THREE.ShaderMaterial({
				uniforms: {uColor: {value: new THREE.Color(color)}, uPower: {value: power}, uGain: {value: gain}},
				vertexShader: glowVert,
				fragmentShader: glowFrag,
				side: THREE.BackSide,
				blending: THREE.AdditiveBlending,
				transparent: true,
				depthWrite: false,
			}),
		[color, power, gain],
	);
	return (
		<mesh material={m}>
			<sphereGeometry args={[r, 64, 64]} />
		</mesh>
	);
};

/** The whole Sun: boiling surface + corona glow. */
export const Sun: React.FC<{position?: [number, number, number]; scale?: number; spin?: number}> = ({position = [0, 0, 0], scale = 1, spin = 0.004}) => {
	const frame = useCurrentFrame();
	const mat = useSunMaterial(frame / 24);
	return (
		<group position={position} scale={scale} rotation={[0.2, frame * spin, 0]}>
			<mesh material={mat}>
				<sphereGeometry args={[1, 128, 128]} />
			</mesh>
			<Glow r={1.25} power={2.4} gain={1.3} />
			<Glow r={1.8} color="#FF5A10" power={3} gain={0.75} />
		</group>
	);
};

const LAYERS = [
	{r0: 0, r1: 0.26, color: '#FFF4C4', name: 'core'},
	{r0: 0.26, r1: 0.7, color: '#FFB23B', name: 'radiative'},
	{r0: 0.7, r1: 0.965, color: '#F0621C', name: 'convective'},
	{r0: 0.965, r1: 1.0, color: '#A8320B', name: 'photosphere'},
];

/** Ring-shaped half-disc lying in the cut plane at azimuth phi (three.js sphere convention). */
const CutFace: React.FC<{phi: number; r0: number; r1: number; color: string}> = ({phi, r0, r1, color}) => (
	<mesh rotation={[0, Math.PI + phi, 0]}>
		{r0 === 0 ? <circleGeometry args={[r1, 64, -Math.PI / 2, Math.PI]} /> : <ringGeometry args={[r0, r1, 96, 1, -Math.PI / 2, Math.PI]} />}
		<meshBasicMaterial color={color} side={THREE.DoubleSide} toneMapped={false} />
	</mesh>
);

/**
 * Cut-away Sun: a quarter wedge removed (facing +z, slightly right), flat coloured cut faces for each
 * layer (the 2D-cut-away look on a 3D body), a glowing core, convective "cells" texture on the shell.
 */
export const CutawaySun: React.FC<{spin?: number}> = ({spin = 0}) => {
	const frame = useCurrentFrame();
	const mat = useSunMaterial(frame / 24);
	const phiStart = Math.PI / 2 - 1.75 * Math.PI;
	const phiLen = 1.5 * Math.PI;
	return (
		<group rotation={[0, spin, 0]}>
			<mesh material={mat}>
				<sphereGeometry args={[1, 128, 128, phiStart, phiLen]} />
			</mesh>
			{LAYERS.map((l) => (
				<React.Fragment key={l.name}>
					<CutFace phi={phiStart} r0={l.r0} r1={l.r1} color={l.color} />
					<CutFace phi={phiStart + phiLen} r0={l.r0} r1={l.r1} color={l.color} />
				</React.Fragment>
			))}
			<mesh>
				<sphereGeometry args={[0.2, 48, 48]} />
				<meshBasicMaterial color="#FFFBE6" toneMapped={false} />
			</mesh>
			<Glow r={0.42} color="#FFE7A0" power={2.5} gain={0.8} />
			<Glow r={1.25} power={3} gain={0.6} />
		</group>
	);
};

type V3 = [number, number, number];
const lerp3 = (a: V3, b: V3, t: number): V3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const Nucleon: React.FC<{p: V3; kind: 'p' | 'n'; r?: number}> = ({p, kind, r = 0.22}) => (
	<mesh position={p}>
		<sphereGeometry args={[r, 48, 48]} />
		<meshStandardMaterial color={kind === 'p' ? '#E2464F' : '#AEBBCB'} roughness={0.55} metalness={0.05} />
	</mesh>
);

/**
 * Four hydrogen nuclei (protons) race in from the corners, meet at `fuseAt`, flash, and a helium nucleus
 * (2 p + 2 n, a tight tumbling cluster) drifts out. Frames are relative to the Sequence.
 */
export const Nuclei: React.FC<{fuseAt: number}> = ({fuseAt}) => {
	const frame = useCurrentFrame();
	const starts: V3[] = [
		[-3.2, 1.7, 0],
		[3.2, 1.6, -0.5],
		[-3.0, -1.8, 0.4],
		[3.1, -1.7, 0.2],
	];
	const tIn = Math.min(1, Math.max(0, frame / fuseAt));
	const ease = tIn < 0.5 ? 4 * tIn ** 3 : 1 - (-2 * tIn + 2) ** 3 / 2; // ease in and out
	const after = frame >= fuseAt;
	const k = Math.max(0, frame - fuseAt);
	const cluster: [V3, 'p' | 'n'][] = [
		[[0.17, 0.17, 0], 'p'],
		[[-0.17, -0.17, 0], 'p'],
		[[-0.17, 0.17, 0.12], 'n'],
		[[0.17, -0.17, -0.12], 'n'],
	];
	return (
		<>
			<ambientLight intensity={0.55} />
			<directionalLight position={[3, 4, 5]} intensity={2.2} />
			<pointLight position={[0, 0, 1.5]} intensity={after ? 5 * (1 + Math.cos(Math.min(1, k / 16) * Math.PI)) / 2 : 0} color="#FFE7A0" />
			{!after ? (
				starts.map((s0, i) => <Nucleon key={i} p={lerp3(s0, [0, 0, 0], ease * 0.94)} kind="p" />)
			) : (
				<group position={[k * 0.012, k * 0.004, 0]} rotation={[k * 0.04, k * 0.06, k * 0.02]} scale={0.8 + 0.2 * Math.min(1, (1 - Math.cos(Math.min(1, k / 14) * Math.PI)) / 2)}>
					{cluster.map(([p, kind], i) => (
						<Nucleon key={i} p={p} kind={kind} />
					))}
				</group>
			)}
		</>
	);
};
