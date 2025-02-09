import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/AllPlayers"> All Players</Link>
        </li>
        <li>
          <Link to="/SinglePlayer">Players</Link>
        </li>
        <li>
          <Link to="/NewPlayerForm">Register a Player</Link>
        </li>
      </ul>
    </nav>
  );
}
