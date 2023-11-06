import Config from '@/app/libs/config/config';
import { getPresignedURL, preload } from '../../../../utils/getPresignedUrl';
import UploadForm from './components/uploadForm';

export default async function UploadAvatar() {
	const folder = Config.AVATAR_FOLDER;
	const { url, key } = await getPresignedURL({ folder });
	return (
		<div>
			<div>UploadAvatar</div>
			<UploadForm url={url} fileKey={key} folder={folder} />
		</div>
	);
}
