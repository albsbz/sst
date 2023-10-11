'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sky } from '@react-three/drei';

export default function AppStars({ ...props }) {
	return (
		<div {...props}>
			<Canvas>
				<ambientLight intensity={1} />
				<spotLight position={[10, 10, 10]} angle={0.15} />
				<OrbitControls
					autoRotate={true}
					autoRotateSpeed={0.5}
					enableZoom={false}
					enableRotate={false}
					enablePan={false}
					enableDamping={false}
				/>

				<Stars
					radius={100} // Radius of the inner sphere (default=100)
					depth={50} // Depth of area where stars should fit (default=50)
					count={500} // Amount of stars (default=5000)
					factor={7} // Size factor (default=4)
					saturation={0} // Saturation 0-1 (default=0)
					fade // Faded dots (default=false)
					speed={100} // Speed (default=10)
				/>
				<Sky
					distance={450000}
					sunPosition={[0, 1, 0]}
					inclination={0}
					azimuth={0.25}
				/>
			</Canvas>
		</div>
	);
}
