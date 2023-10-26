import { Duration } from 'aws-cdk-lib/core';
import { StackContext, Table, Bucket } from 'sst/constructs';

export function publicStorage({ stack }: StackContext) {
	const bucket = new Bucket(stack, 'public', {
		cdk: {
			bucket: {
				lifecycleRules: [
					{
						id: 'delete-old-article-images',
						prefix: 'temp/',
						tagFilters: {
							status: 'delete',
						},
						expiration: Duration.days(1),
					},
				],
			},
		},
	});

	return bucket;
}
