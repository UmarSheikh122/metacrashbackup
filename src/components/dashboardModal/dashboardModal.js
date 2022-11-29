import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import sol from "../../assets/images/sol.png";
import phantom from "../../assets/images/phantom.png";
import metamask from "../../assets/images/metamask.png";
import ethereum from "../../assets/images/ethereum.png";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { DepositAction, WithdrawAction } from "../../app/action";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import axios from "axios";
import { EncryptData } from "../../utils/Aes";

function DashboardModal({ Signupopen, 
  setSignup, 
  depositSol, 
  activeTab, 
  phantomWalletConnect, 
  metaMaskWalletConnect
}) {
  const [setErrorMessage] = useState("");
  const [key, setKey] = useState("home");
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  let { user, loadingApi } = useSelector((store) => store.InitReducer);
  const [username, setUsername] = useState(user?.username);
  let dispatch = useDispatch();
  const [verifyUserOpen, setVerifyUserOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log('user: ', user);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const refreshPage = () => {
    setTimeout(() => {
      if (location.pathname == "/game_play") 
        window.location.reload(false);
    }, 2000);
  }
  const ethDeposit = async (e) => {
    e.preventDefault();
    try {
      if(deposit == 0){
        toast.error("Enter amount to Deposit");
        return;
      }
          let API_Response = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/validatetoken`,
            {},
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        console.log('API_Response****: ', API_Response);
      if(API_Response?.status === 200) {
          let body = {
            amount: deposit * 1,
            chain: user.network.toUpperCase(),
          };
          setLoading(true);
          if (!window.ethereum) {
            alert("Please install Metamask Wallet");
            return;
          }
          await window.ethereum.send("eth_requestAccounts");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const tx = await signer.sendTransaction({
            to: process.env.REACT_APP_ADMIN_ETH_ADDRESS,
            value: ethers.utils.parseEther(deposit),
          });
          if (tx) {
            body.trxId = tx?.hash;

              let encryptedBody = EncryptData(body);

            let loginBody = {
              address: user?.wallet,
              chain: user?.network.toUpperCase(),
            };
            dispatch(DepositAction({ encrypteddata: encryptedBody}, loginBody));

            setTimeout(() => {
              if (location.pathname == "/game_play")
                window.location.reload(false);
            }, 2000);
          } else {
            toast.error("Deposit failed");
          }
          setLoading(false);
          setDeposit({
            amount: 0,
          });
      }else {
        toast.error(API_Response.message || "Auth Failed");
      }
      
    } catch(err){
      toast.error(err?.response?.data?.message || "Transaction Failed");
      setLoading(false);
        console.log("error", err)
    }

  }
  const sendDeposit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token")
      // if(!token)
      //   {
      //     toast.error("Please login again");
      //     return;
      //   }
    try {
      if (deposit == 0) {
        toast.error("Enter amount to deposit");
        return true;
      }

      let API_Response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/validatetoken`,
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
        console.log('API_Response****: ', API_Response);
      if(API_Response?.status === 200) 
      {
         let body = {
           amount: deposit * 1,
           chain: user.network.toUpperCase(),
         };
         setLoading(true);
         let result = await depositSol(body);
         if (result.txID) {
           body.trxId = result.txID;
           let encryptedBody = EncryptData(body);
           let loginBody = {
             address: user?.wallet,
             chain: user?.network.toUpperCase(),
           };
           dispatch(DepositAction({ encrypteddata: encryptedBody }, loginBody));
           setTimeout(() => {
             if (location.pathname == "/game_play")
               window.location.reload(false);
           }, 2000);
         } else {
           toast.error("Deposit failed.");
         }
         setLoading(false);
         setDeposit({ amount: 0 });
      }
     
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Authentication Failed")
      console.log(error);
    }
  };

  const ethWithdraw = async (e) => {
    e.preventDefault();
    if(withdraw === 0){
      toast.error("Enter amount to withdraw");
      return;
    }
    let body = {
      points: withdraw * 1,
      chain: user.network.toUpperCase(),
      address: user?.wallet,
    };
    let encryptedBody = EncryptData(body);
    let loginBody = {
      address: user?.wallet,
      chain: user?.network.toUpperCase(),
    };
     dispatch(WithdrawAction({ encrypteddata : encryptedBody}, loginBody, refreshPage));
     setWithdraw(0);
  }
  const sendWithdraw = async (e) => {
    e.preventDefault();
    if (withdraw == 0) {
      toast.error("Enter amount to withdraw");
      return true;
    }
    let body = {
      points: withdraw * 1,
      chain: user.network.toUpperCase(),
      address: user?.wallet,
    };
    let encryptedBody = EncryptData(body);
    
    let loginBody = {
      address: user?.wallet,
      chain: user?.network.toUpperCase(),
    };
    dispatch(
      WithdrawAction({ encrypteddata: encryptedBody }, loginBody, refreshPage)
    );
    setWithdraw(0);
  };
  return (
    <>
      <Modal
        className="login_modal"
        show={Signupopen}
        onHide={() => {
          setSignup(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form_field">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey={activeTab}
                >
                  <div className="mb-4">
                    <Nav variant="pills" className="flex-row _tabs">
                      <Nav.Item className="_nav_tabs">
                        <Nav.Link eventKey="first">
                          <h5>Profile</h5>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="_nav_tabs">
                        <Nav.Link eventKey="second">
                          <h5>Deposit</h5>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item className="_nav_tabs">
                        <Nav.Link eventKey="third">
                          <h5>Withdraw</h5>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>

                  <div className="_networks">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <div className="profile_Wrapper">
                          <div className="profile_items">
                            <div className="profile_label">Username:</div>
                            <input
                              type="text"
                              className="profile_username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder={user?.username}
                            />
                          </div>
                          <div className="profile_items">
                            <div className="profile_label">Profile Pic:</div>
                            <input type="file" className="profile_pic" />
                          </div>
                          <div className="profile_items">
                            <button className="profile_submit">Save</button>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div className="profile_Wrapper">
                          <div className="profile_items">
                            <div className="profile_label">Amount:</div>
                            <input
                              type="number"
                              className="profile_username"
                              value={deposit}
                              onChange={(e) => setDeposit(e.target.value)}
                            />
                          </div>
                          <div className="profile_items">
                            <div className="profile_label">
                              Your Wallet Address:
                            </div>
                            <input
                              type="text"
                              className="profile_username"
                              disabled
                              value={user?.wallet}
                            />
                          </div>
                          <div className="profile_items">
                            <button
                              className="profile_save"
                              onClick={(e) => {
                                metaMaskWalletConnect
                                  ? ethDeposit(e)
                                  : sendDeposit(e);
                              }}
                              disabled={loading}
                            >
                              {loading ? (
                                <CircularProgress size={20} />
                              ) : (
                                "Send Request"
                              )}
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="profile_Wrapper">
                          <div className="profile_items">
                            <div className="profile_label">
                              {metaMaskWalletConnect ? "Eth:" : "Sol:"}
                            </div>
                            <input
                              type="number"
                              className="profile_username"
                              value={withdraw}
                              onChange={(e) => setWithdraw(e.target.value)}
                            />
                          </div>
                          <div className="profile_items">
                            <div className="profile_label">
                              Your Wallet Address:
                            </div>
                            <input
                              type="text"
                              className="profile_username"
                              disabled
                              value={user?.wallet}
                            />
                          </div>
                          <div className="profile_items">
                            <button
                              className="profile_save"
                              onClick={(e) =>
                                metaMaskWalletConnect
                                  ? ethWithdraw(e)
                                  : sendWithdraw(e)
                              }
                              disabled={loadingApi}
                            >
                              {loadingApi ? (
                                <CircularProgress size={20} />
                              ) : (
                                "Send Request"
                              )}
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>
                      { (loadingApi || loading) && <p style={{ fontSize: "12px", marginTop: "30px", color: "black", fontStyle: "italic" }}>
                        *Server might get busy, your patience is highly
                        appreciated
                      </p>}
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DashboardModal;
