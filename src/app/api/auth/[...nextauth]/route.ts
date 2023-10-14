import config from '@/app/libs/config/config';
import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

console.log('config', config);
const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		CognitoProvider({
			clientId: config.COGNITO_CLIENT_ID,
			clientSecret: config.COGNITO_CLIENT_SECRET,
			issuer: config.COGNITO_ISSUER,
		}),
	],
	debug: true,
});

export { handler as GET, handler as POST };
