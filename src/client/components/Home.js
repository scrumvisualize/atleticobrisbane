import React from 'react';
import TopBanner from "./TopBanner";
import MainNavbar from "./MainNavbar";
import Banner from "./Banner";
import AtleticoImageSlider from "./AtleticoImageSlider";
import Training from "./Training";
import Footer from "./Footer";

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <TopBanner/>
            <MainNavbar/>
            <Banner/>
            <Training/>
            <AtleticoImageSlider/>
            <Footer/>
        </div>
    );
};

export default Home;