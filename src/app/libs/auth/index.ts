import CognitoProvider from 'next-auth/providers/cognito';
import config from '@/app/libs/config/config';
import {CallbacksOptions} from 'next-auth';

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
			}
			return jwtCallback.token;
		},
		async session(sessionCallback: Parameters<CallbacksOptions['session']>[0]) {
			sessionCallback.session.user.authorName =
				(sessionCallback.token.authorName as string) || '';
			// if (
			// 	sessionCallback.trigger === 'update' &&
			// 	sessionCallback.newSession?.user?.authorName
			// ) {
			// 	sessionCallback.session.user.authorName = sessionCallback.newSession
			// 		.user.authorName;
			// }
			console.log('sessionCallback', sessionCallback);
			return sessionCallback.session;
		},
	},
	debug: true,
};
