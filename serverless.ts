import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
	service: {
		name: "sls-api-ts",
		// app and org for use with dashboard.serverless.com
		// app: your-app-name,
		// org: your-org-name,
	},
	frameworkVersion: "2",
	custom: {
		webpack: {
			webpackConfig: "./webpack.config.js",
			includeModules: true,
		},
		s3Sync: [
			{
				bucketName: "sls-api-ts-bucket-10091986",
				localDir: "S3",
			},
		],
	},
	// Add the serverless-webpack plugin
	plugins: ["serverless-webpack", "serverless-s3-sync"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		apiGateway: {
			minimumCompressionSize: 1024,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
		},
	},
	functions: {
		api_home: {
			handler: "handler.api_home",
			events: [
				{
					http: {
						method: "get",
						path: "api_home",
					},
				},
			],
		},
	},

	resources: {
		Resources: {
			SlSApiTsBucket: {
				Type: "AWS::S3::Bucket",
				Properties: {
					BucketName: "sls-api-ts-bucket-10091986",
				},
			},
		},
	},
};

module.exports = serverlessConfiguration;
