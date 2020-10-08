
const { validateArgs } = require('../../utils/helpers');
const getBtcPrice = require('../../use-cases/getBtcPrice');

module.exports = function(ratesUrl, currency) {
	
	async function getPrice(req, res, next) {
		try {
			validateArgs(ratesUrl, currency);
			const process = getBtcPrice(ratesUrl, currency);
			const result = await process.execute();
			return res.status(result.status).json(result.response);
		} catch(e) {
			next(e);
		}
	}

	return {
		getPrice
	};
};

