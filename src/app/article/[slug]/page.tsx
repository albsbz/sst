import { getFetchUrl } from '@/app/utils/getFetchUrl';
import Article from '.';
import { Article as ArticleT } from '@/packages/article/types/Article';

export async function generateStaticParams() {
	console.log('generateStaticParams');
	const response = await fetch(getFetchUrl(`articles`));
	const { data } = await response.json();
	return data.map((article: ArticleT) => {
		return {
			slug: article.slug,
		};
	});
}

export default async function ArticlePage({
	params,
}: {
	params: { slug: string };
}) {
	console.log('slug66', params);
	const res = await fetch(getFetchUrl(`article/${params.slug}?author=1`), {
		method: 'GET',
		next: { revalidate: 1 },
	});
	const article = await res.json();
	return <Article article={article} />;
}
