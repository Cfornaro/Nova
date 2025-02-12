const API_URL = '/api/team';

export const teamAPI = {
    getAll: async () => {
        const response = await fetch(API_URL);
        return response.json();
    },
    getById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('No se encontró el equipo');
        }
        return response.json();
    },
    create: async (teamData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        });
        if (!response.ok) {
            throw new Error('Error al crear equipo');
        }
        return response.json();
    },
    updateById: async (id, teamData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar equipo');
        }
        return response.json();
    },
    deleteById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar equipo');
        }
        return response.json();
    },
};
