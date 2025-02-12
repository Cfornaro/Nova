import { playersAPI } from '../api/playersAPI.js';
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
            try {
                const resultados = await playersAPI.buscarByName(query);
                mostrarResultados(resultados);
            } catch (error) {
                console.error('Error al buscar jugador:', error);
                mostrarResultados([]);
            }
        } else {
            const allPlayers = await playersAPI.getAll(); 
            mostrarResultados(allPlayers);
        }
    }

}