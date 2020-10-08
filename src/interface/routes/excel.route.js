
const express = require('express');
const excelController = require('../controllers/excel.controller');
const upload = require('../../utils/multer-config.js');

exports.excelRouter = () => {
	
	const router = express.Router();
	
	const controller = excelController();
	
	router.route('/').post(upload.single("file"), controller.getSum);
	
	return router;
};