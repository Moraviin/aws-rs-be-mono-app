import { connectLambda } from "./utils/connectLambda";

const getIsDataValid = (product) => {
  const { price, count } = product;

  if (price != Number(price)) {
    return false;
  }
  if (count != Number(count)) {
    return false;
  }

  return true;
};

const lambdaCreateProduct = async ({ lambdasArgs, dbClient }) => {
  try {
    const product = JSON.parse(lambdasArgs[0].body);

    if (!getIsDataValid(product)) {
      return { status: 400, body: "Invalid porduct data provided" };
    }
    console.log(1);
    const { title, description, price, count } = product;
    await dbClient.query("BEGIN");
    console.log(2);

    const createItemRequest = `insert into items (title, description, price) values ('${title}', '${description}', ${price}) returning id;`;
    const res = await dbClient.query(createItemRequest);
    console.log(3, res);

    const newProductId = res.rows[0].id;
    console.log(newProductId);
    const createStockRecord = `insert into stock (item_id, count) values ('${newProductId}', ${count});`;
    await dbClient.query(createStockRecord);
    console.log(4);

    await dbClient.query("COMMIT");

    const result = await dbClient.query(`select * from items inner join stock on items.id = stock.item_id where id = '${newProductId}';`)
    console.log(5);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (e) {
    await dbClient.query("ROLLBACK");
    throw e;
  }
};

export const createProduct = connectLambda(lambdaCreateProduct);
