const express = require("express");
const router = express.Router();

const pengaduanController = require("../controllers/pengaduanController");
const authMiddleware = require("../middleware/authMiddleware");

// Semua route harus login
router.use(authMiddleware);
router.post("/", pengaduanController.createPengaduan);
router.get("/", pengaduanController.getAllPengaduan);
router.get("/:id", pengaduanController.getPengaduanById);
router.put("/:id", pengaduanController.updatePengaduan);
router.delete("/:id", pengaduanController.deletePengaduan);

module.exports = router;