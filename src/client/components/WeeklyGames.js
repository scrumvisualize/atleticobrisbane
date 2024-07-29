import React from 'react';

const WeeklyGames = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[450px] mt-20 md:mt-[-88px] gap-2">
            <div className="bg-[#f8f6fc] p-4 relative rounded-lg">
                <h2 className="text-2xl text-[#002d75] font-bold mb-2">Weekly Games</h2>
                <h3 className="text-lg text-[#b778d6] font-semibold mb-2">Sunnybank, Brisbane</h3>
                <p className="text-[14px] text-[#3c3e40]">
                We hold regular sessions at Eagles Sports Complex, Manfield, on Thursdays from 6:30 pm to 8:30 pm, and at 65 Gager St, Sunnybank, on Saturdays from 6:30 pm to 8:30 pm. Junior training commences at 5:45 pm, followed by the men's regular game from 7:00 pm to 8:30 pm. On Thursdays & Saturdays we engage in a full-court game with 8 players per side.</p>
                <p className="text-[14px] text-[#3c3e40]">We prioritize fair play and prohibit aggressive tackles or behavior. Based on consistent player performance, we select our main division players for open-age tournaments for all categories. Identified players, then engage in regular games and friendly matches to enhance their competency. We welcome all soccer enthusiasts to join our regular sessions on Wednesdays and Saturdays for a nominal monthly fee.
                </p>
                <div className="embed-responsive relative inset-0 flex justify-bottom">
                    <iframe
                        width="380"
                        height="200"
                        src="https://www.youtube.com/embed/apyvKHqQlD4"
                        // src="images/abvideo.mp4"
                        title="Sunnybank Games"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="ml-[10px] mt-2 rounded-lg md:ml-[160px]"
                    ></iframe>

                    <div className="absolute top-[85px] ml-[110px] md:ml-[290px] flex items-center justify-center">
                        <h2 className="text-white text-xl font-bold">Welcomes all !</h2>
                    </div>
                </div>
            </div>

            <div className="relative bg-cover bg-no-repeat h-[450px] md:h-auto rounded-lg" style={{ backgroundImage: 'url("images/weekly.PNG")' }}>
            </div>
        </div>
    );
};

export default WeeklyGames;