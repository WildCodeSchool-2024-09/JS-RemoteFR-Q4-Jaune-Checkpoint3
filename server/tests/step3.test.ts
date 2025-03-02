// Import required dependencies
import "dotenv/config";

import supertest from "supertest";

import databaseClient from "../database/client";
import app from "../src/app";
import boatActions from "../src/modules/boat/boatActions";
import boatRepository from "../src/modules/boat/boatRepository";

describe("PUT /api/boats/:id", () => {
  test("BoatRepository has an update method", async () => {
    expect(typeof boatRepository.update).toBe("function");
  });
  test("The update method in BoatRepository takes 1 parameter : boatToUpdate", async () => {
    expect(boatRepository.update).toHaveLength(1);
  });
  test("The update method in BoatRepository performs the SQL request 'update boat set coord_x=???, coord_y=??? where id=???'", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    flyingDutchman.coord_x = (flyingDutchman.coord_x + 2) % 12;
    flyingDutchman.coord_y = (flyingDutchman.coord_y + 1) % 6;

    await boatRepository.update(flyingDutchman);

    const updatedFlyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (updatedFlyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    expect(updatedFlyingDutchman.coord_x).toBe(flyingDutchman.coord_x);
    expect(updatedFlyingDutchman.coord_y).toBe(flyingDutchman.coord_y);
  });
  test("The update method in BoatRepository returns affectedRows", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    flyingDutchman.coord_x = (flyingDutchman.coord_x + 2) % 12;
    flyingDutchman.coord_y = (flyingDutchman.coord_y + 1) % 6;

    const affectedBoats = await boatRepository.update(flyingDutchman);

    expect(affectedBoats).toBe(1);
  });
  test("you declared and exported an edit function from boatActions.ts", async () => {
    expect(typeof boatActions.edit).toBe("function");
  });
  test("your edit function has 3 parameters: req, res and next", async () => {
    expect(boatActions.edit).toHaveLength(3);
  });
  test("you declared the route PUT /api/boats/:id in router.ts, and it is functional", async () => {
    const flyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (flyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    flyingDutchman.coord_x = (flyingDutchman.coord_x + 2) % 12;
    flyingDutchman.coord_y = (flyingDutchman.coord_y + 1) % 6;

    const response = await supertest(app)
      .put(`/api/boats/${flyingDutchman.id}`)
      .send(flyingDutchman);

    expect(response.status).toBe(204);

    const updatedFlyingDutchman = (await boatRepository.readAll()).find(
      (boat) => boat.name === "Flying Dutchman",
    );

    if (updatedFlyingDutchman == null) {
      throw new Error("We lost the Dutchman !");
    }

    expect(updatedFlyingDutchman.coord_x).toBe(flyingDutchman.coord_x);
    expect(updatedFlyingDutchman.coord_y).toBe(flyingDutchman.coord_y);
  });
});

afterAll((done) => {
  databaseClient.end().then(done);
});
