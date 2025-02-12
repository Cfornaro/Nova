export function loadNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    navbar.innerHTML = `
        <div class="navbar-container">
            <div class="navbar-logo"></div> <!-- Círculo amarillo -->
            <div class="navbar-title">NOVA</div> <!-- Título -->
            <button class="navbar-admin-btn">Admin</button> <!-- Botón Admin -->
        </div>
    `;

//-----------------------------------------------------------------------
    // Definimos el marcador donde se va a Insertar el navbar 
    const placeholder = document.getElementById('navbar-placeholder');
    placeholder.appendChild(navbar);
//-----------------------------------------------------------------------
    
    
    // ante el evento click reedirijimos a otra pagina
    document.querySelector('.navbar-admin-btn').addEventListener('click', () => {
        window.location.href = '/pages/admin.html';
    });
}
