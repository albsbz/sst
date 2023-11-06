'use client';
import { useSession } from 'next-auth/react';
import { AppForm } from '@/app/components/appForm';
import { addArticleValidationSchema } from '@/schemas/article/addArticleValidation.schema';
import { addArticleWithAuthorValidationSchema } from '@/schemas/article/addArticleWithAuthorValidation.schema';
import { FileUpload } from '@/app/components/types/fileUpload.type';
import { Article } from '@/packages/article/types/Article';
import { INPUT_TYPE } from '@/app/components/appForm/enums/inputType';

type ComponentProperties = {
	fileUpload?: FileUpload;
	article?: Article;
	onSubmit: (data: any) => Promise<void>;
};
export default function ArticleForm({
	fileUpload,
	article,
	onSubmit,
}: ComponentProperties) {
	const { data: session } = useSession();
	const authorName = session?.user?.authorName;
	console.log('article1', article);
	const inputs = [
		{
			name: 'author',
			default: authorName || 'Author name',
			placeholder: 'Author name',
			disabled: Boolean(authorName),
			label: 'Author name',
		},
		{
			name: 'mainImage',
			default: article?.mainImage,
			label: 'Main Image',
			type: INPUT_TYPE.fileUpload,
			fileUpload,
		},
		{
			name: 'title',
			default: article?.title || 'Article title',
			placeholder: 'Article title',
			label: 'Article title',
		},
		{
			name: 'slug',
			default: article?.slug || 'article-slug',
			placeholder: 'Article slug',
			label: 'Slug',
		},
		{
			name: 'shortDescription',
			default: article?.shortDescription || 'Article shortDescription',
			placeholder: 'Article shortDescription',
			label: 'Short description',
		},
		{
			name: 'content',
			type: INPUT_TYPE.editor,
			default: article?.content || 'Article content',
			placeholder: 'Article content',
			label: 'Article content',
			fileUpload,
		},
	];
	return (
		<AppForm
			onSubmit={onSubmit}
			inputs={inputs}
			schema={
				authorName
					? addArticleValidationSchema
					: addArticleWithAuthorValidationSchema
			}
			submitLabel="Add article"
		></AppForm>
	);
}
