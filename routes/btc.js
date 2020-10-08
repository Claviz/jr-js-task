const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function (req, res) {
    request('https://api.coindesk.com/v1/bpi/currentprice.json', function (error, response, body) {
        let data = JSON.parse(body);
        let btcPrice = data.bpi.EUR.rate_float;
        //res.render('../views/btcView', { price: btcPrice });
        res.send("<p>Price of BTC is  "+ btcPrice +" EUR</p>"); // Print the btc price
      });
});

module.exports = router;