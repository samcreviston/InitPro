const express = require('express');
const router = express.Router();

const toolRoutes = require('./toolRoutes');

router.use('/tools', toolRoutes);

module.exports = router;
