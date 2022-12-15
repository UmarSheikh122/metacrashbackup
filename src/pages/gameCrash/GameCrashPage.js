import React, { useState, useEffect } from "react";
import "../../assets/scss/screen.css";
import gameimg from "../../assets/images/bgImg.jpeg";
import play from "../../assets/images/play.svg";
// import { useDispatch } from "react-redux";
// import Solana from "./solana";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../app/action";
import { EncryptData } from "../../utils/Aes";


const GameCrashPage = ({ setGame, game, setShowPoints }) => {
  const [openGame, setOpenGame] = useState(game);
  const location = useLocation();
  let { user, loadingApi } = useSelector((store) => store.InitReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setShowPoints(true);

    if (location.pathname == "/" && user) {
      let loginBody = {
        address: user?.wallet,
        chain: user?.network.toUpperCase(),
      };
      let encrypteddata = EncryptData(loginBody);
      dispatch(
        LoginAction({
          encrypteddata,
        })
      );
    }
  }, []);
  const gamePlayHandler = (playGame) => {
    navigate("/game_play");
  };
  return (
    <>
      <section className="gamePlay pt-30 pb-40">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12"
              onClick={() =>
                gamePlayHandler({
                  mode: "PlayForMoney",
                })
              }
            >
              <div className="gameScreen position-relative">
                <img className="img-fluid" src={gameimg} alt="" />
                <div className="DemoPlay d-flex gap-5">
                  <button className="playicon">
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
