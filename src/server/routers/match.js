const express = require('express');
const {validateAuthentication} = require('../middleware/authentication')
const router = express.Router();
const {
    createMatch,
    removeMatch,
    getMatch,
    getAllMatches
} = require('../controllers/match');

router.post('/:userId/:userIdToMatch', createMatch)
router.delete('/:userId/unmatch/:idToUnmatch', removeMatch)
router.get('/:loggedUserId/:userId', getMatch)
router.get('/', getAllMatches)

module.exports = router;