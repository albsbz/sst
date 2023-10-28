'use client';
import { AddArticleValidationSchema } from '@/schemas/article/addArticleValidation.schema';
import EditForm from '../../components/ArticleForm';
import { AddArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';

export default function FormWrapper({ ...props }) {
	const onSubmit = async (
		formData: AddArticleValidationSchema | AddArticleWithAuthorValidationSchema
	) => {
		const response = await fetch('/api/articles', {
			method: 'PUT',
			body: JSON.stringify(formData),
		});
	};
	return (
		<div>
			<EditForm {...props} onSubmit={onSubmit} />
		</div>
	);
}
