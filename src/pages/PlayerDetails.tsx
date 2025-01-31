import { apiCLient } from "../services/api";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Player, PlayerStats } from "../types";
import '../styles/PlayerDetails.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 🔄 Função para traduzir posições
const translatePosition = (position: string): string => {
    const positionMap: { [key: string]: string } = {
        "Goalkeeper": "Goleiro",
        "Defender": "Defensor",
        "Midfielder": "Meio-campista",
        "Attacker": "Atacante"
    };

    return positionMap[position] || "Desconhecido";
};

const PlayerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [player, setPlayer] = useState<Player | null>(null);
    const [stats, setStats] = useState<PlayerStats[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fromPage = location.state?.from || "/general-info";

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                // 🔍 Primeira chamada para obter a primeira página e o total de páginas
                const firstResponse = await apiCLient.get('players', {
                    params: { team: 1062, season: 2023, page: 1 }
                });

                if (!firstResponse.data.response || firstResponse.data.response.length === 0) {
                    setError("Nenhuma informação encontrada para esse jogador.");
                    return;
                }

                // 🔢 Descobrir quantas páginas existem
                const totalPages = firstResponse.data.paging.total || 1;

                // 🔄 Fazer chamadas para as outras páginas (se existirem)
                const requests = [];
                for (let page = 2; page <= totalPages; page++) {
                    requests.push(apiCLient.get('players', {
                        params: { team: 1062, season: 2023, page }
                    }));
                }

                // 📥 Executar todas as requisições em paralelo
                const responses = await Promise.all(requests);
                const allPlayers = [
                    ...firstResponse.data.response,
                    ...responses.flatMap(res => res.data.response)
                ];

                // Converter id para número e filtrar o jogador correto
                const playerId = Number(id);
                const playerData = allPlayers.find((p: any) => Number(p.player.id) === playerId);

                if (!playerData) {
                    setError("Jogador não encontrado.");
                    return;
                }

                const statistics = playerData.statistics.map((stat: any) => ({
                    league: stat.league.name,
                    season: stat.league.season,
                    position: stat.games.position || "Desconhecido",
                    appearances: stat.games.appearences || 0,
                    goals: stat.goals.total || 0,
                    assists: stat.goals.assists || 0,
                    rating: stat.games.rating ? parseFloat(stat.games.rating) : null
                }));

                // ✅ Pegamos apenas a primeira posição encontrada e traduzimos
                const firstValidPosition = statistics.find((stat: PlayerStats) => stat.position !== "Desconhecido")?.position || "Desconhecido";
                const translatedPosition = translatePosition(firstValidPosition);

                // Estatísticas gerais somadas
                const totalAppearances = statistics.reduce((acc:any, stat:any) => acc + stat.appearances, 0);
                const totalGoals = statistics.reduce((acc:any, stat:any) => acc + stat.goals, 0);
                const totalAssists = statistics.reduce((acc:any, stat:any) => acc + stat.assists, 0);
                const avgRating =
                    statistics.length > 0
                    ? statistics.reduce((acc: number, stat: PlayerStats) => acc + (stat.rating ?? 0), 0) / statistics.length
                    : null;
                const avgRatingFormatted = avgRating !== null ? avgRating.toFixed(2) : "N/A";

                setPlayer({
                    id: playerData.player.id,
                    name: playerData.player.name,
                    age: playerData.player.age,
                    photo: playerData.player.photo,
                    position: translatedPosition,  // ✅ Agora pegamos e traduzimos a posição correta
                    nationality: playerData.player.nationality,
                    height: playerData.player.height,
                    weight: playerData.player.weight,
                    appearances: totalAppearances,
                    goals: totalGoals,
                    assists: totalAssists,
                    avgRating: avgRatingFormatted
                });

                setStats(statistics);
            } catch (err) {
                console.error("Erro ao buscar dados do jogador:", err);
                setError("Erro ao buscar dados do jogador.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerDetails();
    }, [id]);

    // Força a rolagem para o topo
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // Para compatibilidade com navegadores antigos
    }, [id]);
    

    return (
        <div className="page-container">
            <Navbar />
            <div className="player-details-container">
                <button className="back-button" onClick={() => navigate(fromPage)}>⬅ Voltar</button>

                {loading ? <p>Carregando informações...</p> : error ? <p>{error}</p> : player && (
                    <div className="player-info">
                        <img src={player.photo} alt={player.name} className="player-photo" />
                        <h2>{player.name}</h2>
                        <p><strong>Idade:</strong> {player.age} anos</p>
                        <p><strong>Posição:</strong> {player.position}</p>
                        <p><strong>Nacionalidade:</strong> {player.nationality}</p>
                        <p><strong>Altura:</strong> {player.height}</p>
                        <p><strong>Peso:</strong> {player.weight}</p>

                        <h3>📊 Estatísticas Gerais</h3>
                        <p><strong>Partidas:</strong> {player.appearances}</p>
                        <p><strong>Gols:</strong> {player.goals}</p>
                        <p><strong>Assistências:</strong> {player.assists}</p>
                        <p><strong>Nota Média:</strong> {player.avgRating}</p>

                        <h3>📌 Estatísticas por Campeonato</h3>
                        {stats.map((stat, index) => (
                            <div key={index} className="league-stats">
                                <h4>{stat.league} ({stat.season})</h4>
                                <p><strong>Partidas:</strong> {stat.appearances}</p>
                                <p><strong>Gols:</strong> {stat.goals}</p>
                                <p><strong>Assistências:</strong> {stat.assists}</p>
                                <p><strong>Nota Média:</strong> {stat.rating ? stat.rating.toFixed(2) : "N/A"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PlayerDetails;
