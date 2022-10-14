import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../assets/scss/screen.css";
import logo from "../../assets/images/logo.png";
import Login from "../login/Login";
import Signup from "../signup/Singup";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userAuth/authSlice";
import {  Link, useNavigate } from "react-router-dom";
import User from '../dashboard/game-points/User';

export const Header = () => {
  const navigate=useNavigate()
  // offcanvas Menu State
  const dispatch=useDispatch()

  // Login State
  const [open, setOpen] = useState(false);
  const loginClose = () => setOpen(false);
  const loginShow = () => {
    setOpen(true);
    setSignup(false);
  };

  // Signup State
  const [Signupopen, setSignup] = useState(false);
  const SignupShow = () => {
    setSignup(true);
    loginClose();
  };
const logoutUser=()=>{
  dispatch(logout())
  navigate("/")

}
let token=localStorage.getItem("token")

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-2 p-0">
              <div className="logo">
                <img src={logo} alt="LOGO" width="300px"/>
              </div>
            </div>
            <div className="col-md-4">
            <Nav className="me-auto justify-content-end align-items-center">
            <Link to="/" style={{textDecoration:"none"}}>Home</Link>
            </Nav>
            </div>
            <div className="col-md-6">
              <Nav className="me-auto justify-content-end align-items-center">
               
                {!token? (
                  <>
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={loginShow}
                    >
                      {" "}
                      Login{" "}
                    </Nav.Link>
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={SignupShow}
                    >
                      Sign In{" "}
                    </Nav.Link>
                  </>
                ) : (
                  <div className="user_icon d-flex align-items-center"> 
                  {/* <button  onClick={logoutUser}>Logout</button> */}
                  
                  <User />
                  <NavDropdown title="" id="basic-nav-dropdown">
                    <NavDropdown.Item ><Link to="/dashboard">Dashboard</Link> </NavDropdown.Item>
                    <NavDropdown.Item  onClick={logoutUser}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  </div>
                )}
              </Nav>
            </div>
          </div>
        </div>
      </header>

      {/* Calling Components */}
      <Login open={open} setOpen={setOpen} SignupShow={SignupShow} />
      <Signup
        Signupopen={Signupopen}
        setSignup={setSignup}
        loginShow={loginShow}
      />
    </>
  );
};
