import { getArticleBySlug, preload } from '@/app/utils/getArticleBySlug';

import { getPresignedPost } from '@/app/utils/getPresignedPost';
import FormWrapper from './formWrapper';
import Config from '@/app/libs/config/config';
import { getUserProfile } from '@/app/utils/getUserProfile';
export default async function EditProfilePreloadWrapper() {
	const fileUpload = await getPresignedPost({ folder: Config.AVATAR_FOLDER });

	const { user } = await getUserProfile();

	return (
		<div>
			<FormWrapper fileUpload={fileUpload} user={user} />
		</div>
	);
}
