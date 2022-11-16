import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Payement = ({ connectedUser }) => {
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { offer, price, name } = location.state;
  const stripe = useStripe();
  const elements = useElements();

  //   console.log(offer);

  const handlePayment = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);

      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: connectedUser,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe
      const response = await axios.post(
        `https://vinted--difficult-club--56xblq4s6sr6.code.run/payment`,
        {
          stripeToken: stripeToken,
          id: offer,
          client: connectedUser,
        }
      );
      console.log(response.data);
      // Si la réponse du serveur est favorable, la transaction a eu lieu
      if (response.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container-payment">
      <div className="payment-form">
        <form action="submit" onSubmit={handlePayment}>
          <h1 style={{ textAlign: "center" }}>Payement</h1>

          <div className="payment-detail">
            <div className="align-flexBetween">
              <p>Commande</p>
              <p>{price}$</p>
            </div>
            <div className="align-flexBetween">
              <p>Frais protetion acheteurs</p>
              <p>0,40$</p>
            </div>
            <div className="align-flexBetween">
              <p>Frais de port</p>
              <p>0,80$</p>
            </div>
          </div>
          <div className="payment-total">
            <div className="align-flexBetween">
              <h3>Total</h3>
              <p>{(price + 0.4 + 0.8).toFixed(2)}$</p>
            </div>
            <p>
              il ne vous reste plus qu'une etape pour vous offrir
              <strong> {name}</strong>. Vous allez payer{" "}
              <strong>{(price + 0.4 + 0.8).toFixed(2)}$</strong>
              (frais de protection et frais de port inclus)
            </p>
          </div>
          <CardElement />
          {isLoading ? (
            <p>Loading...</p>
          ) : completed ? (
            <p>Paiement effectué ! </p>
          ) : (
            <div>
              <Button
                type="submit"
                variant="success mt-5 w-100"
                style={{ color: "white" }}
              >
                Pay
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payement;
