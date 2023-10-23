
import { getPresignedURL, preload } from '../../../../utils/getPresignedUrl';
import UploadForm from './components/uploadForm';


export default async function UploadAvatar() {
	const { url, key } = await getPresignedURL();
	return (
		<div>
			<div>UploadAvatar</div>
			<UploadForm url={url} fileKey={key} />
		</div>
	);
}
