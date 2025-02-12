const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/', characterController.createCharacter);
router.put('/:id', characterController.updateCharacterById);
router.delete('/:id', characterController.deleteCharacterById);

module.exports = router;