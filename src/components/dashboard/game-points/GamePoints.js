import React from "react";
import "../../../assets/scss/screen.css";
import Tokens from "./Tokens";
import User from "./User";

function GamePoints() {
  return (
    <>
      <section className="GamePoints">
        <div className="container">
          <div className="row align-items-center pb-30 pt-30">
            <div className="col-md-2 text-center position-relative">
              <User />
            </div>
            <div className="col-md-8 offset-md-2">
              <Tokens />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GamePoints;
