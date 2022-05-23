import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

export default function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialDeckState);

  useEffect(() => {
    async function collectData() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    collectData();
  }, [deckId]);

  function changeHandler({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck({ ...deck });
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function cancelHandler() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Deck</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h1>Edit Deck</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            id="name"
            name="name"
            className="form-control"
            onChange={changeHandler}
            value={deck.name}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            onChange={changeHandler}
            rows="4"
            value={deck.description}
            required
          />
        </div>
        <button
          className="btn btn-secondary mx-1"
          onClick={() => cancelHandler()}
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
