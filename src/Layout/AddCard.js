import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api/index";
import { Link, useParams, useHistory } from "react-router-dom";

function AddCard({ deck, setDeck, decks, setDecks }) {
  const initialData = {
    front: "",
    back: "",
  };
  const { deckId } = useParams();
  const [formData, setFormData] = useState(initialData);
  const history = useHistory();

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

  function submitHandler(event) {
    event.preventDefault();
    createCard(deckId, formData);
    history.push(`/decks/${deckId}`);
  }

  console.log(formData);

  function changeHandler({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

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
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler} className="container">
        <div className="row container">
          <h1>{deck.name}:&nbsp;</h1>
          <h1>Add Card</h1>
        </div>
        <h4 className="mt-3 mb-2">Front</h4>
        <textarea
          rows="4"
          style={{ width: "100%" }}
          type="text"
          name="front"
          placeholder="Front side of card"
          value={formData.front}
          onChange={changeHandler}
        />

        <h4 className="mt-3 mb-2">Back</h4>
        <textarea
          rows="4"
          style={{ width: "100%" }}
          type="text"
          name="back"
          placeholder="Back side of card"
          value={formData.back}
          onChange={changeHandler}
        />
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary my-2">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary mx-2">
          Submit
        </button>
      </form>
    </>
  );
}
export default AddCard;
