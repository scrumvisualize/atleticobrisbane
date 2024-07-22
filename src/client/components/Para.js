import React from 'react';

const Para = () => {

  /*Created to use a copy in banner.js and left the sample here. */
  
  return (
    <div className="flex h-[500px] mt-10 relative">
      {/* First Column */}
    
      <div className="relative w-1/2" style={{ zIndex: 4 }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0% 100%)', background: 'linear-gradient(to right, rgba(50, 11, 112, 1.00), rgba(164, 64, 194, 1.00), rgba(220, 87, 169, 0.82))' }}>
          <h1 className="text-white text-2xl md:text-4xl font-bold">ATLETICO BRISBANE</h1>
          <p className="text-pink-400 mt-2">Dare to dream</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</button>
        </div>
      </div>

      {/* Second Column */}
      <div className="relative w-1/2 -ml-[194px]" style={{ zIndex: 3 }}>
        <div className="absolute scale-10 top-0 left-0 right-0 bottom-0 bg-cover bg-contain bg-no-repeat" style={{ clipPath: 'polygon(30% 0, 100% 0, 80% 100%, 0 100%)', backgroundImage: "url('images/ab-slide-1.JPG')" }}></div>
      </div>

      {/* Third Column */}
      <div className="relative w-1/3 -ml-[160px]" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)', backgroundImage: "url('images/top2.JPG')" }}></div>
      </div>

      {/* Fourth Column */}
      <div className="relative w-1/4 -ml-[190px]" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center" style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 20% 100%)', backgroundImage: "url('images/top-3.JPG')" }}></div>
      </div>
    </div>
  );
};

export default Para;
