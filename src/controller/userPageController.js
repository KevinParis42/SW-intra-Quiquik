const express = require('express')
const {Mapping} = require('../services/mappingAccountService')

exports.uploadAccountJson = (req, res) => {
	const mapping = new Mapping
	const file = req.files.accountJson
	const data = JSON.parse(file.data.toString('utf8'))
	for (let unit of data.unit_list) {
		console.log(unit.unit_master_id + ': ' + mapping.getMonsterName(unit.unit_master_id))
	}
	console.log(mapping.getMonsterName(data.unit_list[0].unit_master_id))
	res.sendStatus(201)
}