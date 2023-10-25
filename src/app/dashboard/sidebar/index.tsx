'use client';
import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
	PieChart as PieChartIcon,
	LogIn as LogInIcon,
	BookOpen as BookOpenIcon,
	User as UserIcon,
} from 'react-feather';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Sidebar() {
	const { data: session } = useSession();
	if (!session) {
		redirect(`/api/auth/signin`);
	}
	console.log(`session${new Date()}`, session);
	return (
		<aside
			id="default-sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
				<ul className="space-y-2 font-medium">
					<li>
						<Link
							href="/dashboard"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<PieChartIcon />
							<span className="ml-3">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link
							href="/dashboard/articles"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<BookOpenIcon />
							<span className="ml-3">Articles</span>
						</Link>
					</li>
					<li>
						<Link
							href="/dashboard/profile"
							className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
						>
							<UserIcon />
							<span className="ml-3">Profile</span>
						</Link>
					</li>

					<li>
						<div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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
						</div>
					</li>
				</ul>
			</div>
		</aside>
	);
}
