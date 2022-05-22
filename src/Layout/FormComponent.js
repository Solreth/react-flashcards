import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FormComponent({ deckId, submitHandler, card }) {
  const [formData, setFormData] = useState(card);

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
      />
      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-secondary my-2">Cancel</button>
      </Link>
      <button type="submit" className="btn btn-primary mx-2">
        Submit
      </button>
    </form>
  );
}
