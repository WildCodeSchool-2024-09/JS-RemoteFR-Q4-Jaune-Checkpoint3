import type { RequestHandler } from "express";

import boatRepository from "../boat/boatRepository";
import tileRepository from "../tile/tileRepository";

const add: RequestHandler = async (req, res, next) => {
  const blackPearl = (await boatRepository.readAll()).find(
    (boat) => boat.name === "Black Pearl",
  );

  if (blackPearl == null) {
    throw new Error("We lost the Pearl !");
  }

  blackPearl.coord_x = 1;
  blackPearl.coord_y = 1;

  const treasureIsland = await tileRepository.getRandomIsland();

  try {
    const affectedBoats = await boatRepository.update(blackPearl);

    if (affectedBoats === 0) {
      res.sendStatus(404);
    } else {
      const affectedTiles = await tileRepository.hideTreasure(treasureIsland);
      if (affectedTiles === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    }
  } catch (err) {
    next(err);
  }
};

export default {
  add,
};
