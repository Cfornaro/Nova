import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';
import { teamAPI } from '/js/api/teamAPI.js';
import { characterAPI } from '/js/api/characterAPI.js';

document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar();

  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  crearButton('Volver', `/pages/user.html?username=${username}`);

  if (!username) {
    alert('No se especificó un jugador');
    return;
  }

  try {
    const [teams, characters] = await Promise.all([
      teamAPI.getAll(),
      characterAPI.getAll(),
    ]);

    const playerCharacters = characters.filter(
      (char) => char.playerUsername === username
    );

    const playerTeams = teams.filter((team) =>
      playerCharacters.some((char) =>
        [team.character1Id, team.character2Id, team.character3Id, team.character4Id, team.character5Id].includes(char.id)
      )
    );

    cargarEquipos(playerTeams, playerCharacters, username);
  } catch (error) {
    console.error('Error al cargar los equipos:', error);
    alert('Problema al cargar los equipos del jugador');
  }
});

//cargamos la tabla de equipos
function cargarEquipos(teams, allCharacters, username) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  teams.forEach((team) => {
    const personajes = [
      allCharacters.find((char) => char.id === team.character1Id)?.name || 'Sin personaje',
      allCharacters.find((char) => char.id === team.character2Id)?.name || 'Sin personaje',
      allCharacters.find((char) => char.id === team.character3Id)?.name || 'Sin personaje',
      allCharacters.find((char) => char.id === team.character4Id)?.name || 'Sin personaje',
      allCharacters.find((char) => char.id === team.character5Id)?.name || 'Sin personaje',
    ];

    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${team.id}</th>
      <td>${team.name}</td>
      <td>${personajes.join(', ')}</td>
      <td><button class="btn btn-secondary btn-editar" data-id="${team.id}">Editar</button></td>
      <td><button class="btn btn-danger btn-borrar" data-id="${team.id}">Borrar</button></td>
    `;
    tbody.appendChild(row);
  });

  agregarEventos(username);
}

function agregarEventos(username) {
  // redirige a EquipoForm.html para EDITAR (con id)
  document.querySelectorAll('.btn-editar').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      window.location.href = `/pages/EquipoForm.html?username=${username}&id=${id}`;
    });
  });

  // eliminamos equipo
  document.querySelectorAll('.btn-borrar').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('data-id');
      if (confirm('¿Seguro que deseas eliminar este equipo?')) {
        try {
          await teamAPI.deleteById(id);
          alert('Equipo eliminado exitosamente');
          location.reload();
        } catch (error) {
          console.error('Error al eliminar el equipo:', error);
          alert('Problema al eliminar el equipo');
        }
      }
    });
  });

  // redirige a EquipoForm.html para CREAR (sin id)
  document.getElementById('btn-crear-equipo').addEventListener('click', () => {
    window.location.href = `/pages/EquipoForm.html?username=${username}`;
  });
}
