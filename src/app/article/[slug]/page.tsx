import Article from '.';

export default function ArticlePage({ params }: { params: { slug: string } }) {
	return <Article slug={params.slug} />;
}
