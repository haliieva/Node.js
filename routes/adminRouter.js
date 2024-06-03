const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/adminController')

router.get('/users', passport.authenticate('jwt', { session: false }), controller.getUsers)
router.get('/user/:id', passport.authenticate('jwt', { session: false }), controller.getUser)
router.delete('/user/delete/:id', passport.authenticate('jwt', { session: false }), controller.deleteUser)
router.patch('/user/update/:id', passport.authenticate('jwt', { session: false }), controller.updateUser)

module.exports = router
