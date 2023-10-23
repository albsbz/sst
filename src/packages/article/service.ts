import { createPost } from '../../../packages/core/database/blog';
import AuthorService from '../author/service';
import { AddArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
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
