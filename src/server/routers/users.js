const express = require('express');
const {
    register,
    login,
    getUser,
    getUsersById
} = require('../controllers/users');
const multer = require('multer')

const path = require('path')
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './images/')
  },
  filename: (req, file, cb) =>{
    const filename = Date.now() + path.extname(file.originalname)
    cb(null, filename)
  }
})

const upload = multer({storage: storage, limits: { fileSize: 500097152}})

router.post('/register',upload.single('image'), register);
router.post('/login', login);
router.get('/', getUser)
router.get('/:id', getUsersById)

module.exports = router;