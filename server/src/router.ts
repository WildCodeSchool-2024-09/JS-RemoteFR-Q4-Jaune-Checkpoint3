import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";

router.get("/api/boats", boatActions.browse);
router.get("/api/boats/:id", boatActions.read);
router.put("/api/boats/:id", boatActions.edit);

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);

import tileActions from "./modules/tile/tileActions";

router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
