import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckLayout from "./DeckLayout";

export default function Home({ decks, setDecks }) {
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
  }, [setDecks]);

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create Deck</button>
        </Link>
      </div>
      <div>
        {decks.map((deck) => (
          <DeckLayout key={deck.id} deck={deck} setDecks={setDecks} />
        ))}
      </div>
    </div>
  );
}
