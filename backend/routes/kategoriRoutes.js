const express = require("express");
const router = express.Router();

const controller = require("../controllers/kategoriController");
const auth = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Semua route wajib login
router.use(auth);

// Semua user login boleh melihat kategori
router.get("/", controller.getAll);

// Hanya admin boleh tambah kategori
router.post(
  "/",
  roleMiddleware("admin"),
  controller.create
);

// Hanya admin boleh edit kategori
router.put(
  "/:id",
  roleMiddleware("admin"),
  controller.update
);

// Hanya admin boleh hapus kategori
router.delete(
  "/:id",
  roleMiddleware("admin"),
  controller.delete
);

module.exports = router;