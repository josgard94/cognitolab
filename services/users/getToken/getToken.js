import Response from "../../../common/response";
import cognitoISP from "../../../common/cognito";

const CLIENT_ID = process.env.clientId;
const USER_POOL_ID = process.env.userPoolId;
export const getToken = async (event) => {
  const response = new Response();
  const requestParams = JSON.parse(event.body);
  try {
    const authResponse = await cognitoISP.initiateAuth({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: requestParams.username,
        PASSWORD: requestParams.password
      }
    }).promise();
    if (authResponse && authResponse.AuthenticationResult) {
      const { RefreshToken, IdToken } = authResponse.AuthenticationResult;
      response.body = {
        RefreshToken,
        AccessToken: IdToken,
      };
    } else {
      response.body = {
        authResponse,
        message: "No se pudo iniciar sesión"
      };
    }
  } catch (error) {
    console.log(error);
    response.body = {
      token: "",
      message: "Ocurrió un error al iniciar sesión."
    };
  };
  return response.toObject();
};

export const updatePassword = async ({username, password}) => {
  try {
    // Used for confirming users only
    await cognitoISP.adminSetUserPassword({
      Permanent: true,
      UserPoolId: USER_POOL_ID,
      Username: username,
      Password: password
    }).promise();
  } catch (error) {
    throw new Error(error);
  };
};