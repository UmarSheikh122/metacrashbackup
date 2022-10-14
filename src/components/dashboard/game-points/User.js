import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../assets/images/Avatar.svg";
import {userAuthSelector} from "../../../features/userAuth/authSlice"

function User() {
  const userObj=useSelector(userAuthSelector)
  return (
    <>
      <div className="user">
        <img className="img-fluid" src={Avatar} alt="" />
        <h4>{userObj?.user?.userObj?.name}</h4>
      </div>
    </>
  );
}

export default User;
