import { imagePlugin } from '@mdxeditor/editor';
import { FileUpload } from '../../types/fileUpload.type';
import { ulid } from 'ulid';

export const appImagePlugin = (fileUpload?: FileUpload) =>
	imagePlugin({
		imageUploadHandler: async (file) => {
			if (!fileUpload) {
				throw new Error('File upload not implemented');
			}
			console.log('fileUpload', fileUpload);
			const fileName = `${ulid()}.${file.name.split('.').pop()}`;
			const key = `temp/${fileName}`;
			const formData = new FormData();
			formData.append('Content-Type', file.type);
			formData.append('acl', 'public-read');
			Object.entries(fileUpload.fields).forEach(([k, v]) => {
				if (k !== 'key') {
					formData.append(k, v);
				}
			});
			formData.append('key', key);
			formData.append('file', file, fileName);

			const image = await fetch(fileUpload.url, {
				body: formData,
				method: 'POST',
			});

			return `${fileUpload.url}${key}`;
		},
	});
