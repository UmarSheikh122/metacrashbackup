import React from "react";
import Dog_thumb from '../../assets/images/Dog_thumb.svg';
import Tooltip from '../common/Tooltip';
function RecentWinnerListing() {
  return (
    <>
    <div className="RecentWinnerListing">
        
        <div className="listing">
            <div className="wiiners d-flex align-items-center justify-content-around">
                <img className="img-fluid img-rounded" src={Dog_thumb} alt="" />
                <div className="winnerName">
                    <h6>John Doe</h6>
                    <p>Pragmatic Play</p>
                </div>
                <div className="price">
                    <h5>$1,000,00</h5>
                </div>
                <div className="info"> <Tooltip/> </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default RecentWinnerListing;