import React, { useEffect, useState } from "react";
// import Unity, { useUnityContext } from "react-unity-webgl";
import CircularProgress from "@mui/material/CircularProgress";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useNavigate } from "react-router";
const CrashGame = ({ showPoints, setShowPoints }) => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/Build/FinalNonCompressed2.loader.js",
    dataUrl: "/Build/FinalNonCompressed2.data",
    frameworkUrl: "/Build/FinalNonCompressed2.framework.js",
    codeUrl: "/Build/FinalNonCompressed2.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });
  const navigate = useNavigate();

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setShowPoints(false);
    }, 3000);
    return () => {
      window.location.reload(false);
      navigate("/");
    };
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
