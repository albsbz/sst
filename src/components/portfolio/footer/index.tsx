import Link from 'next/link';
import { GitHub, Linkedin, Mail } from 'react-feather';

export default function Footer() {
	return (
		<footer className="py-10 md:py-16 mb-20 md:mb-40 lg::mb-52" id="contact">
			<div className="container max-w-screen-xl mx-auto px-4">
				<div className="text-center">
					<h1 className="font-medium text-gray-700 text-4xl md:text-5xl mb-5">
						Contact me
					</h1>

					<p className="font-normal text-gray-400 text-md md:text-lg mb-20">
						I’m not currently taking on new client work but feel free to contact
						me for any <br /> other inquiries.
					</p>

					<div className="flex items-center justify-center space-x-8">
						<Link
							href="https://github.com/albsbz"
							className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
						>
							<GitHub className="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500" />
						</Link>

						<Link
							href="https://www.linkedin.com/in/alex-kamens-1b9704200/"
							className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
						>
							<Linkedin className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500" />
						</Link>

						<Link
							href="mailto:alexkamens.d@gmail.com"
							className="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
						>
							<Mail className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
