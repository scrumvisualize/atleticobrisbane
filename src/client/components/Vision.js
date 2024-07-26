
import React from 'react';
import Values from './Values';

const Vision = ({darkMode}) => {

    return (
        <div className="container mx-auto p-2">
            <div className="flex flex-col items-center -mx-2 bg-gradient-to-r from-blue-100 to-pink-100">
                <div className="w-full">
                    <h1 className={`text-3xl text-[#002d75] font-bold text-center mt-8 ${darkMode ? 'text-white' : 'text-[#002d75]'}`}>Our Vision</h1>
                    <p className={`p-4 mt-4 text-left text-[14px] text-[#3c3e40] max-w-5xl mx-auto ${darkMode ? 'text-white' : 'text-[#002d75]'}`}>
                        At Atletico Brisbane, our vision is to effectively promote soccer within our community, especially among our vibrant Malayali soccer group. We are dedicated to elevating the capabilities of all our Malayali players, ensuring they reach their full potential on the field. Beyond individual development, we aim to build a strong bond between our players and their families, fostering a sense of unity and community that extends beyond the game.

                        Our future vision is to see Atletico Brisbane participating in recognized league games with other clubs in Brisbane. This endeavor will not only help us build a stronger and more competitive soccer team but also provide our players with the exposure and experience needed to excel at higher levels of competition.

                        We are particularly focused on nurturing our under-12 players, training them to perform at their best according to their unique abilities. By investing in the development of our young talents, we aim to create a pipeline of skilled players who will carry the legacy of Atletico Brisbane forward.

                     </p>
                    <h1 className={`text-3xl text-[#002d75] font-bold text-center mt-8 mb-4 ${darkMode ? 'text-white' : 'text-[#002d75]'}`}>Our Values</h1>
                </div>
                <Values />
            </div>
        </div>
    );
};

export default Vision;