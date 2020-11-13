const mongoose = require('mongoose')

const unitIconUrlSchema = mongoose.Schema({
	name : String,
	iconUrl : String
})

const unitIconUrl = mongoose.model('unitIconUrl', unitIconUrlSchema)

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

exports.getMonsterIconUrl = async (monsterName) => {
	const doc = await unitIconUrl.findOne({name: monsterName})
	return doc.iconUrl
}

exports.updateMonsterIconUrl = (monsterName, url) => {
	unitIconUrl.findOneAndUpdate(
		{name : monsterName},
		{name : monsterName, iconUrl : url},
		{upsert : true, useFindAndModify : false, new : true},
		(err, doc) => {
			if (err) throw err
		}
	)
}

exports.GameAccount = GameAccount
exports.unitIconUrl = unitIconUrl
