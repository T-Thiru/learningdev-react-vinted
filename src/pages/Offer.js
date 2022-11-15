import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Offer = ({ handleShow, token }) => {
  const navigate = useNavigate();
  const [dataOffer, setDataOffer] = useState();
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted--difficult-club--56xblq4s6sr6.code.run/offer/${id}`
        );
        // console.log(response.data);
        setDataOffer(response.data);
        setIsLoadingOffer(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setDataOffer, setIsLoadingOffer, id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3100/offer/delete",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            id: dataOffer._id,
          },
        }
      );
      if (response) {
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoadingOffer ? (
    <p>LOADING...</p>
  ) : (
    <div>
      <div className="offer-container wrapper">
        <div className="offer-pic">
          <Carousel>
            {dataOffer.product_pictures.length <= 0 ? (
              <img
                className="d-block w-100"
                src={dataOffer.product_image.secure_url}
                alt="photos-produits"
              />
            ) : (
              dataOffer.product_pictures.map((pics, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img
                      className="d-block w-100"
                      src={pics.secure_url}
                      alt="photos-produits"
                    />
                  </Carousel.Item>
                );
              })
            )}
          </Carousel>
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
                src={dataOffer.owner?.account?.avatar?.secure_url}
                alt="avatar-user"
              />
              <span>
                <h5>{dataOffer.owner?.account?.username}</h5>
              </span>
            </div>
            <Button
              disabled={dataOffer.paid}
              variant="info m-1"
              style={{ color: "white" }}
              onClick={() => {
                if (Cookies.get("token")) {
                  navigate("/payment", {
                    state: {
                      offer: dataOffer._id,
                      price: dataOffer.product_price,
                      name: dataOffer.product_name,
                    },
                  });
                } else {
                  handleShow();
                }
              }}
            >
              Acheter l'article
            </Button>
          </div>
        </div>
      </div>
      <div className="btn-delete wrapper">
        <Button
          variant="danger mt-5 "
          style={{ color: "white" }}
          onClick={handleDelete}
        >
          Supprimer l'offre
        </Button>
      </div>
    </div>
  );
};

export default Offer;
