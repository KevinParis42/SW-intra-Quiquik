const express = require('express')
const router = express.Router()
const multer = require('multer')
const loginController = require('./controller/loginController')
const userService = require('./services/userService')
const fileService = require('./services/fileService')

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
router.post('/json', fileService.upload.single('myFile'), (req, res) => {
	console.log('on m\'envoie un json')
	res.sendStatus(201)
})

module.exports = router