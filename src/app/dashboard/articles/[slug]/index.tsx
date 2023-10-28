import EditArticleWrapper from './components/editArticlePreloadWrapper';

export default async function EditArticle({slug}: {slug: string}) {
	return (
		<div>
			<div>Edit Article</div>
			<EditArticleWrapper slug={slug} />
		</div>
	);
}
