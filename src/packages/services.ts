import ArticleService from './article/service';
import AuthorService from './author/service';
import UserService from './user/service';
type ServicesT = {
	authorService: AuthorService;
	articleService: ArticleService;
	userService: UserService;
};
class Services {
	private static instance: ServicesT;

	private constructor() {}

	public static getService(): ServicesT {
		if (!Services.instance) {
			const authorService = new AuthorService();
			const articleService = new ArticleService({ authorService });
			const userService = new UserService();
			Services.instance = { authorService, articleService, userService };
		}

		return Services.instance;
	}
}

export default Services;
