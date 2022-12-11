import React, { useEffect, useState } from "react"; 
// import Unity, { useUnityContext } from "react-unity-webgl";
import CircularProgress from "@mui/material/CircularProgress";
import { Unity, useUnityContext } from "react-unity-webgl";
const CrashGame = ({ showPoints, setShowPoints }) => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "http://localhost:5000/gameloader",
    dataUrl: "http://localhost:5000/gamedata",
    frameworkUrl: "http://localhost:5000/gameframework",
    codeUrl: "http://localhost:5000/gamewasm",
  });
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setShowPoints(false);
    }, 3000);
  }, []);

  let windowW = window.innerWidth / 1.35;
  let HeightH = window.innerHeight / 1.35;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 gameContainer">
          {!isLoaded && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "100px",
              }}
            >
              <CircularProgress />
            </div>
          )}
           
          <Unity
            unityProvider={unityProvider}
            style={{
              width: `${windowW}px`,
              height: `${HeightH}px`,
              justifySelf: "center",
              alignSelf: "center",
              marginTop: "10px",
              marginBottom: "50px",
              visibility: isLoaded ? "visible" : "hidden",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CrashGame;
