import { getFetchUrl } from '@/app/utils/getFetchUrl';
import Article from '.';
export async function generateStaticParams() {
	console.log('generateStaticParams');
	return [
		{
			slug: '01HDPBFYHFTRXE96S8837ZNEC3',
		},
		{
			slug: '01HDV5EJQX2C0FFTGRCGJ9WQSK',
		},
	];
}

export default async function ArticlePage({
	params,
}: {
	params: { slug: string };
}) {
	const res = await fetch(getFetchUrl(`article/${params.slug}`), {
		method: 'GET',
		next: { revalidate: 1 },
	});
	const {
		data: [article],
	} = await res.json();
	console.log('post', article);
	return <Article article={article} />;
}
