const { check } = require('express-validator')

const registerSchema = [
  check('email', 'Email must contain a valid email address').isEmail(),
  check('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
]

module.exports = registerSchema
