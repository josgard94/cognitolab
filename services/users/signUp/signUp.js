import Response from "../../../common/response";
import cognitoISP from "../../../common/cognito";
const USER_POOL_ID = process.env.userPoolId;
export const signUp = async (event) => {
    const response = new Response();
    const requestParams = JSON.parse(event.body);
    try {
      await cognitoISP.adminCreateUser(
        {
          UserPoolId: USER_POOL_ID,
          Username: requestParams.username,
          MessageAction: 'SUPPRESS',
          TemporaryPassword: requestParams.password,
          UserAttributes: [
            {
              Name: 'email_verified',
              Value: 'True'
            },
            {
              Name: 'email',
              Value: requestParams.username
            }
          ]
        }
      ).promise();
      // Update password to force confirmation status set to 'Confirmed'
      await updatePassword({
        username: requestParams.username,
        password: requestParams.password
      });
      response.body = {
        message: 'Usuario registrado exitosamente.'
      };
    } catch (error) {
      console.error(error);
      response.body = {
        message: error.message
      };
    };
    return response.toObject();
};
const updatePassword = async ({username, password}) => {
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