import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { env } from 'process';
import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'sst-my-app-v1',
			region: 'us-east-1',
			ssmPrefix: `/albsbz/sst/${_input.stage}/`,
		};
	},
	stacks(app) {
		if (app.stage !== 'prod') {
			app.setDefaultRemovalPolicy('destroy');
		}
		app.stack(function Site({ stack }) {
			const customDomain = process.env.CUSTOM_DOMAIN &&
				process.env.CERTIFICATE_ARN && {
					domainName: process.env.CUSTOM_DOMAIN,
					domainAlias: `www.${process.env.CUSTOM_DOMAIN}`,
					hostedZone: process.env.CUSTOM_DOMAIN,
					cdk: {
						certificate: Certificate.fromCertificateArn(
							stack,
							'MyCert',
							process.env.CERTIFICATE_ARN
						),
					},
				};

			const site = new NextjsSite(stack, 'site', {
				customDomain,
			});

			stack.addOutputs({
				SiteUrl: site.customDomainUrl || site.url,
			});
		});
	},
} satisfies SSTConfig;
