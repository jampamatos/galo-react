import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeneralInfo from './pages/GeneralInfo';
// import PlayerStats from './pages/PlayerStats';
import PlayerDetails from './pages/PlayerDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general-info" element={<GeneralInfo />}/>
        {/* <Route path="player-stats" element={<PlayerStats />}/> */}
        <Route path="player/:id" element={<PlayerDetails />}/>
      </Routes>
    </Router>
  );
}

export default App;