const multer  = require('multer')

const jsonStorage = multer.diskStorage({
	destination : function (req, res, callback) {
		callback(null, 'accountJson')
	},
	filename : function (req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + '.json')
	}
})

exports.upload = multer({storage : jsonStorage})