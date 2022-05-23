import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function CardFormComponent({ deckId, submitHandler, card }) {
  const [formData, setFormData] = useState(card);
  const { url } = useRouteMatch();

  useEffect(() => {
    setFormData(card);
  }, [card]);

  function changeHandler({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  function submit(event) {
    event.preventDefault();
    submitHandler(formData);
    setFormData({});
  }

  return (
    <form onSubmit={submit} className="container">
      <h4 className="mt-3 mb-2">Front</h4>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        type="text"
        name="front"
        placeholder="Front side of card"
        value={formData?.front || ""}
        onChange={changeHandler}
        required
      />

      <h4 className="mt-3 mb-2">Back</h4>
      <textarea
        rows="4"
        style={{ width: "100%" }}
        type="text"
        name="back"
        placeholder="Back side of card"
        value={formData?.back || ""}
        onChange={changeHandler}
        required
      />
      <Link to={`/decks/${deckId}`}>
        {url === `/decks/${deckId}/cards/new` && (
          <button className="btn btn-secondary my-2">Done</button>
        )}
        {card && <button className="btn btn-secondary my-2">Cancel</button>}
      </Link>
      {url === `/decks/${deckId}/cards/new` && (
        <button type="submit" className="btn btn-primary mx-2">
          Save
        </button>
      )}
      {card && <button className="btn btn-primary mx-2">Submit</button>}
    </form>
  );
}
