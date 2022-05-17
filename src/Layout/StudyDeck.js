import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link } from "react-router-dom";
function StudyDeck() {
  const [deck, setDeck] = useState("");
  const [flip, setFlip] = useState(false);
  const [count, setCount] = useState(0);
  const { deckId } = useParams();

  function flipHandler() {
    setFlip(!flip);
  }

  function nextHandler() {
    if (count === deck.cards.length - 1) {
      setCount(0);
      flipHandler();
    } else {
      let newCount = count + 1;
      setCount(newCount);
      flipHandler();
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
  }, [deckId]);

  if (deck === "") {
    return <div>loading</div>;
  } else if (deck.cards.length < 3) {
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
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {deck.cards.length}{" "}
          cards in this deck.
        </p>
        <button className="btn btn-primary">
          <i className="bi bi-clipboard-plus" /> Add Cards
        </button>
      </>
    );
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
            <h5
              className="card-title row pl-3"
              style={{ justifyContent: "space-between" }}
            >
              Card {count + 1} of {deck.cards.length}
              {!flip && <div className="font-weight-light">(Front)</div>}
              {flip && <div className="font-weight-light">(Back)</div>}
            </h5>
            {!flip && <p className="card-text">{deck.cards[count].front}</p>}
            {flip && <p className="card-text">{deck.cards[count].back}</p>}
            <button onClick={flipHandler} className="btn btn-secondary">
              Flip
            </button>
            {flip && (
              <button
                className="btn btn-primary offset-1"
                onClick={nextHandler}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default StudyDeck;