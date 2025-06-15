console.log('routes/index.js loaded');
const routes = require('express').Router();

const toolController = require('../controllers/toolController');

routes.use('/tools', require('./toolRoutes'));
routes.use('/users', require('./userRoutes'));

module.exports = routes;
