import React from "react";
import { Link } from "react-router-dom";
function DeckLayout({ deck }) {
  return (
    <div className="card col-12 my-2">
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">{deck.description}</p>
        <div className="row navbar py-0">
          <div className="row gx-5">
            <Link to={`/decks/${deck.id}`}>
              <button className="btn btn-secondary mx-1 ml-2">
                <i className="bi bi-binoculars-fill"></i> View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="btn btn-primary mx-1">
                <i className="bi bi-book-half"></i> Study
              </button>
            </Link>
          </div>
          <button className="btn btn-danger">
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckLayout;
