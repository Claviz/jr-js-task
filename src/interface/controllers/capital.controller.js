
const { validateArgs } = require('../../utils/helpers');
const getCityName = require('../../use-cases/getCityName');

module.exports = function() {

	async function getCity(req, res, next) {
		try {
			const { country } = req.query;
			validateArgs(country);
			const process = await getCityName(country);
			const result = await process.execute();
			return res.status(result.status).json(result.response);
		} catch(e) {
			next(e);
		}
	}

	return {
		getCity
	};
};

