import EditForm from './editForm/editForm';
import { getPresignedPost } from '@/app/utils/getPresignedPost';
export default async function EditArticleWrapper() {
	const fileUpload = await getPresignedPost();

	return (
		<div>
			<EditForm fileUpload={fileUpload} />
		</div>
	);
}
