import React, { useState } from "react";
//import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/logo.png";
import {
  registerUser,
  userAuthSelector,
} from "../../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { signUpValidation } from "../../helpers/Validation";
import { useFormik } from "formik";
// import VerifyUserModal from "../verify-user/VerifyUserModal";

function Signup({ Signupopen, setSignup, loginShow }) {
  const { loading } = useSelector(userAuthSelector);
  const [dobError, setDobError] = useState("");

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const VerifyModal = () => {
    setOpenVerifyModal(true);
    setSignup(false);
  };

  const [month, setMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [day, setDay] = useState("");
  const dispatch = useDispatch();
  const [singUpError, setSignUpError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
      username: "",
      dob: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      localStorage.setItem("email",values.email)
      values.dob = `${day}/${month}/${selectYear}`;
      if (values.dob !== "//") {
        dispatch(registerUser(values))
          .unwrap()
          .then(() => {
            // VerifyModal();
            setSignUpError("");
            formik.resetForm();
            setDobError("");
            setSignup(false);
          })
          .catch((err) => {
            setSignUpError(err);
            setDobError("");
          });
      } else {
        return setDobError("Date of Birth is Required!");
      }
    },
  });
  const SignupClose = () =>{ setSignup(false)
  formik.resetForm()
  };
  const months = [
    "",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let years = [];
  let year = new Date().getFullYear();
  for (let i = 0; i <= 101; i++) {
    if (i === 0) {
      years.push("");
    } else {
      years.push(year - i);
    }
  }

  let dayCount = [];
  for (let i = 0; i <= 31; i++) {
    i === 0 ? dayCount.push("") : dayCount.push(i);
  }

  return (
    <>
      <Modal
        className="login_modal"
        show={Signupopen}
        onHide={SignupClose}
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
                <h4 className="mb-30">Signup</h4>
                <form onSubmit={formik.handleSubmit}>
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      aria-label=""
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p style={{ color: "red" }}> {formik.errors.email}</p>
                    )}
                    <input
                      class="form-control"
                      type="text"
                      name="username"
                      placeholder="Username"
                      aria-label=""
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <p style={{ color: "red" }}> {formik.errors.username}</p>
                    )}
                    <div className="d_birth">
                      <label for="" class="form-label">
                        Date of birth
                      </label>
                      <div className="d-flex align-items-center justify-content-between">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setDay(e.target.value);
                          }}
                        >
                          {dayCount.map((item, i) => {
                            return (
                              <option disabled={i === 0} key={i}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {months.map((item, index) => {
                            return (
                              <option disabled={index === 0} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setSelectYear(e.target.value);
                          }}
                        >
                          {years.map((item, index) => {
                            return (
                              <option disabled={index === 0} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {dobError !== "" && (
                        <p style={{ color: "red" }}> {dobError}</p>
                      )}
                    </div>
                    <input
                      class="form-control"
                      name="password"
                      type="password"
                      placeholder="Password"
                      aria-label=""
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <p style={{ color: "red" }}> {formik.errors.password}</p>
                    )}
                    <input
                      class="form-control"
                      name="confirmpassword"
                      type="password"
                      placeholder="Confirm Passwrod"
                      aria-label=""
                      value={formik.values.confirmpassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmpassword &&
                      formik.errors.confirmpassword && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {formik.errors.confirmpassword}
                        </p>
                      )}
                    {singUpError !== "" && (
                      <p style={{ color: "red" }}>{singUpError}</p>
                    )}
                    <button type="submit" className="btn w-100" disabled={loading}>
                    {loading ? (
                      <>
                        {" "}
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </>
                    ) : (
                      <> Continue</>
                    )}
                     
                    </button>
                  </div>
                </form>
                <div className="form_text d-flex pt-20 align-items-center">
                  <p className="m-0">Already have an account ?</p>
                  {/* <Link>About</Link> */}
                  <button onClick={loginShow} >
                    signin
                  </button>
                </div>
                {/* <div className='or_text d-flex pt-20 align-items-center'>
                  <hr />
                  <p>or</p>
                  <hr />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* <VerifyUserModal
        openVerifyModal={openVerifyModal}
        setOpenVerifyModal={setOpenVerifyModal}
        loginShow={loginShow}
      /> */}
    </>
  );
}

export default Signup;
