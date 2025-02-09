import { useState, useEffect } from "react";
import { useGetPlayersQuery } from "../components/API/api";

export default function AllPlayers() {
  const { data, error, isLoading } = useGetPlayersQuery(); // Using RTK Query hook to fetch data
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    console.log("Fetched data:", data); // Log the full data object to inspect its structure

    if (data && data.data && Array.isArray(data.data.players)) {
      setPlayers(data.data.players); // Use the players array inside the 'data' object
    } else {
      setPlayers([]); // If no players are found, set as an empty list
    }
  }, [data]); // Re-run whenever data changes

  if (isLoading) return <p>Loading players...</p>;
  if (error) return <p>Error loading players: {error.message}</p>;

  return (
    <div>
      <h1>All Players</h1>
      {players.length === 0 ? (
        <p>No players found. Please check back later.</p>
      ) : (
        players.map((player) => (
          <div key={player.id}>
            <h3>{player.name}</h3>
            <p>Breed: {player.breed}</p>
            <p>Status: {player.status}</p>
            {player.imageUrl && <img src={player.imageUrl} alt={player.name} />}
          </div>
        ))
      )}
    </div>
  );
}
