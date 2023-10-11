'use client';
import Image from 'next/image';
import SkillsCloud from '../skillsCloud';

export default function Brands() {
	return (
		<section className="py-10 md:py-16">
			<div className="container max-w-screen-xl mx-auto px-4">
				<h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
					Tech Stack
				</h1>

				<p className="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">
					Below is a summary of technologies I worked with
				</p>

				<SkillsCloud className="w-1/2 aspect-square -mt-20" />
			</div>
		</section>
	);
}
