'use client';
import ArticleForm from '../../components/ArticleForm';
import { EditArticleValidationSchema } from '@/schemas/article/editArticleValidation.schema';

export default function FormWrapper({ ...props }) {
	const onSubmit = async (formData: EditArticleValidationSchema) => {
		formData = {...formData, postId: props.article.postId, authorId: props.article.authorId}
		const response = await fetch('/api/articles', {
			method: 'PATCH',
			body: JSON.stringify(formData),
		});
	};
	return (
		<div>
			<ArticleForm {...props} onSubmit={onSubmit} />
		</div>
	);
}
