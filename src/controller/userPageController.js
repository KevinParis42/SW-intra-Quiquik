const express = require('express')
const jwtDecode = require('jwt-decode')
const accountService = require('../services/accountService')

exports.uploadAccountJson = (req, res) => {
	const file = req.files.accountJson
	const data = JSON.parse(file.data.toString('utf8'))
	const token = jwtDecode(req.params.token)
	accountService.saveJson(data, token.userId)
	res.sendStatus(201)
}