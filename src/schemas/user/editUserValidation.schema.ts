import { z } from 'zod';
export const editUserValidationSchema = {
	name: z.string().min(3),
	description: z.string().min(5),
	avatar: z.string(),
} as const;
const schema = z.object(editUserValidationSchema);
export type EditUserValidationSchema = z.infer<typeof schema>;
