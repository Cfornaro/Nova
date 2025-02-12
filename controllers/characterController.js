const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await prisma.character.findMany();
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener personajes');
    }
};

exports.getCharacterById = async (req, res) => {
    const id = req.params.id;
    try {
        const character = await prisma.character.findUnique({
            where: { id },
        });
        if (character) {
            res.json(character);
        } else {
            res.status(404).send('Personaje no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener personaje');
    }
};

exports.createCharacter = async (req, res) => {
    const { name, health, attack, defense, speed, playerUsername } = req.body;
    try {
        const player = await prisma.player.findUnique({
            where: { username: playerUsername },
        });
        if (!player) {
            return res.status(404).send('Jugador no encontrado');
        }
        const newCharacter = await prisma.character.create({
            data: { name, health, attack, defense, speed, playerUsername },
        });
        res.status(201).json(newCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear personaje');
    }
};

exports.updateCharacterById = async (req, res) => {
    const id = req.params.id;
    const { name, health, attack, defense, speed } = req.body;
    try {
        const updatedCharacter = await prisma.character.update({
            where: { id },
            data: { name, health, attack, defense, speed },
        });
        res.json(updatedCharacter);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar personaje');
    }
};

exports.deleteCharacterById = async (req, res) => {
    const id = req.params.id;
    try {
        const character = await prisma.character.delete({
            where: { id },
        });
        res.json(character);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).send('Personaje no encontrado');
        } else {
            res.status(500).send('Error al eliminar jugador');
        }
    }
};