import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Bannier from "../components/Bannier";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = ({ setIsLoading, isLoading, setData, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState(8);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${currentPage}&limit=${range}`
        );
        // const pages = [];

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setData, setIsLoading, currentPage, range]);

  const pages = [];
  if (!isLoading) {
    for (let i = 1; i <= Math.ceil(data.count / range); i++) {
      pages.push(i);
    }
  }
  const clickPage = (page) => {
    setCurrentPage(page);
  };

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <main>
      <Bannier />

      <section className="section-offer wrapper">
        <div className="inputRange">
          <input
            id="rangeOffer"
            type="range"
            min="1"
            max="38"
            defaultValue={range}
            onChange={(e) => {
              console.log(e.target);
              setRange(e.target.value);
            }}
          />
          <label htmlFor="rangeOffer">
            Nombre d'offres à afficher : {range}
          </label>
        </div>
        <div className="display-cards">
          {data.offers.map((offre, index) => {
            return <Card key={index} offre={offre} />;
          })}
        </div>

        <div className="pagination">
          {pages.map((page, index) => {
            return (
              <Link key={index}>
                <span
                  onClick={() => {
                    clickPage(page);
                  }}
                  value={page}
                >
                  {page}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <footer></footer>
    </main>
  );
};

export default Home;
