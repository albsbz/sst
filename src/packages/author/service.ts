import { createAuthor, getAuthorByName } from '../../../packages/core/src/blog';
import { updateCognitoUserAttribute } from '../../../packages/core/src/cognito';
import { setUserName } from '../../../packages/core/src/user';

export default class AuthorService {
	async create({
		authorName,
		userEmail,
	}: {
		authorName: string;
		userEmail: string;
	}) {
		console.log('authorName', authorName);

		const newAuthor = await createAuthor(authorName);
		console.log('newAuthor', newAuthor);
		const updatedUser = await setUserName(userEmail, authorName);
		console.log('updatedUser', updatedUser);
		const updatedUserCognito = await updateCognitoUserAttribute(
			userEmail,
			'custom:authorName',
			authorName
		);
		console.log('updatedUserCognito', updatedUserCognito);
		return newAuthor;
	}

	async get({ authorName }: { authorName: string }) {
		console.log('authorName', authorName);
		const author = await getAuthorByName(authorName);
		console.log('author', author);
		return author;
	}
}
