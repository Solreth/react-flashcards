import React from "react";
import { useParams, Link } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api/index";

export default function CardLayout({ card }) {
  const { deckId } = useParams();

  async function deleteCardHandler(id) {
    const confirm = window.confirm(
      "So there is such a thing as a stupid question..."
    );
    if (confirm) {
      await deleteCard(id);
      await readDeck(deckId);
      window.location.reload();
    }
  }

  return (
    <div className="card-body pb-2">
      <h5 className="card-title">{card.front}</h5>
      <hr></hr>
      <div>
        <p className="card-text pb-2">{card.back}</p>
        <hr></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "2.3em",
          }}
        >
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary ">
              <i className="bi bi-pencil" />
              Edit
            </button>
          </Link>
          <button
            onClick={() => deleteCardHandler(card.id)}
            className="btn btn-danger"
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
