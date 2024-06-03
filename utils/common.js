const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config/config')
const bcrypt = require('bcryptjs')

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, jwtKey, { expiresIn: '7d' })
}

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  generateAccessToken,
  hashPassword
}
