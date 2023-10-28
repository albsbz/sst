import EditArticle from '.';

export default function NewArticlePage({ params }: { params: { slug: string } }) {
	return <EditArticle slug={params.slug} />;
}
