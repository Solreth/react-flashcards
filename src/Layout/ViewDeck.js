import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import CardLayout from "./CardLayout";
import { readDeck, deleteDeck } from "../utils/api/index.js";

function ViewDeck() {
  const [deck, setDeck] = useState("");

  const { deckId } = useParams();
  const history = useHistory();

  async function deleteDeckHandler(id) {
    const confirm = window.confirm(
      "Are you sure you wish to release this deck? Its mother will never take it back."
    );
    if (confirm) {
      await deleteDeck(id);
      history.push("/");
    }
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

        <div className="col-12 mt-2 mb-4">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <div className="row navbar py-0">
            <div className="row gx-5">
              <Link to={`/decks/${deck.id}`}>
                <button className="btn btn-secondary mx-1 ml-2">
                  <i className="bi bi-pencil" />
                  Edit
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-primary mx-1">
                  <i className="bi bi-book-half" /> Study
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary mx-1">
                  <i className="bi bi-clipboard-plus" /> Add Card
                </button>
              </Link>
            </div>
            <button
              onClick={() => deleteDeckHandler(deckId)}
              className="btn btn-danger"
            >
              <i className="bi bi-trash3-fill" />
            </button>
          </div>
        </div>
        {
          <div className="mb-5">
            {deck.cards.map((card) => (
              <div
                key={card.id}
                className="card card-body col-8 container py-2"
              >
                <CardLayout card={card} />
              </div>
            ))}
          </div>
        }
      </>
    );
  }
}
export default ViewDeck;
