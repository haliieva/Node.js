const { validationResult } = require('express-validator')
// const errorHandler = require('../utils/errorHandler')

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // errorHandler(res, errors)
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

module.exports = validateRequestSchema
