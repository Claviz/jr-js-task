const express = require("express");
const request = require("request");
const multer = require("multer");
const { getXlsxStream } = require("xlstream");
const app = express();
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = "file" + "-" + Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

var upload = multer({ storage: storage });
//0
app.get("/", function (req, res) {
  res.send("Hello, World!");
});
//1
app.get("/btc", function (req, res) {
  let url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  request(url, { json: true }, (err, _res, body) => {
    if (!err && _res.statusCode == 200) {
      var price = body.bpi.EUR.rate_float;
      res.send(`Price of BTC is ${price} EUR`);
    } else {
      res.status(404).send("WON'T. Because: NO (404)");
      return console.log(err);
    }
  });
});
//2
app.get("/capital", function (req, res) {
  let jsonStr = "./node_modules/country-json/src/country-by-capital-city.json";
  var reqCountry = req.query.country;
  var raw = JSON.parse(fs.readFileSync(jsonStr));
  var obj = raw.filter((raw) => {
    return (
      raw.country ==
      reqCountry.charAt(0).toUpperCase() + reqCountry.slice(1).toLowerCase()
    );
  });

  res.send(`Capital of ${obj[0].country} is ${obj[0].city}`);
});
//3
app.post("/excel-sum", upload.single("file"), function (req, res) {
  const file = req.file;
  if (!file || file.filename.split(".").pop().toLowerCase() != "xlsx") {
    res
      .status(400)
      .send(
        "Bad. Very, very bad request.\
                    \n(#400 probably file not added to upload or not an .xlsx file)"
      );
  }

  (async () => {
    const stream = await getXlsxStream({
      filePath: `./uploads/${file.filename}`,
      sheet: 0,
      ignoreEmpty: true,
    });
    let su = 0;
    stream.on("data", (x) => {
      su += x.raw.obj.A;
    });
    stream.on("end", () => {
      res.send(`SUM is ${su}`);
    });
  })();
});

app.listen(3000);
