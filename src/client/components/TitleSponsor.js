import React from 'react';
import { useNavigate } from "react-router-dom";

const TitleSponsor = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-center text-[#181c1c] text-3xl font-bold mt-[170px] md:mt-6">Our Title Sponsor</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-2">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg">
                    <div className="bg-cover bg-center bg-no-repeat bg-contain h-[400px] md:h-[600px] lg:h-[800px] flex items-center justify-center gap-2" style={{ backgroundImage: "url('images/indus.jpeg')" }}>
                        
                    </div>
                </div>
                <div className="bg-[#f7f9fa] border border-gray-300 justify-center items-center shadow-lg rounded-lg">
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-xl italic text-[#3c3e40] font-semibold text-center mb-4 md:mb-6">
                            <span className="italic text-4xl font-bold ">&quot;</span>
                             Hello, it's Biju Surendran from Indus Mortgages. A huge thank you to Atletico Soccer Club for allowing us to sponsor this year! Your dedication to the club and soccer is truly commendable. 
                             Also, thank you for referring friends and family to me.
                            <span className="italic text-4xl font-bold">&quot;</span>
                        </p>
                        <div className="border border-white text-white px-2 md:px-4 py-2 mb-2 md:py-4 bg-[#25afe6] font-semibold rounded-lg text-xs md:text-base">
                            <button onClick={() => { navigate('/sponsors'); }}>View more sponsors &#x2192;&#x2192;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleSponsor;