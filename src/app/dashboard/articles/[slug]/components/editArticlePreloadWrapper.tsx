import { getArticleBySlug, preload } from '@/app/utils/getArticleBySlug';

import { getPresignedPost } from '@/app/utils/getPresignedPost';
import FormWrapper from './formWrapper';
export default async function EditArticlePreloadWrapper({
	slug,
}: {
	slug: string;
}) {
	preload(slug);
	const fileUpload = await getPresignedPost();

	const article = await getArticleBySlug(slug);

	return (
		<div>
			{slug}
			<FormWrapper fileUpload={fileUpload} article={article.data[0]} />
		</div>
	);
}
