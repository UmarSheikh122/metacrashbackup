import { Box } from '@mui/system'
import undercontruction from "./assets/images/under_construction.svg";
import React from 'react'
import "./maintenance.css";

const Maintainence = () => {
  return (
    <div className="uc__wrapper">
      <div className="uc__details">
        <h1 className="title">Coming Soon!</h1>
        <h3 className="intro">
          This website is under maintenance. 
        </h3>
      </div>
      <div className="uc__art">
        <img src={undercontruction} alt="" />
      </div>
    </div>
  );
}

export default Maintainence