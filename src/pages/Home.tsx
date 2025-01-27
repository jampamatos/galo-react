import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Galo React Dashboard</h1>
            <p>Explore real-time stats and more about Clube Atlético Mineiro!</p>
            <nav>
                <Link to="/players">Go to Players</Link>
            </nav>
        </div>
    );
};

export default Home;