import "./assets/scss/screen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/common/Header";
import Footer from "./components/common/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing-page/LandingPage";
import GamePage from "./pages/game/GamePage";
import GameCrashPage from "./pages/gameCrash/GameCrashPage"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={< GameCrashPage/>} />
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<GamePage/>}/>
        // <Route path="/gamecrash" element={<LandingPage/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
