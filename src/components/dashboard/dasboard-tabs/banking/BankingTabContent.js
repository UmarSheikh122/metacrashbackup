import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../../assets/scss/screen.css";
import { getRates } from "../../../../features/game/gameSlice";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

function BankingTabContent({
  bankingTabs,
  setBankingTabs,
  openConfirmModal,
  setOpenConfirmModal,
  withdrawSuccess,
  setWithdrawSuccess,
}) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [cryptoType, setCryptoType] = useState("ETH");
  const [formError, setFormError] = useState("");
  const [open, setOpen] = useState(false);
  const handleBuyGamePoints = (event) => {
    event.preventDefault();
    if (amount !== 0 && amount !== "" && cryptoType !== "") {
      const buyData = {
        usd: amount,
        chain: cryptoType,
      };
      dispatch(getRates(buyData))
        .unwrap()
        .then(() => {
          setOpen(true);
          setAmount("");
        });
    } else {
      setFormError("Fields are required!");
    }
  };

  return (
    <>
      <div>
        <div className="tabContentHeader">
          <ul className="nav nav-pills gap-5 ">
            <li className="nav-item" role="presentation">
              <button
                className={
                  bankingTabs === "deposit"
                    ? "nav-link btn simple active"
                    : "nav-link btn simple "
                }
                onClick={() => {
                  setBankingTabs("deposit");
                }}
                type="button"
                role="tab"
              >
                Deposit
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={
                  bankingTabs === "withdraw"
                    ? "nav-link btn simple active"
                    : "nav-link btn simple"
                }
                type="button"
                role="tab"
                onClick={() => {
                  setBankingTabs("withdraw");
                }}
              >
                Withdraw
              </button>
            </li>
          </ul>
        </div>
        <div className="TabContentBody">
          <div className="tab-content" id="pills-tabContent">
            {bankingTabs === "deposit" && (
              <Deposit
                amount={amount}
                setAmount={setAmount}
                cryptoType={cryptoType}
                setCryptoType={setCryptoType}
                handleBuyGamePoints={handleBuyGamePoints}
                formError={formError}
                setFormError={setFormError}
                open={open}
                setOpen={setOpen}
                openConfirmModal={openConfirmModal}
                setOpenConfirmModal={setOpenConfirmModal}
              />
            )}

            {bankingTabs === "withdraw" && (
              <Withdraw
                bankingTabs={bankingTabs}
                withdrawSuccess={withdrawSuccess}
                setWithdrawSuccess={setWithdrawSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BankingTabContent;
