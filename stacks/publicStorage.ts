import { StackContext, Table, Bucket } from 'sst/constructs';

export function publicStorage({ stack }: StackContext) {
	const bucket = new Bucket(stack, 'public');

	return bucket;
}
