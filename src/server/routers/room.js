const express = require('express');
const router = express.Router();
const {getRoomByUserId, deleteRoomById} = require('../controllers/room')

router.get('/:userId', getRoomByUserId)
router.delete('/:roomId', deleteRoomById)


module.exports = router;
