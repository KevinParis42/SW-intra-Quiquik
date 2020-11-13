const express = require('express')
const userModel = require('../model/userModel')
const jwtDecode = require('jwt-decode')

exports.renderUserList = async (req, res) => {
	const userlist = await userModel.getuserList()
	res.render('userList', {userList : userlist, token : req.params.token, tokenInfo : jwtDecode(req.params.token)})
}