import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import '../../assets/scss/screen.css'
import "../../assets/scss/screen.css";
// import Bankingtab from "../../components/dashboard/dasboard-tabs/banking/Bankingtab";
import BankingTabContent from "../../components/dashboard/dasboard-tabs/banking/BankingTabContent";
// import Missiontab from "../../components/dashboard/dasboard-tabs/mission/Missiontab";
import MissionTabContent from "../../components/dashboard/dasboard-tabs/mission/MissionTabContent";
import DashboardBanner from "../../components/dashboard/dashboard-banner/DashboardBanner";

import { getGamePoints } from "../../features//game/gameSlice";

const Dashboard = () => {
  const [tabs, setTabs] = useState("banking");
  const [bankingTabs, setBankingTabs] = useState("deposit");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [withdrawSuccess,setWithdrawSuccess]=useState(false) 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGamePoints())
  }, [dispatch,openConfirmModal,withdrawSuccess]);
  return (
    <>
      <DashboardBanner />

      {/* Dashboard Tabs Section */}
      <section className="tabs pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="tab-left">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        tabs === "banking"
                          ? " btn menu-btn active"
                          : "btn menu-btn"
                      }
                      role="tab"
                      onClick={() => {
                        setTabs("banking");
                        setBankingTabs("deposit");
                      }}
                    >
                      Banking
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                    <button
                      className={
                        tabs === "mission"
                          ? " btn menu-btn active  "
                          : "btn menu-btn"
                      }
                      role="tab"
                      onClick={() => {
                        setTabs("mission");
                        
                      }}
                    >
                      Mission
                    </button>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-md-8 offset-md-1">
              <div className="tab-content" >
                {tabs === "banking" ? (
                  <BankingTabContent
                    bankingTabs={bankingTabs}
                    withdrawSuccess={withdrawSuccess}
                    setWithdrawSuccess={setWithdrawSuccess}
                    setBankingTabs={setBankingTabs}
                    openConfirmModal={openConfirmModal} setOpenConfirmModal={setOpenConfirmModal}
                  />
                ) : (
                  <MissionTabContent />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
