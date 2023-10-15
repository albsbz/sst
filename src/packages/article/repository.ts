import { createArticle } from '../../../packages/core/src/blog';
import { Article } from './types/Article';
// import { Table } from "sst/node/table"

export default class ArticleRepository {
	async create(article: Article) {
		console.log('article', article);
		// Table
		const newArticle = await createArticle(article.title, article.content);
		console.log('newArticle', newArticle);
	}
}
