import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ({
  handleShow,
  handleShow1,
  token,
  setToken,
  searchValue,
  setSearchValue,
  avatarUser,
  setavatarUser,
}) => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="container-header">
        <Link to="/">
          <div>
            <img src={logo} alt="logo-Vinted" className="logo" />
          </div>
        </Link>
        <div className="searchBar">
          <Form.Group className="mb-3 search">
            <Form.Control
              type="search"
              placeholder="Recherche des articles"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </Form.Group>
        </div>
        <div className="avatar">
          {avatarUser ? <img src={avatarUser} alt=""></img> : ""}
        </div>
        <div className="navigation">
          <Link>
            <Button variant="outline-info m-1" onClick={handleShow}>
              Sinscrire
            </Button>
          </Link>
          <Link>
            {token ? (
              <Button
                variant="danger m-1"
                onClick={() => {
                  Cookies.remove("token");
                  setToken(null);
                  setavatarUser("");
                }}
              >
                Se deconnecter
              </Button>
            ) : (
              <Button variant="outline-info m-1" onClick={handleShow1}>
                Se connecter
              </Button>
            )}
          </Link>

          <Button
            variant="info m-1"
            style={{ color: "white" }}
            onClick={() => {
              if (Cookies.get("token")) {
                navigate("/publish");
              } else {
                handleShow();
              }
            }}
          >
            Vend tes articles
          </Button>
        </div>
      </div>
      {/* <div className="navBar">
        <Link to="/">
          <Button variant="outline-secondary m-1">HOME</Button>
        </Link>
        <Link to="/offer/:id">
          <Button variant="outline-secondary m-1">OFFERS</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
