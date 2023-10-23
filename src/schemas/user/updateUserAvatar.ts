import { z } from 'zod';
export const updateUserAvatarValidationSchema = {
	url: z.string(),
	fileKey: z.string(),
} as const;
const schema = z.object(updateUserAvatarValidationSchema);
export type UpdateUserAvatarValidationSchema = z.infer<typeof schema>;
