import { z } from 'zod';
import { addArticleValidationSchema } from './addArticleValidation.schema';
export const addArticleWithAuthorValidationSchema = {
	...addArticleValidationSchema,
	author: z.string().min(3),
} as const;
const schema = z.object(addArticleWithAuthorValidationSchema);
export type AddArticleWithAuthorValidationSchema = z.infer<typeof schema>;
