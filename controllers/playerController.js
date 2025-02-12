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

exports.searchPlayersByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const players = await prisma.player.findMany({
            where: {
            username: {
                contains: username
            }
            }
        });
        if (players) {
            res.json(players);
        } else {
            res.status(404).send('Jugadores no encontrados');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener jugadores');
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

exports.updatePlayerByUsername = async (req, res) => {
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

exports.deletePlayerByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const player = await prisma.player.delete({
            where: { username },
        });
        res.json(player);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).send('Jugador no encontrado');
        } else {
            res.status(500).send('Error al eliminar jugador');
        }
    }
};