import React from "react";
import Leaderboard from '../../assets/images/Leaderboard.svg';
import Slots from '../../assets/images/Slots.svg';
import Roulette from '../../assets/images/Roulette.svg';
import jack from '../../assets/images/jack.svg';
import crash from '../../assets/images/crash.svg';

const GameCat = () =>{
    return(
        <>
        <div className="gamesCat d-flex align-items-center justify-content-between pb-100">
            <div className='text-center'>
                <img className='mb-16' src={Leaderboard} alt="" />
                <p>Leaderboard</p>
            </div>
            <div className='text-center'>
                <img className='img-fluid mb-16' src={Slots} alt="" />
                <p>Slots</p>
            </div>
            <div className='text-center'>
                <img className='img-fluid mb-16' src={Roulette} alt="" />
                <p>Roulette</p>
            </div>
            <div className='text-center'>
                <img className='img-fluid mb-16' src={jack} alt="" />
                <p>Jack Black</p>
            </div>
            <div className='text-center'>
                <img className='img-fluid mb-16' src={crash} alt="" />
                <p>Crash</p>
            </div>
        </div>
        </>
    );
}
export default GameCat;