import Config from '@/app/libs/config/config';
import {
	createAuthor,
	getAuthorByName,
	setAuthor,
	setAuthorAvatar,
} from '../../../packages/core/database/blog';
import { updateCognitoUserAttribute } from '../../../packages/core/database/cognito';
import {
	editUser,
	setUserAvatar,
	getUser,
} from '../../../packages/core/database/user';
import storage from '../../../packages/core/storage/storage';
import { REGEXP_PATTERNS } from '@/app/constants/regexpPattern';
import FileStatus from '@/enums/fileStatus.enum';

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
		console.log('url334', this.getImageKeyFromLink(url));
		storage.changeFileStatus(
			this.getImageKeyFromLink(url),
			FileStatus.Confirmed
		);
		console.log('oldAvatar', oldAvatar);
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
	async editProfile({
		email,
		name,
		description,
		avatar,
	}: {
		name: string;
		description: string;
		avatar: string;
		email: string;
	}) {
		const oldAvatar = await setAuthor(email, name, description, avatar);
		storage.changeFileStatus(
			this.getImageKeyFromLink(avatar),
			FileStatus.Confirmed
		);
		const oldUser = await editUser({ email, name, description, avatar });
		if (oldAvatar && oldAvatar !== avatar) {
			storage.deleteFile({
				folder: '',
				key: this.getImageKeyFromLink(oldAvatar),
			});
		}

		const updatedUserCognito = await updateCognitoUserAttribute(
			email,
			'picture',
			avatar
		);

		return;
	}

	async getProfile({ email }: { email: string }) {
		const user = await getUser(email);
		return user;
	}
}
