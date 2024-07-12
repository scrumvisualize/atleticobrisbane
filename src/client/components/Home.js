import React, { useState, useEffect } from 'react';
import TopBanner from "./TopBanner";
import MainNavbar from "./MainNavbar";
import Banner from "./Banner";
import AtleticoImageSlider from "./AtleticoImageSlider";
import Training from "./Training";
import AtleticoUpdates from "./AtleticoUpdates";
import WeeklyGames from "./WeeklyGames";
import TitleSponsor from "./TitleSponsor";
import SponsorsList from "./SponsorsList";
import Footer from "./Footer";

const Home = ({ darkMode }) => {
    
    return (
        <div
            className={`container mx-auto p-2 transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`}
            style={{
                background: darkMode ? '#A18DDD' : 'white',
            }}
        >
            <Banner/>
            <AtleticoImageSlider/>
            <Training/>
            <AtleticoUpdates darkMode={darkMode}/>
            <WeeklyGames/>
            <TitleSponsor/>
            <SponsorsList darkMode={darkMode}/>
            <Footer/>
        </div>
    );
};

export default Home;