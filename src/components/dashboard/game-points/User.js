import React from "react";
// import { useSelector } from "react-redux";
import Avatar from "../../../assets/images/Avatar.svg";
// import {userAuthSelector} from "../../../features/userAuth/authSlice"
// import { gamePointSelector } from "../../../features/game/gameSlice";

function User({ cc }) {
  // const gamePoints=useSelector(gamePointSelector)
  // const userObj=useSelector(userAuthSelector)
  return (
    <>
      <div className="user">
        <img className="img-fluid" src={Avatar} alt="" />
        <h4>
          Sol: {(cc).toFixed(3)}
          {/* {userObj?.user?.userObj?.name} */}
          {/* some Name */}
          {/* {header==="header" && gamePoints?.points} */}
        </h4>
      </div>
    </>
  );
}

export default User;
