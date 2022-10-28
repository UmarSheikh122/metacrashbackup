import React, { useState } from "react";
import "../../assets/scss/screen.css";
import star from "../../assets/images/star.svg"; 
import gameimg from "../../assets/images/gameimg.png";
import play from "../../assets/images/play.svg";
import GameCatSlider from "../../components/landing-page/gamecatslider/GameCatSlider";
// import { useDispatch } from "react-redux";
// import { gamePlayMode } from "../../features/game/gameSlice";
import Game from "../../components/game/Game";

const GamePage = () => {
  const [openGame, setOpenGame] = useState(false);
  // const dispatch = useDispatch();
  const gamePlayHandler = (playGame) => {
    // dispatch(gamePlayMode(playGame))
    //   .unwrap()
    //   .then(() => {
    //     setOpenGame(true);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     notfiFail("Error try again later!");
    //     setOpenGame(false);
    //   });
  };
  return (
    <>
      {openGame ? (
        <>
          <Game />
        </>
      ) : (
        <section className="gamePlay pt-90 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="mb-30">
                  <span>
                    <img src={star} alt="" />
                  </span>
                  Leader Board
                </h3>
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
                      <img
                        className="img-fluid playicon"
                        src={play}
                        alt="Play"
                      />
                    </button>
                    <button
                      className="btn orange w-100"
                      onClick={() =>
                        gamePlayHandler({
                          mode: "PlayForFun",
                        })
                      }
                    >
                      DEMO 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* <Toast /> */}
      <GameCatSlider />
      <GameCatSlider />
    </>
  );
};

export default GamePage;
