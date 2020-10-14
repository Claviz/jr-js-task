const express = require('express');
const app = express();
const axios = require('axios'); // $ npm i axios --save


// test:
// browser: http://localhost:3000/btc
// WORKS!

// example: Express: Production best practices
// https://expressjs.com/en/advanced/best-practice-performance.html#dont-use-synchronous-functions

// Endpoint #1
const companyPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let companyPrice = {};

app.get('/btc', (req, res, next) => {
    axios.get(companyPriceURL)
    .then( (response) => {
        companyPrice = response.data;
        console.log(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
        return;
    })
    .then( () => {
        res.send(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`)
    })
    .catch(next)
});

app.use( (err, req, res, next) => {
    res.send('Error')
})

app.listen(3000);
