const express = require('express')

exports.uploadAccountJson = (req, res) => {
	const file = req.files.accountJson
	const data = JSON.parse(file.data.toString('utf8'))
	console.log(data.wizard_info.wizard_name)
	res.sendStatus(201)
}