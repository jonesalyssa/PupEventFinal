//New Player Form

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPlayer } from "../API/api";

export default function NewPlayerForm() {
  const [playerName, setPlayerName] = useState("");
  const [playerBreed, setPlayerBreed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPlayer = {
      name: playerName,
      breed: playerBreed,
    };

    try {
      await addNewPlayer(newPlayer);
      navigate("/"); // Redirect to home after adding the player
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Player</h2>
      <label>
        Name:
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
      </label>
      <label>
        Breed:
        <input
          type="text"
          value={playerBreed}
          onChange={(e) => setPlayerBreed(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Player</button>
    </form>
  );
}
