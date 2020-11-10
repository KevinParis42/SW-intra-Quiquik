const express = require('express')
const UserModel = require('../model/userModel')
const userService = require('../services/userService')

exports.checkUser = async (req, res) => {
	if(!req.body.inputEmail)
		console.error('Can\'t retreive data form user')
	const foundUser = await UserModel.findByMail(req.body.inputEmail)
	if (!foundUser) {
		res.send('Bad mail')
		return
	}
	if (userService.checkPassword(req.body.inputPassword, foundUser.password) === true) {
		res.send(userService.createToken(foundUser))
		return
	} else {
		res.send('Bad password')
		return
	}
}