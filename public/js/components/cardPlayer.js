export function loadJugador(jugador) {
    const card = document.createElement('div');
    card.classList.add('player-card');
    card.style.cursor = 'pointer';

    card.innerHTML = `
        <h3 class="player-name">${jugador.username}</h3>
        <p class="player-ranking">Ranking: ${jugador.ranking}</p>
        <p class="player-level">Nivel: ${jugador.level}</p>
    `;

    card.addEventListener('click', () => {
        window.location.href = `/pages/user.html?username=${jugador.username}`;
    });

    const placeholder = document.getElementById('playercards-placeholder');
    placeholder.appendChild(card);
}
