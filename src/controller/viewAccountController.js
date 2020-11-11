const express = require('express')
const accountModel = require('../model/accountModel')
const userModel = require('../model/userModel')

exports.renderViewAccount = async (req, res) => {
	const user = await userModel.findByPseudo(req.params.user)
	const account = await accountModel.getAccount(user._id)
	res.render('viewAccount', {account})
}