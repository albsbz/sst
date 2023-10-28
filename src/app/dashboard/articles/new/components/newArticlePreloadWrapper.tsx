import { getPresignedPost, preload } from '@/app/utils/getPresignedPost';
import FormWrapper from './formWrapper';
export default async function NewArticlePreloadWrapper() {
	preload();
	const fileUpload = await getPresignedPost();

	return (
		<div>
			<FormWrapper fileUpload={fileUpload} />
		</div>
	);
}
