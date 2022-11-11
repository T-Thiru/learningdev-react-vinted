import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Bannier from "../components/Bannier";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Range from "../components/Range";

const Home = ({ setIsLoading, isLoading, setData, data, searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState(8);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [priceOrder, setPriceOrder] = useState("price-asc");
  const [state, setState] = useState({ values: [50] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchValue}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${priceOrder}&page=${currentPage}&limit=${range}`
        );
        // const pages = [];

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [
    setData,
    setIsLoading,
    currentPage,
    range,
    searchValue,
    priceMin,
    priceMax,
    priceOrder,
  ]);

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
        <div className="fliter-container">
          <Range
            step={0.1}
            min={0}
            max={100}
            values={state.values}
            onChange={(values) => setState({ values })}
          />
          <div className="inputRange">
            <label htmlFor="rangeOffer">
              Nombre d'offres à afficher : {range}
            </label>
            <input
              id="rangeOffer"
              type="range"
              min="1"
              max="38"
              defaultValue={range}
              onChange={(e) => {
                // console.log(e.target);
                setRange(e.target.value);
              }}
            />
          </div>

          <Form>
            <div className="priceOrder">
              <Form.Label htmlFor="custom-switch">Prix croissant</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch"
                onChange={(e) => {
                  if (priceOrder === "price-asc") setPriceOrder("price-desc");
                  if (priceOrder === "price-desc") setPriceOrder("price-asc");
                }}
              />
              <Form.Label htmlFor="custom-switch">Prix décroissant</Form.Label>
            </div>
          </Form>
          <div className="priceRange">
            <label htmlFor="minPrice">Prix min : {priceMin}$</label>
            <input
              className="priceMin"
              id="minPrice"
              type="range"
              min="0"
              max="500"
              defaultValue={priceMin}
              onChange={(e) => {
                setPriceMin(e.target.value);
              }}
            />
            <input
              className="priceMax"
              id="maxPrice"
              type="range"
              min="0"
              max="500"
              defaultValue={priceMax}
              onChange={(e) => {
                setPriceMax(e.target.value);
              }}
            />
            <label htmlFor="maxPrice">Prix max : {priceMax}$</label>
          </div>
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
          <span>Pages</span>
        </div>
      </section>
    </main>
  );
};

export default Home;
