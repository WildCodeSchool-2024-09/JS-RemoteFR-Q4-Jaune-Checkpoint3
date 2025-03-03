import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Tile = {
  id: number;
  type: string;
  coord_x: number;
  coord_y: number;
  has_treasure: boolean;
};

class TileRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all tiles from the "tile" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from tile order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Tile[];
  }

  async readByCoordinates(coordX: number, coordY: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from tile where coord_y = ? and coord_x = ?",
      [coordX, coordY],
    );

    return rows as Tile[];
  }

  async getRandomIsland() {
    const [rows] = await databaseClient.query<Rows>(
      "select id from tile where type='island' order by rand() limit 1",
    );

    return rows[0] as Tile;
  }

  async hideTreasure(island: Tile) {
    const [result] = await databaseClient.query<Result>(
      `update tile set has_treasure =
        case
          when id = ? then true
          else false
        end`,
      [island.id],
    );

    return result.affectedRows;
  }
}

export default new TileRepository();
