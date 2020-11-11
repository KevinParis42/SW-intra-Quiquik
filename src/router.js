const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const loginController = require('./controller/loginController')
const userService = require('./services/userService')
const userPageController = require('./controller/userPageController')

router.get('/', (req, res) => {
	res.render('login')
})
router.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
	loginController.checkUser(req, res)
})
router.get('/:user/:token', userService.isAuth, (req, res) => {
	userPageController.renderUserPage(req, res)
})
router.post('/json/:token', userService.isAuth, (req, res) => {
	userPageController.uploadAccountJson(req, res)
})

module.exports = router