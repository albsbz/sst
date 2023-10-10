import Link from 'next/link';

export default function Education() {
	return (
		<section className="py-10 md:py-16">
			<div className="container max-w-screen-xl mx-auto px-4">
				<h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
					Education
				</h1>

				<p className="font-normal text-gray-500 text-xs md:text-base mb-20">
					Below is a summary of the places I studied
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<h4 className="font-medium text-gray-700 text-lg mb-4">
							2023 – 2023
						</h4>

						<p className="font-normal text-gray-500 text-md mb-4">
							Binary Academy <br /> React, Redux, Fastify, Drizzle <br />
						</p>

						<div className="relative">
							<h6 className="font-semibold text-gray-500 text-md relative z-10">
								<Link href="https://academy.binary-studio.com/">
									See the place here
								</Link>
							</h6>
							<span className="w-36 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
						</div>
					</div>

					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<h4 className="font-medium text-gray-700 text-lg mb-4">2021</h4>

						<p className="font-normal text-gray-500 text-md mb-4">
							EPAM laboratory
							<br /> Frontend winter 2021, Angular.
						</p>

						<div className="relative">
							<h6 className="font-semibold text-gray-500 text-md relative z-10">
								<Link href="https://training.epam.ua/ua">
									See the place here
								</Link>
							</h6>
							<span className="w-36 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
						</div>
					</div>

					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<h4 className="font-medium text-gray-700 text-lg mb-4">2018</h4>

						<p className="font-normal text-gray-500 text-md mb-4">
							Step Academy <br /> Web Development course <br /> JS, JQuery, PHP,
							Laravel.
						</p>

						<div className="relative">
							<h6 className="font-semibold text-gray-500 text-md relative z-10">
								<Link href="https://itstep.org/en">See the place here</Link>
							</h6>
							<span className="w-36 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
