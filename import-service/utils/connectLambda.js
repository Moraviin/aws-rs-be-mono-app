import { Client } from "pg";

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_USER: user,
  DB_PASSWORD: password,
  DB: database,
} = process.env;

const dbConfig = {
  host,
  port,
  user,
  password,
  database,
};

export const connectLambda =
  (lambda) =>
  async (...lambdasArgs) => {
    let client;
    let result;
    try {
      client = new Client(dbConfig);
      await client.connect();
      console.log("lambda-name", lambda.name, "lambda-args", lambdasArgs);

      result = await lambda({ lambdasArgs, dbClient: client });
    } catch {
      result = {
        status: 500,
        message: "Something went wrong",
      };
    } finally {
      client.end();
      return result;
    }
  };
