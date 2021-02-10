const {sqs} = require('../../services/sqs/sqs');

/**
 * Principal lambda handler
 * @returns {Promise<*>}
 */
module.exports.enqueueAction = async (event) => {
  const bodyData = JSON.parse(event.body);

  const sendMessageAsync = () => new Promise((resolve, reject) => {
    const params = {
      DelaySeconds: 30,
      MessageAttributes: {
        ApplicantType: {
          DataType: "String",
          StringValue: bodyData.name
        },
      },
      MessageBody: JSON.stringify(bodyData),
      QueueUrl: process.env.AWS_SQS_QUEUE_URL
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });

  let response = {};

  try {
    const result = await sendMessageAsync();

    response = {
      statusCode: 200,
      body: {
        message: "The action was enqueued! 👻",
        messageId: result.MessageId
      },
    };
  } catch (e) {
    response = {
      statusCode: 500,
      body: {
        error: e.code || 'InternalServerError',
      },
    };
  }

  return {
    ...response,
    body: JSON.stringify(response.body),
  };
};
