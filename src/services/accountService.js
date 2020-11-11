const {Mapping} = require('../services/mappingAccountService')
const accountModel = require('../model/accountModel')


exports.saveJson = (data, id) => {
	const mapping = new Mapping
	const account = new accountModel.GameAccount()

	accountModel.GameAccount.findOneAndUpdate({ userId : id}, {userId : id}, {upsert : true, useFindAndModify : false, new : true}, function (err, doc){
		if (err) console.error(err)
		doc.wizardName = data.wizard_info.wizard_name
		doc.wizardLvl = data.wizard_info.wizard_level
		for (let unit of data.unit_list) {
			//save each unit and info in db
			doc.units.push({
				name : mapping.getMonsterName(unit.unit_master_id),
				lvl : unit.unit_level
			})
		}
		doc.save();
	  })
}