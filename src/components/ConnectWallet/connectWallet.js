import React, { useState } from "react";
//import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.svg";
import { useFormik } from "formik";

import VerifyUserModal from "../verify-user/VerifyUserModal";

// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Login({ open, setOpen, message, walletAccount }) {
  const [state, setState] = useState("");

  // const dispatch = useDispatch();
  let navigate = useNavigate();

  let submitSuccess = async (e) => {
    e.preventDefault();
    console.log(state);
    let gasPrice = "0x5208";
    let amountHex = (state.amount * Math.pow(10, 18)).toString(16);

    let tx = {
      from: walletAccount,
      to: state.recieverID,
      value: amountHex,
      gas: gasPrice,
    };

    let result = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });
    console.log(result);
  };

  return (
    <>
      <Modal
        className="login_modal"
        show={open}
        backdrop="static"
        onHide={() => {
          setOpen(!open);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-md-5 p-0">
              <div className="--contet">
                <h2>Hello Again,</h2>
                <p className="max-25 pb-100">
                  Play all your favorite games and get your Bonus!
                </p>
                <img className="img-fluid" src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="form_field ">
                <h4 className="mb-30">Send Transaction</h4>
                <form onSubmit={submitSuccess}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter amount"
                      name="amount"
                      aria-label=""
                      onChange={(e) => {
                        setState({ ...state, [e.target.name]: e.target.value });
                      }}
                    />

                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Reciever ID"
                      name="recieverID"
                      aria-label=""
                      onChange={(e) => {
                        setState({ ...state, [e.target.name]: e.target.value });
                      }}
                    />

                    <button type="submit" className="btn w-100">
                      Continue
                    </button>
                  </div>
                </form>
                <div className="form_text d-flex pt-20 align-items-center">
                  <p className="m-0">Don’t have an account ?</p>
                  <button>Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
