const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Role = require('../models/Role')
const errorHandler = require('../utils/errorHandler')
const { generateAccessToken, hashPassword } = require('../utils/common')

const registration = async (req, res) => {
  try {
    const { email, password } = req.body

    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(409).json({ message: 'This user already exists' })
    }

    const encryptedPassword = hashPassword(password)
    const userRole = await Role.findOne({ value: 'USER' })
    const user = new User({ email, password: encryptedPassword, roles: [userRole.value] })

    await user.save()
    return res.status(201).json({ message: 'User is successfully registered' })
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email: email })

    if (candidate) {
      const isPasswordMatch = bcrypt.compareSync(password, candidate.password)
      if (isPasswordMatch) {
        const token = generateAccessToken(candidate._id)
        res.status(200).json({ token: `Bearer ${token}` })
      } else {
        res.status(401).json({ message: 'Password don\'t match' })
      }
    } else {
      res.status(404).json({ message: 'User does not exist' })
    }
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

module.exports = {
  registration,
  login
}
