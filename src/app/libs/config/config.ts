import { Config } from 'sst/node/config';

const { AWS_SST_NAME, AWS_REGION, NEXTAUTH_SECRET, NEXTAUTH_URL } = process.env;
console.log('C!Config', Config);
const config = {
	AWS_SST_NAME,
	AWS_REGION,
	COGNITO_CLIENT_ID: Config.COGNITO_CLIENT_ID,
	COGNITO_CLIENT_SECRET: Config.COGNITO_CLIENT_SECRET,
	COGNITO_ISSUER: Config.COGNITO_ISSUER,
	COGNITO_DOMAIN: Config.COGNITO_DOMAIN,
	NEXTAUTH_SECRET,
	NEXTAUTH_URL,
} as const;

const validConfig = Object.fromEntries(
	Object.entries(config).map(([envVariable, configValue]) => {
		if (!configValue) {
			throw new Error(`${envVariable} not specified in env`);
		}
		return [envVariable, configValue];
	})
);

export default validConfig;
