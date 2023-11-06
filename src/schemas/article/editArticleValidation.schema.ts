import { z } from 'zod';
export const editArticleValidationSchema = {
	title: z.string().min(5).max(15),
	content: z.string().min(5),
	slug:  z.string().min(5).max(600),
	shortDescription: z.string().min(5).max(600),
	postId: z.string(),
	mainImage: z.string(),
	authorId: z.string(),
} as const;
const schema = z.object(editArticleValidationSchema);
export type EditArticleValidationSchema = z.infer<typeof schema>;
