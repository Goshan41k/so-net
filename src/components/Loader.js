import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="ring-container">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
