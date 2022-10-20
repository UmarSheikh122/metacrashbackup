import React, { useState } from "react";
import "../../assets/scss/screen.css";
import star from "../../assets/images/star.svg";
import gameimg from "../../assets/images/gameimg.png";
import play from "../../assets/images/play.svg";
import GameCatSlider from "../../components/landing-page/gamecatslider/GameCatSlider";
import { useDispatch } from "react-redux";
import { gamePlayMode } from "../../features/game/gameSlice";
import Toast, { notfiFail } from "../../components/common/Toast";
import CrashGame from "../../components/crashGame/CrashGame";

const GameCrashPage = ({game,setGame}) => {
  const [openGame,setOpenGame]=useState(false)
  const dispatch = useDispatch();
  
  const gamePlayHandler = (playGame) => { 
  const token = localStorage.getItem("token")
    setGame(true)
    // if(token){
      dispatch(gamePlayMode(playGame)).unwrap()
      .then(() => {
     setGame(true)
      }).catch((err)=>{
        console.log('err', err)
        notfiFail("Error try again later!")
        setGame(true)
      })
    // }
    // else{
    //   notfiFail("Please Login")
    // }
  };
  return (
    <>
    {
      game  ? (
        <>
        <CrashGame/>
        </>
      ) :(<section className="gamePlay pt-30 pb-40">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="gameScreen position-relative">
              <img className="img-fluid" src={gameimg} alt="" />
              <div className="DemoPlay d-flex gap-5">
                <button
                  className="playicon"
                  onClick={()=>gamePlayHandler({
                    mode: "PlayForMoney",
                  })}
                >
                  <img className="img-fluid playicon" src={play} alt="Play" />
                </button>
                {/* <button className="demo"  onClick={()=>gamePlayHandler({
                    mode: "PlayForFun",
                  })}> DEMO </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
    }
      
      <Toast/>
    </>
  );
};

export default GameCrashPage;


