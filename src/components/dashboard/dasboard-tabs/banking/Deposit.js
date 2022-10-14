import React, { useState } from "react";
import visa1 from "../../../../assets/images/visa1.svg";
import bitcoin from "../../../../assets/images/bitcoin.svg";
import visa from "../../../../assets/images/visa.svg";
import ConfirmationModal from "./ConfirmationModal";
const Deposit = ({
  amount,
  setAmount,
  formError,
  handleBuyGamePoints,
  cryptoType,
  setCryptoType,
  setFormError,
  open,
  setOpen,
  openConfirmModal,
  setOpenConfirmModal,
}) => {
  const [transactionId, setTransactionId] = useState();

  const options = [
    { value: "ETH", label: "Etherium" },
    { value: "BTC", label: "Bitcoin" },
    { value: "SOL", label: "Solana" },
  ];
  return (
    <>
      <ul
        className="nav nav-pills banking_inner_tabs"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className="dash-btn active"
            id="pills-Crypto-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-Crypto"
            type="button"
            role="tab"
            aria-controls="pills-Crypto"
            aria-selected="true"
          >
            <img src={bitcoin} alt="" />
            <span className="">Crypto</span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="dash-btn"
            id="pills-Visa-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-Visa"
            type="button"
            role="tab"
            aria-controls="pills-Visa"
            aria-selected="true"
          >
            <img src={visa} alt="" />
            <span className="">Visa</span>
          </button>
        </li>
      </ul>

      <div className="row">
        <div className="col-md-8">
          {/* banking_inner Tab Content */}
          <div
            className="tab-content banking_inner_tabs_content pt-60"
            id="pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="pills-Crypto"
              role="tabpanel"
              aria-labelledby="pills-Crypto-tab"
              tabIndex="0"
            >
              <h4 className="mb-30">Crypto Payment Information</h4>
              <form
                onSubmit={(e) => {
                  handleBuyGamePoints(e);
                }}
              >
                <div className="mb-20">
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setFormError("");
                    }}
                    placeholder="Enter amount in USD"
                  />
                </div>
                <div className="mb-20">
                  <select
                    className="form-select w-100"
                    value={cryptoType}
                    onChange={(event) => {
                      setCryptoType(event.target.value);
                    }}
                  >
                    {options?.map((item, index) => {
                      return (
                        <option key={index} value={item?.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {formError !== "" && (
                  <p style={{ color: "red" }}> {formError} </p>
                )}
                <button type="submit" className="btn menu-btn w-100">
                  Deposit
                </button>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-Visa"
              role="tabpanel"
              aria-labelledby="pills-Visa-tab"
              tabIndex="0"
            >
              <h4 className="mb-30">Visa/Mastercard Payment Information</h4>
              <form>
                <div className="gap-4 input-group mb-20">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Owner Name"
                  />
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder=" CVV"
                  />
                </div>
                <div className="mb-20">
                  <input
                    type="number"
                    className="form-control"
                    id=""
                    placeholder="Card Number"
                  />
                </div>
                <div className="mb-20 d-flex gap-4">
                  <select className="form-select" aria-label="">
                    <option selected>January</option>
                    <option value="1">FEB</option>
                  </select>
                  <select className="form-select" aria-label="">
                    <option selected>2024</option>
                    <option value="1">2029</option>
                  </select>
                  <img src={visa1} alt="" />
                </div>
                <button type="submit" className="btn menu-btn w-100">
                  Confirm Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        openConfirmModal={openConfirmModal}
        setOpenConfirmModal={setOpenConfirmModal}
      />
    </>
  );
};

export default Deposit;
