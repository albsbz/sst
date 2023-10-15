import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Cognito, Config, StackContext, use } from 'sst/constructs';

import config from './config';

import { OAuthScope } from 'aws-cdk-lib/aws-cognito';
import { database } from './database';

export function cognito({ stack, app }: StackContext) {
	const Table = use(database);
	const cognito = new Cognito(stack, 'Auth', {
		login: ['email'],
		cdk: {
			userPoolClient: {
				oAuth: {
					callbackUrls: [
						app.stage === 'prod'
							? `'https://${config.CUSTOM_DOMAIN}/api/auth/callback/cognito`
							: 'http://localhost:3000/api/auth/callback/cognito',
					],
					logoutUrls: [
						app.stage === 'prod'
							? config.CUSTOM_DOMAIN
							: 'http://localhost:3000',
					],
					scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.PROFILE],
					flows: { authorizationCodeGrant: true, implicitCodeGrant: false },
				},
				generateSecret: true,
			},
		},
		defaults: {
			function: {
				timeout: 20,
				environment: { tableName: Table.tableName },
				permissions: [Table],
				bind: [Table],
			},
		},
		triggers: {
			postConfirmation: 'packages/functions/src/auth/postConfirmation.main',
		},
	});

	return cognito;
}
