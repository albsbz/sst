'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface ClientProvidersProps {
	children: React.JSX.Element;
	session: Session | null;
}

export function ClientProvider({ children, session }: ClientProvidersProps) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}
