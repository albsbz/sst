import ArticleService from '@/packages/article/service';
import AuthorService from '@/packages/author/service';
import { addArticleValidationSchema } from '@/schemas/article/addArticleValidation.schema';
import { addArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/libs/auth';
import { NextRequest } from 'next/server';
import { getQueryParams } from '@/app/utils/getQueryParams';
import Services from '@/packages/services';
import { editArticleValidationSchema } from '@/schemas/article/editArticleValidation.schema';
import { revalidatePath } from 'next/cache';

const { articleService } = Services.getService();
export async function PUT(req: NextRequest) {
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

	revalidatePath('/dashboard/articles');

	return Response.json({});
}

export async function PATCH(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const userEmail = session?.user?.email;
	const data = await req.json();

	if (!userEmail) {
		return new Response('Not authorized', {
			status: 401,
		});
	}

	const articlePayload = z.object(editArticleValidationSchema).parse(data);

	articleService.edit({
		article: { ...articlePayload },
		userEmail: null,
	});
	console.log('path1', req.nextUrl.searchParams);
	revalidatePath('/dashboard/articles');

	return Response.json({});
}

export async function GET(req: NextRequest) {
	const { perPage, cursor } = getQueryParams(req);
	console.log('sss', perPage, cursor);
	const articles = await articleService.getAll({
		perPage: Number(perPage),
		cursor,
	});
	return Response.json(articles);
}
