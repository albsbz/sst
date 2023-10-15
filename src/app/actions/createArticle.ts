'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createArticle(prevState: any, formData: FormData) {
	const schema = z.object({
		title: z.string().min(1),
		content: z.string().min(1),
	});
	const data = schema.parse({
		title: formData.get('title'),
		content: formData.get('content'),
	});

	try {
		console.log('data', data);

		revalidatePath('/');
		return { message: `Added article ${data.title}` };
	} catch (e) {
		return { message: 'Failed to create article' };
	}
}
