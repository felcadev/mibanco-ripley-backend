require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

dbConnection();

app.use('/api/v1/login', require('./routes/v1/auth'));
app.use('/api/v1/user', require('./routes/v1/user'));
app.use('/api/v1/account', require('./routes/v1/account'));
app.use('/api/v1/transfer', require('./routes/v1/transfer'));




app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Todo ok"
    })
});


app.listen(process.env.PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
})