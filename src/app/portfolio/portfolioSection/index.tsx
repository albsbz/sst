import Link from 'next/link';

export default function PortfolioSection() {
	return (
		<section className="py-10 md:py-16">
			<div className="container max-w-screen-xl mx-auto px-4">
				<div className="flex flex-col lg:flex-row justify-between">
					<div className="mb-10 lg:mb-0">
						<h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">
							Portfolio
						</h1>

						<p className="font-normal text-gray-500 text-xs md:text-base">
							I have brought here my biggest and favorite works <br /> as a
							professional.
						</p>
					</div>

					<div className="space-y-24">
						<div className="flex space-x-6">
							<h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
								01
							</h1>

							<span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

							<div>
								<h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
									<Link href="https://www.motorvate.io/">Motorvate.io</Link>
								</h1>

								<p className="font-normal text-gray-500 text-sm md:text-base">
									Development API for IOS application, user’s roles, <br />
									SES and Twilio integration <br />
									Serverless Framework, Node.js, AWS IAM, DynamoDB
								</p>
							</div>
						</div>

						<div className="flex space-x-6">
							<h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
								02
							</h1>

							<span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

							<div>
								<h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
									<Link href="https://github.com/BinaryStudioAcademy/bsa-2023-towhub">
										Towhub
									</Link>
								</h1>

								<p className="font-normal text-gray-500 text-sm md:text-base">
									Google Maps integration and Socket.IO integration
								</p>
							</div>
						</div>

						<div className="flex space-x-6">
							<h1 className="font-normal text-gray-700 text-3xl md:text-4xl">
								03
							</h1>

							<span className="w-28 h-0.5 bg-gray-300 mt-5"></span>

							<div>
								<h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
									Github Application
								</h1>

								<p className="font-normal text-gray-500 text-sm md:text-base">
									Development from scratch Github Application for parsing <br />
									commits, collecting commits statistics and libraries usage
									<br /> in code <br />
									Node.js, Express.js, Babel.js, Firestore, Mongoose, MongoDB,
									React, AntD, Next.js, Docker, RabbitMQ
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
