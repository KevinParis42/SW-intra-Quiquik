const express = require('express')
const jwtDecode = require('jwt-decode')
const accountService = require('../services/accountService')
const accountmodel = require('../model/accountModel')

exports.uploadAccountJson = (req, res) => {
	const file = req.files.accountJson
	const data = JSON.parse(file.data.toString('utf8'))
	const token = jwtDecode(req.params.token)
	accountService.saveJson(data, token.userId)
	res.redirect(`/${token.pseudo}/${req.params.token}`)
}

exports.renderUserPage = async (req, res) => {
	//recuperer info db
	const account = await accountmodel.getAccount(jwtDecode(req.params.token).userId)
	res.render('userPage', {pseudo : jwtDecode(req.params.token).pseudo, account})
}