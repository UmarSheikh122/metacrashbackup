import axios from "axios";
import { toast } from "react-toastify";

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
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("gamePlay", true);
      dispatch({
        type: "LOGIN",
        payload: result.data,
      });
    }
  };
};

export const Signup = (body) => {
  return async (dispatch) => {
    let result = await axios.post(`${baseURL}/user/createuser`, body);
    if (result.data.message == "User wallet is registerd") {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("gamePlay", true);
      dispatch({
        type: "LOGIN",
        payload: result.data,
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
    console.log(result)
    if (result.data.message == "sucess") {
      dispatch(LoginAction(loginBody));
      toast.success("Withdraw completed.");
      dispatch({ type: "LOADING", payload: false });
      callback && callback();

    } else {
      toast.error("Withdraw failed.");
    } 
  } catch (error) {
    if(error){
      console.log(error.response.data.message)
      dispatch({ type: "LOADING", payload: false });
      toast.error(error.response.data.message);
    }
  }
}}
