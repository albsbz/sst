'use client';
import { FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { AppForm } from '@/app/components/appForm';
import { z } from 'zod';
import {
	AddArticleValidationSchema,
	addArticleValidationSchema,
} from '@/schemas/article/add/addArticleValidation.schema';
import {
	addArticleWithAuthorValidationSchema,
	AddArticleWithAuthorValidationSchema,
} from '@/schemas/article/add/addArticleWithAuthorValidation.schema';

export default function AddForm() {
	const { data: session, update: updateSession } = useSession();
	const userName = session?.user?.name;
	async function onSubmit(
		formData: AddArticleValidationSchema | AddArticleWithAuthorValidationSchema
	) {
		const response = await fetch('/api/articles', {
			method: 'PUT',
			body: JSON.stringify(formData),
		});

		// Handle response if necessary
		const data = await response.json();
		if (!userName) {
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
					default: userName || 'Author name',
					placeholder: 'Author name',
					disabled: Boolean(userName),
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
					default: 'Article content',
					placeholder: 'Article content',
					label: 'Article content',
				},
			]}
			schema={
				userName
					? addArticleValidationSchema
					: addArticleWithAuthorValidationSchema
			}
			submitLabel="Add article"
		></AppForm>
	);
}
