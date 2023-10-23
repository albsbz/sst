import NextAuth, { Profile as DefaultProfile, DefaultSession } from 'next-auth';
declare module 'next-auth' {
	interface Profile extends DefaultProfile {
		['custom:authorName']?: string;
		avatar: string;
	}

	interface Session {
		user: {
			authorName: string;
			avatar: string;
		} & DefaultSession['user'];
	}
}
