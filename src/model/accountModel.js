const mongoose = require('mongoose')

const unitSchema = mongoose.Schema({
	name : String,
	lvl : Number,
	class : Number,
	iconUrl : String
})

const gameAccountSchema = mongoose.Schema({
	userId : {type : mongoose.Types.ObjectId, ref : 'user'},
	wizardName : String,
	wizardLvl : Number,
	units : [unitSchema]
})
const GameAccount = mongoose.model('gameAccount', gameAccountSchema)

exports.getAccount = (id) => {
	return GameAccount.findOne({userId : id})
}

exports.GameAccount = GameAccount
