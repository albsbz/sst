import ArticleRepository from '@/packages/article/repository';

const articleRepository = new ArticleRepository();
export async function PUT(req: Request) {
	const data = await req.formData();
	articleRepository.create(Object.fromEntries(data) as any);
	return Response.json({ id: 1 });
}
