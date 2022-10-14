import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withdrawalPoints } from "../../../../features/game/gameSlice";
import { withdrawValidation } from "../../../../helpers/Validation";

const Withdraw = ({ bankingTabs, withdrawSuccess, setWithdrawSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chain, setChain] = useState("ETH");
  const options = [
    { value: "ETH", label: "Etherium" },
    { value: "BTC", label: "Bitcoin" },
    { value: "SOL", label: "Solana" },
  ];
  const formikWithdraw = useFormik({
    initialValues: {
      usd: 0,
      chain: "",
      trxaddress: "",
      points: 0,
    },
    validationSchema: withdrawValidation,
    onSubmit: (values) => {
      values.usd = values.points / 6;
      values.chain = chain;
      console.log('values', values)
      dispatch(withdrawalPoints(values))
        .unwrap()
        .then(() => {
          navigate("/");
          setChain("ETH");
          setWithdrawSuccess(true);
          formikWithdraw.resetForm();
        });
    },
  });

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="banking_inner_tabs_content" role="tabpanel">
          <h4 className="mb-30">Request Withdraw</h4>
          <form onSubmit={formikWithdraw.handleSubmit}>
            <div class="mb-20">
            <label>Select chain</label>
              <select
                class="form-select w-100"
                aria-label=""
                value={chain}
                onChange={(e) => {
                  setChain(e.target.value);
                }}
              >
                {options?.map((item, index) => {
                  return (
                    <option key={index} value={item?.value} selected={index===0}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class=" mb-20">
            <label>Address</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Address"
                name="trxaddress"
                value={formikWithdraw.values.trxaddress}
                onChange={formikWithdraw.handleChange}
                onBlur={formikWithdraw.handleBlur}
              />
              {formikWithdraw.touched.trxaddress && formikWithdraw.errors.trxaddress && (
                <p style={{ color: "red" }}> {formikWithdraw.errors.trxaddress}</p>
              )}
            </div>
            <div class="mb-20">
            <label>Points</label>
              <input
                type="number"
                className="form-control"
                name="points"
                placeholder="Enter points"
                value={formikWithdraw.values.points}
                onChange={formikWithdraw.handleChange}
                onBlur={formikWithdraw.handleBlur}
              />
                
              {formikWithdraw.touched.points && formikWithdraw.errors.points && (
                <p style={{ color: "red" }}> {formikWithdraw.errors.points}</p>
              )}
            </div>

            <button  type="submit" class="btn menu-btn w-100">
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
