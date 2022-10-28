import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; 
import discord from '../../assets/images/discord.svg';
import twitter from '../../assets/images/twitter.svg';
import insta from '../../assets/images/insta.svg';
import youtube from '../../assets/images/youtube.svg';

 const Footer = () =>{
    return(
        <>
            <footer className="pt-100 pb-100">
                <div className="container">
                    {/* <div className="row pb-40">
                        <div className="col-md-2"> <h4>Providers</h4> </div>
                        <div className="col-md-5">
                            <div className="cryto  justify-content-end d-flex">
                                <h5 className='pe-16 '>Play with</h5>
                                <div className="playwith">
                                <Link to="#"><img src={dogecoin} alt="" /></Link>
                                <Link to="#"><img src={eth} alt="" /></Link>
                                <Link to="#"><img src={ripple} alt="" /></Link>
                                <Link to="#"><img src={binance} alt="" /></Link>
                                <Link to="#"><img src={cardano} alt="" /></Link>
                                <Link to="#"><img src={bitcoin_coin} alt="" /></Link>
                                </div> 
                            </div>  
                        </div>
                        <div className="col-md-5">
                        <div className="visa  justify-content-end d-flex">
                                <h5 className='pe-16 '>No crypto?</h5>
                                <div className="playwith">
                                <Link to="#"><img src={visa_footer} alt="" /></Link>
                                </div> 
                            </div> 
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col-md-12">
                            <Footer_slider/>
                        </div>
                    </div> */}
                    <div className="row align-baseline  ">
                        <div className="col-md-6">
                            <div className="LeftContent">
                                <img className='img-fluid mb-20' src={logo} alt="Logo" width={"300px"} />
                                <p className='mb-30'>Welcome to the big Cheese casino, where you will become 
                                    a crucial member of our crew, your job? It is to enjoy the great 
                                    selection of bitcoin games we have available at our site. big Cheese casino offers 3000+ different slot games and 300+ distinct 
                                    table games, including the Live Casino Bitcoin.</p>
                            </div>
                            <div className="Social">
                                <Link to="#"><img src={discord} alt="" /></Link>
                                <Link to="#"><img src={twitter} alt="" /></Link>
                                <Link to="#"><img src={insta} alt="" /></Link>
                                <Link to="#"><img src={youtube} alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <div className="RightContent">
                                <h4 className='mt-40 mb-40'>Explore</h4>
                                <div className="row ">
                                    <div className="col-md-4">
                                    <div className="links d-flex flex-column">
                                    <Link to="#">New Games</Link>
                                    <Link to="#">Slots</Link>
                                    <Link to="#">Providers</Link>
                                    <Link to="#">Live Casino</Link>
                                    </div>
                                    
                                    </div>
                                    <div className="col-md-4">
                                    <div className="links d-flex flex-column">
                                    <Link to="#">Blackjack</Link>
                                    <Link to="#">Roulette</Link>
                                    <Link to="#">Baccarat</Link>
                                    <Link to="#">Jackpot</Link>
                                    </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="links d-flex flex-column">
                                    <Link to="#">FAQ</Link>
                                    <Link to="#">Contact</Link>
                                    <Link to="#">Privacy Policy</Link>
                                    <Link to="#">Terms and Conditions</Link>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-60">
                        <div className="col-md-12 text-center copyright">
                            <p> &copy; 2022 big Cheese casino. all Right Reserved </p>
                        </div>
                    </div>
                </div>
            </footer>  
        </>
    );
};
export default Footer