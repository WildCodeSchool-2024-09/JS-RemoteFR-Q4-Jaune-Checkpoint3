import express from "express";

import boatActions from "./modules/boat/boatActions";
import tileActions from "./modules/tile/tileActions";
import gameActions from "./modules/game/gameActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", tileActions.validate, boatActions.edit);
router.post("/api/games", gameActions.add);
router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
