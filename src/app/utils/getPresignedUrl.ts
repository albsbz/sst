import { cache } from 'react';
import 'server-only';
import Config from '../libs/config/config';
import storage from '../../../packages/core/storage/storage';

export const preload = () => {
	void getPresignedURL();
};

export const getPresignedURL = cache(async () => {
	const { url, key } = await storage.getPresignedURL({
		folder: Config.AVATAR_FOLDER,
		key: crypto.randomUUID(),
	});

	return { url, key };
});
