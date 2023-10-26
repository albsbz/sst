'use client';
import { useEffect, useState } from 'react';

export default function ArticleList({initialArticles}: {initialArticles: any}) {
	const [articles, setArticles] = useState(initialArticles);
	const [perPage, setPerPage] = useState(5);
	console.log('articles', articles);

	// useEffect(() => {
	// 	const fetchArticles = async () => {
	// 		const response = await fetch('/api/articles');
	// 		const data = await response.json();
	// 		setArticles(data);
	// 	};
	// 	fetchArticles();
	// }, []);
	return (
		<div>
			articleList
			{JSON.stringify(articles)}
		</div>
	);
}
