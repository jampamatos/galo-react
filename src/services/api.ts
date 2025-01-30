import axios from 'axios';

const API_BASE_URL = `https://${import.meta.env.VITE_API_HOST}`;
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiCLient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'x-rapidapi-host': import.meta.env.VITE_API_HOST,
        'x-rapidapi-key': API_KEY,
    },
});

export const fetchStandings = async (leagueID: number, season: number) => {
    try{
        const response = await apiCLient.get(`/standings`, {
            params: { league: leagueID, season},
        });
        return response.data;
    } catch(error) {
        console.error('Error fetching standings', error);
        throw error;
    }
};