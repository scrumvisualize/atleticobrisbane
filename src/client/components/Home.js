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

const updates = [
    {
      id: 1,
      imageSrc: 'images/ablogo.png',
      title: 'Change in Payment method',
      date: new Date('2024-06-25'),
      text: 'We are changing the payment method for our club. Every player will receive an instruction via email or text on how to make further payments',
    },
    {
      id: 2,
      imageSrc: 'images/ablogo.png',
      title: 'Field updates',
      date: new Date('2024-06-24'),
      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
      id: 3,
      imageSrc: 'images/ablogo.png',
      title: 'Tournament updates',
      date: new Date('2024-06-23'),
      text: 'Nullam nec quam aliquet, malesuada ligula in, tincidunt tortor. Sed id orci non eros consequat faucibus.',
    },
    {
      id: 4,
      imageSrc: 'images/ablogo.png',
      title: 'Timing changes from Nov',
      date: new Date('2024-06-22'),
      text: 'Fusce congue velit ac efficitur lacinia. Etiam vehicula eros vel metus pretium, eget tempor metus lacinia.',
    },
    {
        id: 5,
        imageSrc: 'images/ablogo.png',
        title: 'Timing changes from Nov',
        date: new Date('2024-05-22'),
        text: 'Fusce congue velit ac efficitur lacinia. Etiam vehicula eros vel metus pretium, eget tempor metus lacinia.',
      },
  ];

const Home = () => {
    return (
        <div className="container mx-auto p-2">
            <TopBanner/>
            <MainNavbar/>
            <Banner/>
            <Training/>
            <AtleticoImageSlider/>
            <AtleticoUpdates updates={updates}/>
            <WeeklyGames/>
            <TitleSponsor/>
            <SponsorsList/>
            <Footer/>
        </div>
    );
};

export default Home;