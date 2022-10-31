import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import CircularProgress from "@mui/material/CircularProgress";
const CrashGame = () => {
  const unityContext = new UnityContext({
    loaderUrl: "/Build/CrashNonCompress.loader.js",
    dataUrl: "/Build/CrashNonCompress.data",
    frameworkUrl: "/Build/CrashNonCompress.framework.js",
    codeUrl: "/Build/CrashNonCompress.wasm",
  });

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, []);
  // 820 x 1180 = 654 x 1163
  // 768 x 1024 = 568 x 1010
  // 414 x 896  = 412 x 732
  // 412 x 914  = 412 x 732
  // 390 x 844  = 385 x 685
  // 375 x 667  = 372 x 662
  // 360 x 740  = 348 x 619
  let windowW = window.innerWidth;
  let width = "1600px";
  let height = "900px";
  if (windowW < 1600) {
    width = "1200px";
    height = "675px";
  }
  if (windowW < 1370) {
    width = "1200px";
    height = "675px";
  }
  if (windowW < 830) {
    width = "654px";
    height = "1163px";
  }
  if (windowW < 770) {
    width = "568px";
    height = "1010px";
  }
  if (windowW < 420) {
    width = "412px";
    height = "732px";
  }
  if (windowW < 400) {
    width = "385px";
    height = "685px";
  }
  if (windowW < 380) {
    width = "372px";
    height = "662px";
  }
  if (windowW < 365) {
    width = "348px";
    height = "619px";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
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
                width: `${width}`,
                height: `${height}`,
                justifySelf: "center",
                alignSelf: "center",
                marginTop: windowW < 770 ? 10 : "50px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CrashGame;
