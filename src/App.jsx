import "./assets/scss/screen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/common/Header";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import GamePage from "./pages/game/GamePage";
import GameCrashPage from "./pages/gameCrash/GameCrashPage";
import { RequireAuth } from "./pages/protectedroute/RequireAuth";
import React, { useEffect, useState } from "react";
import CrashGame from "./components/crashGame/CrashGame";


const App = () => {
  let [game, setGame] = useState(false);
  let [showPoints, setShowPoints] = useState(true);

  useEffect(()=>{
     let token = localStorage.getItem("token");
     if(token)
      return;
    localStorage.setItem("token","")
}, [])
  return (
    <div>
      <Header setGame={setGame} game={game} setShowPoints={setShowPoints} showPoints={showPoints} />
      <Routes>
        <Route
          index
          path="/"
          element={<GameCrashPage setGame={setGame} game={game} setShowPoints={setShowPoints} showPoints={showPoints}/>}
        />
        <Route
          index
          path="/game_play"
          element={
            <CrashGame setShowPoints={setShowPoints} showPoints={showPoints} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/game" element={<GamePage />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
