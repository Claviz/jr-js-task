const express = require("express");
const app = express();
const request = require("request");
const countries = require("./node_modules/country-json/src/country-by-capital-city.json");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const { getXlsxStream } = require("xlstream");

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/btc", async (req, res) => {
    await request(
        "https://api.coindesk.com/v1/bpi/currentprice.json",
        { json: true },
        (err, response, body) => {
            res.send(`Current price of BTC is ${body.bpi.EUR.rate_float} EUR`);
        }
    );
});

app.get("/capital", (req, res) => {
    let country = req.query.country;
    country = country.charAt(0).toUpperCase() + country.slice(1);

    let i = 0;

    while (countries[i].country != country && i < countries.length) {
        i++;
    }

    const capital = countries[i].city;
    res.send(`The capital of ${country} is ${capital}`);
});

app.post("/excel-sum", upload.any(), async (req, res) => {
    const file = req.files[0];
    let sum = 0;

    await (async () => {
        const stream = await getXlsxStream({
            filePath: `./${file.path}`,
            sheet: 0,
        });

        sum = await new Promise((resolve, reject) => {
            let sum1 = 0;
            stream.on("data", (x) => {
                sum1 += x.raw.obj.A;
            });
            stream.on("end", () => resolve(sum1));
        });

    })();
    res.send(`SUM is ${sum}`);
});


app.listen(3000);
