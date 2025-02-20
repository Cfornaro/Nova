const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await prisma.team.findMany();
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener equipos');
    }
};

exports.getTeamById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const team = await prisma.team.findUnique({
            where: { id },
        });
        if (team) {
            res.json(team);
        } else {
            res.status(404).send('Equipo no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener equipo');
    }
};

exports.createTeam = async (req, res) => {
    const { name, character1Id, character2Id, character3Id, character4Id, character5Id } = req.body;
    try {
        const newTeam = await prisma.team.create({
            data: { name, name, character1Id, character2Id, character3Id, character4Id, character5Id },
        });
        res.status(201).json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear equipo');
    }
};

exports.updateTeamById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, character1Id, character2Id, character3Id, character4Id, character5Id } = req.body;

    try {
        const updatedTeam = await prisma.team.update({
            where: { id },
            data: { name, character1Id, character2Id, character3Id, character4Id, character5Id },
        });
        res.json(updatedTeam);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar equipo');
    }
};


exports.deleteTeamById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const team = await prisma.team.delete({
            where: { id },
        });
        res.json(team);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2025') {
            res.status(404).send('Equipo no encontrado');
        } else {
            res.status(500).send('Error al eliminar equipo');
        }
    }
};