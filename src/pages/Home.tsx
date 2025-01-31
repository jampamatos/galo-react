import { NextMatch } from '../types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import '../styles/global.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

const Home = () => {
    const [nextMatch, setNextMatch] = useState<NextMatch | null>(null);

    useEffect(() => {
        const fetchNextMatch = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/next-match');
                setNextMatch(data);
            } catch (error) {
                console.error('Erro ao buscar próximo jogo:', error);
            }
        };

        fetchNextMatch();
    }, []);

    return (
        <div className="page-container">
            <Navbar /> {/* Agora o Navbar é um componente separado */}
            
            <div className="home-container">
                <header className="home-header">
                    <img src="https://media.api-sports.io/football/teams/1062.png" alt="Escudo do Clube Atlético Mineiro" className="home-logo" />
                    <h1 className="home-title">
                        The <span className="highlight">GALO REACT</span> Project
                    </h1>
                </header>

                {nextMatch ? (
                    <div className="next-match-card">
                        <h2>Próximo Jogo</h2>
                        <div className="match-details">
                            <div className="team">
                                <img src={nextMatch.homeTeam.logo} alt={nextMatch.homeTeam.name} />
                                <span>{nextMatch.homeTeam.abbreviation}</span>
                            </div>
                            <div className="versus">VS</div>
                            <div className="team">
                                <img src={nextMatch.awayTeam.logo} alt={nextMatch.awayTeam.name} />
                                <span>{nextMatch.awayTeam.abbreviation}</span>
                            </div>
                        </div>
                        <div className="match-info">
                            <p dangerouslySetInnerHTML={{ __html: nextMatch.matchInfo }} />
                        </div>
                    </div>
                ) : (
                    <div className="next-match-card loading">
                        Carregando informações do próximo jogo...
                    </div>
                )}
            </div>

            <Footer /> {/* Footer separado */}
        </div>
    );
};

export default Home;
