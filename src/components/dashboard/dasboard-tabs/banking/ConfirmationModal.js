import React from "react";
import Modal from "react-bootstrap/Modal";
import QRCode from "../../../../assets/images/QRCode.png";
import copy from "../../../../assets/images/copy.svg";
// import { useDispatch } from "react-redux";
import ConfirmTransactionModal from "./ConfirmTransactionModal";
import {
  transactionConfirmation,
} from "../../../../features/game/gameSlice";

function ConfirmationModal({
  open,
  setOpen,
  SignupShow,
  message,
  transactionId,
  setTransactionId,
  openConfirmModal,
  setOpenConfirmModal,
}) {
  // const dispatch = useDispatch();
  const confirmClose = () => setOpen(false);
  const ratesData = localStorage.getItem("ratesData");
  const rates = JSON.parse(ratesData);

  const handleConfirmTransaction = (event) => {
    event.preventDefault();
    // dispatch(
    //   transactionConfirmation({
    //     trxid: transactionId,
    //     linkhash: rates?.validationhash,
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     setOpenConfirmModal(false);
    //   });
  };
  const handleOpenCOnfirmation = (e) => {
    e.preventDefault();
    setOpenConfirmModal(true);
    confirmClose();
  };


   
  return (
    <>
      <Modal
        className="login_modal confirmation_modal"
        show={open}
        onHide={confirmClose}
        backdrop="static"
      >
        <Modal.Header closeButton></Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-md-5 p-0 border-r">
              <div className="--contet">
                <img className="img-fluid" src={QRCode} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="form_field ">
                <h4 className="mb-30">Confirm Transaction</h4>
                <div className="--modalForm">
                  <div class="form-group">
                    <div className="position-relative">
                      <input
                        class="form-control"
                        type="text"
                        name="text"
                        aria-label=""
                        readOnly={true}
                        value={process.env.REACT_APP_ADMIN_ADDRESS}
                      />
                      <button
                        className="copy position-absolute "
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${process.env.REACT_APP_ADMIN_ADDRESS}`
                          );
                        }}
                      >
                        <img className="img-fluid" src={copy} alt="Copy" />
                      </button>

                    </div>

                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      aria-label=""
                      value={rates?.amountcoin}
                      readOnly={true}
                    />

                    <button
                      type="submit"
                      className="btn w-100"
                      onClick={(e) => {
                        handleOpenCOnfirmation(e);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmTransactionModal
        rates={rates}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        handleConfirmTransaction={handleConfirmTransaction}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
      />
    </>
  );
}

export default ConfirmationModal;
