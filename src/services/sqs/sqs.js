const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });

module.exports.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
