import { useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

function App() {
  const [provider, setProvider] = useState(null);
  const [walletKey, setWalletKey] = useState(null);

  const getProvider = () => {
    if ("solana" in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };

  const connectWallet = async () => {
    const provider = getProvider();
    console.log("asdfasdf");
    if (provider) {
      try {
        const response = await provider.connect();
        const pubKey = await provider.publicKey;
        setProvider(provider);
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };
  const disconnect = async () => {
    const provider = getProvider();
    console.log("asdfasdf");
    if (provider) {
      try {
        const response = await provider.disconnect();
        setProvider(response);
        // setWalletKey(response.publicKey.toString());
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  // useEffect(() => {
  //   if (!provider) {
  //     connectWallet();
  //   }
  // }, [provider]);

  const airDropSol = async (connection, publicKey) => {
    try {
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        web3.LAMPORTS_PER_SOL
      );

      const latestBlockHash = await connection.getLatestBlockhash();

      // Confirming that the airdrop went through
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
      });
      console.log("Airdropped");
    } catch (error) {
      console.error(error);
    }
  };

  async function transferSOL() {
    //Changes are only here, in the beginning
    const phantomProvider = provider;
    if (!phantomProvider) {
      console.log("No provider found", phantomProvider);
    }
    const pubKey = await phantomProvider.publicKey;

    // Establishing connection
    var connection = new web3.Connection(
      web3.clusterApiUrl(process.env.REACT_APP_SOL_NETWORK),
      "confirmed"
    );

    // I have hardcoded my secondary wallet address here. You can take this address either from user input or your DB or wherever
    var recieverWallet = new web3.PublicKey(
      "MDxdwaiyLkz1WvW7TdDssdiTP5aTyQwazB2owra1Me6"
    );

    // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee

    airDropSol(connection, pubKey);

    console.log("WORKED 1");
    let transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: recieverWallet,
        lamports: web3.LAMPORTS_PER_SOL,
      })
    );
    // const instructions = web3.SystemProgram.transfer({
    //   fromPubkey: pubKey,
    //   toPubkey: recieverWallet,
    //   lamports: web3.LAMPORTS_PER_SOL, //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
    // })
    // transaction.add(instructions)
    console.log("WORKED 2");
    // Setting the variables for the transaction
    transaction.feePayer = pubKey;

    let blockhashObj = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhashObj.blockhash;


    let signed = "";
    try {
      signed = await phantomProvider.signTransaction(transaction);
    } catch (err) {
      console.log("err", err);
    }

    let txid = "";
    try {
      txid = await connection.sendRawTransaction(signed.serialize());
    } catch (ex) {
      console.log("ex", ex);
    }

    try {
      await connection.confirmTransaction(txid);
    } catch (err) {
      console.log("err", err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tutorial: Connect to Phantom Wallet</h2>
        <button onClick={connectWallet}>Connect to Phantom</button>
        <button onClick={disconnect}>DisConnect to Phantom</button>
        {provider && walletKey && <p>Connected account {walletKey}</p>}
        {provider && walletKey && <button onClick={transferSOL}>TEST</button>}

        {!provider && (
          <p>
            No provider found. Install{" "}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
