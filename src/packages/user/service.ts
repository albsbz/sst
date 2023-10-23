import Config from '@/app/libs/config/config';
import {
	createAuthor,
	getAuthorByName,
} from '../../../packages/core/database/blog';
import { updateCognitoUserAttribute } from '../../../packages/core/database/cognito';
import { setUserAvatar } from '../../../packages/core/database/user';
import storage from '../../../packages/core/storage/storage';

export default class UserService {

	async setAvatar({
		url,
		fileKey,
		userEmail,
	}: {
		url: string;
		fileKey: string;
		userEmail: string;
	}) {
		const oldAvatar = await setUserAvatar(userEmail, fileKey);
		console.log('oldUserData', oldAvatar);
		if (oldAvatar) {
			storage.deleteFile({ folder: Config.AVATAR_FOLDER, key: oldAvatar });
		}

		const updatedUserCognito = await updateCognitoUserAttribute(
			userEmail,
			'picture',
			url
		);

		console.log('updatedUserCognito', updatedUserCognito);
		return;
	}
}
