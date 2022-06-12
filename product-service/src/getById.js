import { db } from "./super-puper-db";

export const getById = async (event) => {
  const { productId } = event.pathParameters;
  const product = await Promise.resolve(db.find((item) => item.id === productId));
  if (product) {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  }
  return {
    statusCode: 404,
    error: "Product not found!",
  };
};
