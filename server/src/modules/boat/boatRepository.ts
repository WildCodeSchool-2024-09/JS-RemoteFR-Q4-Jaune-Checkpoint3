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
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select b.id, t.type, t.has_treasure, t.id as tuile_id, b.name, b.coord_x, b.coord_y from boat as b join tile as t order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET name = ?, coord_x = ?, coord_y = ? WHERE id = ?",
      [
        boatToUpdate.name,
        boatToUpdate.coord_x,
        boatToUpdate.coord_y,
        boatToUpdate.id,
      ],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
