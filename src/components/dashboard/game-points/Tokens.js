import React from "react";
import { useSelector } from "react-redux";
import token from "../../../assets/images/token.svg";
// import freeTokens from "../../../assets/images/freeTokens.svg";
// import totaltoken from "../../../assets/images/totaltoken.svg";
// import usd from "../../../assets/images/usd.svg";
// import vipPoint from "../../../assets/images/vipPoints.svg";
// import freeSpin from "../../../assets/images/freeSpin.svg";
import { gamePointSelector } from "../../../features/game/gameSlice";

function Tokens() {
  const gamePoints=useSelector(gamePointSelector)

  return (
    <>
      <div className="tokens text-center d-flex flex-wrap align-items-center justify-content-between">
        <div>
          <img className="mb-20" src={token} alt="Token" />
          <p>
            Tokens: <span>{gamePoints?.points}</span>
          </p>
        </div>
        {/* <div>
          <img className="mb-20" src={freeTokens} alt="Token" />
          <p>
           Free Tokens: <span>0</span>
          </p>
        </div>
        <div>
          <img className="mb-20" src={totaltoken} alt="Token" />
          <p>
           Total Tokens: <span>0</span>
          </p>
        </div>
        <div>
          <img className="mb-20" src={usd} alt="Token" />
          <p>
            USD: <span>0</span>
          </p>
        </div>
        <div>
          <img className="mb-20" src={vipPoint} alt="Token" />
          <p>
            VIP Points: <span>0</span>
          </p>
        </div>
        <div>
          <img className="mb-20" src={freeSpin} alt="Token" />
          <p>
            Free Spin: <span>0</span>
          </p>
        </div> */}
      </div>
    </>
  );
}

export default Tokens;
