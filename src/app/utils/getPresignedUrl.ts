import { cache } from 'react';
import 'server-only';
import storage from '../../../packages/core/storage/storage';

export const preload = ({ folder }: { folder: string }) => {
	void getPresignedURL({ folder });
};

export const getPresignedURL = cache(async ({ folder }: { folder: string }) => {
	
	const { url, key } = await storage.getPresignedURL({
		folder,
		key: crypto.randomUUID(),
	});


	return { url, key };
});
