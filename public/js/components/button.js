export function crearButton(label, redirectUrl) {
    const button = document.createElement('button');
    button.classList.add('dynamic-button');
    button.textContent = label;

    const placeholder = document.getElementById('button-placeholder');
    placeholder.appendChild(button);

    button.addEventListener('click', () => {
        window.location.href = redirectUrl;
    });

    return button;
}
