import { REGEXP_PATTERNS } from '@/app/constants/regexpPattern';
import { createPost, listPosts } from '../../../packages/core/database/blog';
import AuthorService from '../author/service';
import { AddArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
import storage from '../../../packages/core/storage/storage';
import FileStatus from '@/enums/fileStatus.enum';
import { ValueOf } from '@/types/valueOf';

export default class ArticleService {
	private authorService: AuthorService;
	constructor({ authorService }: { authorService: AuthorService }) {
		this.authorService = authorService;
	}
	private changeArticleImagesStatus(
		images: string[] | null,
		status: ValueOf<typeof FileStatus>
	) {
		if (images) {
			images.map((image) => {
				storage.changeFileStatus(image, status);
			});
		}
	}
	public async create({
		article,
		userEmail,
	}: {
		article: AddArticleWithAuthorValidationSchema;
		userEmail: string | null;
	}) {
		console.log('article', article);
		const images = article.content.match(REGEXP_PATTERNS.imageKey) || [];
		console.log('images', images);
		if (userEmail && article.author) {
			const author = await this.authorService.create({
				authorName: article.author,
				userEmail,
			});
			const newArticle = await createPost({
				authorId: author.data.authorId,
				title: article.title,
				content: article.content,
				images,
			});
			this.changeArticleImagesStatus(images, FileStatus.Confirmed);
			return newArticle;
		}
		const {
			data: [authorData],
		} = await this.authorService.get({ authorName: article.author });
		const newArticle = await createPost({
			authorId: authorData.authorId,
			title: article.title,
			content: article.content,
			images,
		});
		console.log('newArticle', newArticle);
		this.changeArticleImagesStatus(images, FileStatus.Confirmed);
		return newArticle;
	}

	public async getAll({ perPage, page }: { perPage: number; page: number }) {
		return listPosts({ perPage, page });
	}
}
