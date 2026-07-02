const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/kategoriController");

router.get("/", protect, ctrl.getAll);
router.post("/", protect, adminOnly, ctrl.create);
router.delete("/:id", protect, adminOnly, ctrl.remove);

module.exports = router;