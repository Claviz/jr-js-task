const express = require('express');
const app = express();
const request = require('request');

// test:
// browser: http://localhost:3000/btc

// Endpoint #1
const companyPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let companyPrice = {};

// example: using async/await (2nd version)
// https://stackoverflow.com/questions/60959380/request-wait-till-api-call-is-completed-node-js

const wrapGetCompanyPrice = (companyPriceURL) => {
    request.get(companyPriceURL, (error, response, body) => {
        if (error) console.log('Error: ', error);
        console.log('statusCode:', response && response.statusCode);
        companyPrice = JSON.parse(body);
        console.log(`1: Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
    });
}

wrapGetCompanyPrice(companyPriceURL);

app.get('/btc', async (req, res) => {
    try {
        await wrapGetCompanyPrice(companyPriceURL);
        console.log(`2: Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
    } catch (err) {
        console.log('API Eroor: ', err);
        res.send("error", err);
    }
    console.log(`3: Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);

    res.send(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`)
});

app.listen(3000);

