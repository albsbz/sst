import { REGEXP_PATTERNS } from '@/app/constants/regexpPattern';
import {
	createPost,
	editPost,
	getSinglePost,
	getSinglePostWithAuthor,
	listPosts,
} from '../../../packages/core/database/blog';
import AuthorService from '../author/service';
import { AddArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
import storage from '../../../packages/core/storage/storage';
import FileStatus from '@/enums/fileStatus.enum';
import { ValueOf } from '@/types/valueOf';
import { AddArticleValidationSchema } from '@/schemas/article/addArticleValidation.schema';
import { EditArticleValidationSchema } from '@/schemas/article/editArticleValidation.schema';

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

	private deleteImages(
		images: string[] | null,
	) {
		if (images) {
			images.map((image) => {
				storage.deleteFile({ folder: '', key: image });
			});
		}
	}

	private getImageKeyFromLink(link: string) {
		const [key] = link.match(REGEXP_PATTERNS.mainImageKey) || [''];
		return key;
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
				shortDescription: article.shortDescription,
				slug: article.slug,
				mainImage: article.mainImage,
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
			shortDescription: article.shortDescription,
			slug: article.slug,
			mainImage: article.mainImage,
			images,
		});
		console.log('newArticle', newArticle);
		this.changeArticleImagesStatus(images, FileStatus.Confirmed);
		return newArticle;
	}

	public async edit({
		article,
		userEmail,
	}: {
		article: EditArticleValidationSchema;
		userEmail: string | null;
	}) {
		console.log('article', article);
		const images =
			(article.content.match(REGEXP_PATTERNS.imageKey) as string[]) || [];
		console.log('images', images);

		const oldArticle = await editPost({
			authorId: article.authorId,
			postId: article.postId,
			title: article.title,
			content: article.content,
			mainImage: article.mainImage,
			slug: article.slug,
			shortDescription: article.shortDescription,
			images,
		});
		//TODO delete old imgs

		const oldImages =
			oldArticle.data.images?.filter(
				(oldImage) => !images.includes(oldImage)
			) || [];
		const oldMainImage = oldArticle.data.mainImage;
		if (oldMainImage) {
			if (oldMainImage !== article.mainImage) {
				oldImages.push(this.getImageKeyFromLink(oldMainImage));
				const mainImage = this.getImageKeyFromLink(article.mainImage);
				if (mainImage) {
					console.log('mainImage', mainImage);
					this.changeArticleImagesStatus([mainImage], FileStatus.Confirmed);
				}
			}
		}
		if (oldImages.length) {
			this.deleteImages(oldImages);
		}
		console.log('oldArticle', oldArticle);

		if (images.length) {
			this.changeArticleImagesStatus(images, FileStatus.Confirmed);
		}
		return;
	}

	public async getAll({
		perPage,
		cursor,
	}: {
		perPage?: number;
		cursor?: string;
	}) {
		return listPosts({ perPage, cursor });
	}

	public async getBySlug({ slug, author }: { slug: string; author: boolean }) {
		if (author) {
			return getSinglePostWithAuthor(slug);
		}
		return getSinglePost(slug);
	}
}
