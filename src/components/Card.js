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
          <img
            src={offre.owner?.account?.avatar?.secure_url}
            alt={offre.owner?.account.username}
          />
          <span>{offre.owner?.account?.username}</span>
        </div>
        <div className="offer-detail">
          <img src={offre.product_image?.secure_url} alt="" />
          <div className="price-detail">
            <span>{offre.product_price}$</span>
            <span>{offre.product_details[0].taille}</span>
            <span>{offre.product_details[0].marque}</span>
            {offre.paid ? (
              <strong style={{ color: "red" }}>Produit déjà acheter</strong>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
