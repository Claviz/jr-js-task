
const express = require('express');
const capitalController = require('../controllers/capital.controller');

exports.capitalRouter = () => {
	
	const router = express.Router();
	
	const controller = capitalController();
	
	router.route('/').get(controller.getCity);
	
	return router;
};