import {db} from './super-puper-db';

export const getAll = async () => {
  const products = await Promise.resolve(db);
   return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};
