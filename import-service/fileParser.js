import AWS from "aws-sdk";
import csv from "csv-parser";

export const fileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-central-1" });
  const sqs = new AWS.SQS();

  for (const record of event.Records) {
    const params = {
      Bucket: "import-service-uz-task5",
      Key: record.s3.object.key,
    };

    await new Promise((res) => s3.getObject(params)
      .createReadStream()
      .pipe(csv())
      .on("data", (data) => {
        console.log('fileParser data', data);
        sqs.sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: data
        })
      })
      .on("end", async () => {
        await s3.copyObject({
          Bucket: "import-service-uz-task5",
          CopySource: "import-service-uz-task5" + '/' + record.s3.object.key,
          Key: record.s3.object.key.replace('uploaded', 'parsed'),
        });

        await s3.deleteObject(params);

        res();
      })
      .on('error', (err) => {
        console.log('error readstream', err)
      }));
  }
};
