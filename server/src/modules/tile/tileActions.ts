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
    const requestedTile = {
      // id: Number(req.params.id),
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };
    const tileToValidate = await tileRepository.readByCoordinates(
      requestedTile.coord_x,
      requestedTile.coord_y,
    );
    if (tileToValidate.length > 0) {
      next();
    }
    if (tileToValidate.length === 0) {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
