const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const pipedrive = require('./routes/pipedrive');
const bling = require('./routes/bling');

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE_NAME}`, {
// 	useCreateIndex: true,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false
// });

app.use(bodyParser.json());

app.use('/pipedrive', pipedrive);
app.use('/bling', bling);

app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});

app.listen(3333, () => {
    console.log('Server listening in http://localhost:3333');
});