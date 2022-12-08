import React, { useState } from "react";
//import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import sol from "../../assets/images/sol.png";
import phantom from "../../assets/images/phantom.png";
import metamask from "../../assets/images/metamask.png";
import ethereum from "../../assets/images/ethereum.png";
import { useFormik } from "formik";
import * as _ from 'lodash'
import {toast} from 'react-toastify'
// import {
//   errorSelector,
//   userAuthSelector,
//   loginUser,
// } from "../../features/userAuth/authSlice";
import VerifyUserModal from "../verify-user/VerifyUserModal";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginValidation } from "../../helpers/Validation";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Box, styled } from "@mui/system";

const MetaMaskContainer = styled(Box)(({theme }) => ({
    zIndex: 999,
    cursor: "pointer",
    width: "100%",
    height: "100%",
}))
function Login({
  open,
  setOpen,
  connectMetaMask,
  walletAccount,
  disconnectMetaMast,
  connectPhantomWallet,
  walletKey,
  provider,
  disconnect,
  phantomWalletConnect,
  metamaskWalletConnect,
}) {
  // const loginError = useSelector(errorSelector);
  // const { loading } = useSelector(userAuthSelector);
  const [setErrorMessage] = useState("");
  const [key, setKey] = useState("home");

  const [verifyUserOpen, setVerifyUserOpen] = useState(false);
  const loginClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  // const dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      localStorage.setItem("email", values.email);
      // dispatch(loginUser(values))
      //   .unwrap()
      //   .then(() => {
      //     navigate("/");
      //     formik.resetForm();
      //     loginClose();
      //   })
      //   .catch((err) => {
      //     if (err === "Invalid credential") {
      //       setErrorMessage(err);
      //     } else {
      //       loginClose();
      //     }
      //   });
    },
  });

  return (
    <>
      <Modal
        className="login_modal"
        show={open}
        onHide={loginClose}
        backdrop="static"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form_field">
                <div className="_header_connect mb-2">
                  <span className="_connect">1</span>
                  <h4 className="mt-2">Choose network</h4>
                </div>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div className="_networks">
                    <Nav variant="pills" className="flex-row _tabs">
                      <Nav.Item className="_nav_tabs">
                        <Nav.Link eventKey="first">
                          <div className="_wallet_logo">
                            <img
                              src={sol}
                              alt=""
                              className="_wallet_LogoIcon"
                            />
                            <h5>Solana</h5>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="_nav_tabs">
                        <Nav.Link eventKey="second">
                          <div className="_wallet_logo">
                            <img
                              src={ethereum}
                              alt=""
                              className="_wallet_LogoIcon"
                            />
                            <h5>Ethereum</h5>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="_header_connect mb-2 mt-2">
                    <span className="_connect">2</span>
                    <h4 className="mt-2">Choose wallet</h4>
                  </div>
                  <div className="_networks">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        {/* Phantom */}
                        {!_.isEmpty(provider) ? (
                          <>
                            <div className="_phantomCollect">{walletKey}</div>
                            <button
                              className="_phantom_disconnect"
                              onClick={disconnect}
                            >
                              Disconnect
                            </button>
                          </>
                        ) : (
                          <div
                            onClick={() =>
                              _.isEmpty(walletAccount)
                                ? connectPhantomWallet()
                                : toast.error(
                                    "Please disconnect Metamask first"
                                  )
                            }
                          >
                            <img
                              src={phantom}
                              alt=""
                              className="_wallet_LogoIcon"
                            />
                          </div>
                        )}
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {walletAccount ? (
                          <>
                            <div className="_phantomCollect">
                              {walletAccount}
                            </div>
                            <button
                              className="_phantom_disconnect"
                              onClick={disconnectMetaMast}
                            >
                              Disconnect
                            </button>
                          </>
                        ) : (
                          // <div onClick={() => toast.error("Coming Soon.")}>
                          <MetaMaskContainer
                            onClick={() =>
                              _.isEmpty(provider)
                                ? connectMetaMask()
                                : toast.error("Please disconnect Phantom first")
                            }
                          >
                            <img
                              src={metamask}
                              alt=""
                              className="_wallet_LogoIcon"
                              onClick={() =>
                                _.isEmpty(provider)
                                  ? connectMetaMask()
                                  : toast.error(
                                      "Please disconnect Phantom first"
                                    )
                              }
                            />
                          </MetaMaskContainer>
                        )}
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <VerifyUserModal
        openVerifyModal={verifyUserOpen}
        setOpenVerifyModal={setVerifyUserOpen}
      />{" "}
    </>
  );
}

export default Login;
