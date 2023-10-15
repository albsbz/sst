import { createUser } from '../../../core/src/user';

type RequestT = {
	request: {
		userAttributes: {
			email: string;
		};
	};
};

export async function main(event: RequestT) {
	console.log('postConfirmation', event.request);
	try {
		await createUser(event.request.userAttributes.email);
	} catch (err) {
		console.log(err);
	}
	return event;
}
