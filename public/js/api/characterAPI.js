const API_URL = '/api/character';

export const characterAPI = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },
    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('No se encontró el personaje');
        }
        return response.json();
    },
    create: async (characterData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
        });
        if (!response.ok) {
            throw new Error('Error al crear personaje');
        }
        return response.json();
    },
    updateById: async (id, characterData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar personaje');
        }
        return response.json();
    },
    deleteById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar personaje');
        }
        return response.json();
    },
};
