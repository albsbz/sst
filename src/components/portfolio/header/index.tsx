import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
	return (
		<section className="py-10 md:py-16">
			<div className="container max-w-screen-xl mx-auto px-4">
				<nav className="flex items-center justify-between mb-40">
					<Image
						src="/images/navbar-logo.png"
						alt="Logo"
						width={25}
						height={25}
						style={{ width: 'auto', height: 'auto' }}
					/>

					<a
						href="/files/cv_kamens_en.pdf"
						download
						className="pointer px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500"
					>
						Get my CV
					</a>
				</nav>

				<div className="text-center">
					<div className="flex justify-center mb-16">
						<Image
							src="/images/home-img.png"
							alt="Image"
							width={100}
							height={100}
							className="rounded-full"
							style={{ width: 'auto', height: 'auto' }}
							priority={true}
						/>
					</div>

					<h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">
						<Link href="https://www.linkedin.com/in/alex-kamens-1b9704200/">
							Alex Kamens
						</Link>
					</h6>

					<h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">
						Fullstack Developer
					</h1>

					<p className="font-normal text-gray-600 text-md md:text-xl mb-16">
						I love coding and develop new projects. I am interested in frontend,
						backend and cloud technologies. In my free time I like to generate
						art with artificial intelligence.
					</p>

					<a
						href="#contact"
						className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500"
					>
						Hire me
					</a>
				</div>
			</div>
		</section>
	);
}
