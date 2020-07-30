
/**
 * END POINT CONVENTION
 * =====================
 * 
 * POST    /              -> Create a new entry
 * GET     /              -> Get all entries
 * GET     /published     -> Get all published entries
 * GET     /:id           -> Get an entry by id
 * PUT     /:id           -> Update entry id
 * DELETE  /:id           -> Delete entry id
 * DELETE  /              -> Delete all entries
 */

import { Router } from 'express';

const router = Router();
const controller = require("../controllers/payees");

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/published", controller.findAllPublished);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
// router.delete("/", controller.deleteAll);

export default router;
