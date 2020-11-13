const express = require('express')
const jwtDecode = require('jwt-decode')
const accountModel = require('../model/accountModel')
const userModel = require('../model/userModel')

exports.renderViewAccount = async (req, res) => {
	const user = await userModel.findByPseudo(req.params.user)
	const account = await accountModel.getAccount(user._id)
	res.render('viewAccount', {tokenInfo : jwtDecode(req.params.token) ,account})
}