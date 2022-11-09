import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      </Routes>
    </Router>
  );
}

export default App;
