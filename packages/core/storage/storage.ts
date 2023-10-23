import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Bucket } from 'sst/node/bucket';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class Storage {
	private s3Client: S3Client;
	constructor() {
		this.s3Client = new S3Client({})
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

	async deleteFile({ folder, key }: { folder: string; key: string }) {
		const command = new DeleteObjectCommand({
			Key: `${folder}${key}`,
			Bucket: Bucket.public.bucketName,
		});
		await this.s3Client.send(command);
		return;
	}
}
const storage = new Storage();

export default storage;
