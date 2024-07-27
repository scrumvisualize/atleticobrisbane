import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const appUrl = process.env.REACT_APP_URL;

const Footer = () => {

    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const genTkn = () => {
        const fetchData = async () => {
            try {
                const response = await axios.put(`${appUrl}/service/generateAndSaveToken`);
            } catch (error) {
                console.error('Error saving token:', error);
            }
        };
        fetchData();
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${appUrl}/service/getLatestToken`);
                setToken(response.data.token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchData();
    }, []);

    //bg-[#2e2657] 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[50px] md:mt-2 bg-gradient-to-br from-[#0C1324] to-[#cb6ce6]">
            <div className="p-4">
                <h3 className="text-2xl text-[#e6e4f0] font-bold mb-2 ml-4">About Atlètico Brisbane</h3>
                <p className="text-sm md:text-left p-4 font-sans-serif text-white">
                    Atlético Brisbane, a friendly malayali community
                    <br className="hidden md:block" /> soccer club established in 2018 & registered in 2020, unites soccer
                    <br className="hidden md:block" /> enthusiasts of all ages in Brisbane under one banner.  While our
                    <br className="hidden md:block" /> club mantra is "Aspire, Aim, Achieve", we also embody resilience,
                    <br className="hidden md:block" />dedication and passion towards the sport. We welcome you all to be part of our journey.
                </p>
            </div>
            <div className="p-4 text-white">
                <h3 className="text-2xl text-[#e6e4f0] font-bold mb-4">Contact</h3>
                <ul>
                    <li className="text-sm font-semibold ml-2 mb-2"><a href="tel:0234567890" className='mt-1'>+61 0451145007</a></li>
                    <li className="text-sm font-semibold ml-2 mb-2">atleticobne@gmail.com</li>
                    <li className="text-sm font-semibold ml-2 mb-2">ABN: 14 184 396 442</li>
                </ul>
                <h3 className="text-2xl text-[#e6e4f0] font-bold mt-6 mb-4">Follow Us</h3>
                <div className="flex space-x-4 mt-4">

                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white group">
                        <img src="images/instagram.png" alt="Instagram" className="h-6 w-6 md:h-8 md:w-8 ml-2 rounded-full group-hover:animate-pulse" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white group">
                        <img src="images/facebook.png" alt="Facebook" className="h-6 w-6 md:h-8 md:w-8 ml-2 rounded-full group-hover:animate-pulse border-2" />
                    </a>
                </div>
            </div>

            <div className="p-4 text-white">
                <h3 className="text-2xl text-[#e6e4f0] font-bold mb-4">Quick Links</h3>
                <ul>
                    <li><span onClick={() => navigate('/')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">Home</span></li>
                    <li><span onClick={() => navigate('/about')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">About</span></li>
                    <li><span onClick={() => navigate('/menssquad')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">Mens Squad</span></li>
                    <li><span onClick={() => navigate('/mastersquad')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">Masters Squad</span></li>
                    <li><span onClick={() => navigate('/u16squad')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">U16 Boys</span></li>
                    <li><span onClick={() => navigate('/u12squad')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">U12 Boys</span></li>
                    <li><span onClick={() => navigate('/sponsors')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">Sponsors</span></li>
                    <li><span onClick={() => navigate('/contact')} className="text-sm font-bold mb-2 block pl-5 pr-4 text-white rounded hover:bg-gray-200 hover:text-blue-400 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-500 focus:outline-none focus:bg-gray-200 focus:text-blue-400">Contact</span></li>
                </ul>
            </div>

            <div className="flex">
                <p className="flex items-center text-[8px] text-[#e8f2ff] ml-4 md:mt-1 md:px-[-10px] mb-0">
                    <img src="images/ablogo.png" className="w-6 h-6 mx-2 rounded-full border-2 border-[#2f73fa]" alt="Ab logo" />
                    © 2024 Atlètico Brisbane Soccer Club
                </p>
                <button onClick={genTkn} className="text-xs text-[#834694] ml-2">atletico</button>
                <p hidden>{token}</p>
            </div>

            <div className="flex">
                <p className="flex items-center text-[8px] text-[#e8f2ff] ml-4 md:mt-1 md:px-[-10px] mb-0">
                    <img src="images/profilePhoto-1719717154481.jpeg" className="w-6 h-6 mx-2 rounded-full border-2 border-[#2f73fa]" alt="Profile Photo" />
                     Designed & Developed by Vinod Mathew
                </p>
            </div>
        </div>

    );
};

export default Footer;