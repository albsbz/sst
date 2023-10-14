const {
	AWS_SST_NAME,
	AWS_REGION,
	AWS_PREFIX,
	CERTIFICATE_ARN,
	COGNITO_DOMAIN_PREFIX,
} = process.env;

const config = {
	AWS_SST_NAME,
	AWS_REGION,
	AWS_PREFIX,
	CERTIFICATE_ARN,
	COGNITO_DOMAIN_PREFIX,
} as const;

console.log('config', config);

const validConfig = Object.fromEntries(
	Object.entries(config).map(([envVariable, configValue]) => {
		if (!configValue) {
			throw new Error(`${envVariable} not specified in env`);
		}
		return [envVariable, configValue];
	})
);

export default validConfig;
