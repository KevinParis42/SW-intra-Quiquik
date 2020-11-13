const express = require('express')
const jwtDecode = require('jwt-decode')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const userModel = require('../model/userModel')

exports.createUser = async (req, res) => {
	const infos = req.body
	const find = await userModel.findByMail(infos.newUserMail)
	if (find === undefined)
	{
		const hashedPassword = bcrypt.hashSync(infos.inputPassword, 10)
		const status = userModel.createUser(infos.newUserMail, infos.newuserPseudo, hashedPassword, infos.role)
		console.log(chalk.yellow('New user created'))
		res.send('Created')
	} else {
		console.log(chalk.yellow('Attempted to create new user with a mail already in use'))
		res.send('Not created')
	}
}

exports.renderNewUserPage = (req, res) => {
	const decoded = jwtDecode(req.params.token)
	if (decoded.role === 'admin') {
		res.render('adminNewUser', {tokenInfo : decoded})
		return
	}
	else {
		res.sendStatus(401)
		return
	}
}