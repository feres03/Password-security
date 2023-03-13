const express = require('express');
const { Register, Login } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', Login)
router.post('/register', Register)


module.exports = router;

