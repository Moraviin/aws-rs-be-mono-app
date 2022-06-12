import { getById } from "./getById";
import { db } from "./super-puper-db";

test("test getAll", async () => {
  const testId = "7567ec4b-b10c-48c5-9345-fc73c48a80aa";
  const result = await getById({ pathParameters: { productId: testId } });

  expect(result.statusCode).toBe(200);
  expect(result.body).toBe(
    JSON.stringify(db.find((item) => item.id === testId))
  );
});

test("test getAll fail", async () => {
    const testId = "7567ec4b-b10c-48c5-9345-fc73c48a80ab";
    const result = await getById({ pathParameters: { productId: testId } });
  
    expect(result.statusCode).toBe(404);
    expect(result.error).toBe(
        'Product not found!'
    );
  });
