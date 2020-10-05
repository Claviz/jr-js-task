const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const {
    getXlsxStream
} = require('xlstream');



app.get('/', function (req, res) {
    res.send('Hello, World!');
});


app.get('/btc', function (req, res) {

    request('https://api.coindesk.com/v1/bpi/currentprice.json', function (error, response, body) {
        body = JSON.parse(body);

        res.send(`Price of BTC is ${body.bpi.EUR.rate_float} EUR`);
    });

});

app.get('/capital', function (req, res) {
    var queryParameter = req.query;

    fs.readFile('./node_modules/country-json/src/country-by-capital-city.json', 'utf8', function (err, data) {

        data = JSON.parse(data);
        for (var item in data) {
            if (data[item].country == queryParameter.country) {
                res.send(`Capital of ${queryParameter.country} is ${data[item].city}`);

            }
        }

    });
});

app.post('/excel-sum', async function (req, res) {
    var sum = 0;
    const stream = await getXlsxStream({
        filePath: 'data.xlsx',
        sheet: 0,

    });
    stream.on('data', function (x) {
        sum += x.raw.obj.A;


    });
    stream.on('end', function () {
        res.send(`SUM is ${sum}`);

    });



});



app.listen(3000);