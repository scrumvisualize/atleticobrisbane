import React from 'react';

const Training = () => {

    return (
        <div className="bg-cover bg-center bg-no-repeat h-[70px] md:h-[70px] lg:h-100 mt-6" style={{ backgroundImage: "url('images/tbanner.png')" }}>
            <div className="flex justify-between items-center h-full mx-6 md:mx-10 lg:mx-20">
                <div className="font-sans-serif text-xs md:text-xl text-white bg-slate-900 bg-opacity-40 pl-2 pr-2">
                    If you are interested for a paid 7-a side soccer training, please contact us to schedule one &#x2192;
                </div>
                <div>
                    <button className="border border-white text-white px-4 py-2 bg-[#d41743] font-semibold rounded-lg text-xs md:text-base">Training</button>
                </div>
            </div>
        </div>
    );
};

export default Training;