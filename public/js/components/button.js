export function crearButton(label, redirectUrl, username = null) {
    const button = document.createElement('button');
    button.classList.add('dynamic-button');
    button.textContent = label;
  
    const placeholder = document.getElementById('button-placeholder');
    placeholder.appendChild(button);
  
    button.addEventListener('click', () => {
      const url = username ? `${redirectUrl}?username=${username}` : redirectUrl;
      window.location.href = url;
    });
  
    return button;
  }
  