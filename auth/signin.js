import Amplify, { Auth } from 'aws-amplify';
import fetch from 'node-fetch';

global.fetch = fetch;

exports.main = async (event, context) => {
  const paramProps = {
    userPoolId: 'USER_POOL_ID',
    userPoolWebClientId: 'USER_POOL_CLIENT_ID',
  };

  if (process.env.IS_LOCAL) {
    paramProps.userPoolId = `${paramProps.userPoolId}_LOCAL`;
    paramProps.userPoolWebClientId = `${paramProps.userPoolWebClientId}_LOCAL`;
  }

  Amplify.configure({
    Auth: {
      userPoolId: process.env[paramProps.userPoolId],
      userPoolWebClientId: process.env[paramProps.userPoolWebClientId],
    },
  });

  try {
    const user = await Auth.signIn('chinh.testing11@gmail.com', 'Passw0rd!');
    console.log('user: ', user);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        accessToken: user.signInUserSession.accessToken,
        refreshToken: user.signInUserSession.refreshToken,
      }),
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        code: e.code,
        message: e.message,
      }),
    };
  }
};
