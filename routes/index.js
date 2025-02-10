const express = require('express');
const router = express.Router();

const playerRoutes = require('./playerRoutes.js');
const characterRoutes = require('./characterRoutes.js');
const teamRoutes = require('./teamRoutes.js');

router.use('/player', playerRoutes);
router.use('/character', characterRoutes);
router.use('/team', teamRoutes);

module.exports = router;
