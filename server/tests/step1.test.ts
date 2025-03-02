// Import required dependencies
import "dotenv/config";

import databaseClient from "../database/client";

import type { Rows } from "../database/client";

describe("The has_treasure attribute", () => {
  test("you added the attribute in database/schema.sql (remember to run again db:migrate script)", async () => {
    const [result] = await databaseClient.query<Rows>("describe tile");

    const hasTreasure = result.find(({ Field }) => Field === "has_treasure");

    expect(hasTreasure).toBeDefined();
  });
  test("the attribute is a boolean", async () => {
    const [result] = await databaseClient.query<Rows>("describe tile");

    const hasTreasure = result.find(({ Field }) => Field === "has_treasure");

    expect(hasTreasure?.Type).toMatch(/tinyint/);
  });
  test("the attribute is false by default", async () => {
    const [result] = await databaseClient.query<Rows>("describe tile");

    const hasTreasure = result.find(({ Field }) => Field === "has_treasure");

    expect(hasTreasure?.Default).toMatch(/0/);
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
