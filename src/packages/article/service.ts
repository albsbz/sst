import { createPost } from '../../../packages/core/src/blog';
import AuthorService from '../author/service';
import { Article } from './types/Article';
// import { Table } from "sst/node/table"
import { AddArticleValidationSchema } from '@/schemas/article/add/addArticleValidation.schema';
import { AddArticleWithAuthorValidationSchema } from '@/schemas/article/add/addArticleWithAuthorValidation.schema';
export default class ArticleService {
	private authorService: AuthorService;
	constructor({ authorService }: { authorService: AuthorService }) {
		this.authorService = authorService;
	}
	public async create({
		article,
		userEmail,
	}: {
		article: AddArticleWithAuthorValidationSchema;
		userEmail: string | null;
	}) {
		console.log('article', article);
		if (userEmail && article.author) {
			const author = await this.authorService.create({
				authorName: article.author,
				userEmail,
			});
			const newArticle = await createPost(
				author.data.authorId,
				article.title,
				article.content
			);
			return newArticle;
		}
		const {
			data: [authorData],
		} = await this.authorService.get({ authorName: article.author });
		const newArticle = await createPost(
			authorData.authorId,
			article.title,
			article.content
		);
		console.log('newArticle', newArticle);
		return newArticle;
	}
}
