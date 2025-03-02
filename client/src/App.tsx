import { useEffect, useState } from "react";

import "./App.css";

import NavBar from "./components/NavBar";

import boatImage from "./assets/boat.png";
import api from "./services/api";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  type: string;
  has_treasure: boolean;
};

type Tile = {
  id: number;
  type: string;
  coord_x: number;
  coord_y: number;
  has_treasure: boolean;
};

function App() {
  const [boats, setBoats] = useState([] as Boat[]);
  const [tiles, setTiles] = useState([] as Tile[]);

  const reloadBoats = () =>
    api.get("/api/boats?name=Black Pearl").then((response) => {
      const upToDateBoats = response.data as Boat[];

      setBoats(upToDateBoats);

      const blackPearl = upToDateBoats.find(
        (boat) => boat.name === "Black Pearl",
      );

      if (blackPearl?.has_treasure) {
        alert("Not All Treasure Is Silver And Gold, Mate.");
      }
    });

  useEffect(() => {
    api.get("/api/tiles").then((response) => {
      setTiles(response.data);
    });
    api.get("/api/boats?name=Black Pearl").then((response) => {
      setBoats(response.data);
    });
  }, []);

  const blackPearl = boats.find((boat) => boat.name === "Black Pearl");

  const moveBoat = (id: number, coord_x: number, coord_y: number) => {
    api
      .put(`/api/boats/${id}`, { coord_x, coord_y })
      .then((response) => {
        if (response.status === 204) {
          reloadBoats();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <header>
        <NavBar onStart={reloadBoats} />
      </header>
      <main className="App">
        <div className="container-fluid">
          <h1>Map</h1>
          <div className="row">
            <div className="col-md-10">
              <div className="map">
                {tiles.length === 0 ? (
                  <div className="alert alert-warning">
                    You are still on the firm ground, you have to fill the
                    database first, and declare the /tiles backend route !
                  </div>
                ) : (
                  <div className="row">
                    {tiles.map((tile) => {
                      const boatOnTile = boats.find(
                        (boat) =>
                          boat.coord_x === tile.coord_x &&
                          boat.coord_y === tile.coord_y,
                      );
                      return (
                        <div
                          className={`tile col-1 ${tile.type}`}
                          key={tile.id}
                        >
                          <div className="tile-data">{tile.type}</div>
                          <div className="tile-data coords">
                            {tile.coord_x},{tile.coord_y}
                          </div>
                          {boatOnTile && (
                            <img
                              className="boat img-fluid"
                              src={boatImage}
                              alt={boatOnTile.name}
                              title={boatOnTile.name}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-2">
              <div className="infos">
                <h2>Information</h2>
                {blackPearl && (
                  <dl>
                    <dt>x</dt>
                    <dl>{blackPearl.coord_x}</dl>
                    <dt>y</dt>
                    <dl>{blackPearl.coord_y}</dl>
                    <dt>type</dt>
                    <dl>{blackPearl.type}</dl>
                    <dt>has treasure?</dt>
                    <dl>{blackPearl.has_treasure}</dl>
                  </dl>
                )}
              </div>
              <div className="navigation">
                <h2>Navigation</h2>
                {blackPearl && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        moveBoat(
                          blackPearl.id,
                          blackPearl.coord_x,
                          blackPearl.coord_y - 1,
                        );
                      }}
                      className="north"
                    >
                      N
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        moveBoat(
                          blackPearl.id,
                          blackPearl.coord_x,
                          blackPearl.coord_y + 1,
                        );
                      }}
                      className="south"
                    >
                      S
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        moveBoat(
                          blackPearl.id,
                          blackPearl.coord_x + 1,
                          blackPearl.coord_y,
                        );
                      }}
                      className="east"
                    >
                      E
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        moveBoat(
                          blackPearl.id,
                          blackPearl.coord_x - 1,
                          blackPearl.coord_y,
                        );
                      }}
                      className="west"
                    >
                      W
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
