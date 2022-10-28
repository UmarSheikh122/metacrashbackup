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
import React, { useState } from "react";
import CrashGame from "./components/crashGame/CrashGame";

const App = () => {
  let [game, setGame] = useState(false);
  return (
    <div>
      <Header setGame={setGame} game={game} />  
      <Routes>
        <Route
          index
          path="/"
          element={<GameCrashPage setGame={setGame} game={game} />}
        />
        <Route index path="/game_play" element={<CrashGame />} />
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
