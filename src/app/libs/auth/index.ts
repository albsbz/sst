import CognitoProvider from 'next-auth/providers/cognito';
import config from '@/app/libs/config/config';
import { CallbacksOptions } from 'next-auth';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CognitoProvider({
			clientId: config.COGNITO_CLIENT_ID,
			clientSecret: config.COGNITO_CLIENT_SECRET,
			issuer: config.COGNITO_ISSUER,
		}),
	],
	callbacks: {
		async jwt(jwtCallback: Parameters<CallbacksOptions['jwt']>[0]) {
			console.log('jwtCallback', jwtCallback);
			if (jwtCallback.profile) {
				jwtCallback.token.authorName = jwtCallback.profile['custom:authorName'];
				// jwtCallback.token.avatar = jwtCallback.profile.avatar;
			}
			return jwtCallback.token;
		},
		async session(sessionCallback: Parameters<CallbacksOptions['session']>[0]) {
			if (sessionCallback.token.authorName) {
				sessionCallback.session.user.authorName = sessionCallback.token
					.authorName as string;
			}
			if (sessionCallback.token.avatar) {
				// sessionCallback.session.user.avatar = sessionCallback.token
				// 	.avatar as string;
			}
			console.log('sessionCallback', sessionCallback);
			return sessionCallback.session;
		},
	},
	debug: true,
};
