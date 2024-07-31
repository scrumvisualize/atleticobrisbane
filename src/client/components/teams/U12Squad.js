import React, { useState, useEffect } from 'react';
import Footer from "../Footer";
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const options = ["Striker", "Midfielder", "Defender", "Goal Keeper"];

const clubData = [
    {
        favclub: "Arsenal",
        clublogo: "images/f_arsenal.PNG"
    },
    {
        favclub: "Barcelona",
        clublogo: "images/f_barca.png"
    },
    {
        favclub: "Chelsea",
        clublogo: "images/f_chelsea.PNG"
    },
    {
        favclub: "City",
        clublogo: "images/f_city.png"
    },
    {
        favclub: "United",
        clublogo: "images/f_united.png"
    },
    {
        favclub: "RealMadrid",
        clublogo: "images/f_madrid.png"
    },
    {
        favclub: "Liverpool",
        clublogo: "images/f_liverpool.png"
    },
    {
        favclub: "Bayern",
        clublogo: "images/f_bayern.png"
    },
    {
        favclub: "PSG",
        clublogo: "images/f_psg.png"
    },
    {
        favclub: "Dortmund",
        clublogo: "images/f_dortmund.png"
    },
    {
        favclub: "Tottenham",
        clublogo: "images/f_tottenham.png"
    },
];

const U12Squad = () => {

    const [u12Squad, setU12Squad] = useState([]);
    const [filteredSquad, setFilteredSquad] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appURL}/service/u12playersList`);
                const sortedPlayers = res.data.players.sort((a, b) => a.name.localeCompare(b.name));
                setU12Squad(sortedPlayers);
                setFilteredSquad(sortedPlayers);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false); // Close the dropdown after selecting an option
        // Filter players based on selected option
        const filteredPlayers = option ? u12Squad.filter(player => player.position === option) : u12Squad;
        setFilteredSquad(filteredPlayers);
    };

    useEffect(() => {
        setU12Squad(u12Squad);
    }, []);

    const getClubLogo = (favclub) => {
        const club = clubData.find(c => c.favclub === favclub);
        return club ? club.clublogo : null;
    };


    return (
        <div>
            <div className="mb-2 bg-cover bg-center bg-no-repeat h-[120px] md:h-[145px] lg:h-128" style={{ backgroundImage: "url('images/u12squad.png')" }}>
            </div>
            <div className="text-center font-semibold text-xs">
                <h3>Home &#8594; Teams &#8594; U12 Squad </h3>
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
            {
                filteredSquad.length === 0 ? (
                    <div className="text-center font-semibold mt-4 text-gray-600">
                        Sorry, no data available for the selected filter.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 ml-4 mr-4 md:ml-8 mt-4">

                        {
                            filteredSquad.map((player, index) => (
                                <div key={index} className="relative overflow-hidden rounded-lg shadow-md bg-white bg-gradient-to-r from-blue-600 via-[#0c50f3] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6]" >
                                    <img
                                        src={player.hidephoto === 'Yes' ? '/images/man3.png' : player.photo.replace(/^\/root\/atleticobrisbane\/public/, '')}
                                        alt={player.name}
                                        className="w-full h-full transition duration-300 transform hover:grayscale hover:brightness-75 hover:scale-105 transition-transform duration-300"
                                        style={{ minHeight: '100%', minWidth: '100%' }}
                                    />
                                    <div className="absolute top-0 left-0 p-4 text-white bg-black bg-opacity-75 rounded-tr-md">
                                        <span className="text-lg font-bold">{player.jerseynumber}</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-[#CDCD32]">
                                        <p className="text-xs font-semibold text-white text-center uppercase">{player.position}</p>
                                        <p className="mt-1 text-lg font-bold text-white text-center flex items-center justify-center">
                                            {player.name}
                                            {player.favclub && (
                                                <img
                                                    src={getClubLogo(player.favclub)}
                                                    alt={player.favclub}
                                                    className="ml-2 w-8 h-8 rounded-full"
                                                />
                                            )}
                                        </p>
                                        <div className="h-px bg-white my-2">
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            <Footer />
        </div>
    );
};

export default U12Squad;