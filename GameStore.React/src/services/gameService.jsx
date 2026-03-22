const API_URL = import.meta.env.VITE_API_URL;

export const getGames = async () => {
    try {
        const response = await fetch(`${API_URL}/games`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to fetch games. Status: ${response.status}, Message: ${JSON.stringify(data)}`);
        }
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const getGame = async (id) => {
    const response = await fetch(`${API_URL}/games/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to get game.`);
    }

    return response.json();
}

export const createGame = async (game) => {
    const response = await fetch(`${API_URL}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
    });

    let data;
    try {
        data = await response.json();
    } catch {
        data = await response.text();
    }
    if (!response.ok) {
        throw { errors: data.errors || { general: [data.message || "Unknown error"] } };
    }

    return data;
};



export const editGame = async (id, game) => {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game)
    });


    if (!response.ok) {
        throw { errors: data.errors || { general: [data.message || "Unknown error"] } };
    }

    //return data;

};

export const deleteGame = async (id) => {
    const response = await fetch(`${API_URL}/games/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to delete game. ${response.status}`);
    }
};