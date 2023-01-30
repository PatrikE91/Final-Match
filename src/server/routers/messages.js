const express = require('express');
// const {validateAuthentication} = require('../middleware/authentication')
const router = express.Router();
const {createMessage, getMessages, getMessagesByRoomId} = require('../controllers/messages')

router.post('/:userId/:roomId', createMessage)
router.get('/', getMessages)
router.get('/:roomId', getMessagesByRoomId)

module.exports = router;