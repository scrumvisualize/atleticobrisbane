import React from 'react';

const Training = () => {

    return (
        <div className="bg-cover bg-bottom bg-no-repeat h-[80px] md:h-[100px] lg:h-100 mt-6" style={{ backgroundImage: "url('images/tbanner2.png')" }}>
            <div className="flex justify-between items-center h-full mx-4 md:mx-10 lg:mx-20">
                <div className="font-sans-serif text-xs md:text-xl text-white bg-slate-900 bg-opacity-40 pl-2 pr-2 ml-0 mr-8 md:ml-20">
                    Lets give our kids better training at the budding stage &#x2192;
                </div>
                <div className="font-sans-serif text-xs md:text-base text-white pl-2 pr-2 flex flex-col md:flex-row items-center">
                    
                    <div className="text-xs md:text-base mb-2 md:mb-0 ml-4 md:mr-10">
                        
                        <div className="hidden md:block">
                            <span>If you are interested for a </span>
                            <br />
                            <span>paid 7-a side soccer training </span>
                            <br />
                            <span>please contact us here </span>
                        </div>
                    </div>
                    
                    <button className="border border-white text-white px-2 md:px-4 py-2 md:py-3 bg-[#d41743] font-semibold rounded-lg text-xs md:text-base">
                        Training
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Training;