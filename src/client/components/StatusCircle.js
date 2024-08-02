import React from 'react';

const StatsCircle = () => {



  return (
    <div
      className="flex flex-wrap justify-center items-center py-10 bg-cover bg-center mt-2"
      style={{ backgroundImage: "url('images/lavender.png')" }}
    >
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-16">
        <div className="w-40 h-40 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-full p-6 md:p-8 lg:p-10 text-center shadow-lg">
          <p className="text-xl md:text-2xl lg:text-2xl font-bold text-[#ffde59]">70-100</p>
          <p className="text-sm md:text-base lg:text-lg text-[#ffde59]">Members</p>
        </div>
        <div className="w-40 h-40 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-full p-6 md:p-8 lg:p-10 text-center shadow-lg">
          <p className="text-xl md:text-2xl lg:text-2xl font-bold text-[#ff66c4]">45-50</p>
          <p className="text-sm md:text-base lg:text-lg text-[#ff66c4]">Active Players</p>
        </div>
        <div className="w-40 h-40 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-full p-6 md:p-8 lg:p-10 text-center shadow-lg">
          <p className="text-xl md:text-3xl lg:text-2xl font-bold text-[#73d957] animate-pulse">49</p>
          <p className="text-sm md:text-base lg:text-lg text-[#73d957]">Total Games</p>
        </div>
        <div className="w-40 h-40 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-full p-6 md:p-8 lg:p-10 text-center shadow-lg">
          <p className="text-xl md:text-2xl lg:text-2xl font-bold text-white">45</p>
          <p className="text-sm md:text-base lg:text-lg text-white">BNE Based</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCircle;