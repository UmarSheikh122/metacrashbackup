import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
const CrashGame = () => {
  const unityContext = new UnityContext({
    loaderUrl: "/Build/metacrashlast.loader.js",
    dataUrl: "/Build/metacrashlast.data",
    frameworkUrl: "/Build/metacrashlast.framework.js",
    codeUrl: "/Build/metacrashlast.wasm",
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
            
          <Unity
            unityContext={unityContext}
            style={{
              width: "100%",
              justifySelf: "center",
              alignSelf: "center",
              marginTop:"50px"
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CrashGame;
