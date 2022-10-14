import React, { useState } from "react";
//import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import mobile_coins from "../../assets/images/mobile_coins.svg";
import { useFormik } from "formik";
import {
  userAuthSelector,
  verifyUser,
} from "../../features/userAuth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { verificationValidation } from "../../helpers/Validation";

function VerifyUserModal({ openVerifyModal, setOpenVerifyModal, loginShow }) {
  const [message, setMessage] = useState("");
  const {  loading } = useSelector(userAuthSelector);
  const verifyClose = () => setOpenVerifyModal(false);
  const dispatch = useDispatch();

  const email = localStorage.getItem("email");
  const formik = useFormik({
    initialValues: {
      email: email,
      verificationCode: "",
    },
    validationSchema: verificationValidation,
    onSubmit: (values) => {
      dispatch(verifyUser(values))
        .unwrap()
        .then(() => {
          formik.resetForm();
          verifyClose();
          localStorage.removeItem("email")
          setMessage("Email successfully verified");
        })
        .catch((err) => {
          console.log("err", err);
        });
      formik.resetForm();
    },
  });

  return (
    <>
      <Modal
        className="login_modal"
        show={openVerifyModal}
        onHide={verifyClose}
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
                <img className="img-fluid" src={mobile_coins} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="form_field ">
                <h4 className="mb-30">Verify you email</h4>
                <form onSubmit={formik.handleSubmit}>
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      aria-label=""
                      value={formik.values.email}
                      readOnly
                    />
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter 6 digit code"
                      name="verificationCode"
                      aria-label=""
                      value={formik.values.verificationCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.verificationCode &&
                      formik.errors.verificationCode && (
                        <p style={{ color: "red" }}>
                          {" "}
                          {formik.errors.verificationCode}
                        </p>
                      )}
                    <button
                      type="submit"
                      className="btn w-100"
                      disabled={loading}
                    >
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
                        <>Verify Email</>
                      )}
                    </button>
                  </div>
                </form>
                {message !== "" && (
                  <div className="form_text d-flex pt-20 align-items-center">
                    <p style={{ color: "green" }}> {message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default VerifyUserModal;
