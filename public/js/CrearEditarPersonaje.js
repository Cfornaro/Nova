import { characterAPI } from '/js/api/characterAPI.js';
import { loadNavbar } from './components/navbar.js';
import { crearButton } from '/js/components/button.js';

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id'); // Si hay id, estonces funcionalidad de editando
const username = urlParams.get('username');

async function cargarPersonaje() {
  if (!characterId) return; // Verificamos si hay ID sino => no hacemos nada si es creación
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

async function guardarPersonaje(event) {
  event.preventDefault();
  const personaje = {
    name: document.getElementById('Nombre').value,
    health: parseInt(document.getElementById('vida').value, 10),
    attack: parseInt(document.getElementById('ataque').value, 10),
    defense: parseInt(document.getElementById('defensa').value, 10),
    speed: parseInt(document.getElementById('velocidad').value, 10),
    playerUsername: username,
  };

  try {
    if (characterId) {
      await characterAPI.updateById(characterId, personaje);
      alert('Personaje actualizado exitosamente');
    } else {
      await characterAPI.create(personaje);
      alert('¡Personaje creado exitosamente!');
    }
    window.location.href = `/pages/EditarPersonajes.html?username=${username}`;
  } catch (error) {
    console.error('Error al guardar personaje:', error);
    alert('Hubo un problema al guardar el personaje');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
  crearButton('Volver a Personajes', `/pages/EditarPersonajes.html?username=${username}`);
  if (characterId) await cargarPersonaje(); // Si hay id, cargamos datos  :I
  document.getElementById('form-personaje').addEventListener('submit', guardarPersonaje);
});
