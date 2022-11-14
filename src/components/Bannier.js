import React from "react";
import { Link } from "react-router-dom";
import bannier from "../assets/bannier.jpg";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Bannier = ({ handleShow }) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="container-bannier ">
        <div className="container-top wrapper">
          <div className="topBannier">
            <h2>Prêts à faire du tri dans vos placards ?</h2>

            <Button
              variant="info m-1 w-60"
              style={{ color: "white" }}
              onClick={() => {
                if (Cookies.get("token")) {
                  navigate("/publish");
                } else {
                  handleShow();
                }
              }}
            >
              Vends maintenant
            </Button>

            <Link className="noUnderline">
              <p style={{ color: "#0DCAF0" }}>Decouvrir comment ca marche</p>
            </Link>
          </div>
        </div>
        <img src={bannier} alt="bannier" className="bannier" />
      </div>
    </section>
  );
};

export default Bannier;
