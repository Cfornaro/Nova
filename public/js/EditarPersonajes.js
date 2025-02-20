import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';
import { characterAPI } from '/js/api/characterAPI.js';

document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar();
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  crearButton('Volver', `/pages/user.html?username=${username}`);

  const btnCrear = document.createElement('button');
  btnCrear.textContent = 'Crear Personaje';
  btnCrear.classList.add('btn', 'btn-success', 'mb-3');
  btnCrear.addEventListener('click', () => {
    window.location.href = `/pages/CrearPersonaje.html?username=${username}`;
  });
  document.getElementById('button-placeholder').appendChild(btnCrear);

  if (!username) return alert('No se especificó un jugador');

  try {
    const characters = await characterAPI.getAll();
    const playerCharacters = characters.filter((char) => char.playerUsername === username);
    cargarPersonajes(playerCharacters, username);
  } catch (error) {
    console.error('Error al cargar personajes:', error);
  }
});

function cargarPersonajes(characters, username) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  characters.forEach((char) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${char.id}</th>
      <td>${char.name}</td>
      <td>${char.health}</td>
      <td>${char.attack}</td>
      <td>${char.defense}</td>
      <td>${char.speed}</td>
      <td><button class="btn btn-secondary btn-editar" data-id="${char.id}">Editar</button></td>
      <td><button class="btn btn-danger btn-borrar" data-id="${char.id}">Borrar</button></td>
    `;
    tbody.appendChild(row);
  });

  agregarEventos(username);
}

function agregarEventos(username) {
  document.querySelectorAll('.btn-editar').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.location.href = `/pages/CrearPersonaje.html?username=${username}&id=${id}`;
    })
  );

  document.querySelectorAll('.btn-borrar').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('¿Seguro que deseas eliminar este personaje?')) {
        try {
          await characterAPI.deleteById(id);
          alert('Personaje eliminado');
          location.reload();
        } catch (error) {
          console.error('Error al eliminar personaje:', error);
          alert('Problema al eliminar personaje');
        }
      }
    })
  );
}
