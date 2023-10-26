import { Config as SSTConfig } from 'sst/node/config';

const {
	AWS_SST_NAME,
	AWS_REGION,
	NEXTAUTH_SECRET,
	NEXTAUTH_URL,
	AVATAR_FOLDER,
	TEMP_FOLDER,
} = process.env;
const {
	COGNITO_CLIENT_ID,
	COGNITO_CLIENT_SECRET,
	COGNITO_ISSUER,
	COGNITO_DOMAIN,
	COGNITO_IDENTITY_POOL_ID,
	COGNITO_USER_POOL_ID,
} = SSTConfig;
const joinedConfig = {
	AWS_SST_NAME,
	AWS_REGION,
	COGNITO_CLIENT_ID,
	COGNITO_CLIENT_SECRET,
	COGNITO_ISSUER,
	COGNITO_DOMAIN,
	COGNITO_IDENTITY_POOL_ID,
	COGNITO_USER_POOL_ID,
	NEXTAUTH_SECRET,
	NEXTAUTH_URL,
	AVATAR_FOLDER,
	TEMP_FOLDER,
} as const;
console.log('NEXT_Config', joinedConfig);

const Config = Object.fromEntries(
	Object.entries(joinedConfig).map(([envVariable, configValue]) => {
		if (!configValue) {
			throw new Error(`${envVariable} not specified in env`);
		}
		return [envVariable, configValue];
	})
);

export default Config;
