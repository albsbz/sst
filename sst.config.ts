import { SSTConfig } from 'sst';

import CONFIG from './stacks/config';
import { NextApp } from './stacks/nextApp';
import { database } from './stacks/database';
import { cognito } from './stacks/cognito';

export default {
	config(_input) {
		return {
			name: CONFIG.AWS_SST_NAME,
			region: CONFIG.AWS_REGION,
			ssmPrefix: `/${CONFIG.AWS_PREFIX}/${_input.stage}/`,
		};
	},
	stacks(app) {
		if (app.stage !== 'prod') {
			app.setDefaultRemovalPolicy('destroy');
		}
		app.stack(database).stack(cognito).stack(NextApp);
	},
} satisfies SSTConfig;
