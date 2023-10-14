import { ClientProvider } from '../../components/client-provider';
import Header from './header';
import Sidebar from './sidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	if (!session) {
		redirect(`/api/auth/signin`);
	}
	return (
		<ClientProvider session={session}>
			<section>
				<Header />
				<Sidebar />
				<div className="p-4 sm:ml-64">{children}</div>
			</section>
		</ClientProvider>
	);
}
