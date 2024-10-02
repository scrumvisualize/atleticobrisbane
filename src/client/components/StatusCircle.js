import React, { useState, useEffect} from 'react';

const dataArray = [
  {
    range: "70-100",
    text: "Members",
    color: "#ffde59" 
  },
  {
    range: "45-50",
    text: "Active Players",
    color: "#ff66c4" 
  },
  {
    range: "57",
    text: "Total Games",
    color: "#73d957" 
  },
  {
    range: "45",
    text: "BNE Based",
    color: "white" 
  }
];

const StatsCircle = () => {

  const [ status, setStatus] = useState([""]);

  useEffect(() => {
    setStatus(dataArray);
}, []);

  return (
    <div
      className="flex flex-wrap justify-center items-center py-10 bg-cover bg-center mt-2"
      style={{ backgroundImage: "url('images/lavender.png')" }}
    >
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-16">
        {
          status.map((item, index) => (
            <div key={index} className="circle-container">
              <svg
                className="rotating-dashes"
                width="200"
                height="200"
                viewBox="0 0 100 100"
              >
                {[...Array(20)].map((_, i) => (
                  <rect
                    key={i}
                    x="47.5"
                    y="8"
                    width="5"
                    height="1"
                    fill="white"
                    transform={`rotate(${i * 18 + 9} 50 50)`}
                  />
                ))}
              </svg>
              <div className="circle-content">
                <div className="w-40 h-40 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-full p-6 md:p-8 lg:p-10 text-center shadow-lg">
                  <p style={{ color: item.color }}className="text-xl md:text-2xl lg:text-2xl font-bold">{item.range}</p>
                  <p style={{ color: item.color }} className="text-sm md:text-base lg:text-lg">{item.text}</p>
                </div>
              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default StatsCircle;