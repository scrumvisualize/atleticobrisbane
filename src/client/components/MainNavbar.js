import React, { useState } from 'react';
import TeamsDropdownMenu from './TeamsDropdownMenu';
import { useNavigate } from "react-router-dom";

const MainNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-[#fefefe] p-2 sticky relative top-0 z-50">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src="images/ablogo.PNG"
                        alt="Logo"
                        className="h-[73px] mr-2"
                    />
                    <button
                        className="text-white focus:outline-none lg:hidden"
                        onClick={toggleMenu}
                    >
                        <div className="w-6 h-0.5 bg-white mb-1"></div>
                        <div className="w-6 h-0.5 bg-white mb-1"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                    </button>
                    <div className="text-[#6232a8] font-semibold">
                        <p className="h-[24px] text-[#0e7bc4] rounded"> ATLÉTICO BRISBANE <br />
                        <span className="text-xs ml-6 text-[#f0cb13]">Together we can</span></p>
                    </div>
                </div>
                <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <a
                        href="#"
                        className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 linegrow"
                        onClick={() => {
                            closeDropdown();
                        }}
                    >
                        HOME

                    </a>
                    <a
                        href="#"
                        className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 linegrow"
                        onClick={() => {
                            closeDropdown();
                        }}
                    >
                        ABOUT

                    </a>

                    <div className="relative">
                        <a
                            href="#"
                            className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 linegrow"
                            onClick={toggleDropdown}
                        >
                            TEAMS
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 inline-block ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        {isDropdownOpen && <TeamsDropdownMenu />}
                    </div>
                    <a
                        href="#"
                        className="font-semibold block mt-4 lg:inline-block lg:mt-0 mr-4 linegrow"
                        onClick={() => {
                            closeDropdown();
                        }}
                    >
                        CONTACT
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default MainNavbar;