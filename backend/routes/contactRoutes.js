const express = require('express');
const router = express.Router();
const { submitContactMessage, getAllContactMessages, markMessageRead } = require('../controllers/ContactController');
const { protect, admin } = require('../middlewares/auth');

router.post('/', submitContactMessage);
router.get('/', protect, admin, getAllContactMessages);
router.put('/:id/read', protect, admin, markMessageRead);

module.exports = router;
