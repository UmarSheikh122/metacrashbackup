import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (msg) => toast.success(msg);
const notfiFail = (msg) => toast.error(msg);

function Toast() {
  return (
    <ToastContainer
      position="top-right"
      theme="dark"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
export { notifySuccess, notfiFail };
export default Toast;