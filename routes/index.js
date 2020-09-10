const express = require('express')
const router = express.Router()

const passport = require('../passport/passport')
const authMiddleware = require('../utils/authMiddleware')
const authController = require('../controllers/authController')

router.route('/')
    .get(authMiddleware, authController.authStatus)

router.route('/login')
    .post(passport.authenticate('local'), authController.login)

router.route('/logout')
    .get(authController.logout)

router.route('/register')
    .post(authController.register)

module.exports = router