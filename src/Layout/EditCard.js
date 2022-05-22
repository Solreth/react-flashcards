import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import FormComponent from "./FormComponent";

function EditCard() {
  const { deckId, cardId } = useParams();
  console.log(useParams());
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
    const response = await updateCard(card, abortController.signal);
    console.log("lalala", response);
    history.push(`/decks/${deckId}`);
  }

  return (
    <FormComponent submitHandler={submitHandler} card={card} deckId={deckId} />
  );
}
export default EditCard;
