const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express   = require('express');
const app       = express();
const bodyParser = require('body-parser');

const pipedrive = require('./routes/pipedrive');
const bling     = require('./routes/bling');
const integration = require('./routes/integration');
const order     = require('./routes/order');

app.use(bodyParser.json());

app.use('/pipedrive', pipedrive);
app.use('/bling', bling);
app.use('/integration', integration);
app.use('/orders', order);

app.get('/', (req, res) => {
    res.json({ 
        data: {
            nome: "Bruno da Silva Barros",
            email: "brunosilva2365@gmail.com",
            telefone: "(11) 95465-7495"
        }
    });
});

app.listen(3333, () => {
    console.log('Server listening in http://localhost:3333');
});