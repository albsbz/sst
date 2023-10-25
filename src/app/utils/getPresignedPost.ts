import { cache } from 'react';
import 'server-only';
import Config from '../libs/config/config';
import storage from '../../../packages/core/storage/storage';

export const preload = () => {
	void getPresignedPost();
};

export const getPresignedPost = cache(async () => {
	const { url, fields } = await storage.getPresignedPost({
		folder: Config.TEMP_FOLDER,
	});

	return { url, fields };
});
