const mongoose = require('mongoose')

const monsterSchema = mongoose.Schema({
	name : String,
	lvl : Number


})

const Monster = mongoose.model('user', monsterSchema)

const gameAccountSchema = mongoose.Schema({
	userid : String,
	wizardName : String,
	wizardLevel : Number,

})
