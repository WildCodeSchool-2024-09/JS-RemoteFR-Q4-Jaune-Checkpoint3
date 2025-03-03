import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readAll();
    res.json(tile);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {};

export default {
  browse,
  validate,
};
