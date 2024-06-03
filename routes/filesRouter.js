const express = require('express')
const router = express.Router()
const controller = require('../controllers/filesController')
const upload = require('../config/filesStorage')

router.post('/upload', upload.single('file'), controller.uploadFile)

module.exports = router
