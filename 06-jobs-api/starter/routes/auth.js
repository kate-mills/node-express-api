const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/auth')

//router.post('/register', register)
router.route('/register')
  .post(register)

//router.post('/login', login)same as below
router.route('/login')
  .post(login)

module.exports = router
