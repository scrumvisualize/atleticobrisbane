import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const TopBanner = ({displayName}) => {

    const [topbanner, setTopbanner] = useState([]);
    const [loginName, setLoginName] = useState('');
    const navigate = useNavigate();

    const data = [
        { src: "images/email-50.png", value: "atleticobris-info@gmail.com" },
        { src: "images/phone-50.png", value: "+61 023-456-7890" },
    ];

    useEffect(() => {
        setTopbanner(data);
    }, []);

    return ( 
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-[#cb6ce6] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6] text-white">
            <div className="flex-1 flex justify-center items-center">
                {topbanner.map((item, index) => (
                    <div key={index} className="p-2 flex items-center">
                        <img src={item.src} alt={index} className="w-6 h-6"></img>
                        <p className="ml-2">{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <img onClick={() => navigate('/login')} src="images/login-50.png" className="w-6 h-6 cursor-pointer mx-2" />
            </div>
            <div className="pr-4">
                {displayName}
            </div>
        </div>
    );
};

export default TopBanner;