import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

const TopBanner = ({ displayName, setDarkMode, isAuthenticated }) => {

    const [topbanner, setTopbanner] = useState([]);
    const [loginName, setLoginName] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const [ displayDate, setDisplayDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const data = [
        { src: "images/email-50.png", value: "atleticobne@gmail.com" },
        { src: "images/phone-50.png", value: "+61 0451145007" },
    ];

    useEffect(() => {
        setTopbanner(data);
    }, []);


    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setDarkMode(!isDarkMode);  // Update the dark mode state in Index.js
        setIsPulsing(true);
        setTimeout(() => {
            setIsPulsing(false);
        }, 2000); // Duration of the pulse animation
    };

    const currentDate = () =>{
        const formattedDate = dayjs().format('dddd, DD-MM-YY');
        setDisplayDate(formattedDate)
    }
   

    return (
        <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-600 via-[#cb6ce6] to-[#cb6ce6] text-white p-2">
            <div className='text-white flex flex-wrap items-center'>
                <img onClick={currentDate} src="images/clock.png" className="w-6 cursor-pointer" alt="Clock" />
                <div className="ml-2 text-[10px] sm:text-[10px]">
                    <span className="block sm:inline">{displayDate}</span>
                </div>
            </div>
            <div className="flex-1 flex flex-wrap justify-center items-center">
                {topbanner.map((item, index) => (
                    <div key={index} className="p-1 flex items-center">
                        <img src={item.src} alt={index} className="w-6 h-6"></img>
                        <p className="ml-2">{item.value}</p>
                    </div>
                ))}
            </div>
            <div onClick={toggleDarkMode} className={`w-8 h-8 mt-1 mb-1 mr-2 rounded-full half-circle ${isPulsing ? 'animate-pulse' : ''}`}>
            </div>
            {!isAuthenticated && (
                <div className="flex items-center">
                    <img onClick={() => navigate('/login')} src="images/login-50.png" className="w-6 h-6 cursor-pointer mx-2" />
                </div>
            )}
            <div className="pr-4 text-center">
                {displayName}
            </div>
        </div>
    );
};

export default TopBanner;