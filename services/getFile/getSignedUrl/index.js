import Response from "../../../common/response"
const AWS = require('aws-sdk');

export const getSignedUrl = async (event) => {
    const response = new Response();
    const requestParams = JSON.parse(event.body);
    const s3 = new AWS.S3();
    try {
      const myBucket = 'cognitolab-cognitolab-dev';
        const myKey = 'you_did_it.gif';
        const signedUrlExpireSeconds = 60 * 5;
        const url = s3.getSignedUrl('getObject', {
            Bucket: myBucket,
            Key: myKey,
            Expires: signedUrlExpireSeconds
        });
      response.body = {
        url: url
      };
    } catch (error) {
      console.error(error);
      response.body = {
        message: error.message
      };
    };
    return response.toObject();
};