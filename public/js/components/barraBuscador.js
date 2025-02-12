import { playerAPI } from '../api/playerAPI.js';
import { mostrarResultados } from '../index.js';

export function loadBarraBuscador() {
    const buscadorContainer = document.createElement('div');
    buscadorContainer.classList.add('buscador-bar');

    buscadorContainer.innerHTML = `
        <input type="text" id="searchInput"/>
        <button id="buscadorButton">🔍</button>
    `;

    const placeholder = document.getElementById('searchbar-placeholder');
    placeholder.appendChild(buscadorContainer);


    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('buscadorButton');

    searchButton.addEventListener('click', async () => {
        realizarBusqueda();
    });
    
    async function realizarBusqueda() {
        const query = searchInput.value.trim();
        if (query) {
            const resultados = await playerAPI.searchByUsername(query);
            mostrarResultados(resultados);
        } else {
            const allPlayers = await playerAPI.getAll(); 
            mostrarResultados(allPlayers);
        }
    }

}