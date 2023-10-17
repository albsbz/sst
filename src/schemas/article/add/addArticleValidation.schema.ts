import { z } from 'zod';
export const addArticleValidationSchema = {
	title: z.string().min(4),
	content: z.string().min(5),
} as const;
const schema = z.object(addArticleValidationSchema);
export type AddArticleValidationSchema = z.infer<typeof schema>;
