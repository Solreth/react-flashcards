import React, { useState, useEffect } from "react";
import { listDecks, createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function AddDeck() {
  const initialData = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialData);
  const history = useHistory();
  const [newDeck, setNewDeck] = useState(null);
  const [id, setId] = useState(null);
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    const abort = new AbortController();

    async function retrieveDecks() {
      try {
        const deckData = await listDecks(abort.signal);
        setDecks(deckData);
      } catch (error) {
        console.log(error);
      }
    }
    retrieveDecks();
    return () => abort.abort();
  }, []);

  useEffect(() => {
    const abort = new AbortController();
    if (!newDeck) {
      return;
    } else {
      async function postDeck() {
        try {
          await createDeck(newDeck, abort.signal);
          const deckData = await listDecks(abort.signal);
          setDecks(deckData);
          history.push(`/decks/${id}`);
        } catch (error) {
          console.log(error);
        }
      }
      postDeck();
      return () => abort.abort();
    }
  }, [newDeck, setDecks, history, id]);

  function submitHandler(event) {
    event.preventDefault();
    const uniqueId = decks.slice(-1)[0].id + 1;
    setId(uniqueId);
    setNewDeck(formData);
  }

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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler} className="container">
        <h1>Create Deck</h1>
        <h4 className="mt-3 mb-2">Name</h4>
        <input
          type="text"
          placeholder="Deck Name"
          name="name"
          style={{ width: "100%" }}
          value={formData.name}
          required
          onChange={changeHandler}
        />
        <h4 className="mt-3 mb-2">Description</h4>
        <textarea
          rows="4"
          style={{ width: "100%" }}
          type="text"
          name="description"
          placeholder="Deck Description"
          value={formData.description}
          onChange={changeHandler}
          required
        />
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default AddDeck;
