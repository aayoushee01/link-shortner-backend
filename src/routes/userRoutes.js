const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('./authMiddleware');

router.get('/userdetail', authMiddleware, userController.getUserDeails);
router.get('/urls', authMiddleware, userController.getAllUrls);
router.get('/hourlyerror', authMiddleware, userController.getErrorData);
module.exports = router;