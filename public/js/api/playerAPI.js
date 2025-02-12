const API_URL = '/api/player';



// LLAMADAS A LAS RUTAS VARIANTES DEL API JUGADORES

// si se instancia el objeto y la funcion espera un parametro
// entonces este basicamente espera un parametro , 
//al recibirla la raliza un fech a un ruta formada dinamicamente
// y devulve una respuesta en json

//git commit -m "feat: crear la estructura básica de la página Home"

export const playerAPI = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },
    getByUsername: async (username) => {
        const response = await fetch(`${API_URL}/${username}`);
        if (!response.ok) {
            throw new Error('No se encontró el jugador');
        }
        return response.json();
    },
    searchByUsername: async (username) => {
        const response = await fetch(`${API_URL}/search/${username}`);
        return response.json();
    },
    create: async (playerData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        });
        if (!response.ok) {
            throw new Error('Error al crear jugador');
        }
        return response.json();
    },
    updateByUsername: async (username, playerData) => {
        const response = await fetch(`${API_URL}/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar jugador');
        }
        return response.json();
    },
    deleteByUsername: async (username) => {
        const response = await fetch(`${API_URL}/${username}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar jugador');
        }
        return response.json();
    },
};
