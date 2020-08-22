const express = require("express");
const { loginPost, signupPost, logoutDelete } = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginPost);
router.post("/signup", signupPost);
router.delete("/logout", logoutDelete);

module.exports = router;
