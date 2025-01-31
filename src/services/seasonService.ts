import { apiCLient } from "./api";

export const fetchAvailableSeasons = async (leagueID: number): Promise<number[]> => {
    try {
        const response = await apiCLient.get('/leagues', { params: { id: leagueID } });

        if (!response.data.response.length) {
            throw new Error("Nenhuma temporada encontrada.");
        }

        const seasons = response.data.response[0].seasons;
        const availableSeasons = seasons
            .filter((season: any) => !season.current) // Exclui temporada atual
            .map((season: any) => season.year)
            .sort((a:any, b:any) => b - a); // Ordena do mais recente ao mais antigo
        
        return availableSeasons;
    } catch (err) {
        console.error("Erro ao buscar temporadas disponíveis:", err);
        return [];
    }
};
