import Config from '../libs/config/config';

export const REGEXP_PATTERNS = {
	imageKey: new RegExp(String.raw`(?<=!\[\]\(.*)(${Config.TEMP_FOLDER}.*?)(?=\))`, 'gm'),
};
