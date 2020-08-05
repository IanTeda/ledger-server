
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
const payees = require("../controllers/payees.controller");

router.post("/", payees.create);
router.get("/", payees.findAll);
router.delete("/", payees.deleteAll); // Lets not enable delete all for now
router.get("/:id", payees.findOne);
router.put("/:id", payees.update);
router.delete("/:id", payees.delete);

export default router;
