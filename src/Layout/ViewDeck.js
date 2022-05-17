import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link } from "react-router-dom";
import CardLayout from "./CardLayout";
function ViewDeck() {
  const [deck, setDeck] = useState("");
  const { deckId } = useParams();

  useEffect(() => {
    const abort = new AbortController();

    const getDeck = async () => {
      try {
        const fullDeck = await readDeck(deckId, abort.signal);
        setDeck(fullDeck);
      } catch (error) {
        console.log(error);
      }
    };
    getDeck();
    return () => abort.abort();
  }, [deckId]);

  console.log(deck);

  if (deck === "") {
    return <div>loading</div>;
  } else {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>

        <div className="col-12 my-2">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="mb-5">
          {deck.cards.map((card) => (
            <div key={card.id} className="card card-body">
              <CardLayout card={card} />
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default ViewDeck;
