'use client';

import { EditArticleValidationSchema } from '@/schemas/article/editArticleValidation.schema';
import ProfileForm from './ProfileForm';

export default function FormWrapper({ ...props }) {
	const onSubmit = async (formData: EditArticleValidationSchema) => {
		const response = await fetch('/api/profile', {
			method: 'PATCH',
			body: JSON.stringify(formData),
		});
	};
	return (
		<div>
			<ProfileForm {...props} onSubmit={onSubmit} />
		</div>
	);
}
