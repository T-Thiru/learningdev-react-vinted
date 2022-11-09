import React from "react";
import { Link } from "react-router-dom";

const Card = ({ offre }) => {
  return (
    <Link
      to={`/offer/${offre._id}`}
      className="noUnderline "
      style={{ color: "gray" }}
    >
      <div className="card-container">
        <div className="avatar">
          <img src={offre.owner?.account?.avatar?.url} alt="avatar-user" />
          <span>{offre.owner?.account?.username}</span>
        </div>
        <div className="offer-detail">
          <img src={offre.product_image.url} alt="" />
          <div className="price-detail">
            <span>{offre.product_price}$</span>
            <span>{offre.product_details[1].TAILLE}</span>
            <span>{offre.product_details[0].MARQUE}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
