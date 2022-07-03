import AWS from "aws-sdk";
import csv from "csv-parser";

export const fileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-central-1" });

  for (const record of event.Records) {
    const params = {
      Bucket: "import-service-uz-task5",
      Key: record.s3.object.key,
    };

    s3.getObject(params)
      .createReadStream()
      .pipe(csv())
      .on("data", (data) => console.log(data));
  }
};
