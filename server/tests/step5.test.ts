// Import required dependencies
import "dotenv/config";

import supertest from "supertest";

import type { Request, Response } from "express";

import databaseClient from "../database/client";
import boatRepository from "../src/modules/boat/boatRepository";

import type { Rows } from "../database/client";

describe("JOIN tile ON boat.coord_x=tile.coord_x and boat.coord_y=tile.coord_y", () => {
  test("your readAll method in BoatRepository selects boat.id", async () => {
    const [rows] = await databaseClient.query<Rows>("select * from boat");

    const blackPearlAlone = rows[0];

    const blackPearlWithJoin = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    if (blackPearlWithJoin == null) {
      throw new Error("We lost the Pearl !");
    }

    expect(blackPearlWithJoin).toHaveProperty("id");
    expect(blackPearlWithJoin.id).toBe(blackPearlAlone.id);
  });
  test("your readAll method in BoatRepository selects boat.coord_x", async () => {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    expect(blackPearl).toHaveProperty("coord_x");
  });
  test("your readAll method in BoatRepository selects boat.coord_y", async () => {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    expect(blackPearl).toHaveProperty("coord_y");
  });
  test("your readAll method in BoatRepository selects boat.name", async () => {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    expect(blackPearl).toHaveProperty("name");
  });
  test("your readAll method in BoatRepository selects tile.type", async () => {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    expect(blackPearl).toHaveProperty("type");
  });
  test("your readAll method in BoatRepository selects tile.has_treasure", async () => {
    const blackPearl = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Black Pearl",
    );

    expect(blackPearl).toHaveProperty("has_treasure");
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
