import React, { useState } from "react";
import "../../assets/scss/screen.css";
import gameimg from "../../assets/images/bgImg.jpeg";
import play from "../../assets/images/play.svg";
// import { useDispatch } from "react-redux";
// import Solana from "./solana";
import { useNavigate } from "react-router-dom"; 

const GameCrashPage = ({ setGame, game }) => {
  const [openGame, setOpenGame] = useState(game);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const gamePlayHandler = (playGame) => {
    navigate("/game_play");
  };
  return (
    <>
      <section className="gamePlay pt-30 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="gameScreen position-relative">
                <img className="img-fluid" src={gameimg} alt="" />
                <div className="DemoPlay d-flex gap-5">
                  <button
                    className="playicon"
                    onClick={() =>
                      gamePlayHandler({
                        mode: "PlayForMoney",
                      })
                    }
                  >
                    <img className="img-fluid playicon" src={play} alt="Play" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Solana /> */}
      </section>

    </>
  );
};

export default GameCrashPage;
