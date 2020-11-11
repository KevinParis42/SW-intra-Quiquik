const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const loginController = require('./controller/loginController')
const userService = require('./services/userService')
const userPageController = require('./controller/userPageController')
const userListController = require('./controller/userListController')
const viewAccountController = require('./controller/viewAccountController')

router.get('/', (req, res) => {
	res.render('login')
})
router.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
	loginController.checkUser(req, res)
})
router.get('/users/:token', userService.isAuth, (req, res) => {
	userListController.renderUserList(req, res)
})
router.get('/users/:user/:token', userService.isAuth, (req, res) => {
	viewAccountController.renderViewAccount(req, res)
})
router.get('/:user/:token', userService.isAuth, (req, res) => {
	userPageController.renderUserPage(req, res)
})
router.post('/json/:token', userService.isAuth, (req, res) => {
	userPageController.uploadAccountJson(req, res)
})

module.exports = router