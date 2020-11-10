const express = require('express')
const router = express.Router()
const multer = require('multer')
const loginController = require('./controller/loginController')
const userService = require('./services/userService')
const userPageController = require('./controller/userPageController')
const upload = multer()

router.get('/', (req, res) => {
	res.render('login')
})
router.post('/', upload.none(), (req, res) => {
	loginController.checkUser(req, res)
})
router.get('/:user/:token', userService.isAuth, (req, res) => {
	res.render('userPage', {pseudo : req.params.user})
})
router.post('/json/:token', userService.isAuth, (req, res) => {
	userPageController.uploadAccountJson(req, res)
})

module.exports = router