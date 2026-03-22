import React from 'react'
const API_URL = import.meta.env.VITE_API_URL;


export const getGenres = async () => {
    try {
        const response = await fetch(`${API_URL}/genres`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Failed to fetch genres. Status: ${response.status}, Message: ${JSON.stringify(data)}`);
        }
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
