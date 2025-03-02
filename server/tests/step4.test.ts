// Import required dependencies
import "dotenv/config";

import supertest from "supertest";

import type { Request, Response } from "express";

import databaseClient from "../database/client";
import app from "../src/app";
import boatRepository from "../src/modules/boat/boatRepository";
import tileActions from "../src/modules/tile/tileActions";
import tileRepository from "../src/modules/tile/tileRepository";

describe("The tileActions.validate middleware", () => {
  test("TileRepository has a readByCoordinates method", async () => {
    expect(typeof tileRepository.readByCoordinates).toBe("function");
  });
  test("the readByCoordinates method in TileRepository takes 2 parameters 'coordX' and 'coordY'", async () => {
    expect(tileRepository.readByCoordinates).toHaveLength(2);
  });
  test("the readByCoordinates method in TileRepository returns an array with tiles for valid coordinates", async () => {
    const tiles = await tileRepository.readByCoordinates(0, 0);

    expect(tiles).toHaveLength(1);
  });
  test("the readByCoordinates method in TileRepository returns an empty array for bad coordinates", async () => {
    const tiles = await tileRepository.readByCoordinates(666, 666);

    expect(tiles).toHaveLength(0);
  });
  test("tileActions has a validate middleware", async () => {
    expect(typeof tileActions.validate).toBe("function");
  });
  test("the tileActions.validate middleware has 3 parameters: req, res and next", async () => {
    expect(tileActions.validate).toHaveLength(3);
  });
  test("the tileActions.validate middleware calls next() if req.body.coord_x and req.body.coord_y are valid", async () => {
    const req: Partial<Request> = {
      body: {
        coord_x: 0,
        coord_y: 0,
      },
    };

    const res: Partial<Response> = {
      sendStatus: jest.fn(),
    };

    const next = jest.fn();

    await tileActions.validate(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });
  test("the tileActions.validate middleware calls res.sendStatus(422) if req.body.coord_x or req.body.coord_y is not valid", async () => {
    const req: Partial<Request> = {
      body: {
        coord_x: 0,
        coord_y: 666,
      },
    };

    const res: Partial<Response> = {
      sendStatus: jest.fn(),
    };

    const next = jest.fn();

    await tileActions.validate(req as Request, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(422);

    req.body.coord_x = 666;
    req.body.coord_y = 0;

    await tileActions.validate(req as Request, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(422);
  });
  test("you used the tileActions.validate middleware in the route PUT /api/boats/:id in router.ts", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    flyingDutchman.coord_x = 0;
    flyingDutchman.coord_y = 0;

    const response1 = await supertest(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response1.status).toBe(204);

    flyingDutchman.coord_x = 666;
    flyingDutchman.coord_y = 666;

    const response2 = await supertest(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response2.status).toBe(422);
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
