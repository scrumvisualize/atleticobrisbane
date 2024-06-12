import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const TopBanner = () => {

    const [topbanner, setTopbanner] = useState([]);
    const navigate = useNavigate();

    const data = [
        { src: "images/email-50.png", value: "atleticobris-info@gmail.com" },
        { src: "images/phone-50.png", value: "+61 023-456-7890" },
    ];

    useEffect(() => {
        setTopbanner(data);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row justify-center items-center bg-gradient-to-r from-blue-600 via-[#cb6ce6] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6] text-white">
            {topbanner.map((item, index) => (
                <div key={index} className="p-1 flex justify-center">
                    <img src={item.src} alt={index} className="w-6 h-6"></img>
                    <p className="ml-4">{item.value}</p>
                </div>
            ))}
            <div className="p-1 flex justify-end items-center">
                <img onClick={() => navigate('/login')} src="images/login-50.png" className="w-6 h-6 cursor-pointer" />
            </div>
        </div>
        
    );
};

export default TopBanner;