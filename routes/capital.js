const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
const rawData =  fs.readFileSync('./res/capital.json');
const cities = JSON.parse(rawData);

router.get('/', function (req, res) {
    const urlParams = url.parse(req.url,true).query;
    cities.forEach(element => {
        if (element.country == urlParams.country) {
            res.send("<p> Capital of " + element.country + " is "+ element.city +"</p>");
        }
    });
});

module.exports = router;
