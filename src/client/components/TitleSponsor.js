import React from 'react';
import { useNavigate } from "react-router-dom";

const TitleSponsor = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-[646px] md:mt-[40px] mb-2">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-2">
                    <div className="bg-cover bg-no-repeat bg-contain h-96 md:h-[600px] lg:h-[800px] flex items-center justify-center gap-2 inset-x-0 top-0 bg-white" style={{ backgroundImage: "url('images/indus.jpeg')" }}>
                    </div>
                </div>
                <div className="bg-[#f7f9fa] border border-gray-300 justify-center items-center shadow-lg rounded-lg">
                <h1 className="text-center text-[#002d75] text-3xl font-bold mt-[-10px] md:mt-6">Main Sponsor</h1>
                <h4 className="text-center text-[#b778d6] text-sm ">indus MORTGAGES</h4>
                    <div className="flex flex-col items-center justify-center h-full">
                        
                        <p className="text-base md:text-xl italic text-[#3c3e40] font-semibold text-center mb-4 md:mb-2">
                            <span className="italic text-4xl font-bold ">&quot;</span>
                            Hello, it's Biju Surendran from Indus Mortgages. A huge thank you to Atletico Soccer Club for allowing us to sponsor this year! Your dedication to the club and soccer is truly commendable.
                            Also, thank you for referring friends and family to me.
                            <span className="italic text-4xl font-bold">&quot;</span>
                        </p>
                        <div className="border border-white text-white px-2 md:px-4 py-2 mb-6 md:mb-4 md:py-4 bg-[#25afe6] font-semibold rounded-lg text-xs md:text-base">
                            <button onClick={() => { navigate('/sponsors'); }}>View more sponsors &#x2192;&#x2192;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleSponsor;