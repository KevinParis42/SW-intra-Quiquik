const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	pseudo : String,
	mail : String,
	password : String,
	role : String
})

const User = mongoose.model('user', userSchema)

const findByMail = async (mail) => {
	const userList = await User.find({mail : mail})
	return userList[0]
}

exports.findByMail = findByMail

exports.findByPseudo = async (pseudo) => {
	const userList = await User.find({pseudo : pseudo})
	return userList[0]
}

exports.getuserList = async () => {
	const userList = await User.find()
	return userList
}

exports.createUser = async (mail, pseudo, password, role) => {
	User.create({
		pseudo : pseudo,
		mail : mail,
		password : password,
		role : role
	}, (err, doc) => {
		if (err) throw err
	})
}