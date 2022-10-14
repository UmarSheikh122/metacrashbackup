import React from 'react'
import Modal from "react-bootstrap/Modal";
const ConfirmTransactionModal = ({open,setOpen,handleConfirmTransaction , transactionId , setTransactionId}) => {


    const confirmClose = () => setOpen(false);
  return (
    <Modal
    className="login_modal confirmation_modal"
    show={open}
    onHide={confirmClose}
    backdrop="static"
  >
    <Modal.Header closeButton></Modal.Header>
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <div className="form_field ">
            <h4 className="mb-30">Confirm Your Transaction</h4>
            <form onSubmit={(e)=>{handleConfirmTransaction(e)}}>
              <div class="form-group">
                <div className="position-relative">
                  <input
                    class="form-control"
                    type="text"
                    name="text"
                    placeholder='Enter Transaction Hash'
                    aria-label=""
                    value={transactionId}
                    onChange={(e)=>setTransactionId(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn w-100">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Modal>
  )
}

export default ConfirmTransactionModal