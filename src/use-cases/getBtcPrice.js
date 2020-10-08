
const rp = require('request-promise');

module.exports = (feed_url, currency) => {

	function makeRequest(url) {
		return rp(url)
			.then((response) => {
				if (Object.keys(response).length === 0) {
					throw new Error("Bad response from server");
				}
				return response;
			})
			.then(data => JSON.parse(data));
	}

	
	
	async function execute() {
		if (!feed_url || typeof feed_url !== 'string' || !currency || typeof currency !== 'string'
		) throw new Error('some args missing or wrong type');
		
		try {
			let data = await makeRequest(feed_url);
			if(data && data.bpi && data.bpi.EUR && data.bpi.EUR.rate_float) {
				const rateEUR = data.bpi.EUR.rate_float;
				let text = `Price of BTC is ${rateEUR} ${currency}`;
				return { status: 200, response: text };
			}
			return { status: 502, response: "data not available" };
		}
		catch(err) { 
			throw new Error(err);
		}
	}

	return {
		execute
	};

};