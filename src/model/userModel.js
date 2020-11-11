const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	pseudo : String,
	mail : String,
	password : String,
	role : String
})

const User = mongoose.model('user', userSchema)

exports.findByMail = async (mail) => {
	const userList = await User.find({mail : mail})
	return userList[0]
}

exports.getuserList = async () => {
	const userList = await User.find()
	return userList
}