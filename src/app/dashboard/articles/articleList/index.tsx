'use client';
import AppButton from '@/app/components/appButton';
import AppTable from '@/app/components/appTable';
import { getFetchUrl } from '@/app/utils/getFetchUrl';
import { Article } from '@/packages/article/types/Article';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticleList({
	initialArticles,
}: {
	initialArticles: { data: Article[]; cursor: string };
}) {
	const [articles, setArticles] = useState<Article[]>(initialArticles.data);
	const [cursor, setCursor] = useState(initialArticles.cursor);
	const [perPage, setPerPage] = useState(5);
	console.log('articles', articles);
	const handleClick = async () => {
		const queryParams = new URLSearchParams({
			cursor,
		});
		const response = await fetch(getFetchUrl(`articles?${queryParams}`));
		console.log('response', response);
		const data = await response.json();
		setArticles((prev: any) => {
			console.log('prev', prev);
			console.log('data', data);
			return [...prev, ...data.data];
		});
		setCursor(data.cursor);
	};

	const articlesToTable = articles.map((article: any) => [
		<Link
			key={article['postId']}
			href={`/article/${article['slug']}`}
			className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
		>
			{article['title']}
		</Link>,
		<div key={`slug${article['slug']}`} className="max-w-[300px]">
			<p className="truncate">{article['slug']}</p>
		</div>,
		<div
			key={`short-description${article['postId']}`}
			className="max-w-[300px]"
		>
			<p className="truncate">{article['shortDescription']}</p>
		</div>,
		<Link
			key={article['postId']}
			href={`/dashboard/articles/${article['slug']}`}
			className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
		>
			Edit
		</Link>,
	]);

	return (
		<div>
			<div>
				<AppTable
					content={articlesToTable}
					titles={['Title', 'Slug', 'Short Description', 'Edit']}
				/>
			</div>
			<AppButton label="More..." onClick={handleClick} disabled={!cursor} />
		</div>
	);
}
