
const { InvalidInputError } = require('./error');

//to make sure args are passed in and not undefined
function validateArgs(...args) {
	const valid = args.every(arg => !!arg && arg !== "undefined");
	if (!valid) throw new InvalidInputError('args not valid');
	return true;
}


module.exports = {
	validateArgs
};