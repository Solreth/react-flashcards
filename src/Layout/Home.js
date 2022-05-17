import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckLayout from "./DeckLayout";

function Home() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const abort = new AbortController();

    async function returnDecks() {
      try {
        const deckData = await listDecks(abort.signal);
        setDecks(deckData);
      } catch (error) {
        console.log(error);
      }
    }
    returnDecks();
    return () => abort.abort();
  }, []);

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create Deck</button>
        </Link>
      </div>
      <div>
        {decks.map((deck) => (
          <DeckLayout key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}

export default Home;
