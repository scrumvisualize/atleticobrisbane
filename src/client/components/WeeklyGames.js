import React from 'react';

const WeeklyGames = () => {

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 md:mt-0">
        <div className="bg-white p-4 rounded-lg relative">
          <h2 className="text-2xl text-[#002d75] font-bold mb-2">Weekly Games</h2>
          <h3 className="text-lg text-[#b778d6] font-semibold mb-2">Sunnybank, Brisbane</h3>
          <p className="text-[14px] text-[#3c3e40] mb-2">
            We hold regular sessions at Eagles Sports Complex, Manfield, on Thursdays from 6:30 pm to 8:30 pm, and at 65 Gager St, Sunnybank, on Saturdays from 6:30 pm to 8:30 pm. Junior training commences at 5:45 pm, followed by the men's regular game from 7:00 pm to 8:30 pm. On Thursdays & Saturdays we engage in a full-court game with 8 players per side.
          </p>
          <p className="text-[14px] text-[#3c3e40]">
            We prioritize fair play and prohibit aggressive tackles or behavior. Based on consistent player performance, we select our main division players for open-age tournaments for all categories. Identified players, then engage in regular games and friendly matches to enhance their competency. We welcome all soccer enthusiasts to join our regular sessions on Thursdays and Saturdays for a nominal monthly fee.
          </p>
          <div className="relative">
            <iframe
              width="380"
              height="200"
              src="https://www.youtube.com/embed/apyvKHqQlD4"
              title="Sunnybank Games"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full mt-2 rounded-lg"
            ></iframe>
            <div className="absolute bottom-2 left-2 flex items-center justify-center bg-black bg-opacity-50 text-white p-2 rounded-lg">
              <h2 className="text-xl font-bold">Welcomes all!</h2>
            </div>
          </div>
        </div>
        <div className="relative bg-cover bg-no-repeat rounded-lg" style={{ backgroundImage: 'url("images/weekly1.PNG")', height: '495px' }}>
        </div>
      </div>
    );
};

export default WeeklyGames;