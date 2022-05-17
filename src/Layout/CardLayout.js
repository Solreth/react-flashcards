import React from "react";

function CardLayout({ card }) {
  console.log("Card", card);
  return (
    <div className="card-body row">
      <h5 className="card-title col">{card.front}</h5>
      <div>
        <p className="card-text col">{card.back}</p>
        <div className="row navbar py-0">
          <div className="row gx-5"></div>
          <button className="btn btn-danger">
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardLayout;
