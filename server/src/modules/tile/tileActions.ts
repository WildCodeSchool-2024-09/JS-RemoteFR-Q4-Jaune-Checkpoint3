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
  try {
    const { coord_x, coord_y } = req.body;
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile.length === 0) {
      res.sendStatus(422);
    } else {
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
