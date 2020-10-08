
const express = require("express");
const { handleError } = require('../utils/error');
const { apiRouter } = require('../interface/routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiRouter());
app.use(handleError);

module.exports = app;