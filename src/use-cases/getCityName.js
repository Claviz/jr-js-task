
const cities = './src/dependencies/country-by-capital.json';
const fs = require('fs');

module.exports = async(country) => {

	async function readJsonFile(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', function (err, data) {
				if (err) {
					return reject(err);
				}
				return resolve(data);
			});
		});
	}

	const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

	function findCapital(countriesArray, country) {
		let result = countriesArray.find((e) => {
			return country === e.country;
		});
		if(result === undefined || result === 'undefined') {
			return false;
		}
		return result.city;
	}

	async function execute() {
		if (!country || typeof country !== 'string' || !cities || typeof country !== 'string' ) throw new Error('some args missing or wrong type');
		try {
			let data = await readJsonFile(cities);
			if(data) {
				data = JSON.parse(data);
				country = capitalize(country);
				let city = findCapital(data, country);
				if(!city) {
					return { status: 202, response: "city not found" };
				}
				let text = `Capital of ${country} is ${city}`;
				return { status: 200, response: text };
			}
			
		}
		catch(err) { 
			throw new Error(err);
		}
	}

	return { 
		execute 
	};

};