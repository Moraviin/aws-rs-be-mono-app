import AWS from 'aws-sdk';
// import { S3Client, PutObjectCommand, ListBucketsCommand } from '@aws-sdk/client-s3';

export const importFile = async (event) => {
  const name = event.queryStringParameters.name;

  const s3 = new AWS.S3({ region: 'eu-central-1' });

  const params = {
    Bucket: 'import-service-uz-task5',
    Key: `uploaded/${name}.csv`,
    Expires: 60,
    ContentType: 'text/csv'
  };


  let signedURL = await s3.getSignedUrl('putObject', params)

  return {
    statusCode: 200,
    body: JSON.stringify(signedURL)
  }
};
