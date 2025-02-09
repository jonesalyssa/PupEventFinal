import { useGetPlayerDetailsQuery } from "./API/api";
import { useParams } from "react-router-dom"; // To access URL parameters

export default function SinglePlayer() {
  const { id } = useParams(); // Get the player ID from the URL
  const { data: player, error, isLoading } = useGetPlayerDetailsQuery(id); // Use the query hook with the ID

  if (isLoading) return <p>Loading player...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <figure>
        <img src={player.imageUrl} alt={player.name} />
      </figure>
    </div>
  );
}
