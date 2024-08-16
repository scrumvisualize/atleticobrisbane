import React, { useState, useEffect } from 'react';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const SponsorList = ({darkMode}) => {
    const [sponsorsList, setSponsorsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appURL}/service/sponsorsList`);
                setSponsorsList(res.data.sponsors);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

     /* replace(/^(\.\.\\)+public\\/, '') - for localhost path  */ 
    return (
        <div className='relative bg-gradient-to-r from-blue-100 to-pink-100 rounded-lg' >
            <div className={`text-center text-3xl font-bold mt-[20px] md:mt-2 ${darkMode ? 'text-[#0c183b]' : 'text-[#002d75]'}`}>
                <h1>Our Prospective Sponsors</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {
                    sponsorsList.map((item, index) => (
                        <div key={index}>
                            <a href={item.link} className="flex flex-col items-center px-2 py-4">
                                <img src={`${item.logo.replace(/^\/root\/atleticobrisbane\/public/, '')}`} className="w-[210px] h-[190px] rounded-lg" alt="Image 1" />
                            </a>
                            <div className="bottom-0 w-full">
                                <div className={`text-xs text-[#002d75] text-center font-semibold ${darkMode ? 'text-white' : 'text-[#002d75]'}`}>{item.header}</div>
                            </div>
                        </div> 
                    ))}
            </div>
        </div>
    );
};

export default SponsorList;