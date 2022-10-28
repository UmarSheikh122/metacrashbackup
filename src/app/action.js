import axios from "axios";
import { toast } from "react-toastify";

let baseURL = process.env.REACT_APP_API_URL;
function getToken() {
  let token = localStorage.getItem("token");

  if (token) return token;
  return null;
}

export const LoginAction = (body, dispatch) => {
  console.log("LoginAction>>>>", body);
  return async (dispatch) => {
    let result = await axios.post(`${baseURL}/user/checkuser`, body);
    console.log(result.data);
    if (result.data.message == "Wallet address is not avaliable") {
      dispatch(
        Signup({
          ...body,
          profile: "profile",
          username: "username",
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
  console.log("Signup>>>>", body);
  return async (dispatch) => {
    let result = await axios.post(`${baseURL}/user/createuser`, body);
    console.log(result.data);
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

export const DepositAction = (body) => {
  console.log("DepositAction>>>>", body);
  // {
  //   "amount":2,
  //   "trxId":"9rV5yjev35P6PodKePvt9pjNqHiKHYg3LWDNkMxSFDVQ",
  //   "chain":"SOL"
  // }
  return async (dispatch) => {
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
    console.log(result.data);
  };
};
export const WithdrawAction = (body) => {
  console.log("WithdrawAction>>>>", body);
  // {
  //   "amount":2,
  //   "trxId":"9rV5yjev35P6PodKePvt9pjNqHiKHYg3LWDNkMxSFDVQ",
  //   "chain":"SOL"
  // }
  return async (dispatch) => {
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
    if (result.data.message == "sucess") {
      toast.success("Withdraw completed.");
    }else{
      toast.error("Withdraw failed.");
    }
    dispatch({ type: "LOADING", payload: false });
  };
};
