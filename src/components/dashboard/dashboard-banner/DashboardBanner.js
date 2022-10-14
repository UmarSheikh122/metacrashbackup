import React from "react";
// import  "../../assets/scss/screen.css"
import "../../../assets/scss/screen.css";
//import dash_banner from "../../../assets/images/dash_banner.png"
import GamePoints from "../game-points/GamePoints";

const DashboardBanner = () => {
  return (
    <>
      <section className="dashboard_banner">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </section>

      <GamePoints />
    </>
  );
};

export default DashboardBanner;
