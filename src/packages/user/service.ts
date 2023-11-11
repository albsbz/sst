import Config from '@/app/libs/config/config';
import {
	createAuthor,
	getAuthorByName,
	setAuthorAvatar,
} from '../../../packages/core/database/blog';
import { updateCognitoUserAttribute } from '../../../packages/core/database/cognito';
import { setUserAvatar } from '../../../packages/core/database/user';
import storage from '../../../packages/core/storage/storage';
import { REGEXP_PATTERNS } from '@/app/constants/regexpPattern';

export default class UserService {
	private getImageKeyFromLink(link: string) {
		const [key] = link.match(REGEXP_PATTERNS.avatarImageKey) || [''];
		return key;
	}
	async setAvatar({
		url,
		fileKey,
		userEmail,
	}: {
		url: string;
		fileKey: string;
		userEmail: string;
	}) {
		const { avatar: oldAvatar, ...rest } = await setUserAvatar(userEmail, url);
		console.log('oldUserData', rest);
		try {
			await setAuthorAvatar(userEmail, url);
		} catch {
			console.log('Unable to set author avatar, probably author not exists');
		}
		if (oldAvatar) {
			storage.deleteFile({
				folder: Config.AVATAR_FOLDER,
				key: this.getImageKeyFromLink(oldAvatar),
			});
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
