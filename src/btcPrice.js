const request = require("request");

/**
 *
 * @param {*} callback a callback function to  be executed when GET requet is successful
 */
const priceRequest = (callback) => {
  _BTC_URL = "https://api.coinbase.com/v2/prices/spot?currency=USD";

  request.get(_BTC_URL, { json: true }, (err, res, body) => {
    if (err) {
      return err;
    } else {
      return callback(err, body.data.amount);
    }
  });
};

module.exports = priceRequest;
