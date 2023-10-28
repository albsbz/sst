import ArticleService from './article/service';
import AuthorService from './author/service';
type ServicesT = {
	authorService: AuthorService;
	articleService: ArticleService;
};
class Services {
	private static instance: ServicesT;

	private constructor() {}

	public static getService(): ServicesT {
		if (!Services.instance) {
			const authorService = new AuthorService();
			const articleService = new ArticleService({ authorService });
			Services.instance = { authorService, articleService };
		}

		return Services.instance;
	}
}

export default Services;
