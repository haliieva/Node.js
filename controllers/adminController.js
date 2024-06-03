const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User does not exist' })
    }
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) {
      res.status(201).json({ message: 'User was deleted' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: 'User data to update can not be empty!' })
    }
    const userUpdatedData = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    if (userUpdatedData) {
      res.status(201).json({ message: 'User was updated successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (e) {
    console.log(e)
    errorHandler(res, e)
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser
}
