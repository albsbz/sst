/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['three'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: `${process.env.SST_Bucket_bucketName_public}.s3.${process.env.AWS_REGION}.amazonaws.com`,
				port: '',
				pathname: '**',
			},
		],
	},
	//https://github.com/aws/aws-sdk-js-v3/issues/5216
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.externals.push({
			'@aws-sdk/signature-v4-multi-region':
				'commonjs @aws-sdk/signature-v4-multi-region',
		});

		return config;
	},
};

module.exports = nextConfig;
