import Config from '../libs/config/config';
import { NextRequest } from 'next/server';

export const getQueryParams = (req: NextRequest) =>
	Object.fromEntries(req.nextUrl.searchParams.entries());
