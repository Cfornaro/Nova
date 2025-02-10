const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

//establecer las rutas propias de personajes, el metodo y especificar el del modulo controller que funcion empleamos 
router.get('/personajes', moviesController.getAllMovies);
router.get('/personajes/:id', moviesController.getMovieById);
router.post('/personajes', moviesController.addMovie);

// Otras rutas para POST, PUT, DELETE si queremos implementar

module.exports = router;