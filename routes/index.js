console.log('routes/index.js loaded');
const routes = require('express').Router();

const toolController = require('../controllers/toolController');

routes.use('/tools', require('./toolRoutes'));

module.exports = routes;
