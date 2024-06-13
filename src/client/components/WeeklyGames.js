import React from 'react';

const WeeklyGames = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-[450px] mt-4 md:mt-[-80px] gap-4">
            <div className="bg-[#e6f2f7] p-4 relative">
                <h2 className="text-2xl text-[#5a147d] font-bold mb-2">Weekly Games</h2>
                <h3 className="text-lg text-[#b778d6] font-semibold mb-2">Sunnybank, Brisbane</h3>
                <p className="text-sm text-[#3c3e40]">
                    We hold regular sessions at 65 Gager St, Sunnybank, playing on Wednesdays and Saturdays from 6:30 pm to 8:30 pm. Junior training commences at 5:45 pm, followed by the men's regular game from 7:00 pm to 8:30 pm. On Wednesdays, we engage in a full-court game with 8 players per side, while Saturdays feature a half-court game with 6 players. </p>
                <p className="text-sm text-[#3c3e40]">We prioritize fair play and prohibit aggressive tackles or behavior. Based on consistent player performance, we select our main division players for open-age tournaments for all categories. Identified players, then engage in regular games and friendly matches to enhance their competency. We welcome all soccer enthusiasts to join our regular sessions on Wednesdays and Saturdays for a nominal monthly fee.
                </p>
                {/* YouTube video */}
                <div className="embed-responsive relative inset-0 flex justify-bottom">
                    <iframe
                        width="380"
                        height="200"
                        // src="https://www.youtube.com/embed/apyvKHqQlD4"
                        src="images/abvideo.mp4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="ml-[10px] mt-2 rounded-lg md:ml-[160px]"
                    ></iframe>
                    <div class="absolute top-[85px] ml-[110px] md:ml-[290px] flex items-center justify-center">
                        <h2 class="text-white text-xl font-bold">Welcomes all !</h2>
                    </div>
                </div>
            </div>

            {/* Second column with background image */}
            <div className="bg-cover bg-center bg-no-repeat h-full md:h-auto" style={{ backgroundImage: 'url("images/gamebg.PNG")' }}>
                {/* <div className="h-full bg-black bg-opacity-50">ffgdfgd</div> */}
            </div>
        </div>
    );
};

export default WeeklyGames;