const {Mapping} = require('../services/mappingAccountService')
const accountModel = require('../model/accountModel')
const got = require('got')


const unitIconScrapping = async (unitName) => {
	var options = {
		'method': 'GET',
		'url': 'https://summonerswar.fandom.com/wiki/Monster_Collection',
		'headers': {
			'authority': 'summonerswar.fandom.com',
			'cache-control': 'max-age=0',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'none',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'sec-fetch-dest': 'document',
			'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'cookie': 'pv_number=1; wikia_beacon_id=3Xgy6vOHG1; Geo={%22region%22:%22NOR%22%2C%22country%22:%22FR%22%2C%22continent%22:%22EU%22}; WikiaSessionSource=; WikiaLifetimeSource=; tracking-opt-in-status=accepted; tracking-opt-in-version=4; euconsent-v2=CO8vQSjO8vQSjCNAEAENA_CsAP_AAH_AAAAAGgJB7TrFYSFD-e55dJsgMQxXRsSMAyQiAASBAmABQAKQACQCgkAZhASABAgCIAAAIAJBAAAECAAACQAAQAAAAAEAAAAABQAIAAMAgAIQAAAIAAAAAIEAAAAIgAAAEAABkwgIAIIACAQAhAycAEQVIoCAISxgJJoUgBAAACMABgAQAQAAQIEwAAAACAASAQkgAIAAAAAEAAAAABADIIAAAAAEAAAAAKAAAAAAAAAAAACABAABgAAAAAAAAAAAAABAAAAAAAAAAAAAAMCAAAAAAAQAAAAA.YAAAAAAAAAAA; wikia_session_id=X8D8lDHNUg; tracking_session_id=c8a34a3c-4506-4cf4-b0a5-7ffd33095199; pv_number_global=1; c8a34a3c-4506-4cf4-b0a5-7ffd33095199_basset={%22icServicesSpecialSearchScopeDropdownInGlobalNav-0%22:{%22name%22:%22icServicesSpecialSearchScopeDropdownInGlobalNav-0%22%2C%22result%22:false%2C%22withCookie%22:true%2C%22group%22:%22A%22%2C%22limit%22:100}%2C%22icServicesSpecialSearchScopeDropdownInGlobalNav-1%22:{%22name%22:%22icServicesSpecialSearchScopeDropdownInGlobalNav-1%22%2C%22result%22:false%2C%22withCookie%22:true%2C%22group%22:%22A%22%2C%22limit%22:100}%2C%22icServicesSpecialSearch-0%22:{%22name%22:%22icServicesSpecialSearch-0%22%2C%22result%22:false%2C%22withCookie%22:true%2C%22group%22:%22A%22%2C%22limit%22:100}%2C%22icServicesSpecialSearchTooltipForScopeChange-0%22:{%22name%22:%22icServicesSpecialSearchTooltipForScopeChange-0%22%2C%22result%22:false%2C%22withCookie%22:true%2C%22group%22:%22A%22%2C%22limit%22:100}}'
		}
	}
	unitName = unitName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
	const response = await got(options)
	const html = response.body.replace(/[\t\n\r]/g, '')
	const unitRegex = new RegExp(`<img alt="${unitName} Icon.png.*?<\/a>`)
	let unitIconUrl = html.match(unitRegex)
	if (unitIconUrl != null) {
		unitIconUrl = unitIconUrl[0].replace(/^.*data-src="/g, '')
		unitIconUrl = unitIconUrl.replace(/\/revision\/.+/g, '')
		return unitIconUrl
	}
	return null
}

exports.saveJson = async (data, id) => {
	const mapping = new Mapping
	//const account = new accountModel.GameAccount()

	accountModel.GameAccount.findOneAndUpdate({ userId : id}, {userId : id}, {upsert : true, useFindAndModify : false, new : true}, async function (err, doc){
		if (err) console.error(err)
		doc.wizardName = data.wizard_info.wizard_name
		doc.wizardLvl = data.wizard_info.wizard_level
		console.log('scrapping en cours')
		for (let unit of data.unit_list) {
			//save each unit and info in db
			let name = mapping.getMonsterName(unit.unit_master_id)
			let url = await unitIconScrapping(name)
			doc.units.push({
				name : name,
				lvl : unit.unit_level,
				class : unit.class,
				iconUrl : url
			})
		}
		doc.save();
		console.log('scrapping terminé')
	  })
}