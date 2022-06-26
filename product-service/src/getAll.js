import { connectLambda } from "./utils/connectLambda";

const lambdaGetAll = async ({ dbClient }) => {
  const products = await dbClient.query(
    "select * from items inner join stock on items.id = stock.item_id;"
  );

  return {
    statusCode: 200,
    body: JSON.stringify(products.rows),
  };
};

export const getAll = connectLambda(lambdaGetAll);
