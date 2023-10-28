import { cache } from 'react';
import 'server-only';
import Config from '../libs/config/config';
import storage from '../../../packages/core/storage/storage';
import { getPresignedPost } from './getPresignedPost';
import Services from '@/packages/services';

export const preload = (slug?: string) => {
	if (slug) {
		void getArticleBySlug(slug);
	}
	void getPresignedPost();
};

export const getArticleBySlug = cache(async (slug: string) => {
	const { articleService } = Services.getService();

	const article = await articleService.getBySlug({ slug });

	return article;

	// return { article };
});
