exports.main = async (event, context) => {
  console.log('signup');
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 200,
      message: 'signup!',
    }),
  };
};
