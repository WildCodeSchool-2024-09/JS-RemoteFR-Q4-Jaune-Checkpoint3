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
	const { coord_x, coord_y } = req.body;

	try {
		const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

		if (tiles.length > 0) {
			next();
		} else {
			res.status(422).json({ error: "Tile not found" });
		}
	} catch (error) {
		res.sendStatus(500);
	}
};

export default {
	browse,
	validate,
};
