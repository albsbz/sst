'use client';
import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { PieChart as PieChartIcon, LogIn as LogInIcon } from 'react-feather';

export default function Sidebar() {
	const { data: session } = useSession();
	return (
		<aside
			id="default-sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
				<ul className="space-y-2 font-medium">
					<li>
						<a
							href="#"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<PieChartIcon />
							<span className="ml-3">Dashboard</span>
						</a>
					</li>

					<li>
						<a
							href="#"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<LogInIcon />
							{session ? (
								<button onClick={() => signOut()} className="ml-3">
									Sign out
								</button>
							) : (
								<button onClick={() => signIn()} className="ml-3">
									Sign in
								</button>
							)}
						</a>
					</li>
				</ul>
			</div>
		</aside>
	);
}
