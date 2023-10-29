// import BlogFooter from './components/BlogFooter';
// import BlogCommentsSection from './components/blogCommentsSection';
// import BlogRelatedArticles from './components/blogRelatedArticles';
// import BlogSubscribeForm from './components/blogSubscribeForm';

export default async function ArticleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
				<div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
					{children}
				</div>
			</main>

			{/* <BlogRelatedArticles /> */}
			{/* <BlogSubscribeForm /> */}
			{/* <BlogFooter /> */}
		</>
	);
}
