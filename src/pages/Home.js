import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Bannier from "../components/Bannier";
import Card from "../components/Card";
import { Link } from "react-router-dom";

import FilterBar from "../components/FilterBar";

const Home = ({
  setIsLoading,
  isLoading,
  setData,
  data,
  searchValue,
  handleShow,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState(8);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [priceOrder, setPriceOrder] = useState("price-asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted--difficult-club--56xblq4s6sr6.code.run/offers?title=${searchValue}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${priceOrder}&page=${currentPage}&limit=${range}`
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
      <Bannier handleShow={handleShow} />
      <section className="section-offer wrapper">
        <FilterBar
          setPriceMax={setPriceMax}
          priceMax={priceMax}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          setPriceOrder={setPriceOrder}
          priceOrder={priceOrder}
          setRange={setRange}
          range={range}
        />

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
