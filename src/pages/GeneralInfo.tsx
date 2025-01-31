import { apiCLient } from "../services/api";
import { fetchAvailableSeasons } from "../services/seasonService";
import { Team } from "../types";
import { useEffect, useState } from "react";
import '../styles/GeneralInfo.css';
import Navbar from "../components/Navbar";
import PlayerGrid from "../components/PlayerGrid";
import Footer from "../components/Footer";

const GeneralInfo = () => {
    const [team, setTeam] = useState<Team | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [season, setSeason] = useState<number>(2023);
    const [availableSeasons, setAvailableSeasons] = useState<number[]>([]);

    const fetchTeamInfo = async () => {
        try {
            setLoading(true);
            const response = await apiCLient.get('/teams', {
                params: { id: 1062 },
            });

            if (response.data.response && response.data.response.length > 0) {
                const teamData = response.data.response[0];
                setTeam({
                    id: teamData.team.id,
                    name: teamData.team.name,
                    logo: teamData.team.logo,
                    abbreviation: "CAM",
                    country: teamData.team.country,
                    founded: teamData.team.founded,
                    venue: {
                        name: teamData.venue.name,
                        address: teamData.venue.address,
                        city: teamData.venue.city,
                        capacity: teamData.venue.capacity,
                        image: teamData.venue.image
                    }
                });
            } else {
                setError("Nenhuma informação encontrada para este time, ou limite diário de API alcançado.");
            }
        } catch (err) {
            setError('Erro ao carregar informações do time.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamInfo();
        if (availableSeasons.length === 0) {
            fetchAvailableSeasons(71).then(setAvailableSeasons);
        }
    }, []);

    return (
        <div className="page-container"> 
            <Navbar />

            <div className="general-info-container">
                <header>
                    <h1>Informações Gerais do Clube</h1>
                </header>

                {loading ? (
                    <p>🔄 Carregando informações...</p>
                ) : error ? (
                    <p className="error" role="alert">{error}</p>
                ) : team ? (
                    <div className="team-info">
                        <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
                        <h2>{team.name} ({team.abbreviation})</h2>
                        <p>País: {team.country}</p>
                        <p>Fundado em: {team.founded}</p>

                        <h3>Estádio</h3>
                        {team.venue?.image && <img src={team.venue.image} alt={team.venue.name} className="venue-image" />}
                        <p>{team.venue?.name || "Estádio desconhecido"}</p>
                        <p>{team.venue?.address}, {team.venue?.city}</p>
                        <p>Capacidade: {new Intl.NumberFormat('pt-BR').format(team.venue?.capacity || 0)} lugares</p>
                    </div>
                ) : null}
            </div>
            <div className="players-section">
                <div className="players-header">
                    <h2>Elenco</h2>
                    <select value={season} onChange={(e) => setSeason(Number(e.target.value))}>
                        {availableSeasons.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <PlayerGrid season={season} />
            </div>
            <Footer />
        </div>
    );
};

export default GeneralInfo;
