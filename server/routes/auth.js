const express = require('express');
const { loginPost, signupPost } = require('../controllers/auth');

const router = express.Router();

router.post('/login', loginPost);
router.post('/signup', signupPost);

module.exports = router;
