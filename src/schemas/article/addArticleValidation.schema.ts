import { z } from 'zod';
export const addArticleValidationSchema = {
	title: z.string().min(5).max(300),
	slug:  z.string().min(5).max(600).regex(new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)),
	mainImage: z.string(),
	shortDescription: z.string().min(5).max(600),
	content: z.string().min(5),
} as const;
const schema = z.object(addArticleValidationSchema);
export type AddArticleValidationSchema = z.infer<typeof schema>;
