import { Activity, Book, Coffee } from 'react-feather';

export default function Advantages() {
	return (
		<section className="py-10 md:py-16">
			<div className="container max-w-screen-xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
							<Activity />
						</div>

						<h4 className="font-medium text-gray-700 text-lg mb-4">
							High experience
						</h4>

						<p className="font-normal text-gray-500 text-md">
							Experience in developing existing and start-up projects
						</p>
					</div>

					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
							<Coffee />
						</div>

						<h4 className="font-medium text-gray-700 text-lg mb-4">
							Success side projects
						</h4>

						<p className="font-normal text-gray-500 text-md">
							Love trying new web technologies
						</p>
					</div>

					<div className="bg-gray-50 px-8 py-10 rounded-md">
						<div className="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
							<Book />
						</div>

						<h4 className="font-medium text-gray-700 text-lg mb-4">
							Continuous learning
						</h4>

						<p className="font-normal text-gray-500 text-md">
							Participation in educational projects and courses
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
