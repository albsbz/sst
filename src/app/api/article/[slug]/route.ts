import { NextRequest } from 'next/server';
import { getQueryParams } from '@/app/utils/getQueryParams';
import Services from '@/packages/services';

const { articleService } = Services.getService();

export async function GET(
	req: NextRequest,
	{ params }: { params: { slug: string } }
) {
	const article = await articleService.getBySlug({
		slug: params.slug,
	});
	console.log('article22', article);
	return Response.json(article);
}
