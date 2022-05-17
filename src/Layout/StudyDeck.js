import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link } from "react-router-dom";
function StudyDeck() {
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>Study: {deck.name}</h1>
        <div
          className="card card-body col-12 container py-2"
          style={{ width: "18rem" }}
        >
          <div className="card-body ">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button className="btn btn-secondary">Flip</button>
          </div>
        </div>
      </>
    );
  }
}
export default StudyDeck;
