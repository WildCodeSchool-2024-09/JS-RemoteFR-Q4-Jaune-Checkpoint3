import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    const [rows] = await databaseClient.query<Rows>(
      "select boat.id, boat.coord_x, boat.coord_y, boat.name, tile.type, tile.has_treasure, tile.id AS tile_id FROM boat JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y",
    );

    return rows as Boat[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>("select * from boat");
    console.info("Query Results", rows);
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
