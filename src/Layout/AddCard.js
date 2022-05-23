import React, { useEffect } from "react";
import { readDeck, createCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";
import CardFormComponent from "./CardFormComponent";

function AddCard({ deck, setDeck }) {
  const { deckId } = useParams();

  const history = useHistory();

  async function submitHandler(card) {
    await createCard(deckId, card);
  }

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
  }, [deckId, setDeck]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Card
          </li>
        </ol>
      </nav>
      <div className="row container">
        <h1>{deck.name}:&nbsp;</h1>
        <h1>Add Card</h1>
      </div>
      <CardFormComponent
        deckId={deckId}
        history={history}
        deck={deck}
        submitHandler={submitHandler}
      />
    </>
  );
}
export default AddCard;
