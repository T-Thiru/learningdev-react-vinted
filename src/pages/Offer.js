import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Offer = () => {
  const [dataOffer, setDataOffer] = useState();
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        setDataOffer(response.data);
        setIsLoadingOffer(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataOffer, setIsLoadingOffer, id]);
  return isLoadingOffer ? (
    <p>LOADING...</p>
  ) : (
    <div>
      <div className="offer-container wrapper">
        <div className="offer-pic">
          <img src={dataOffer.product_image.secure_url} alt="" />
        </div>
        <div className="detail">
          <span className="price">
            <h3>{dataOffer.product_price}$</h3>
          </span>
          <ul>
            {dataOffer.product_details.map((detail, index) => {
              return (
                <li key={index}>
                  <span>{Object.keys(detail)}</span>
                  <span>{Object.values(detail)}</span>
                </li>
              );
            })}
          </ul>
          <div className="desc-offer">
            <h4>{dataOffer.product_name}</h4>
            <p>{dataOffer.product_description}</p>
            <div className="avatar-offer">
              <img
                src={dataOffer.owner?.account?.avatar?.url}
                alt="avatar-user"
              />
              <span>
                <h5>{dataOffer.owner?.account?.username}</h5>
              </span>
            </div>
            <Button variant="info m-1" style={{ color: "white" }}>
              Vend tes articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
