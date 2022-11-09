import React from "react";
import { useEffect } from "react";
import axios from "axios";

import Bannier from "../components/Bannier";
import Card from "../components/Card";

const Home = ({ setIsLoading, isLoading, setData, data }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [setData, setIsLoading]);

  return isLoading ? (
    <p>LOADING...</p>
  ) : (
    <main>
      <Bannier />
      <section className="section-offer wrapper">
        {data.offers.map((offre, index) => {
          return <Card key={index} offre={offre} />;
        })}
      </section>
    </main>
  );
};

export default Home;
