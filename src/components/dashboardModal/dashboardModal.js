import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import sol from "../../assets/images/sol.png";
import phantom from "../../assets/images/phantom.png";
import metamask from "../../assets/images/metamask.png";
import ethereum from "../../assets/images/ethereum.png";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { DepositAction, WithdrawAction } from "../../app/action";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function DashboardModal({ Signupopen, setSignup, depositSol, sendETH }) {
  const [setErrorMessage] = useState("");
  const [key, setKey] = useState("home");
  const [loading, setLoading] = useState(false);
  const [deposit, setDeposit] = useState({});
  const [withdraw, setWithdraw] = useState();
  let { user, loadingApi } = useSelector((store) => store.InitReducer);
  const [username, setUsername] = useState(user?.username);
  let dispatch = useDispatch();
  const [verifyUserOpen, setVerifyUserOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const sendDeposit = async (e) => {
    e.preventDefault();
    let body = {
      amount: deposit.amount * 1,
      chain: user.network.toUpperCase(),
    };
    setLoading(true);
    let result = await depositSol(body);
    if (result.txID) {
      body.trxId = result.txID;
      dispatch(DepositAction(body));
      toast.success("Deposit successfully.");
    } else {
      toast.error("Deposit failed.");
    }
    setLoading(false);
    setDeposit({ amount: 0 });
    console.log(result);
  };
  const sendWithdraw = async (e) => {
    e.preventDefault();
    let body = {
      points: withdraw * 1,
      chain: user.network.toUpperCase(),
      address: user?.wallet,
    };
    dispatch(WithdrawAction(body));
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
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                              value={deposit?.amount}
                              onChange={(e) =>
                                setDeposit({
                                  ...deposit,
                                  amount: e.target.value,
                                })
                              }
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
                                sendDeposit(e);
                              }}
                              disabled={loading}
                            >
                              {loading ? (
                                <CircularProgress size={20} />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div className="profile_Wrapper">
                          <div className="profile_items">
                            <div className="profile_label">Points:</div>
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
                              onClick={sendWithdraw}
                              disabled={loadingApi}
                            >
                              {loadingApi ? (
                                <CircularProgress size={20} />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </div>
                      </Tab.Pane>
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