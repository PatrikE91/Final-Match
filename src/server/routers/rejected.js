const express = require('express');
const router = express.Router();

const {rejectUser, getRejections} = require('../controllers/rejected')

router.post('/:userId/:userToReject', rejectUser)
router.get('', getRejections)
module.exports = router;
