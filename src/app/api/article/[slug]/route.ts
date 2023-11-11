import { NextRequest } from 'next/server';
import { getQueryParams } from '@/app/utils/getQueryParams';
import Services from '@/packages/services';

const { articleService } = Services.getService();

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	const { author } = getQueryParams(req);
	console.log('author22', typeof author);
	const article = await articleService.getBySlug({
		author: Boolean(author),
		slug: params.slug,
	});
	console.log('article22', article);
	return Response.json(article);
}
