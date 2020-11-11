const express = require('express')
const userModel = require('../model/userModel')

exports.renderUserList = async (req, res) => {
	const userlist = await userModel.getuserList()
	console.log(userlist)
	res.render('userList', {userList : userlist, token : req.params.token})
}