import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Cookies from "js-cookie";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();

  return (
    <Router>
      <header>
        <Header />
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
            />
          }
        />
        <Route path={`/offer/:id`} element={<Offer />} />
        <Route
          path="/signup"
          element={<SignUp token={token} setToken={setToken} />}
        />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <footer>
        <p>Made at le Reacteur by Thiru - 2022</p>
      </footer>
    </Router>
  );
}

export default App;
