module.exports.handleQueueAction = async (event, context) => {
  console.log(JSON.stringify(event.Records, null, 2));

  return {};
};
