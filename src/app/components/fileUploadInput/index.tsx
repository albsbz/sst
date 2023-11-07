import { ulid } from 'ulid';
import { FileUpload } from '../types/fileUpload.type';
import { ChangeEvent, RefCallback, useState } from 'react';
import Image from 'next/image';
import AppImagePlaceholder from '../appImagePlaceholder';
import { UseFormWatch } from 'react-hook-form';
type ComponentProperties = {
	fileUpload?: FileUpload;
	reference: RefCallback<HTMLInputElement>;
	id: string;
	setValue: (field: string, value: string) => void;
	name: string;
	defaultValue?: string;
	watch: UseFormWatch<{
		[x: string]: any;
	}>;
};
export default function FileUploadInput({
	fileUpload,
	reference,
	id,
	setValue,
	name,
	watch,
	defaultValue,
	...properties
}: ComponentProperties) {
	const [file, setFile] = useState<Blob | null>(null);
	const url = watch(name, defaultValue);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!file) return;
		console.log('files', file);

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

		const value = `${fileUpload.url}${key}`;
		setValue(name, value);
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log('handleChange', e);
		const fileFromInput = e.target.files?.[0];
		if (fileFromInput) {
			setFile(fileFromInput);
		}
	};
	return (
		<div>
			FileUploadInput
			{url ? (
				<Image src={url} alt="image" width={200} height={200} />
			) : (
				<AppImagePlaceholder />
			)}
			<input
				name="file"
				type="file"
				accept="image/png, image/jpeg"
				onChange={handleChange}
			/>
			<input
				{...properties}
				value={url}
				ref={reference}
				id={id}
				name={name}
				type="hidden"
			/>
			<button type="button" onClick={handleSubmit}>
				Upload
			</button>
		</div>
	);
}
