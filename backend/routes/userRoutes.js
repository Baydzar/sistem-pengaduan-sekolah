const express = require("express");
const router = express.Router();

const controller = require(
  "../controllers/userController"
);

const auth = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

router.use(auth);

// hanya admin
router.get(
  "/",
  roleMiddleware("admin"),
  controller.getAll
);

router.put(
  "/:id/role",
  roleMiddleware("admin"),
  controller.updateRole
);

router.delete(
  "/:id",
  roleMiddleware("admin"),
  controller.delete
);

module.exports = router;