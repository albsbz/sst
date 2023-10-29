import { MDXRemote } from 'next-mdx-remote/rsc';
import ArticleHeader from './components/articleHeader';

export default async function EditArticle({ slug }: { slug: string }) {
	return (
		<article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
			{/* <ArticleHeader /> */}
			<p className="lead">
				Flowbite is an open-source library of UI components built with the
				utility-first classNamees from Tailwind CSS. It also includes
				interactive elements such as dropdowns, modals, datepickers.
			</p>

			{slug}
			<MDXRemote
				source={`# Hello World

      This is from Server Components!
      `}
			/>
			{/* <BlogCommentsSection /> */}
		</article>
	);
}
