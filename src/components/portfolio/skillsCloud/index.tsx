import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
const wordsArr: string[] = [
	'HTML5',
	'CSS3',
	'React',
	'Redux',
	'NodeJs',
	'Scrum',
	'Agile',
	'Git',
	'Next.js',
	'JavaScript',
	'TypeScript',
	'Vue.js',
	'Nuxt.js',
	'MongoDB',
	'Mongoose',
	'Nest.js',
	'Express.js',
	'Fastify',
	'Serverless',
	'Docker',
	'RabbitMQ',
	'Drizzle',
	'Postgres',
	'Laravel',
	'PHP',
];

function Word({
	children,
	...props
}: {
	children: string;
	position: THREE.Vector3;
}) {
	const color = new THREE.Color();
	const fontProps = {
		fontSize: 2.5,
		letterSpacing: -0.05,
		lineHeight: 1,
		'material-toneMapped': false,
	};
	const ref = useRef<{
		quaternion: THREE.Quaternion;
		material: THREE.SpriteMaterial;
	}>();
	const [hovered, setHovered] = useState(false);
	const over = (e: ThreeEvent<PointerEvent>) => (
		e.stopPropagation(), setHovered(true)
	);
	const out = () => setHovered(false);
	// Change the mouse cursor on hover
	useEffect(() => {
		if (hovered) document.body.style.cursor = 'pointer';
		return () => {
			document.body.style.cursor = 'auto';
		};
	}, [hovered]);
	// Tie component to the render-loop
	useFrame(({ camera }) => {
		if (ref.current) {
			// Make text face the camera
			ref.current.quaternion.copy(camera.quaternion);
			// Animate font color
			ref.current.material.color.lerp(
				color.set(hovered ? '#5fc797' : '#dff2e9'),
				0.1
			);
		}
	});
	return (
		<Text
			ref={ref}
			onPointerOver={over}
			onPointerOut={out}
			onClick={() => console.log('clicked')}
			{...props}
			{...fontProps}
		>
			{children}
		</Text>
	);
}

function Cloud({ count = 4, radius = 20 }) {
	// Create a count x count random words with spherical distribution
	const words = useMemo(() => {
		const temp: [THREE.Vector3, string][] = [];
		const spherical = new THREE.Spherical();
		const phiSpan = Math.PI / (count + 1);
		const thetaSpan = (Math.PI * 2) / count;
		for (let i = 1; i < count + 1; i++)
			for (let j = 0; j < count; j++) {
				temp.push([
					new THREE.Vector3().setFromSpherical(
						spherical.set(radius, phiSpan * i, thetaSpan * j)
					),
					wordsArr[count * (i - 1) + j],
				]);
			}
		return temp;
	}, [count, radius]);
	return words.map(([pos, word], index) => (
		<Word key={index} position={pos}>
			{word}
		</Word>
	));
}

export default function SkillsCloud({ ...props }) {
	return (
		<Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }} {...props}>
			<fog attach="fog" args={['#202025', 0, 80]} />
			<Cloud count={5} radius={20} />
			<TrackballControls noZoom />
		</Canvas>
	);
}
