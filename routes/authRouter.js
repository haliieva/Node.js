const express = require('express')
const router = express.Router()
const controller = require('../controllers/authController')
const registerSchema = require('../utils/registerSchema')
const validateRequestSchema = require('../middleware/validateRequestSchema')

router.post('/registration', registerSchema, validateRequestSchema, controller.registration)
router.post('/login', controller.login)

module.exports = router
