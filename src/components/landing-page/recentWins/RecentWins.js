import React from "react";
import GameCat from "../../common/GameCat";
import GameCard from "../../common/GameCard";
import GameCrashCard from "../../common/GameCrashCard";

const RecentWins = () => {
  return (
    <>
      <section className="recentwins pt-60 pb-150">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-7">
              <GameCat />
              <div className="row">
                <div className="col-md-4">
                  <div className="-content">
                    <h3>Top pragmatic play games you can play with Bitcoin</h3>
                    <button className="btn orange">Explore All</button>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="gameCards d-flex justify-content-between align-items-center">
                    <GameCard />
                    <GameCrashCard />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <h4>Recent Wins</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentWins;
