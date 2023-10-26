import ArticleService from '@/packages/article/service';
import AuthorService from '@/packages/author/service';
import { addArticleValidationSchema } from '@/schemas/article/addArticleValidation.schema';
import { addArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/libs/auth';
import { NextRequest } from 'next/server';
import { getQueryParams } from '@/app/utils/getQueryParams';

const authorService = new AuthorService();
const articleService = new ArticleService({ authorService });
export async function PUT(req: Request) {
	const session = await getServerSession(authOptions);

	const authorName = session?.user?.authorName;
	const userEmail = session?.user?.email;
	const data = await req.json();
	console.log('authorName', authorName);

	if (!userEmail) {
		return new Response('Not authorized', {
			status: 401,
		});
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

export async function GET(req: NextRequest) {
	const { perPage, page } = getQueryParams(req);
	console.log('sss', perPage, page);
	const articles = await articleService.getAll({
		perPage: Number(perPage),
		page: Number(page),
	});
	return Response.json(articles);
	// return Response.json({});
}
