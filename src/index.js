const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const router = require('./router')
const DbModel = require('./model/dbModel')

//middleware
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
//template engine
app.set('view engine', 'ejs')

//router
app.use('/', router)

DbModel.dbConnect()

app.listen(process.env.PORT, () => {
	console.log(`app launched on port ${process.env.PORT}`)
})