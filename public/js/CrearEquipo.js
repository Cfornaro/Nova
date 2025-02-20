import { loadNavbar } from '../js/components/navbar.js';
import { crearButton } from '/js/components/button.js';
import { teamAPI } from '/js/api/teamAPI.js';
import { characterAPI } from '/js/api/characterAPI.js';

const urlParams = new URLSearchParams(window.location.search);
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

  try {
    const [allCharacters, allTeams] = await Promise.all([
      characterAPI.getAll(),
      teamAPI.getAll(),
    ]);

    // obtenemos id de personajes que ya están en algún equipo
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

  document.getElementById('form-crear-equipo').addEventListener('submit', crearEquipo);
});

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
  renderizarPersonajesDisponibles();
}

async function crearEquipo(e) {
  e.preventDefault();
  const nuevoEquipo = {
    name: document.getElementById('equipoNombre').value,
    character1Id: personajesAsignados[0]?.id || null,
    character2Id: personajesAsignados[1]?.id || null,
    character3Id: personajesAsignados[2]?.id || null,
    character4Id: personajesAsignados[3]?.id || null,
    character5Id: personajesAsignados[4]?.id || null,
  };

  try {
    await teamAPI.create(nuevoEquipo);
    alert('¡Equipo creado exitosamente!');
    window.location.href = `/pages/EditarEquipos.html?username=${username}`;
  } catch (error) {
    console.error('Error al crear el equipo:', error);
    alert('Problema al crear el equipo');
  }
}
