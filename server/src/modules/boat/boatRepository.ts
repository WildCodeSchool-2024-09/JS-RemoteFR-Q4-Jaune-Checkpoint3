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
      "select * from boat order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boat: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat set coord_x = ? , coord_y = ? WHERE id = ?",
      [boat.coord_x, boat.coord_y, boat.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
