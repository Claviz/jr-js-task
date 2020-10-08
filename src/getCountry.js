const cities = require("./country-by-capital-city");
const fs = require("fs");

/**
 * Retrieves local file with json data
 * @param {*} req GET request provided by user in URL
 * @param {*} res response sent back to user
 * @param {*} callback callback function to be executed when data is fetched
 */
const getAllCountries = (req, res, callback) => {
  const _PATH = "src/country-by-capital-city.json";

  fs.readFile(_PATH, "utf8", function (err, data) {
    if (err) {
      return callback(err);
    } else {
      const correctCountry = filterCountries(req, JSON.parse(data));
      return callback(err, correctCountry);
    }
  });
};

/**
 *
 * @param {*} req GET request provided by user in URL
 * @param {*} allCountries json object with countries and their capitals
 * @returns capital for provided country, if not found - null
 */
const filterCountries = (req, allCountries) => {
  if (req.query.hasOwnProperty("country")) {
    let country = req.query.country;
    let capitalizedCountry = country.charAt(0).toUpperCase() + country.slice(1);
    let result;

    for (let i = 0; i < allCountries.length; i++) {
      if (allCountries[i].country == capitalizedCountry) {
        result = { country: capitalizedCountry, city: allCountries[i].city };
      }
    }
    return result;
  } else return null;
};

module.exports = getAllCountries;
