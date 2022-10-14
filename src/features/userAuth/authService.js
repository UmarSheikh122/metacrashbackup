import axios from "axios";

const API_URL = "http://ec2-103-4-14-209.ap-northeast-1.compute.amazonaws.com:5000";

// Register user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/user/signin`, userData);
  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
  }
console.log('response', response)
  return response.data;
};

// Login user
const register = async (userData) => {
  let response = await axios.post(`${API_URL}/user/signup`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const verifyEmail=async(data)=>{
  let result = await axios.post(`${API_URL}/user/userverification`,data)
      return result;
}

const authService = {
  register,
  verifyEmail,
  login,
};

export default authService;
