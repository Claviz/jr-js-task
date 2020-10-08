
const express = require('express');
const { btcRouter } = require('./btc.route');
const { capitalRouter } = require('./capital.route');
const { excelRouter } = require('./excel.route');

//registering routes

const apiRouter = () => {
	const routes = express.Router();
	routes.use('/btc', btcRouter());
	routes.use('/capital', capitalRouter());
	routes.use('/excel-sum', excelRouter());
	return routes;
};


module.exports = { apiRouter };

