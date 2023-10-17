import ArticleService from '@/packages/article/service';
import AuthorService from '@/packages/author/service';
import { addArticleValidationSchema } from '@/schemas/article/add/addArticleValidation.schema';
import { addArticleWithAuthorValidationSchema } from '@/schemas/article/add/addArticleWithAuthorValidation.schema';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';

const authorService = new AuthorService();
const articleService = new ArticleService({ authorService });
export async function PUT(req: Request) {
	const session = await getServerSession();
	const authorName = session?.user?.name;
	const userEmail = session?.user?.email;
	const data = await req.json();
	console.log('data1', data);
	console.log('authorName', authorName);

  if (!userEmail) {
    throw new Error('User not logged in');
  }
	if (!authorName) {
		const articlePayload = z
			.object(addArticleWithAuthorValidationSchema)
			.parse(data);
		articleService.create({ article: articlePayload, userEmail });
		return Response.json({});
	}
	const articlePayload = z.object(addArticleValidationSchema).parse(data);
	articleService.create({
		article: { ...articlePayload, author: authorName },
		userEmail: null,
	});
	return Response.json({});
}
