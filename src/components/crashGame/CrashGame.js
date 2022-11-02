import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import CircularProgress from "@mui/material/CircularProgress";
const CrashGame = () => {
  const unityContext = new UnityContext({
    loaderUrl: "/Build/FinalNonCompressed.loader.js",
    dataUrl: "/Build/FinalNonCompressed.data",
    frameworkUrl: "/Build/FinalNonCompressed.framework.js",
    codeUrl: "/Build/FinalNonCompressed.wasm",
  });

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, []);
  
  let windowW = window.innerWidth/1.1;
  let HeightH = window.innerHeight/1.1;
  console.log(windowW, HeightH)
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 gameContainer">
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: '100px'
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Unity
              unityContext={unityContext}
              style={{
                width: `${windowW}px`,
                height: `${HeightH}px`,
                justifySelf: "center",
                alignSelf: "center",
                marginTop: "10px",
                marginBottom: "50px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CrashGame;
