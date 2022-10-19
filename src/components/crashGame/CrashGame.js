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
    <div className="container" >
      <div className="row justify-content-center align-items-center">
        <div className="col-md-9 ">
            
          <Unity
            unityContext={unityContext}
            style={{
              
              height:"540px",
              width: "960px",
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
