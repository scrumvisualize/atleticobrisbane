import React, { useState, useEffect } from 'react';
import MainNavbar from "../MainNavbar";
import Footer from "../Footer";

const players = [
    {
        id: 1,
        name: 'Saju',
        position: 'STRIKER',
        number: '15',
        image: 'images/Ney1.png', // Replace with actual path to your images
    },
    {
        id: 2,
        name: 'Joji',
        position: 'DEFENDER',
        number: '5',
        image: 'images/Ney1.png',
    },
    {
        id: 3,
        name: 'Jibi',
        position: 'DEFENDER',
        number: '3',
        image: 'images/Ney1.png',
    },

    {
        id: 4,
        name: 'Vinod',
        position: 'MID FIELDER',
        number: '7',
        image: 'images/Ney1.png',
    },
    {
        id: 5,
        name: 'Sharan',
        position: 'MID FIELDER',
        number: '10',
        image: 'images/Ney1.png',
    },
    {
        id: 6,
        name: 'Prince',
        position: 'STRIKER',
        number: '8',
        image: 'images/Ney1.png',
    },

];

const MensSquad = () => {

    const [mensSquad, setMensSquad] = useState([]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 ml-4 mr-4 md:ml-8 mt-4">

                {
                    mensSquad.map((player, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-md bg-white bg-gradient-to-r from-blue-600 via-[#0c50f3] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6]" >
                            <img
                                src={player.image}
                                alt={player.name}
                                className="w-full h-full transition duration-300 transform hover:grayscale hover:brightness-75"
                                style={{ minHeight: '100%', minWidth: '100%' }}
                            />
                            <div className="absolute top-0 left-0 p-4 text-white bg-black bg-opacity-75 rounded-tr-md">
                                <span className="text-lg font-bold">{player.number}</span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#CDCD32]">
                                <p className="text-xs font-semibold text-white text-center">{player.position}</p>
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