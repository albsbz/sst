import { Config } from 'sst/node/config';

const { AWS_SST_NAME, AWS_REGION, NEXTAUTH_SECRET, NEXTAUTH_URL } = process.env;
const config = {
	AWS_SST_NAME,
	AWS_REGION,
	COGNITO_CLIENT_ID: Config.COGNITO_CLIENT_ID,
	COGNITO_CLIENT_SECRET: Config.COGNITO_CLIENT_SECRET,
	COGNITO_ISSUER: Config.COGNITO_ISSUER,
	COGNITO_DOMAIN: Config.COGNITO_DOMAIN,
	COGNITO_IDENTITY_POOL_ID: Config.COGNITO_IDENTITY_POOL_ID,
	COGNITO_USER_POOL_ID: Config.COGNITO_USER_POOL_ID,
	NEXTAUTH_SECRET,
	NEXTAUTH_URL,
} as const;
console.log('NEXT_Config', config);

const validConfig = Object.fromEntries(
	Object.entries(config).map(([envVariable, configValue]) => {
		if (!configValue) {
			throw new Error(`${envVariable} not specified in env`);
		}
		return [envVariable, configValue];
	})
);

export default validConfig;
