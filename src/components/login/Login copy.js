import React, { useState } from "react";
//import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/google.svg";
import { useFormik } from "formik";
// import {
//   errorSelector,
//   userAuthSelector,
//   loginUser,
// } from "../../features/userAuth/authSlice";
import VerifyUserModal from "../verify-user/VerifyUserModal";

// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginValidation } from "../../helpers/Validation";

function Login({ open, setOpen, SignupShow, message }) {
  // const loginError = useSelector(errorSelector);
  // const {loading} = useSelector(userAuthSelector);
  const [ setErrorMessage] = useState("");

  const [verifyUserOpen, setVerifyUserOpen] = useState(false);
  const loginClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  // const dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      localStorage.setItem("email",values.email)
      console.log('values.email', values.email)
      // dispatch(loginUser(values))
      //   .unwrap()
      //   .then(() => {
      //     navigate("/");
      //     formik.resetForm();
      //     loginClose();
      //   }).catch((err)=>{
      //     if(err==="Invalid credential" ){
      //       setErrorMessage(err);
             
      //     }else{
    
      //       loginClose();
      //     }
          
  
      //   })
    },
  });


  return (
    <>
      <Modal
        className="login_modal"
        show={open}
        onHide={loginClose}
        backdrop="static"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-md-5 p-0">
              <div className="--contet">
                <h2>Hello Again,</h2>
                <p className="max-25 pb-100">
                  Play all your favorite games and get your Bonus!
                </p>
                <img className="img-fluid" src={logo} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="form_field ">
                <h4 className="mb-30">Login</h4>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      aria-label=""
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p style={{ color: "red" }}> {formik.errors.email}</p>
                    )}
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      name="password"
                      aria-label=""
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p style={{ color: "red" }}> {formik.errors.password}</p>
                    )}
                    <div>
                      {/* {loginError !== "" && (
                        <p style={{ color: "red" }}>{loginError}</p>
                      )} */}
                    </div>
                    <button type="submit" className="btn w-100">
                    {/* {loading ? (
                      <>
                        {" "}
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </> */}
                    {/* // ) : ( */}
                      <> Continue</>
                    {/* // )} */}
                    </button>
                  </div>
                </form>
                <div className="form_text d-flex pt-20 align-items-center">
                  <p className="m-0">Don’t have an account ?</p>
                  {/* <Link>About</Link> */}
                  <button onClick={SignupShow}>Signup</button>
                </div>
                {/* <div className='or_text d-flex pt-20 align-items-center'>
                  <hr />
                  <p>or</p>
                  <hr />
                </div> */}
                <div>
                  <img className="img-fluid mt-20" src={google} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <VerifyUserModal
        openVerifyModal={verifyUserOpen}
        setOpenVerifyModal={setVerifyUserOpen}
      />{" "}
    </>
  );
}

export default Login;
