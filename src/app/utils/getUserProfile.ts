import { cache } from 'react';
import 'server-only';
import Config from '../libs/config/config';
import storage from '../../../packages/core/storage/storage';
import { getPresignedPost } from './getPresignedPost';
import Services from '@/packages/services';
import { getServerSession } from 'next-auth';
import { authOptions } from '../libs/auth';

export const preload = () => {
	void getUserProfile();
};

export const getUserProfile = cache(async () => {
	const { userService } = Services.getService();
	const session = await getServerSession(authOptions);
	const email = session?.user.email;
	console.log('ses4', session);
	let user;
	if (email) {
		user = await userService.getProfile({ email });
	}

	return { user };
});
