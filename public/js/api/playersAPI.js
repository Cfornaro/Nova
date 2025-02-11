const API_URL = '/api/player';



// LLAMADAS A LAS RUTAS VARIANTES DEL API JUGADORES

// si se instancia el objeto y la funcion espera un parametro
// entonces este basicamente espera un parametro , 
//al recibirla la raliza un fech a un ruta formada dinamicamente
// y devulve una respuesta en json

//git commit -m "feat: crear la estructura básica de la página Home"

export const playersAPI = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },

    buscarByName: async (username) => { // NUEVO MÉTODO
        const response = await fetch(`${API_URL}/${username}`);
        if (!response.ok) {
            throw new Error('No se encontró el jugador');
        }
        return response.json();
    },
};
