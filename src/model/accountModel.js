const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
	name : String,
	lvl : Number
})

const gameAccountSchema = mongoose.Schema({
	userId : {type : mongoose.Types.ObjectId, ref : 'user'},
	wizardName : String,
	wizardLvl : Number,
	units : [unitSchema]
})

exports.GameAccount = mongoose.model('gameAccount', gameAccountSchema)
