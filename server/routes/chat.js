const express = require("express");
const { requireAuth, checkAuth } = require("../middlewares/auth");
const {
  chatGetById,
  chatMessagesGet,
  chatPost,
  chatGetAll,
  chatPatch,
} = require("../controllers/chat");

const router = express.Router();

router.post("/", checkAuth, chatPost);
router.get("/", checkAuth, chatGetAll);
router.get("/:id", requireAuth, chatGetById);
router.patch("/", requireAuth, chatPatch);

router.get("/:id/messages", requireAuth, chatMessagesGet);

module.exports = router;
