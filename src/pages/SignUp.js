import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({ token, setToken, handleShow1, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const signUpdetail = {
        email: email,
        username: username,
        password: password,
        newsletter: newsletter,
      };
      const resToken = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        signUpdetail
      );
      // console.log(resToken.data);
      if (resToken.data.token) {
        setToken(resToken.data.token);
        Cookies.set("token", token, { expires: 7 });
        navigate("/");
        handleClose();
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.resToken.data);
      // if (error.resToken.data) setErrorMsg(error.resToken.data);
    }
  };

  return (
    <div className="signUp-form">
      <div className="container-form">
        <h2 style={{ textAlign: "center" }}>S'inscrire</h2>

        <div>
          <Form action="submit" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="S'inscrire à notre newsletter"
                checked={newsletter}
                onChange={(e) => {
                  setNewsletter(e.target.checked);
                }}
              />
              <Form.Text className="text-muted">
                En m'inscrivant je confirme avoir lu et accepté les Termes &
                Conditions et Politique de Confidentialité de Vinted. Je
                confirme avoir au moins 18 ans.
              </Form.Text>
            </Form.Group>

            <Button
              variant="info w-100"
              style={{ color: "white" }}
              type="submit"
            >
              S'inscrire
            </Button>
            <Link
              onClick={() => {
                handleShow1();
                handleClose();
              }}
            >
              Tu as deja un compte? connecte-toi!
            </Link>
            <p style={{ color: "red" }}>{errorMsg}</p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
