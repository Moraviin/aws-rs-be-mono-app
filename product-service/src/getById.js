import { connectLambda } from "./utils/connectLambda";

const lambdaGetByID = async ({lambdasArgs, dbClient }) => {
  const { productId } = lambdasArgs[0].pathParameters;
  const product = await dbClient.query(
    `select * from items inner join stock on items.id = stock.item_id where id = '${productId}';`,
  );

  if (product) {
    return {
      statusCode: 200,
      body: JSON.stringify(product.rows[0]),
    };
  }
  return {
    statusCode: 404,
    error: "Product not found!",
  };
};

export const getById = connectLambda(lambdaGetByID);
