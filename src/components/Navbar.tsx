import { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="home-nav">
      <div 
        className={`menu-icon ${menuOpen ? 'open' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✖' : '☰'}
      </div>

      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><a href="/general-info">Informações Gerais</a></li>
        <li><a href="/team-stats">Estatísticas do Time</a></li>
        <li><a href="/match-stats">Estatísticas de Jogos</a></li>
        <li><a href="/player-stats">Estatísticas de Jogadores</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
