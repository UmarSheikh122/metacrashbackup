import React, { Component } from "react";
import Slider from "react-slick";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide_1 from '../../../assets/images/slide_1.png';

export default class Hero extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 1,
      speed: 500
    };
    return (
      <>
        <Slider {...settings}>
          <div className="">
            <div className="hero ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-5">
                  <div className="--content">
                    <h1>Grab Your <strong>WELCOME</strong> Bonus plus Free spins</h1>
                    <p>A competitive social gaming platform helping web2 gamers .</p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <div className="--img">
                    <img className="img-fluid" src={slide_1} alt="" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          
          <div className="">
            <div className="hero ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-5">
                  <div className="--content">
                    <h1>Grab Your <strong>WELCOME</strong> Bonus plus Free spins</h1>
                    <p>A competitive social gaming platform helping web2 gamers .</p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <div className="--img">
                    <img className="img-fluid" src={slide_1} alt="" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="">
            <div className="hero ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-5">
                  <div className="--content">
                    <h1>Grab Your <strong>WELCOME</strong> Bonus plus Free spins</h1>
                    <p>A competitive social gaming platform helping web2 gamers .</p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <div className="--img">
                    <img className="img-fluid" src={slide_1} alt="" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="">
            <div className="hero ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-5">
                  <div className="--content">
                    <h1>Grab Your <strong>WELCOME</strong> Bonus plus Free spins</h1>
                    <p>A competitive social gaming platform helping web2 gamers .</p>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <div className="--img">
                    <img className="img-fluid" src={slide_1} alt="" />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </Slider>
      </>
    );
  }
}