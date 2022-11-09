import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Header = () => {
  return (
    <div className="wrapper">
      <div className="container-header">
        <Link to="/">
          <div>
            <img src={logo} alt="logo-Vinted" className="logo" />
          </div>
        </Link>
        <div className="searchBar">
          <Form.Group className="mb-3 search" controlId="formBasicEmail">
            <Form.Control type="search" placeholder="Recherche des articles" />
          </Form.Group>
        </div>
        <div className="navigation">
          <Button variant="outline-info m-1">Sinscrire</Button>
          <Button variant="outline-info m-1">Se connecter</Button>
          <Button variant="info m-1" style={{ color: "white" }}>
            Vend tes articles
          </Button>
        </div>
      </div>
      <div className="navBar">
        <Link to="/">
          <Button variant="outline-secondary m-1">HOME</Button>
        </Link>
        <Link to="/offer/:id">
          <Button variant="outline-secondary m-1">OFFERS</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
