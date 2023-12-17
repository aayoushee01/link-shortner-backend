const express = require('express');
const router = express.Router();
const shortLinkController = require('../controllers/shortLinkController');
const authMiddleware = require('./authMiddleware');


router.post('/shorten', authMiddleware,shortLinkController.createShortLink);


module.exports = router;
