const express = require('express')
const router = express.Router()
const multer = require('multer')
const loginController = require('./controller/loginController')
const userService = require('./services/userService')

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

module.exports = router