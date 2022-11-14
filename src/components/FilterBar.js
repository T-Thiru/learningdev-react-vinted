import React from "react";
import Form from "react-bootstrap/Form";
import MultiRangeSlider from "multi-range-slider-react";

const FilterBar = ({
  setPriceMax,
  priceMax,
  setPriceMin,
  priceMin,
  setPriceOrder,
  priceOrder,
  setRange,
  range,
}) => {
  return (
    <div className="fliter-container">
      <div className="inputRange">
        <label htmlFor="rangeOffer">Nombre d'offres à afficher : {range}</label>
        <input
          id="rangeOffer"
          type="range"
          min="1"
          max="500"
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
        <span>Prix Min {priceMin}$ :</span>
        <MultiRangeSlider
          style={{
            border: "none",
            boxShadow: "none",
            padding: "15px 10px",
            minWidth: "200px",
          }}
          min={0}
          max={500}
          step={10}
          label={false}
          minValue={priceMin}
          maxValue={priceMax}
          ruler="false"
          barLeftColor="white"
          barInnerColor="#015CC8"
          barRightColor="white"
          thumbLeftColor="#015CC8"
          thumbRightColor="#015CC8"
          onChange={(e) => {
            setPriceMin(e.minValue);
            setPriceMax(e.maxValue);
          }}
        />
        <span>: {priceMax}$ Prix Max</span>
      </div>
    </div>
  );
};

export default FilterBar;
