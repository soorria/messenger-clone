const express = require("express");
const {
  usersGetAll,
  userGetById,
  userDelete,
} = require("../controllers/users");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", usersGetAll);
router.get("/:id", userGetById);
router.delete("/:id", requireAuth, userDelete);

module.exports = router;
