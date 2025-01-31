import { apiCLient } from "../services/api";
import { Player, PlayerGridProps } from "../types";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/PlayerGrid.css';

const PlayerGrid = ({ season }: PlayerGridProps) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Função para navegar para a página do jogador
    const handlePlayerClick = (playerId: number) => {
        navigate(`/player/${playerId}`, { state: { from: location.pathname } });
    };

    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            setError(null);
            try {
                // Primeira chamada para obter a primeira página e o total de páginas
                const firstResponse = await apiCLient.get ('players', {
                    params: { team: 1062, season, page: 1 }
                }); 

                if (!firstResponse.data.response || firstResponse.data.response.length === 0) {
                    setError("Nenhum jogador encontrado para esta temporada.");
                    setPlayers([]);
                    return;
                }

                // Descobrir quantas páginas existem
                const totalPages = firstResponse.data.paging.total || 1;

                // Fazer chamadas para as outras páginas (se existirem)
                const requests = [];
                for (let page = 2; page <= totalPages; page++) {
                    requests.push(apiCLient.get('players', {
                        params: { team: 1062, season, page }
                    }));
                }

                // Executar todas as requisições em paralelo
                const responses = await Promise.all(requests);
                const allPlayers = [
                    ...firstResponse.data.response,
                    ...responses.flatMap(res => res.data.response)
                ];

                // Formatar os jogadores
                const formattedPlayers: Player[] = allPlayers.map((playerData: any) => ({
                    id: playerData.player.id,
                    name: playerData.player.name,
                    age: playerData.player.age || "N/A",
                    photo: playerData.player.photo || "../assets/images/default-player.png",
                    position: playerData.statistics[0]?.games.position || "Desconhecido"
                }));

                setPlayers(formattedPlayers);
            } catch (err) {
                setError("Erro ao buscar jogadores.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (season) {
            fetchPlayers();
        }
    }, [season]); // Apenas chama a API se `season` mudar

    // Agrupar jogadores por posição
    const groupedPlayers: Record<string, Player[]> = {
        "Goleiros": [],
        "Defensores": [],
        "Meio-campistas": [],
        "Atacantes": [],
        "Outros": [],
    };

    players.forEach(player => {
        if (["Goalkeeper"].includes(player.position)) groupedPlayers["Goleiros"].push(player);
        else if (["Defender"].includes(player.position)) groupedPlayers["Defensores"].push(player);
        else if (["Midfielder"].includes(player.position)) groupedPlayers["Meio-campistas"].push(player);
        else if (["Attacker"].includes(player.position)) groupedPlayers["Atacantes"].push(player);
        else groupedPlayers["Outros"].push(player);
    });

    return (
        <div className="player-grid-container">
            {loading && <p className="loading">🔄 Carregando jogadores...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <>
                    {Object.entries(groupedPlayers).map(([position, players]) => (
                        players.length > 0 && (
                            <div key={position} className="player-group">
                                <h3>{position}</h3>
                                <div className="player-grid">
                                    {players.map(player => (
                                        <div 
                                            key={player.id} 
                                            className="player-card"
                                            onClick={() => handlePlayerClick(player.id)} // Adicionando clique para abrir os detalhes
                                            style={{ cursor: "pointer" }} // Indica que é clicável
                                        >
                                            <img 
                                                src={player.photo} 
                                                alt={player.name} 
                                                onError={(e) => (e.currentTarget.src = "../assets/images/default-player.png")} 
                                            />
                                            <p className="player-name">{player.name}</p>
                                            <p className="player-age">{player.age} anos</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </>
            )}
        </div>
    );
};

export default PlayerGrid;
