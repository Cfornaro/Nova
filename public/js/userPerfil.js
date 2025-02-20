import { playerAPI } from '/js/api/playerAPI.js';
import { characterAPI } from '/js/api/characterAPI.js';
import { teamAPI } from '/js/api/teamAPI.js';
import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';

document.addEventListener('DOMContentLoaded', async () => {

  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');

  if (!username) {
    alert('No se especificó un jugador');
    return;
  }

  loadNavbar();
  crearButton('Editar Equipos', '/pages/EditarEquipos.html', username);
  crearButton('Editar Personajes', '/pages/EditarPersonajes.html', username);
  crearButton('Editar Jugador', '/pages/EditarJugador.html', username);
  crearButton('Borrar Jugador', '/', username);

  try {

    const player = await playerAPI.getByUsername(username);
    document.querySelector('.top-lele-container .data').innerText = player.username;
    document.querySelector('.top-leri-container .data').innerText = player.ranking;
    document.querySelector('.below-top-lele-container .data').innerText = player.victories;
    document.querySelector('.below-top-leri-container .data').innerText = player.defeats;
    document.querySelector('.midle-left-container div:nth-child(1) .data').innerText = player.level;
    document.querySelector('.midle-left-container div:nth-child(2) .data').innerText = player.email;

    // obtenenmos todos los personajes del jugador
    const allCharacters = await characterAPI.getAll();
    const playerCharacters = allCharacters.filter(
      (char) => char.playerUsername === username
    );
    // funcion para cargar info de personajes
    cargarPersonajesEnTabla(playerCharacters);

    // obtenemos todos los equipos del jugador
    const allTeams = await teamAPI.getAll();
    const playerTeams = allTeams.filter((team) =>
      playerCharacters.some((char) =>
        [team.character1Id, team.character2Id, team.character3Id, team.character4Id, team.character5Id].includes(char.id)
      )
    );

    if (playerTeams.length > 0) {
      cargarEquipos(playerTeams, allCharacters);
    } else {
      console.log('Este jugador no tiene equipos.');
    }
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
    alert('No se pudo cargar la información del jugador.');
  }
});

// funcion para cargar info de personajes
function cargarPersonajesEnTabla(characters) {
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
    `;
    tbody.appendChild(row);
  });
}

// funcion para cargar equipos
function cargarEquipos(teams, allCharacters) {
  const equipoButtons = document.querySelectorAll('.bottom-left-container .btn');

  equipoButtons.forEach((button, index) => {
    if (teams[index]) {
      const team = teams[index];
      button.style.display = 'block';
      button.innerText = `Equipo ${index + 1} - ${team.name}`;

      // evento click refresca la seccion para mostrar integrantes del equipo
      button.addEventListener('click', () => {
        document.querySelector('.labelTeam').innerText = `Equipo ${index + 1}: ${team.name}`;
        // funcion para mostrar personajes del equipo
        cargarPersonajesDelEquipo(team, allCharacters);
      });
    } else {
      button.style.display = 'none';
    }
  });
}

// funcion para mostrar personajes del equipo
function cargarPersonajesDelEquipo(team, allCharacters) {
  const personajeElements = document.querySelectorAll('.dataPersonaje');
  const teamCharacterIds = [
    team.character1Id,
    team.character2Id,
    team.character3Id,
    team.character4Id,
    team.character5Id,
  ];

  teamCharacterIds.forEach((id, index) => {
    const character = allCharacters.find((char) => char.id === id);
    if (character) {
      personajeElements[index].innerText = `${character.name} (HP: ${character.health}, ATK: ${character.attack}, DEF: ${character.defense}, SPD: ${character.speed})`;
    } else {
      personajeElements[index].innerText = 'Sin personaje';
    }
  });
}
