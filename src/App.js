import "./assets/scss/screen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/common/Header";
// import Footer from "./components/common/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing-page/LandingPage";
import GamePage from "./pages/game/GamePage";
import GameCrashPage from "./pages/gameCrash/GameCrashPage"
import { RequireAuth } from "./pages/protectedroute/RequireAuth";
import { useEffect } from "react";

function App() {
  let [game,setGame] = useState(false)
  useEffect(()=>(
    localStorage.setItem("token","")
  ),[])
  return (
    <>
    
      <Header setGame={setGame} game={game}/>
      <Routes>
        <Route index path="/" element={< GameCrashPage setGame={setGame} game={game}/>} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard/>
            </RequireAuth>
          }
        />
        <Route path="/game" element={<GamePage/>}/>
        // <Route path="/gamecrash" element={<LandingPage/>}/>
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;
