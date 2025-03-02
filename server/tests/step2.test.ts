// Import required dependencies
import "dotenv/config";

import supertest from "supertest";

import databaseClient from "../database/client";
import app from "../src/app";
import tileActions from "../src/modules/tile/tileActions";

describe("GET /api/tiles", () => {
  test("you declared and exported a browse function from tileActions.ts", async () => {
    expect(typeof tileActions.browse).toBe("function");
  });
  test("your browse function has 3 parameters: req, res and next", async () => {
    expect(tileActions.browse).toHaveLength(3);
  });
  test("you declared the route GET /api/tiles in router.ts, and it sends back the tiles in the response", async () => {
    const response = await supertest(app).get("/api/tiles");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveLength(72);
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
