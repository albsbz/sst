import NextAuth, { Profile as DefaultProfile, DefaultSession } from 'next-auth';
declare module 'next-auth' {
	interface Profile extends DefaultProfile {
		['custom:authorName']?: string;
	}

	interface Session {
		user: {
			authorName: string;
		} & DefaultSession['user'];
	}
}
