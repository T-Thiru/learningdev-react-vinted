import React, { useState } from "react";

const Range = ({ step, min, max, value }) => {
  return (
    <div>
      <div
        step
        min
        max
        value
        style={{
          height: "6px",
          width: "100%",
          backgroundColor: "#ccc",
        }}
      ></div>
      <div
        step
        min
        max
        value
        style={{
          height: "42px",
          width: "42px",
          backgroundColor: "#999",
        }}
      />
    </div>
  );
};

export default Range;
