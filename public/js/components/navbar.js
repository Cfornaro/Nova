export function loadNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    navbar.innerHTML = `
        <div class="navbar-container">
            <div class="navbar-logo">
                <img src="../Images/LogoAlternative.png" alt="Logo">
                </div> 
            <div class="navbar-title">NOVA</div> <!-- Título -->
            <div class="navbar-admin-btn">Admin</> <!-- Señalización de cuenta de Admin -->
        </div>
    `;

//-----------------------------------------------------------------------
    // Definimos el marcador donde se va a Insertar el navbar 
    const placeholder = document.getElementById('navbar-placeholder');
    placeholder.appendChild(navbar);
//-----------------------------------------------------------------------
    
    // ante el evento click reedirijimos a otra pagina
    document.querySelector('.navbar-title').addEventListener('click', () => {
        window.location.href = '/';
    });

}
