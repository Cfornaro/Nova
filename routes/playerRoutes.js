const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

//establecer las rutas propias de jugadores, el metodo y especificar el del modulo controller que funcion empleamos 
router.get('/', playerController.getAllPlayers);
router.get('/search/:username', playerController.searchPlayersByUsername);
router.get('/:username', playerController.getPlayerByUsername);
router.post('/', playerController.createPlayer);
router.put('/:username', playerController.updatePlayerByUsername);
router.delete('/:username', playerController.deletePlayerByUsername); 

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;