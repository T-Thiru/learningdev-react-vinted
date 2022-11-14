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

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
        <Route path={`/offer/:id`} element={<Offer />} />
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
