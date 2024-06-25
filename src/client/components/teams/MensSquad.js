import React, { useState, useEffect } from 'react';
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";

const players = [
    {
        id: 1,
        name: 'Saju',
        position: 'Striker',
        number: '15',
        image: 'images/Ney1.png', // Replace with actual path to your images
    },
    {
        id: 2,
        name: 'Joji',
        position: 'Defender',
        number: '5',
        image: 'images/Ney1.png',
    },
    {
        id: 3,
        name: 'Jibi',
        position: 'Defender',
        number: '3',
        image: 'images/Ney1.png',
    },

    {
        id: 4,
        name: 'Vinod',
        position: 'Mid Fielder',
        number: '7',
        image: 'images/Ney1.png',
    },

    {
        id: 5,
        name: 'Sharan',
        position: 'Mid Fielder',
        number: '10',
        image: 'images/Ney1.png',
    },

    {
        id: 6,
        name: 'Prince',
        position: 'Striker',
        number: '8',
        image: 'images/Ney1.png',
    },

    {
        id: 7,
        name: 'Aby Mathai',
        position: 'Defender',
        number: '8',
        image: 'images/Ney1.png',
    },
    {
        id: 8,
        name: 'Kiran',
        position: 'Striker',
        number: '11',
        image: 'images/Ney1.png',
    },
    {
        id: 9,
        name: 'Sheyon',
        position: 'Mid Fielder',
        number: '77',
        image: 'images/Ney1.png',
    },

];

const options = ["Striker", "Mid Fielder", "Defender", "Goal Keeper"];

const MensSquad = () => {

    const [mensSquad, setMensSquad] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown after selecting an option
        // Filter players based on selected option
    const filteredPlayers = option ? players.filter(player => player.position === option) : players ;
    setMensSquad(filteredPlayers);
    };

    useEffect(() => {
        setMensSquad(players);
    }, []);

    return (
        <div>
            <MainNavbar />
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[130px] md:h-[200px] lg:h-128" style={{ backgroundImage: "url('images/mensq1.png')" }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; Teams &#8594; Mens Squad </h3>
            </div>
            <div className="relative inline-block text-left ml-4 md:ml-8">
                <div>
                    <button
                        type="button"
                        className="inline-flex justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 mt-4 md:mt-2 text-sm leading-5 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150"
                        onClick={toggleDropdown}
                    >
                        {selectedOption || 'Select an option'}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 12l-5-5 1.5-1.5L10 9.5 13.5 5 15 6.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {isOpen && (
                    <div className="absolute right-0 mt-4 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4 top-8 z-20">
                        <div className="py-1">
                            <button
                                key="all"
                                className={`block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 ${selectedOption === null ? 'bg-gray-200' : ''}`}
                                onClick={() => handleOptionClick(null)} // Reset filter
                            >
                                All Players
                            </button>
                            {options.map((option) => (
                                <button
                                    key={option}
                                    className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 ml-4 mr-4 md:ml-8 mt-4">

                {
                    mensSquad.map((player, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-md bg-white bg-gradient-to-r from-blue-600 via-[#0c50f3] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6]" >
                            <img
                                src={player.image}
                                alt={player.name}
                                className="w-full h-full transition duration-300 transform hover:grayscale hover:brightness-75 hover:scale-105 transition-transform duration-300"
                                style={{ minHeight: '100%', minWidth: '100%' }}
                            />
                            <div className="absolute top-0 left-0 p-4 text-white bg-black bg-opacity-75 rounded-tr-md">
                                <span className="text-lg font-bold">{player.number}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#CDCD32]">
                                <p className="text-xs font-semibold text-white text-center uppercase">{player.position}</p>
                                <p className="mt-2 text-lg font-bold text-white text-center">{player.name}</p>
                                <div className="h-px bg-white my-2"></div> {/* Line separator */}
                            </div>
                        </div>
                    ))}
            </div>
            <Footer />
        </div>
    );
};

export default MensSquad;