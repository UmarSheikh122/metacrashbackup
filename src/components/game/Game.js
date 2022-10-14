import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
const Game = () => {
  const unityContext = new UnityContext({
    loaderUrl: "/Build/newbuild.loader.js",
    dataUrl: "/Build/newbuild.data",
    frameworkUrl: "/Build/newbuild.framework.js",
    codeUrl: "/Build/newbuild.wasm",
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
export default Game;
