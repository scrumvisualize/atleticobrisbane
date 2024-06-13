import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-[#2e2657] mt-[200px] md:mt-10">
            <div className="p-4">
                <h3 className="text-3xl text-[#e6e4f0] font-bold mb-4">About Atlètico</h3>
                <p className="text-sm md:text-left p-4 font-sans-serif text-white">
                    Atlètico Brisbane, a spirited malayali community 
                    <br className="hidden md:block" /> soccer club established & registered in 2018, unites soccer 
                    <br className="hidden md:block" /> enthusiasts in Brisbane under one banner. With a mantra 
                    <br className="hidden md:block" /> of "play, train, fight, and face until it's done", we embody 
                    <br className="hidden md:block" /> resilience and dedication.
                </p>
            </div>
            <div className="p-4 text-white">
                <h3 className="text-3xl text-[#e6e4f0] font-bold mb-4">Contact</h3>
                <ul>
                    <li className="text-sm font-semibold mb-2"><a href="tel:0234567890" className='mt-1'>+61 0234567890</a></li>
                    <li className="text-sm font-semibold mb-2">atleticobris-info@gmail.com</li>
                </ul>
            </div>

            <div className="p-4 text-white">
                <h3 className="text-3xl text-[#e6e4f0] font-bold mb-4">Quick Links</h3>
                <ul>
                    <li><span onClick={() => navigate('/')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500">Home</span></li>
                    <li><span onClick={() => navigate('/about')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500">About</span></li>
                    <li><span onClick={() => navigate('/contact')} className="text-sm font-bold block pl-5 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</span></li>
                </ul>
                <div className="portrait:hidden flex flex-wrap mt-4">
                    {/* <div className="md:w-1/3 p-4 md:ml-[-84px] ml-[-5px]">
                        <a className="inline-block w-10 h-10 rounded-full bg-white p-2" href="https://www.instagram.com">
                            <img src="images/insta-50.png"></img>
                        </a>
                    </div> */}
                 </div>
                 <div className="landscape:hidden flex flex-wrap mt-4">
                    
                    <div className="md:w-1/2 p-2 md:ml-[-74px] ml-[-3px]">
                        <a className="inline-block w-10 h-10 rounded-full bg-white p-2" href="https://www.instagram.com/">
                            <img src="images/insta-50.png"></img>
                        </a>
                    </div>
                 </div>
            </div>
            
            <div className="flex">
                <p className="text-xs text-[#ffffff] ml-8 mb-4 md:mb-2 md:ml-8">© 2024 Atlètico Brisbane Soccer Club</p>
                <p className="text-[8px] text-[#e8f2ff] ml-4 md:mt-1 md:px-8">Designed & Developed by Vinod Mathew</p>
            </div>
        </div>

    );
};

export default Footer;