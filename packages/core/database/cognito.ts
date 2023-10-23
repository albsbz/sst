import {
	CognitoIdentityProviderClient,
	AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import Config from '@/app/libs/config/config';

const client = new CognitoIdentityProviderClient({});

export const updateCognitoUserAttribute = async (
	userEmail: string,
	attributeName: string,
	attributeValue: string
) => {
	const input = {
		UserPoolId: Config.COGNITO_USER_POOL_ID,
		Username: userEmail,
		UserAttributes: [
			{
				Name: attributeName,
				Value: attributeValue,
			},
		],
		ClientMetadata: {
			'<keys>': 'STRING_VALUE',
		},
	};
	const command = new AdminUpdateUserAttributesCommand(input);
	const response = await client.send(command);

	return response;
};
