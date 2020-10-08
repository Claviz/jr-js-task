
class InvalidInputError extends Error {
	constructor(message) {
		super();
		this.errorName = 'InvalidInputError';
		this.message = message;
		this.stack = `${new Error().stack}`;
	}
}


const handleError = (err, req, res, next) => {
	console.log(err);
	return res.status(500).send({ status: 500, message: 'Service unavailable' });
};

module.exports = {
	handleError,
	InvalidInputError
};