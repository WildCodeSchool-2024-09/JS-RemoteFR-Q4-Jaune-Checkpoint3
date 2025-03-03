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
  if (
    typeof req.body.coord_x !== "number" ||
    typeof req.body.coord_y !== "number" ||
    req.body.coord_x < 0 ||
    req.body.coord_x > 11 ||
    req.body.coord_y < 0 ||
    req.body.coord_y > 5
  ) {
    res.sendStatus(422);
    return;
  }

  try {
    const tiles = await tileRepository.readByCoordinates(
      req.body.coord_x,
      req.body.coord_y,
    );

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
