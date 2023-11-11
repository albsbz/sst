import Config from '../libs/config/config';

export const REGEXP_PATTERNS = {
	imageKey: new RegExp(String.raw`(?<=!\[\]\(.*)(${Config.TEMP_FOLDER}.*?)(?=\))`, 'gm'),
	mainImageKey: new RegExp(String.raw`${Config.TEMP_FOLDER}.*`, 'gm'),
	avatarImageKey: new RegExp(String.raw`${Config.AVATAR_FOLDER}.*`, 'gm'),
};
