import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
let token = localStorage.getItem("token");
const getPoints = async () => {
  let result = await axios.get(`${API_URL}/gamepoint/getpoints`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  if (result) {
    return result.data;
  }
};
const getRates = async (data) => {
  //temporary call we will call it from action then
  let result = await axios.post(
    `${API_URL}/transaction/getrates`,
    data,
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );
  if (result.data.message === "sucess") {
    console.log('result.data.data', result.data.data)
    localStorage.setItem("ratesData",JSON.stringify (result.data.data));
    return result.data.data
  
  }
};
const confirmTransaction =async(data)=>{
  let result = await axios.post(`${API_URL}/transaction/confirmdepositetransaction`,data,
    {headers: {
     authorization: "Bearer " + token,
    }}
    )
    return result;
}
const withdraw=async(data)=>{
  let result = await axios.post(`${API_URL}/transaction/createwithdrawaltrasaction`,data,
  {headers: {
   authorization: "Bearer " + token,
  }}
  )
  if(result.data.message==="success"){
  return result.data}
}
const gamePlay=async(data)=>{
  let result = await axios.post(`${API_URL}/user/userplaymode`,data,
  {headers: {
   authorization: "Bearer " + token,
  }}
  )
  console.log('result', result)
  if(result.data.message==="success"){
  return result.data }
}

const gameService = {
  getPoints,
  getRates,
  gamePlay,
  confirmTransaction,
  withdraw
  
};

export default gameService;
