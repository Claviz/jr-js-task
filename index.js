const express = require("express");
const app = express();

const { getXlsxStream } = require("xlstream");

const { upload } = require("./options");
const getBtcPrice = require("./src/btcPrice");
const getCountry = require("./src/getCountry");

app.get("/", function (req, res) {
  res.send("Hello, World!");
});

/**
 * Endpoint #1
 * Sends price of BTC in EUR to endpoint - loclahost:3000/btc
 */
app.get("/btc", function (req, res) {
  getBtcPrice(function (error, result) {
    if (error) {
      return error;
    } else {
      res.send("Price of BTC is: " + result + " EUR");
    }
  });
});

/**
 * Endpoint 2
 * Sends capital city for provided country to endpoint - /capital
 */
app.get("/capital", function (req, res) {
  getCountry(req, res, function (err, result) {
    if (result != null) {
      res.send(`Capital of ${result.country} is: ${result.city}`);
    } else {
      res.send("Provide valid country");
    }
  });
});

/**
 * User GET endpoint that initializes file input form
 */
app.get("/excel-sum", function (req, res) {
  res.send(
    "<form action='/excel-sum' method='post' enctype='multipart/form-data'><input type='file' name='xcl'><input type='submit'></form>"
  );
});

/**
 * User sends POST request with local excel file
 * Imported Excel files are saved in src/  dir
 * Controls POST request, returns SUM of all numbers ir excel file
 */
app.post("/excel-sum", upload.single("xcl"), function (req, res) {
  (async () => {
    let sum = 0;
    const stream = await getXlsxStream({
      filePath: __basedir + "/src/" + req.file.filename,
      sheet: 0,
    });

    stream.on("data", function (x) {
      sum += parseInt(x.formatted.obj.A);
    });

    stream.on("end", function () {
      res.send("SUM is: " + sum);
    });
  })();
});

app.listen(3000);
