import React from 'react'
import GameCatSlider from '../../components/landing-page/gamecatslider/GameCatSlider';
import Hero from '../../components/landing-page/hero/Hero';
import RecentWins from '../../components/landing-page/recentWins/RecentWins';

const LandingPage = () => {
  return (
    <>
    <Hero/>
    <RecentWins/>
    <GameCatSlider/>
    </>
  )
}

export default LandingPage;