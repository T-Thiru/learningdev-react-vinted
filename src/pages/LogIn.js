import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LogIn = ({ handleShow, handleClose1, token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogIn, setErrorLogIn] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const logIndetail = {
        email: email,
        password: password,
      };
      const resToken = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        logIndetail
      );
      // console.log(resToken.data);
      if (resToken.data.token) {
        setToken(resToken.data.token);
        Cookies.set("token", token, { expires: 7 });
        navigate("/");
        handleClose1();
        setErrorLogIn("");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data);
      if (error.response.status === 401)
        setErrorLogIn("identifiant ou Mot de passe incorrect");
      console.log(error.response.data);
      if (error.response.status === 400)
        setErrorLogIn("Ce compte n'existe pas");
    }
  };

  return (
    <div className="login-form">
      <div className="container-login">
        <h2 style={{ textAlign: "center" }}>Se connecter</h2>
        <div>
          <Form action="submit" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              variant="info w-100"
              style={{ color: "white" }}
              type="submit"
            >
              Se connecter
            </Button>
            <Link
              onClick={() => {
                handleShow();
                handleClose1();
              }}
            >
              Pas encore de compte? Inscris-toi !
            </Link>
          </Form>
          <p style={{ color: "red" }}>{errorLogIn}</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
