import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GameCard from "../../common/GameCard";
import cat_Leaderboard from '../../../assets/images/cat_Leaderboard.svg';



const  GameCatSlider = () => {
    const settings = {
        className: "recentwins",
        centerMode: false,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 6,
        speed: 500
    };
    return (
        <div className="gamecatslider">
            <h3 className="ps-50"> <span><img src={cat_Leaderboard} alt="" /></span> Leader Board</h3>
            <Slider {...settings}>
                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>

                <div>
                <div className="gameCards">
                    <GameCard />
                </div>
                </div>
            </Slider>
        </div>
    );
    }

export default GameCatSlider;