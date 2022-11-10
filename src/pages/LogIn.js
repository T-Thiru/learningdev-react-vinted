import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const LogIn = ({ handleShow, handleClose1, token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logIndetail = {
      email: email,
      password: password,
    };
    try {
      const resToken = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        logIndetail
      );
      console.log(resToken.data);
      setToken(resToken.data.token);
      Cookies.set("token", token, { expires: 7 });
    } catch (error) {
      console.log(error.message);
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
        </div>
      </div>
    </div>
  );
};

export default LogIn;
