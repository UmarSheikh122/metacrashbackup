import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
const CrashGame = () => {
  const unityContext = new UnityContext({
    loaderUrl: "/Build/qwertyuiop.loader.js",
    dataUrl: "/Build/qwertyuiop.data",
    frameworkUrl: "/Build/qwertyuiop.framework.js",
    codeUrl: "/Build/qwertyuiop.wasm",
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
