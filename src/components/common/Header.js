import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../assets/scss/screen.css";
import logo from "../../assets/images/logo.png";
import Login from "../login/Login";
import DashboardModal from "../dashboardModal/dashboardModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import User from "../dashboard/game-points/User";
import { ethers } from "ethers";
import ConnectWallet from "./ConnectWallet";
import { toast } from "react-toastify";
import { LoginAction } from "../../app/action";
import * as web3 from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

export const Header = ({ setGame, game }) => {
  const navigate = useNavigate();
  // offcanvas Menu State
  const dispatch = useDispatch();
  const { CC, provider, walletKey } = useSelector((store) => store.InitReducer);

  // Login State
  const [open, setOpen] = useState(false);
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
  let token = localStorage.getItem("token");

  //
  const [walletAccount, setWalletAccount] = useState();
  const [ethBalance, setEthBalance] = useState();

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
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
              // console.log(res);
              dispatch(
                LoginAction({ address: res[0], chain: "ETH" }, dispatch)
              );
              navigate("/");
              setWalletAccount(res[0]);
              window.ethereum
                .request({
                  method: "eth_getBalance",
                  params: [res[0], "latest"],
                })
                .then((balance) => {
                  // console.log(ethers.utils.formatEther(balance));
                  setEthBalance(ethers.utils.formatEther(balance));
                });
            });
        });
    } else {
      alert("Please install Metamask to use this service!");
      toast.error("Please install Metamask to use this service!");
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
    e.preventDefault();
    setWalletAccount(null);
    localStorage.setItem("token", "");
    localStorage.setItem("gamePlay", false);
    navigate("/");
  };

  // console.log(ethBalance);

  // const [provider, setProvider] = useState(null);
  // const [walletKey, setWalletKey] = useState(null);

  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };

  const connectPhantomWallet = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        const response = await provider.connect();
        const pubKey = await provider.publicKey;
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
        navigate("/");
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
        console.log("works");
        toast.error("Please install Metamask to use this service!");
      }
    } else {
      toast.error("Please install Metamask to use this service!");
    }
  };

  const disconnect = async (e) => {
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
    //Changes are only here, in the beginning
    const phantomProvider = provider;
    if (!phantomProvider) {
      // console.log("No provider found", phantomProvider);
    }
    const pubKey = await phantomProvider.publicKey;
    // console.log("Public Key: ", pubKey);

    // Establishing connection
    var connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    // convert sol to lamports
    let lamports = +body.amount * web3.LAMPORTS_PER_SOL;

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey(
      "6PAsz5tRuPjqBzZzMjqrAvKyQ4kzcdQgAQyi4pfhgbDA"
    );

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee

    airDropSol(connection, pubKey, lamports);

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
      // console.log("confirm", txid);
      return { txID: txid };
    } catch (err) {
      // console.log("err", err);
      return { txID: false };
    }
  }

  const openDashboard = (e) => {
    setSignup(true);
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
                {walletAccount && (
                  <div className="user_icon d-flex align-items-center">
                    <User header="header" cc={CC} />
                    <NavDropdown title="" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={openDashboard}>
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={disconnectMetaMast}>
                        Disconnect
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                )}
                {walletKey && (
                  <div className="user_icon d-flex align-items-center">
                    <User header="header" cc={CC} />
                    <NavDropdown title="" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={openDashboard}>
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
      />

      <DashboardModal
        Signupopen={Signupopen}
        setSignup={setSignup}
        depositSol={transferSOL}
        sendETH={sendETH}
      />
    </>
  );
};
