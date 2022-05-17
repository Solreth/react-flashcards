import React from "react";

function CardLayout({ card }) {
  console.log("Card", card);
  return (
    <div className="card-body pb-2">
      <h5 className="card-title">{card.front}</h5>
      <div>
        <p className="card-text pb-2">{card.back}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "2.3em",
          }}
        >
          <button className="btn btn-secondary ">
            <i className="bi bi-pencil" />
            Edit
          </button>
          <button className="btn btn-danger">
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardLayout;
