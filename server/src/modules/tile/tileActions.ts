import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const coordX = req.body.coord_x;
  const coordY = req.body.coord_y;
  try {
    // const tile = await tileRepository.readByCoordinates(coordX, coordY);
    // console.info(tile);

    if (coordX < 0 || coordX > 11 || coordY < 0 || coordY > 5) {
      res.sendStatus(422);
      return;
    }
    if (coordX > 0 && coordX <= 11 && coordY > 0 && coordY <= 5) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
};
