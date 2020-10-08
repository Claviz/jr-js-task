
const express = require('express');
const btcController = require('../controllers/btc.controller');

exports.btcRouter = () => {
	
	const router = express.Router();
	
	const LIVE_RATES = 'https://api.coindesk.com/v1/bpi/currentprice.json';
	const currency = 'EUR';
	
	const controller = btcController(LIVE_RATES, currency);

	
	router.route('/').get(controller.getPrice);
	
	return router;
};