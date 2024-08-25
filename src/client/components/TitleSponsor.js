import React from 'react';
import { useNavigate } from "react-router-dom";

const TitleSponsor = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 md:mt-6 mb-2">
                <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-2 mb-2 relative">
                    <div className="bg-no-repeat bg-contain h-96 md:h-[600px] lg:h-[800px] flex items-center justify-center gap-2 inset-x-0 top-0 bg-white" style={{ backgroundImage: "url('images/indus.jpeg')" }}>
                    </div>
                </div>
                <div className="bg-white border border-gray-300 justify-center items-center shadow-lg rounded-lg">
                <h1 className="text-center text-[#002d75] text-3xl font-bold mt-[-6px] md:mt-6 py-4 md:py-0">Main Sponsor</h1>
                <h4 className="text-center text-[#b778d6] text-sm mt-2">INDUS MORTGAGES</h4>
                <p className="text-base mt-2 text-[14px] text-[#3c3e40] text-center mb-4 md:mb-2">Indus Mortgages are the only advisors qualified to carry-on financial advise in AU and NZ. Indus Mortgages was the main jersey sponsor for the year 2024</p>
                    <div className="flex flex-col items-center justify-center h-[350px]">
                        
                        <p className="text-base md:text-xl italic text-[#3c3e40] font-semibold text-center mb-4 md:mb-2">
                            <span className="italic text-4xl font-bold ">&quot;</span>
                            Hello, it's Biju Surendran from Indus Mortgages. A huge thank you to Atletico Soccer Club for allowing us to sponsor this year! Your dedication to the club and soccer is truly commendable.
                            Also, thank you for referring friends and family to me.
                            <span className="italic text-4xl font-bold">&quot;</span>
                        </p>
                        <div className="border border-white text-white px-2 md:px-4 py-2 mb-6 md:mb-4 md:py-4 bg-[#25afe6] hover:bg-[#cd75f0] font-semibold rounded-lg text-xs md:text-base">
                            <button onClick={() => { navigate('/sponsors'); }}>View more sponsors &#x2192;&#x2192;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleSponsor;