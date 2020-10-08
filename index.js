
const startServer = require('./src/infrastructure/server');

const start = async() => {
	try {
		await startServer();
	} catch (err) {
		console.log(err);
	}
};

start();
