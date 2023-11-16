import { cache } from 'react';
import 'server-only';
import Config from '../libs/config/config';
import storage from '../../../packages/core/storage/storage';

export const preload = () => {
	void getPresignedPost({});
};

export const getPresignedPost = cache(
	async ({ folder = Config.TEMP_FOLDER }) => {
		console.log('url990', folder);
		const { url, fields } = await storage.getPresignedPost({
			folder,
		});
		console.log('url99', url);

		return { url, fields };
	}
);
