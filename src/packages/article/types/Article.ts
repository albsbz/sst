import { Author } from '@/packages/author/types/Author';

export type Article = {
	title: string;
	content: string;
	slug: string;
	shortDescription: string;
	mainImage: string;
	authorId: string;
	postId: string;
	author: Author;
};
