const express = require("express");
const {
  usersGetAll,
  usersGetById,
  usersGetMe,
  userDelete,
} = require("../controllers/users");
const { requireAuth, checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", usersGetAll);
router.get("/me", checkAuth, usersGetMe);
router.get("/:id", usersGetById);
router.delete("/:id", requireAuth, userDelete);

module.exports = router;
