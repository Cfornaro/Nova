import { characterAPI } from '/js/api/characterAPI.js';
import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');
const username = urlParams.get('username');

async function cargarPersonaje() {
    try {
        const personaje = await characterAPI.getById(characterId);
        document.getElementById('Nombre').value = personaje.name;
        document.getElementById('vida').value = personaje.health;
        document.getElementById('ataque').value = personaje.attack;
        document.getElementById('defensa').value = personaje.defense;
        document.getElementById('velocidad').value = personaje.speed;
    } catch (error) {
        console.error('Error al cargar personaje:', error);
        alert('No se pudo cargar el personaje');
    }
}

async function guardarCambios(event) {
    event.preventDefault();
    const personajeActualizado = {
        name: document.getElementById('Nombre').value,
        health: parseInt(document.getElementById('vida').value, 10),
        attack: parseInt(document.getElementById('ataque').value, 10),
        defense: parseInt(document.getElementById('defensa').value, 10),
        speed: parseInt(document.getElementById('velocidad').value, 10),
    };

    try {
        await characterAPI.updateById(characterId, personajeActualizado);
        alert('Personaje actualizado correctamente');
        window.location.href = `/pages/EditarPersonajes.html?username=${username}`;
    } catch (error) {
        console.error('Error al actualizar personaje:', error);
        alert('Hubo un problema al actualizar el personaje');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    loadNavbar();
    crearButton('Editar Personajes', `/pages/EditarPersonajes.html?username=${username}`);
    await cargarPersonaje();

    document.querySelector('form').addEventListener('submit', guardarCambios);
});
