import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = ({
  token,
  setToken,
  handleShow1,
  handleClose,
  setConectedUser,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  const [profilPic, setProfilPic] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("newsletter", newsletter);
      if (profilPic) {
        formData.append("picture", profilPic);
      }

      const resToken = await axios.post(
        "https://vinted--difficult-club--56xblq4s6sr6.code.run/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(resToken.data);
      if (resToken.data.token) {
        setToken(resToken.data.token);
        setConectedUser(resToken.data.id);
        Cookies.set("token", token, { expires: 7 });
        navigate("/");
        handleClose();
        setErrorSignIn("");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status);
      console.log(error.response.data);
      if (error.response.status === 400)
        setErrorSignIn("Veuillez remplire tous les champs");
      if (error.response.status === 409)
        setErrorSignIn("Cet adresse mail existe déjà");
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Ajouter une photo de profile</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  setProfilPic(e.target.files[0]);
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
            <p style={{ color: "red" }}>{errorSignIn}</p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
