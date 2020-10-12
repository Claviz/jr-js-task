const express = require('express');
const app = express();
const request = require('request');

// test:
// term: node index-endpoint-1-04
// browser: http://localhost:3000/btc

// Endpoint #1
const companyPriceURL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
let companyPrice = {};

const getCompanyPrice = () => {
  request.get(companyPriceURL, (error, response, body) => {
    if (error) console.log('Error: ', error);
    console.log('statusCode:', response && response.statusCode);
    companyPrice = JSON.parse(body);
    console.log(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
  });
};

getCompanyPrice();

app.get('/btc', (req, res, next) => {
  getCompanyPrice();
  next();
}, (req, res) => {
  res.send(`Price of ${companyPrice.chartName} is ${companyPrice.bpi.EUR.rate_float} ${companyPrice.bpi.EUR.code}`);
});

app.listen(3000);

/*
{
  time: {
    updated: 'Oct 8, 2020 13:50:00 UTC',
    updatedISO: '2020-10-08T13:50:00+00:00',
    updateduk: 'Oct 8, 2020 at 14:50 BST'
  },
  disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  chartName: 'Bitcoin',
  bpi: {
    USD: {
      code: 'USD',
      symbol: '&#36;',
      rate: '10,728.3811',
      description: 'United States Dollar',
      rate_float: 10728.3811
    },
    GBP: {
      code: 'GBP',
      symbol: '&pound;',
      rate: '8,160.3285',
      description: 'British Pound Sterling',
      rate_float: 8160.3285
    },
    EUR: {
      code: 'EUR',
      symbol: '&euro;',
      rate: '9,087.6576',
      description: 'Euro',
      rate_float: 9087.6576
    }
  }
}
*/
