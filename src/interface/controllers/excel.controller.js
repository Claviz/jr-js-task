
const { validateArgs } = require('../../utils/helpers');
const xlsxRead = require('../../use-cases/readFromXLSX');


module.exports = function() {

	async function getSum(req, res, next) {
		try {
			const { file } = req;
			validateArgs(file.path);
			let result = await xlsxRead(file.path);
			return res.status(result.status).json(result.response);
		} catch(e) {
			next(e);
		}
	}

	return {
		getSum
	};
};

