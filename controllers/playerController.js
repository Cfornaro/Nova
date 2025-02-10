const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await prisma.player.findMany();
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener jugadores');
    }
};

exports.getPlayerByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const player = await prisma.player.findUnique({
            where: { username },
        });
        if (player) {
            res.json(player);
        } else {
            res.status(404).send('Jugador no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener jugador');
    }
};

exports.createPlayer = async (req, res) => {
    const { username, email, ranking, level, victories, defeats } = req.body;
    try {
        const newPlayer = await prisma.player.create({
            data: { username, email, ranking, level, victories, defeats },
        });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear jugador');
    }
};

exports.updatePlayer = async (req, res) => {
    const username = req.params.username;
    const { email, ranking, level, victories, defeats } = req.body;
    try {
        const updatedPlayer = await prisma.player.update({
            where: { username },
            data: { email, ranking, level, victories, defeats },
        });
        res.json(updatedPlayer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar jugador');
    }
};