import React, { useState, useEffect } from 'react';
import RegisterDialog from './RegisterDialog';

const Banner = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = ['images/ab-slide-1.JPG', 'images/menswinning.png', 'images/ab-slider-3.JPG', 'images/juniors.JPG'];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);


  const registerDialog = () => {
    setShowDialog(true);
  }

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div>
      <div id="formobile" className="bg-cover bg-center bg-no-repeat h-[132px] md:h-[450px] lg:h-128 relative block md:hidden" style={{ backgroundImage: "url('images/mainbanner.png')" }}>
        <button
          onClick={registerDialog}
          className="hidden md:block absolute left-64 top-[290px] px-4 py-2 bg-[#d41743] text-white font-semibold border border-2 border-white rounded-full shadow"
        >
          Register
        </button>
        <button
          onClick={registerDialog}
          className="md:hidden absolute top-20 w-20 left-8 px-2 py-0 bg-[#d41743] text-[13px] text-white font-semibold border border-2 border-white rounded-full shadow"
        >
          Register
        </button>
        {showDialog && <RegisterDialog openDialog={showDialog} onClose={closeDialog} />}
      </div>

      <div id="fordesktop" className="flex h-[510px] mt-0 relative hidden md:flex">
        <div className="relative w-1/2" style={{ zIndex: 4 }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)', background: 'linear-gradient(to right, rgba(40, 5, 97, 1.00), rgba(164, 64, 194, 1.00), rgba(220, 87, 169, 0.82))' }}>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex-shrink-0 w-[calc(25%-35px)] mt-[10px] mb-2">
                <img className="w-full h-auto" src="images/arrow-f.png" alt="Arrow 1"/>
              </div>
              <div className="flex-shrink-0 w-[calc(25%-35px)] mt-[10px] mb-2">
                <img className="w-30 h-auto" src="images/arrow-f.png" alt="Arrow 2"/>
              </div>
            </div>
            
            <div className="max-w-5xl px-2"> 
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                Welcome to Atlético Brisbane
              </h1>
              <span className="text-2xl lg:text-3xl font-semibold text-[#3cfffc]">
                a malayali soccer club <span className="text-2xl lg:text-3xl font-semibold text-[#3cfffc]">in Brisbane </span>
              </span>
            </div>
            <ul className="mt-6 ml-[-150px]">
              <li>
                <div className="flex items-start"><svg className="h-8 w-8 text-[#3cfffc]" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M5 12l5 5l10 -10"></path></svg><span className="ml-2 text-white">Community Engagement</span>
                </div>
              </li>
              <li>
                <div className="flex items-start"><svg className="h-8 w-8 text-[#3cfffc]" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M5 12l5 5l10 -10"></path></svg><span className="ml-2 text-white">Skill Development</span>
                </div>
              </li>
              <li>
                <div className="flex items-start"><svg className="h-8 w-8 text-[#3cfffc]" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M5 12l5 5l10 -10"></path></svg><span className="ml-2 text-white">Goals Oriented</span>
                </div>
              </li>
              <li>
                <div className="flex items-start mb-2"><svg className="h-8 w-8 text-[#3cfffc]" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M5 12l5 5l10 -10"></path></svg><span className="ml-2 text-white">Fun-loving & Friendly </span>
                </div>
              </li>
            </ul>
            <button onClick={registerDialog} className="hidden hover:bg-[#c2192a] md:block ml-[-150px] px-4 py-2 bg-[#fc1930] text-white font-semibold border border-2 border-white rounded-full shadow mt-2">Register</button>
            <p className="text-base font-semibold text-[#3cfffc] ml-[-100px] mt-4 mb-2">Please register and join us for weekly games</p>
            <p className="text-[12px] font-semibold text-white ml-[-150px] underline mt-0 mb-4">www.atleticobrisbane.com.au</p>
          </div>
        </div>
        <div className="relative w-1/2 -ml-[194px]" style={{ zIndex: 3 }}>
          <div className="absolute scale-10 top-0 left-0 right-0 bottom-0 bg-cover bg-contain bg-no-repeat animate-slide" 
            style={{ 
            clipPath: 'polygon(30% 0, 100% 0, 85% 100%, 0 100%)', 
             backgroundImage: `url(${images[currentImage]})`
            }}
          >
          </div>
        </div>
        <div className="relative w-1/3 -ml-[160px]" style={{ zIndex: 1 }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)', backgroundImage: "url('images/top2.JPG')" }}></div>
        </div>
        <div className="relative w-1/4 -ml-[190px]" style={{ zIndex: 1 }}>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center" style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 20% 100%)', backgroundImage: "url('images/top-3.JPG')" }}></div>
        </div>
        {showDialog && <RegisterDialog openDialog={showDialog} onClose={closeDialog} />}
      </div>

    </div>
  );
};

export default Banner;