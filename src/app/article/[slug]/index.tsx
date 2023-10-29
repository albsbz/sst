import { MDXRemote } from 'next-mdx-remote/rsc';
import ArticleHeader from './components/articleHeader';
import { Article } from '@/packages/article/types/Article';

export default async function EditArticle({ article }: { article: Article }) {
	return (
		<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
			{/* <ArticleHeader /> */}
			<p className="lead">{article.content}</p>

			<MDXRemote source={article.content} />
			{/* <BlogCommentsSection /> */}
		</article>
	);
}
