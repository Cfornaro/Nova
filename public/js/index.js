import { playersAPI } from '/js/api/playersAPI.js';
import { loadJugador } from '/js/components/cardPlayer.js'; 

export async function cargarJugadores() {
    try {
        const players = await playersAPI.getAll();  
        players.forEach(loadJugador);              
    } catch (error) {
        console.error('Error al cargar los jugadores:', error);
    }
}

export function mostrarResultados(jugadores) {
    const placeholder = document.getElementById('playercards-placeholder');
    placeholder.innerHTML = ''

    if (jugadores.length === 0) {
        placeholder.innerHTML = '<p>No se encontraron jugadores.</p>';
        return;
    }

    jugadores.forEach(loadJugador);
}