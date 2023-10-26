import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	PutObjectTaggingCommand,
} from '@aws-sdk/client-s3';
import { Bucket } from 'sst/node/bucket';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import FileTags from '@/enums/fileTags.enum';

class Storage {
	private s3Client: S3Client;
	constructor() {
		this.s3Client = new S3Client({});
	}
	async getPresignedURL({ folder, key }: { folder: string; key: string }) {
		const command = new PutObjectCommand({
			ACL: 'public-read',
			Key: `${folder}${key}`,
			Bucket: Bucket.public.bucketName,
		});
		const url = await getSignedUrl(this.s3Client, command, {
			expiresIn: 3600,
		});

		return { url, key };
	}

	async getPresignedPost({ folder }: { folder: string }) {
		const { url, fields } = await createPresignedPost(this.s3Client, {
			Bucket: Bucket.public.bucketName,
			Key: `${folder}` + '${filename}',
			Conditions: [
				{ acl: 'public-read' },
				{ bucket: Bucket.public.bucketName },
				['starts-with', '$Content-Type', 'image/'],
				['content-length-range', 0, 1000000],
			],
			Fields: { Tagging: FileTags.DeleteTag },
			Expires: 3600,
		});
		console.log('fields', fields);
		return { url, fields };
	}

	async changeFileStatus(key: string, status: string) {
		const command = new PutObjectTaggingCommand({
			Bucket: Bucket.public.bucketName,
			Key: key,
			Tagging: {
				TagSet: [
					{
						Key: 'status',
						Value: status,
					},
				],
			},
		});

		return this.s3Client.send(command);
	}

	async deleteFile({ folder, key }: { folder: string; key: string }) {
		const command = new DeleteObjectCommand({
			Key: `${folder}${key}`,
			Bucket: Bucket.public.bucketName,
		});
		return this.s3Client.send(command);
	}
}
const storage = new Storage();

export default storage;
