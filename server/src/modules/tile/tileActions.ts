import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tile = await tileRepository.readAll();
    res.json(tile);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;
    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (coord_x >= 0 && coord_x <= 11 && coord_y >= 0 && coord_y <= 5) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
};
