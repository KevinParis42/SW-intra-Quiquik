const {Mapping} = require('../services/mappingAccountService')
const accountModel = require('../model/accountModel')


exports.saveJson = (data, id) => {
	const mapping = new Mapping
	const account = new accountModel.GameAccount()

	account.userId = id
	account.wizardName = data.wizard_info.wizard_name
	account.wizardLvl = data.wizard_info.wizard_level
	for (let unit of data.unit_list) {
		//save each unit and info in db
		account.units.push({
			name : mapping.getMonsterName(unit.unit_master_id),
			lvl : unit.unit_level
		})
	}
	account.save((err, data) => {})
}