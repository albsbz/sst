import Config from '../libs/config/config';

export const getFetchUrl = (route: string) =>
	`${Config.NEXTAUTH_URL}/api/${route}`;
