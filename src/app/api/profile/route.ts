import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/libs/auth';
import { NextRequest } from 'next/server';
import Services from '@/packages/services';
import { revalidatePath } from 'next/cache';
import { editUserValidationSchema } from '@/schemas/user/editUserValidation.schema';

const { articleService, userService } = Services.getService();
export async function PATCH(req: NextRequest) {
	const session = await getServerSession(authOptions);

	const userEmail = session?.user?.email;
	const data = await req.json();

	if (!userEmail) {
		return new Response('Not authorized', {
			status: 401,
		});
	}

	const profilePayload = z.object(editUserValidationSchema).parse(data);


	await userService.editProfile({
		name: profilePayload.name,
		email: userEmail,
		description: profilePayload.description,
		avatar: profilePayload.avatar,
	});

	revalidatePath('/dashboard/profile');

	return Response.json({});
}
