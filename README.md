# Junior JS developer task

This repository contains an [express](https://github.com/expressjs/express) server. 

Use `npm start` command to start it - server will listen for requests on port `3000`.

There is already one `GET` endpoint on `http://localhost:3000` which returns `Hello, World!` text.

Your task is to add three new endpoints.

When you are done, you can either send a pull request to this repository with your solution or email your solution to HR manager.

You will then receive a detailed review of your code.

Good luck!

## Endpoint #1
### BTC price

Endpoint must return a text of the current price of BTC in EUR.

* Method: `GET`
* Endpoint: `http://localhost:3000/btc`
* Example of what should be returned: `Price of BTC is 7625.5577 EUR` 
* Suggested modules to use: 
    * [request](https://github.com/request/request)

Price must not be hard-coded - it can be taken from some resource which publishes pricing in real time - for example, [this](https://api.coindesk.com/v1/bpi/currentprice.json).

## Endpoint #2
### Country capital

Endpoint must return a capital of the provided country.

* Method: `GET`
* Endpoint: `http://localhost:3000/capital`
* Query parameters: 
    * `country`
* Example of request and what should be returned: 
    * `GET` `http://localhost:3000/capital?country=latvia` 
    * Returned text: `Capital of Latvia is Riga` 
* Suggested modules to use: 
    * [country-json](https://github.com/samayo/country-json)
    * [fs](https://nodejs.org/api/fs.html)


## Endpoint #3
### Excel SUM

Endpoint must return a SUM of the column `A` inside posted `.xlsx` file.

* Method: `POST`
* Endpoint: `http://localhost:3000/excel-sum`
* Form-data parameters: 
    * `file` - `.xlsx` file 
* Example of request and what should be returned: 
    * `POST` `http://localhost:3000/excel-sum`
    * `form-data` with `file` field containing [this file](https://drive.google.com/open?id=15C9OkvQXToxAUttn-u1YhiPB1Uo--UAJ).
    * Returned text: `SUM is 6216` 
* Suggested modules to use: 
    * [multer](https://github.com/expressjs/multer)
    * [xlstream](https://github.com/Claviz/xlstream)
