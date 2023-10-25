import AddForm from './addForm/addForm';
import { getPresignedPost } from '@/app/utils/getPresignedPost';
export default async function NewArticleWrapper() {
	const fileUpload = await getPresignedPost();

	return (
		<div>
			<AddForm fileUpload={fileUpload} />
		</div>
	);
}
