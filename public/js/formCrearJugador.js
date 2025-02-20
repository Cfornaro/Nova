import { playerAPI } from './api/playerAPI.js';
import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

async function cargarJugador() {
  try {
    const jugador = await playerAPI.getByUsername(username);
    document.getElementById('Usuario').value = jugador.username;
    document.getElementById('Usuario').disabled = true;
    document.getElementById('Rango').value = jugador.ranking;
    document.getElementById('Nivel').value = jugador.level;
    document.getElementById('Email').value = jugador.email;
    document.getElementById('Victorias').value = jugador.victories;
    document.getElementById('Derrotas').value = jugador.defeats;
  } catch (error) {
    console.error('Error al cargar el jugador:', error);
    alert('No se pudo cargar el jugador');
  }
}

async function manejarFormulario(event) {
  event.preventDefault();

  const playerData = {
    username: document.getElementById('Usuario').value.trim(),
    ranking: parseInt(document.getElementById('Rango').value),
    level: parseInt(document.getElementById('Nivel').value),
    email: document.getElementById('Email').value.trim(),
    victories: parseInt(document.getElementById('Victorias').value),
    defeats: parseInt(document.getElementById('Derrotas').value),
  };

  try {
    if (username) {
      await playerAPI.updateByUsername(username, playerData);
      alert('¡Jugador actualizado correctamente!');
      window.location.href = `/pages/user.html?username=${playerData.username}`;
    } else {
      const nuevoJugador = await playerAPI.create(playerData);
      console.log('Jugador creado exitosamente:', nuevoJugador);
      alert('¡Jugador creado con éxito!');
      event.target.reset();
    }
  } catch (error) {
    console.error('Error al guardar el jugador:', error);
    alert('Hubo un problema al guardar el jugador');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar();
  crearButton('Cancelar', '/');

  if (username) {
    await cargarJugador();
  }

  document.querySelector('form').addEventListener('submit', manejarFormulario);
});
