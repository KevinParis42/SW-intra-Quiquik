const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.checkPassword = (inputPassword, dbPassword) => {
	return bcrypt.compareSync(inputPassword, dbPassword)
}

exports.createToken = (user) => {
	return jwt.sign({
		pseudo : user.pseudo,
		mail : user.mail,
		role : user.role,
	}, process.env.JWT_SECRET, {expiresIn : '1h'})
}

exports.isAuth = (req, res, next) => {
	try {
		console.log('User verified')
		jwt.verify(req.params.token, process.env.JWT_SECRET)
		next()
	}
	catch (error) {
		req.params.token === 'Unauthorized' ? console.log ('no token') : console.error(error)
		return res.redirect('/')
	}
}