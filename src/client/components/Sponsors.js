import React, { useState, useEffect } from 'react';
import Footer from "./Footer";
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const Sponsors = () => {

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

    return (
        <div className="container mx-auto px-2">
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[150px] lg:h-128 " style={{ backgroundImage: "url('images/sponsors.png')", backgroundPosition: 'center 80%'  }}>
            </div>
            <div className="text-center font-semibold text-xs mb-2">
                <h3>Home &#8594; Sponsors </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                {
                    sponsorsList.length === 0 ? (
                        <div className="flex justify-center items-center col-span-1 md:col-span-3 h-[50px] text-center font-semibold mt-4 text-gray-600">
                            Sorry, no sponsor data available to display.
                        </div>
                    ) : (
                    sponsorsList.map((item, index) => (
                        <a key={item.id} href={item.url}>
                            <div className="bg-white p-4 rounded-lg">
                                <div className="w-[100px] h-[100px] mx-auto mb-4 rounded overflow-hidden">
                                    <img
                                        src={`${item.logo.replace(/^(\.\.\\)+public\\/, '')}`}
                                        alt="Sponsor Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <hr className="my-4 border-t-2 border-[#e1ecf7]" />
                                <h3 className="text-base text-[#b778d6] font-semibold justify-center pb-2">{item.header}</h3>
                                <p className="mb-4 text-sm text-[#3c3e40]">{item.description}</p>
                                <a href={item.link} className="mb-4 text-sm text-[#7d43f0]">{item.link}</a>

                                <hr className="my-4 border-t-2 border-[#e1ecf7]" />
                                <div>
                                    <h3 className="text-sm font-semibold text-center">{item.category}</h3>
                                </div>
                            </div>
                        </a>
                    )))
                }
            </div>
            <Footer />
        </div>
    );
};

export default Sponsors;