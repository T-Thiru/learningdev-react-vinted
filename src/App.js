import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import PublishOffer from "./pages/PublishOffer";
import Payement from "./pages/Payement";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51M4OtRG9h68YRSFljOfT9nwXDIoFU7GIIwr8xrXgAbF0O2HupUkwx0MGiZ5uSONqgvnnr0yww2KowSk7L45FvBGP0026yuVNtk"
);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [connectedUser, setConectedUser] = useState("");
  const [avatarUser, setavatarUser] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <Router>
      <header>
        <Header
          handleShow={handleShow}
          handleShow1={handleShow1}
          token={token}
          setToken={setToken}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          avatarUser={avatarUser}
          setavatarUser={setavatarUser}
        />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setData={setData}
              data={data}
              show={show}
              setShow={setShow}
              handleClose={handleClose}
              handleShow={handleShow}
              searchValue={searchValue}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer handleShow={handleShow} token={token} />}
        />
        {/* <Route
          path="/signup"
          element={<SignUp token={token} setToken={setToken} />}
        />
        <Route path="/login" element={<LogIn setToken={setToken} />} /> */}
        {/* {Cookies.get("token") ? */}
        <Route
          path="/publish"
          element={
            Cookies.get("token") ? (
              <PublishOffer token={token} />
            ) : (
              <SignUp token={token} setToken={setToken} />
            )
          }
        />

        {/* <Route path="/publish" element={<PublishOffer />} /> */}

        <Route
          path="/payment"
          element={
            Cookies.get("token") ? (
              <Elements stripe={stripePromise}>
                <Payement token={token} connectedUser={connectedUser} />
              </Elements>
            ) : (
              <SignUp token={token} setToken={setToken} />
            )
          }
        />
      </Routes>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <SignUp
            handleShow1={handleShow1}
            handleClose={handleClose}
            setToken={setToken}
            setConectedUser={setConectedUser}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <LogIn
            handleShow={handleShow}
            handleClose1={handleClose1}
            setToken={setToken}
            setConectedUser={setConectedUser}
            setavatarUser={setavatarUser}
          />
        </Modal.Body>
      </Modal>
      <footer>
        <p>Made at le Reacteur by Thiru - 2022</p>
      </footer>
    </Router>
  );
}

export default App;
