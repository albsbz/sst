import Link from 'next/link';
import ArticleList from './articleList';
import { getFetchUrl } from '@/app/utils/getFetchUrl';
export default async function Articles() {
	const queryParams = new URLSearchParams({
		perPage: '5',
	});
	const response = await fetch(getFetchUrl(`articles?${queryParams}`), {
		method: 'GET',
	});
	const articles = await response.json();
	return (
		<div>
			<Link
				href="/dashboard/articles/new"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				New
			</Link>
			<div>Articles</div>
			<ArticleList initialArticles={articles} />
		</div>
	);
}
