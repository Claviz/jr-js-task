const express = require('express');
const app = express();
const request = require('request');


// Endpoint #1
const companyPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let companyPrice = {};

request.get(companyPriceURL, (error, response, body) => {
    if (error) console.log('Error: ', error);
    console.log('statusCode:', response && response.statusCode);
    companyPrice = JSON.parse(body);
    console.log(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);

});
app.get('/btc', function (request, response) {
    response.send(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
})

app.listen(3000);

