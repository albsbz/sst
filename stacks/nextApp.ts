import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { Config, NextjsSite, StackContext, use } from 'sst/constructs';

import config from './config';

import { database } from './database';
import { cognito } from './cognito';

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

	const auth = use(cognito);
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

	const COGNITO_IDENTITY_POOL_ID = new Config.Parameter(
		stack,
		'COGNITO_IDENTITY_POOL_ID',
		{
			value: auth.cognitoIdentityPoolId || '',
		}
	);

	const COGNITO_USER_POOL_ID = new Config.Parameter(
		stack,
		'COGNITO_USER_POOL_ID',
		{
			value: auth.userPoolId,
		}
	);

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
			COGNITO_IDENTITY_POOL_ID,
			COGNITO_USER_POOL_ID,
			db,
			auth,
		],
	});

	stack.addOutputs({
		SiteUrl: site.customDomainUrl || site.url,
		UserPoolId: auth.userPoolId,
		UserPoolClientId: auth.userPoolClientId,
		domain: cognitoDomain.domainName,
	});
}
