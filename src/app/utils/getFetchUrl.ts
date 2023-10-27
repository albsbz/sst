export const getFetchUrl = (route: string) => {
	return `${process.env.NEXT_PUBLIC_URL}/api/${route}`;
};
