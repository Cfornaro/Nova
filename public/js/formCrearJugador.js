import { playerAPI } from './api/playerAPI.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // obtencion de valores del form
    const playerData = {
        username: document.getElementById('Usuario').value.trim(),
        ranking: parseInt(document.getElementById('Rango').value),
        level: parseInt(document.getElementById('Nivel').value),
        email: document.getElementById('Email').value.trim(),
        victories: parseInt(document.getElementById('Victorias').value),
        defeats: parseInt(document.getElementById('Derrotas').value),
      };
      
    try {
      // llamamoss a la api
      const nuevoJugador = await playerAPI.create(playerData);
      console.log('Jugador creado exitosamente:', nuevoJugador);
      alert('¡Jugador creado con éxito!');
      form.reset();
    } catch (error) {
      console.error('Error al crear el jugador:', error);
    }
  });
});
