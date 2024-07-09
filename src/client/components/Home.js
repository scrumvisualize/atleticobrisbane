import React from 'react';
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

const Home = () => {
    return (
        <div className="container mx-auto p-2">
            <Banner/>
            <AtleticoImageSlider/>
            <Training/>
            <AtleticoUpdates/>
            <WeeklyGames/>
            <TitleSponsor/>
            <SponsorsList/>
            <Footer/>
        </div>
    );
};

export default Home;