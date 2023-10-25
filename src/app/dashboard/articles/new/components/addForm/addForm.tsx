'use client';
import { useSession } from 'next-auth/react';
import { AppForm } from '@/app/components/appForm';
import {
	AddArticleValidationSchema,
	addArticleValidationSchema,
} from '@/schemas/article/addArticleValidation.schema';
import {
	addArticleWithAuthorValidationSchema,
	AddArticleWithAuthorValidationSchema,
} from '@/schemas/article/addArticleWithAuthorValidation.schema';
import { FileUpload } from '@/app/components/types/fileUpload.type';

type ComponentProperties = { fileUpload?: FileUpload };
export default function AddForm({ fileUpload }: ComponentProperties) {
	const { data: session, update: updateSession } = useSession();
	const authorName = session?.user?.authorName;
	async function onSubmit(
		formData: AddArticleValidationSchema | AddArticleWithAuthorValidationSchema
	) {
		const response = await fetch('/api/articles', {
			method: 'PUT',
			body: JSON.stringify(formData),
		});

		// Handle response if necessary
		const data = await response.json();
		if (!authorName) {
			updateSession();
		}
		// ...
	}

	return (
		<AppForm
			onSubmit={onSubmit}
			inputs={[
				{
					name: 'author',
					default: authorName || 'Author name',
					placeholder: 'Author name',
					disabled: Boolean(authorName),
					label: 'Author name',
				},
				{
					name: 'title',
					default: 'Article title',
					placeholder: 'Article title',
					label: 'Article title',
				},
				{
					name: 'content',
					type: 'editor',
					default: 'Article content',
					placeholder: 'Article content',
					label: 'Article content',
					fileUpload,
				},
			]}
			schema={
				authorName
					? addArticleValidationSchema
					: addArticleWithAuthorValidationSchema
			}
			submitLabel="Add article"
		></AppForm>
	);
}
