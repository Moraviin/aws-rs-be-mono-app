import AWS from "aws-sdk";
import { connectLambda } from "./utils/connectLambda";

 const batchLambda = async (event) => {
    const data = event.Records.map(({body}) => body);

    const sns = new AWS.SNS({ region: 'us-east-1' });

    sns.publish({
        Subject: 'Test sns',
        Message: 'Product uploaded',
        TopicArn: process.env.SNS_ARN
    });

    await dbClient.query("BEGIN");


    const dataToInsert = data.map(({title, description, price}) => `('${title}', '${description}', ${price})`);
    const createItemRequest = `insert into items (title, description, price) values ${dataToInsert.join(',')} returning id;`;
    const res = await dbClient.query(createItemRequest);

    const dataToInsertPriceTable = data.map(({count}, i) => `('${res.rows[i].id}', ${count})`);
    const createStockRecord = `insert into stock (item_id, count) values ${dataToInsertPriceTable.join(',')};`;
    await dbClient.query(createStockRecord);

    await dbClient.query("COMMIT");
}

export const batch = connectLambda(batchLambda);