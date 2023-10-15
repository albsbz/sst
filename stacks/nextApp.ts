import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Cognito, Config, NextjsSite, StackContext, use } from 'sst/constructs';

import config from './config';

import { OAuthScope } from 'aws-cdk-lib/aws-cognito';
import { database } from './database';

export function NextApp({ stack, app }: StackContext) {
	const customDomain = {
		domainName: config.CUSTOM_DOMAIN,
		domainAlias: `www.${config.CUSTOM_DOMAIN}`,
		hostedZone: config.CUSTOM_DOMAIN,
		cdk: {
			certificate: Certificate.fromCertificateArn(
				stack,
				'MyCert',
				config.CERTIFICATE_ARN
			),
		},
	};

	const auth = new Cognito(stack, 'Auth', {
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
	});

	// Create a cognito userpool domain
	const cognitoDomain = auth.cdk.userPool.addDomain('AuthDomain', {
		cognitoDomain: {
			domainPrefix: `${app.stage}-${config.COGNITO_DOMAIN_PREFIX}`,
		},
	});

	const COGNITO_CLIENT_SECRET = new Config.Parameter(
		stack,
		'COGNITO_CLIENT_SECRET',
		{
			value: auth.cdk.userPoolClient.userPoolClientSecret.toString(),
		}
	);

	const COGNITO_CLIENT_ID = new Config.Parameter(stack, 'COGNITO_CLIENT_ID', {
		value: auth.userPoolClientId,
	});

	const COGNITO_ISSUER = new Config.Parameter(stack, 'COGNITO_ISSUER', {
		value: `https://cognito-idp.${app.region}.amazonaws.com/${auth.userPoolId}/`,
	});

	const COGNITO_DOMAIN = new Config.Parameter(stack, 'COGNITO_DOMAIN', {
		value: cognitoDomain.domainName,
	});

	const db = use(database);
	const site = new NextjsSite(stack, 'site', {
		customDomain,
		bind: [
			COGNITO_ISSUER,
			COGNITO_CLIENT_ID,
			COGNITO_CLIENT_SECRET,
			COGNITO_DOMAIN,
			db,
		],
	});

	stack.addOutputs({
		SiteUrl: site.customDomainUrl || site.url,
		UserPoolId: auth.userPoolId,
		UserPoolClientId: auth.userPoolClientId,
		domain: cognitoDomain.domainName,
	});
}
