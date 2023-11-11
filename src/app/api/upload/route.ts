import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/libs/auth';
import UserService from '@/packages/user/service';
import { updateUserAvatarValidationSchema } from '@/schemas/user/updateUserAvatar';
import Config from '@/app/libs/config/config';
import UploadType from '@/enums/uploadType.enum';
import storage from '../../../../packages/core/storage/storage';

const userService = new UserService();

export async function PATCH(req: Request) {
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email;
	if (!userEmail) {
		return new Response('Not authorized', {
			status: 401,
		});
	}
	const payload = await req.json();

	console.log('payload', payload);
	if (payload.type === UploadType.Avatar) {
		z.object(updateUserAvatarValidationSchema).parse(payload);
		//TODO move to service
		userService.setAvatar({
			url: payload.url,
			fileKey: payload.fileKey,
			userEmail,
		});
		await storage.deleteFile({
			folder: Config.AVATAR_FOLDER,
			key: crypto.randomUUID(),
		});
		return Response.json({});
	}
}
