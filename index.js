const express = require('express');
const app = express();
const request = require('request');
const btcRoutes = require('./routes/btc');
const capitalRoutes = require('./routes/capital');
const excelRoutes = require('./routes/excel');

app.use('/btc', btcRoutes);
app.use('/capital', capitalRoutes);
app.use('/excel-sum', excelRoutes);

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

app.listen(3000);
