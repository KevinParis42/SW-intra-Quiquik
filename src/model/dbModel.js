const mongoose = require('mongoose')


exports.dbConnect = () => {
	mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@quiquik.xf2ef.mongodb.net/Quiquik?retryWrites=true&w=majority`, { useNewUrlParser: true })
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error: cannot connect to my DB'))
	db.once('open', () => {
		console.log('connected to the DB')
	})
	return db
}