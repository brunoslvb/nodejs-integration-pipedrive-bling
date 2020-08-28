const mongoose = require('mongoose');

const connection = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE_NAME}`, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(response => {
	console.log("MongoDB connected!");
}).catch(e => {
	console.log(`Erro ao conectar com MongoDB: ${e}`);
});

module.exports = connection;