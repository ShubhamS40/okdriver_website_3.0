const express = require('express');
const router = express.Router();
const { generateOkDriverResponse } = require('./../../controller/user/userChatController');


router.post('/chat', generateOkDriverResponse);

module.exports = router;

