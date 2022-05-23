import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import FormComponent from "./CardFormComponent";

export default function EditCard() {
  const { deckId, cardId } = useParams();

  const history = useHistory();
  const initialDeckData = {
    name: "",
    description: "",
  };
  const initialCardData = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState(initialCardData);
  const [deck, setDeck] = useState(initialDeckData);

  useEffect(() => {
    async function collectData() {
      const abortController = new AbortController();
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        const deckResponse = await readDeck(deckId, abortController.signal);
        setCard(cardResponse);
        setDeck(deckResponse);
      } catch (error) {
        console.error(error);
      }
      return () => {
        abortController.abort();
      };
    }
    collectData();
  }, [cardId, deckId]);

  async function submitHandler(card) {
    const abortController = new AbortController();
    await updateCard(card, abortController.signal);
    history.push(`/decks/${deck.id}`);
  }

  return (
    <>
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card</li>
        </ol>
      </div>
      <div className="row container">
        <h1 className="container">Edit Card</h1>
      </div>
      <FormComponent
        submitHandler={submitHandler}
        card={card}
        deckId={deckId}
      />
    </>
  );
}
