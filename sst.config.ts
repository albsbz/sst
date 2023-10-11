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
		app.stack(function Site({ stack }) {
			const site = new NextjsSite(stack, 'site');
			if (app.stage !== 'prod') {
				app.setDefaultRemovalPolicy('destroy');
			}

			stack.addOutputs({
				SiteUrl: site.url,
			});
		});
	},
} satisfies SSTConfig;
