const express = require('express');
const app = express();
const request = require('request');
const url = require('url');


// Endpoint #2 Country capital
const countriesAndCapitalsURL = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-capital-city.json';
let countryToCheck = '';
let capitalToFind = '';
let countriesAndCapitals = [];
let countryAndCapital = {};

const capitalize = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

request.get(countriesAndCapitalsURL, (error, response, body) => {
    if (error) console.log('Error: ', error);
    console.log('statusCode:', response && response.statusCode);
    countriesAndCapitals = JSON.parse(body);
});

app.get('/capital?', function (request, response) {
    const queryObject = url.parse(request.url,true).query;
    countryToCheck = queryObject.country.toLowerCase();

    countryAndCapital = countriesAndCapitals.find(
        element => element.country.toLowerCase() === countryToCheck
    ) || { country: countryToCheck, city: 'Not Found' };

    capitalToFind = countryAndCapital.city;
    countryToCheck = capitalize(countryToCheck);
    console.log('Capital of', countryToCheck, 'is', capitalToFind);
    response.send(`Capital of ${countryToCheck} is ${capitalToFind}`);
});

app.listen(3000);

// test: browser: http://localhost:3000/capital?country=latvia

/* JSON:
[
    {
        "country": "Latvia",
        "city": "Riga"
    },
]
*/
