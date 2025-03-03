import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all boats from the database
    const boats = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
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
const edit: RequestHandler = async (req, res, next) => {
  try {
    const tile = {
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };
    const affectedRows = await tileRepository.update(tile);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
export default {
  browse,
  validate,
  edit,
};
