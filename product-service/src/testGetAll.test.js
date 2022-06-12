import { getAll } from "./getAll";
import { db } from "./super-puper-db";

test("test getAll", async () => {
  const result = await getAll();

  expect(result.statusCode).toBe(200);
  expect(result.body).toBe(JSON.stringify(db));
});
