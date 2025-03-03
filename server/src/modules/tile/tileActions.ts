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

const edit: RequestHandler = async (req, res, next) => {
  try {
    const tiles = {
      id: Number(req.params.id),
      type: req.body.type,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
      has_treasure: req.body.has_treasure,
    };
    const affectedRows = await tileRepository.update(tiles);
    if (affectedRows === 0) {
      res.sendStatus(422);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newTile = {
      type: req.body.type,
      has_treasure: req.body.has_treasure,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };
    const insertId = await tileRepository.create(newTile);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
  add,
  validate,
};
