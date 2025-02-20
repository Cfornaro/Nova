import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';
import { teamAPI } from '/js/api/teamAPI.js';
import { characterAPI } from '/js/api/characterAPI.js';

const urlParams = new URLSearchParams(window.location.search);
const teamId = urlParams.get('id');
const username = urlParams.get('username');
let personajesDisponibles = [];
let personajesAsignados = [];

document.addEventListener('DOMContentLoaded', async () => {
  loadNavbar();
  crearButton('Volver a Equipos', `/pages/EditarEquipos.html?username=${username}`);

  if (!username) {
    alert('No se especificó un jugador');
    return;
  }

  if (teamId) {
    document.getElementById('btn-guardar-equipo').textContent = 'Actualizar Equipo';
    await cargarEquipoExistente();
  } else {
    await cargarNuevoEquipo();
  }

  document.getElementById('form-equipo').addEventListener('submit', guardarEquipo);
});

async function cargarEquipoExistente() {
  try {
    const [team, allCharacters, allTeams] = await Promise.all([
      teamAPI.getById(teamId),
      characterAPI.getAll(),
      teamAPI.getAll(),
    ]);

    const personajesAsignadosEnOtrosEquipos = allTeams
      .filter((t) => t.id !== parseInt(teamId))
      .flatMap((t) => [t.character1Id, t.character2Id, t.character3Id, t.character4Id, t.character5Id])
      .filter(Boolean);

    personajesDisponibles = allCharacters.filter(
      (char) =>
        char.playerUsername === username &&
        (!personajesAsignadosEnOtrosEquipos.includes(char.id) ||
          [team.character1Id, team.character2Id, team.character3Id, team.character4Id, team.character5Id].includes(char.id))
    );

    personajesAsignados = [
      personajesDisponibles.find((c) => c.id === team.character1Id),
      personajesDisponibles.find((c) => c.id === team.character2Id),
      personajesDisponibles.find((c) => c.id === team.character3Id),
      personajesDisponibles.find((c) => c.id === team.character4Id),
      personajesDisponibles.find((c) => c.id === team.character5Id),
    ].filter(Boolean);

    document.getElementById('equipoNombre').value = team.name;
    renderizarPersonajes();
    renderizarPersonajesDisponibles();
  } catch (error) {
    console.error('Error al cargar equipo:', error);
    alert('No se pudo cargar el equipo');
  }
}

async function cargarNuevoEquipo() {
  try {
    const [allCharacters, allTeams] = await Promise.all([
      characterAPI.getAll(),
      teamAPI.getAll(),
    ]);

    const personajesAsignadosEnEquipos = allTeams.flatMap((team) => [
      team.character1Id,
      team.character2Id,
      team.character3Id,
      team.character4Id,
      team.character5Id,
    ]).filter(Boolean);

    personajesDisponibles = allCharacters.filter(
      (char) =>
        char.playerUsername === username &&
        !personajesAsignadosEnEquipos.includes(char.id)
    );

    renderizarPersonajesDisponibles();
  } catch (error) {
    console.error('Error al cargar personajes:', error);
    alert('No se pudieron cargar los personajes disponibles');
  }
}

function renderizarPersonajes() {
  const contenedor = document.getElementById('personajes-equipo');
  contenedor.innerHTML = '';

  personajesAsignados.forEach((personaje) => {
    const card = document.createElement('div');
    card.classList.add('card', 'm-2');
    card.style.width = '150px';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${personaje.name}</h5>
        <p>HP: ${personaje.health}, ATK: ${personaje.attack}</p>
        <button class="btn btn-danger btn-sm btn-quitar" data-id="${personaje.id}">Quitar</button>
      </div>
    `;
    contenedor.appendChild(card);
  });

  document.querySelectorAll('.btn-quitar').forEach((btn) =>
    btn.addEventListener('click', (e) => quitarPersonaje(e.target.dataset.id))
  );
}

function renderizarPersonajesDisponibles() {
  const contenedor = document.getElementById('personajes-disponibles');
  contenedor.innerHTML = '';

  personajesDisponibles
    .filter((p) => !personajesAsignados.some((asig) => asig.id === p.id))
    .forEach((personaje) => {
      const card = document.createElement('div');
      card.classList.add('card', 'm-2');
      card.style.width = '150px';
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${personaje.name}</h5>
          <p>HP: ${personaje.health}, ATK: ${personaje.attack}</p>
          <button class="btn btn-success btn-sm btn-asignar" data-id="${personaje.id}">Asignar</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

  document.querySelectorAll('.btn-asignar').forEach((btn) =>
    btn.addEventListener('click', (e) => asignarPersonaje(e.target.dataset.id))
  );
}

function asignarPersonaje(id) {
  if (personajesAsignados.length >= 5) {
    alert('El equipo ya tiene 5 personajes asignados');
    return;
  }
  const personaje = personajesDisponibles.find((p) => p.id == id);
  personajesAsignados.push(personaje);
  renderizarPersonajes();
  renderizarPersonajesDisponibles();
}

function quitarPersonaje(id) {
  personajesAsignados = personajesAsignados.filter((p) => p.id != id);
  renderizarPersonajes();
  renderizarPersonajesDisponibles();
}

async function guardarEquipo(e) {
  e.preventDefault();

  const equipo = {
    name: document.getElementById('equipoNombre').value,
    character1Id: personajesAsignados[0]?.id || null,
    character2Id: personajesAsignados[1]?.id || null,
    character3Id: personajesAsignados[2]?.id || null,
    character4Id: personajesAsignados[3]?.id || null,
    character5Id: personajesAsignados[4]?.id || null,
  };

  try {
    if (teamId) {
      await teamAPI.updateById(teamId, equipo);
      alert('¡Equipo actualizado exitosamente!');
    } else {
      await teamAPI.create(equipo);
      alert('¡Equipo creado exitosamente!');
    }
    window.location.href = `/pages/EditarEquipos.html?username=${username}`;
  } catch (error) {
    console.error('Error al guardar el equipo:', error);
    alert('Problema al guardar el equipo');
  }
}
