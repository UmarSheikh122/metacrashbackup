import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../assets/scss/screen.css";
import logo from "../../assets/images/logo.png";
import Login from "../login/Login";
import DashboardModal from "../dashboardModal/dashboardModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import User from "../dashboard/game-points/User";
import { ethers } from "ethers";
// import ConnectWallet from "./ConnectWallet";
import { toast } from "react-toastify";
import { LoginAction } from "../../app/action";
import * as web3 from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

export const Header = ({ setGame, game, showPoints, setShowPoints }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // offcanvas Menu State
  const dispatch = useDispatch();
  const { CC, ETH, SOL, provider, walletKey, walletAccount } = useSelector((store) => store.InitReducer);


  // Login State
  const [open, setOpen] = useState(false); //Login
  const [activeTab, setActiveTab] = useState("first");
  const [phantomWalletConnect,setPhantomWalletConnect] = useState(false);
  const [metaMaskWalletConnect, setMetaMaskWalletConnect] = useState(false);
  const loginClose = () => setOpen(false);
  const loginShow = () => {
    setOpen(true);
    setSignup(false);
    setGame(false);
  };

  // Signup State
  const [Signupopen, setSignup] = useState(false);
  const SignupShow = () => {
    setSignup(true);
    loginClose();
  };
  const logoutUser = () => {
    // dispatch(logout());
    navigate("/");
  };
  // transaction State
  const [transaction, setTransaction] = useState(false);
  // const transactionShow = () => {

  //   loginClose();
  // };
  // const transactionf = () => {
  //   dispatch(logout());
  //   navigate("/");
  // };

  //
  const [ethBalance, setEthBalance] = useState();

  const metaMaskWeb = () => {
    if (window.ethereum) {
      // console.log("MetaMask is installed!");
      window.ethereum
        .request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        })
        .then(() => {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => {
              dispatch({
                type: "WALLET_ACCOUNT",
                payload: res[0],
              });
              dispatch(
                LoginAction({ address: res[0], chain: "ETH" }, dispatch)
              );
              window.ethereum
                .request({
                  method: "eth_getBalance",
                  params: [res[0], "latest"],
                })
                .then((balance) => {
                  // console.log(ethers.utils.formatEther(balance));
                  setEthBalance(ethers.utils.formatEther(balance));
                  setMetaMaskWalletConnect(true);
                  setTimeout(() => {
                    if (location.pathname == "/game_play")
                      window.location.reload(false);
                  }, 2000);
                });
            });
        });
    } else {
      alert("Please install Metamask to use this service!");
      // toast.error("Please install Metamask to use this service!");
    }
  }

  const connectMetaMask = async (e) => {

    if (window.ethereum) {
      metaMaskWeb();
    } else {
      window.addEventListener("ethereum#initialized", metaMaskWeb, {
        once: true,
      });

      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(metaMaskWeb, 4000); // 3 seconds
    }


    // console.log("Please install Metamask to use this service!");
  };

  let sendETH = async (e) => {
    // e.preventDefault();
    // console.log(state);
    let gasPrice = "0x5208";
    let amountHex = (0.001 * Math.pow(10, 18)).toString(16);

    let tx = {
      from: walletAccount,
      to: "0xD477DDD67D4BEF2e32Ec9c22ebB7Af6C3C539dfd",
      value: amountHex,
      gas: gasPrice,
    };

    let result = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });
    // console.log(result);
    return result;
  };

  const disconnectMetaMast = (e) => {
    // console.log("works");
    setMetaMaskWalletConnect(false);
    e.preventDefault();
    dispatch({
      type: "WALLET_ACCOUNT",
      payload: null,
    });

    localStorage.setItem("token", "");
    localStorage.setItem("gamePlay", false);
    navigate("/");
  };

  // console.log(ethBalance);

  // const [provider, setProvider] = useState(null);
  // const [walletKey, setWalletKey] = useState(null);

  const getProvider = () => {
    // if ("phantom" in window){
    //   console.log('window: ', window);
    // }
    //   if ("solana" in window) {
    //     window.solana.connect({
    //       onlyIfTrusted: true,
    //     });
    //     const provider = window.solana;
    //     if (provider.isPhantom) {
    //       return provider;
    //     } else {
    //       window.open("https://www.phantom.app/", "_blank");
    //       return undefined;
    //     }
    //   }

    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");

  };

  const connectPhantomWallet = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        const response = await provider.connect();

        const pubKey = await response.publicKey;
        // console.log(pubKey);
        // setProvider(provider);
        // setWalletKey(response.publicKey.toString());
        dispatch({ type: "PROVIDER", payload: provider });
        dispatch({
          type: "WALLET_KEY",
          payload: response.publicKey.toString(),
        });
        dispatch(
          LoginAction(
            { address: response.publicKey.toString(), chain: "Sol" },
            dispatch
          )
        );
        setPhantomWalletConnect(true);
        setTimeout(()=> {
          if (location.pathname == "/game_play")
               window.location.reload(false);
        },2000)
        ///HELL
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
        // toast.error("Please install phantom to use this service!");
        alert("Please install phantom to use this service!");
      }
    } else {
      alert("Please install phantom to use this service!");
    }
  };

  const disconnect = async (e) => {
    setPhantomWalletConnect(false);
    e.preventDefault();
    const provider = getProvider();
    // console.log("asdfasdf");
    if (provider) {
      try {
        const response = await provider.disconnect();
        // console.log(response);

        dispatch({ type: "PROVIDER", payload: null });
        dispatch({ type: "WALLET_KEY", payload: null });
        navigate("/");
        localStorage.setItem("gamePlay", false);
        localStorage.setItem("token", "");
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  const airDropSol = async (connection, publicKey, lamports) => {
    try {
      console.log(lamports);
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        lamports
      );

      const latestBlockHash = await connection.getLatestBlockhash();

      // Confirming that the airdrop went through
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
      });
      // console.log("Airdropped");
    } catch (error) {
      console.error(error);
    }
  };

  async function transferSOL(body) {
    const provider = getProvider();
    const xyz = await provider.connect();
    //Changes are only here, in the beginning
    const phantomProvider = provider;
    if (!phantomProvider) {
      console.log("NOOOO Provider")
      // // console.log("No prkovider found", phantomProvider);
    }
    const pubKey = await phantomProvider.publicKey;

    // Establishing connection
    var connection = new web3.Connection(
      process.env.REACT_APP_SOL_QUICKNODE,
      "confirmed"
    );
    // convert sol to lamports
    let lamports = +body.amount * web3.LAMPORTS_PER_SOL;

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey(
      process.env.REACT_APP_ADMIN_SOL_ADDRESS
    );

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee

    // airDropSol(connection, pubKey, lamports);

    // console.log("WORKED 1");
    let transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: recieverWallet,
        lamports: lamports,
      })
    );
    // const instructions = web3.SystemProgram.transfer({
    //   fromPubkey: pubKey,
    //   toPubkey: recieverWallet,
    //   lamports: web3.LAMPORTS_PER_SOL, //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
    // })
    // transaction.add(instructions)
    // console.log("WORKED 2");
    // Setting the variables for the transaction
    transaction.feePayer = pubKey;

    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;

    // console.log("provider", phantomProvider);

    let signed = "";
    try {
      signed = await phantomProvider.signTransaction(transaction);
    } catch (err) {
      // console.log("err", err);
      return { txID: false };
    }

    let txid = "";
    try {
      txid = await connection.sendRawTransaction(signed.serialize());
    } catch (ex) {
      // console.log("ex", ex);
      return { txID: false };
    }

    try {
      await connection.confirmTransaction(txid);
      return { txID: txid };
    } catch (ex) {
      // console.log("ex", ex);
      return { txID: false };
    }

    // try {
    
    //   // console.log("confirm", txid);
    //   return { txID: txid };
    // } catch (err) {
    //   // console.log("err", err);
    //   return { txID: false };
    // }
  }

  const openDashboard = (tab) => {
    setSignup(true);
    if (tab) {
      setActiveTab(tab);
    }
  };
  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-6 p-0">
              <div className="logo">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <img src={logo} alt="LOGO" className="logo_img" />
                </Link>
              </div>
            </div>

            <div className="col-md-6">
              <Nav className="me-auto justify-content-end align-items-center">
                {/* <button
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                  onClick={connectMetaMask}
                >
                  Connect Wallet
                </button>
                <button
                  className="btn btn-primary"
                  style={{ textDecoration: "none", marginLeft: 10 }}
                  onClick={() => {
                    setTransaction(true);
                  }}
                >
                  Send Eth
                </button> */}
                {!walletAccount && !walletKey && (
                  <>
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={loginShow}
                    >
                      Connect Wallet
                    </Nav.Link>
                  </>
                )}
                {/* Ether Metamask => Actions */}
                {walletAccount && (
                  <div className="user_icon d-flex align-items-center">
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={() => {
                        setMetaMaskWalletConnect(true);
                        openDashboard("second");
                      }}
                      style={{ padding: "10px 20px" }}
                    >
                      Deposit
                    </Nav.Link>
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={() => {
                        setMetaMaskWalletConnect(true);
                        openDashboard("third");
                      }}
                      style={{ marginRight: 100, padding: "10px 20px" }}
                    >
                      Withdraw
                    </Nav.Link>
                    <User
                      header="header"
                      cc={CC}
                      showPoints={showPoints}
                      eth={true}
                      ETH={ETH}
                    />
                    <NavDropdown title="" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => {
                          setMetaMaskWalletConnect(true);
                          openDashboard("first");
                        }}
                      >
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={disconnectMetaMast}>
                        Disconnect
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
                {/* Solana Phantom -> Actions */}
                {walletKey && (
                  <div className="user_icon d-flex align-items-center">
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={() => {
                        setPhantomWalletConnect(true);
                        openDashboard("second");
                      }}
                      style={{ padding: "10px 20px" }}
                    >
                      Deposit
                    </Nav.Link>
                    <Nav.Link
                      to=""
                      className="btn menu-btn"
                      onClick={() => {
                        setPhantomWalletConnect(true);
                        openDashboard("third");
                      }}
                      style={{ marginRight: 100, padding: "10px 20px" }}
                    >
                      Withdraw
                    </Nav.Link>
                    <User
                      header="header"
                      cc={CC}
                      showPoints={showPoints}
                      SOL={SOL}
                    />
                    <NavDropdown title="" id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => {
                          setPhantomWalletConnect(true);
                          openDashboard("first");
                        }}
                      >
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={disconnect}>
                        Disconnect
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
              </Nav>
            </div>
          </div>
        </div>
      </header>
      {/* <ConnectWallet /> */}

      {/* Calling Components */}
      <Login
        open={open}
        setOpen={setOpen}
        SignupShow={SignupShow}
        connectMetaMask={connectMetaMask}
        walletAccount={walletAccount}
        disconnectMetaMast={disconnectMetaMast}
        connectPhantomWallet={connectPhantomWallet}
        disconnect={disconnect}
        provider={provider}
        walletKey={walletKey}
        phantomWalletConnect={phantomWalletConnect}
        metaMaskWalletConnect={metaMaskWalletConnect}
      />

      <DashboardModal
        Signupopen={Signupopen}
        setSignup={setSignup}
        depositSol={transferSOL}
        sendETH={sendETH}
        activeTab={activeTab}
        phantomWalletConnect={phantomWalletConnect}
        metaMaskWalletConnect={metaMaskWalletConnect}
      />
    </>
  );
};
