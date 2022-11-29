import axios from "axios";
import { toast } from "react-toastify";
import { DecryptData } from "../utils/Aes";

let baseURL = process.env.REACT_APP_API_URL
function getToken() {
  let token = localStorage.getItem("token");

  if (token) return token;
  return null;
}
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const LoginAction = (body) => {
  return async (dispatch) => {
    let result = await axios.post(`${baseURL}/user/checkuser`, body);
    if (result.data.message == "Wallet address is not avaliable") {
      dispatch(
        Signup({
          ...body,
          profile: "profile",
          username: makeid(8),
          wallet: body.address,
        })
      );
    }
    if (result.data.message == "User data is fetched") {
      let decryptedData = DecryptData(result?.data?.data);
      let decryptedGameToken = DecryptData(result?.data?.gametoken);
      
      let payload = {
        token: result?.data?.token,
        user: decryptedData,
        CC: decryptedGameToken.CC / 165,
        SOL: decryptedGameToken.SOL,
        ETH: decryptedGameToken.ETH,
      }
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("gamePlay", true);


      // token: payload.token,
      //   user: payload.data,
      //   CC: payload.gametoken.CC / 165,
      //   SOL: payload.gametoken.SOL,
      //   ETH: payload.gametoken.ETH,
      dispatch({
        type: "LOGIN",
        payload: payload,
      });
    }
  };
};

export const Signup = (body) => {
  return async (dispatch) => {
    let result = await axios.post(`${baseURL}/user/createuser`, body);
    if (result.data.message == "User wallet is registerd") {

      let decryptedData = DecryptData(result?.data?.data);
      let decryptedGameToken = DecryptData(result?.data?.gametoken);

      let payload = {
        token: result?.data?.token,
        user: decryptedData,
        CC: decryptedGameToken.CC / 165,
        SOL: decryptedGameToken.SOL,
        ETH: decryptedGameToken.ETH,
      };
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("gamePlay", true);
      dispatch({
        type: "LOGIN",
        payload: payload,
      });
    }
  };
};

export const DepositAction = (body, loginBody) => {
  return async (dispatch) => {
     try { 
     const config = {
      headers: {
        authorization: "Bearer " + getToken(),
      },
    };
    let result = await axios.post(
      `${baseURL}/transaction/depositTrasaction`,
      body,
      config
      );
      dispatch(LoginAction(loginBody));  
      toast.success("Deposit successfully.");
    } catch (error) { 
      toast.error(error.response.data.message);
    }
}
}
export const WithdrawAction = (body, loginBody, callback=null) => {
  
  return async (dispatch) => {
    try {
      const config = {
        headers: {
        authorization: "Bearer " + getToken(),
      },
    };
    dispatch({ type: "LOADING", payload: true });
    let result = await axios.post(
      `${baseURL}/transaction/withdrawalTrasaction`,
      body,
      config
    );
    if (result?.data?.message == "sucess") {
      dispatch(LoginAction(loginBody));
      toast.success("Withdraw completed.");
      dispatch({ type: "LOADING", payload: false });
      callback && callback();
    } else {
      dispatch({ type: "LOADING", payload: false });
      toast.error("Withdraw failed.");
    }
    dispatch({ type: "LOADING", payload: false });

  } catch (error) {
    if(error){
      dispatch({ type: "LOADING", payload: false });
      toast.error(error?.response?.data?.message);
    }
  }
}}
