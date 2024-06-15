import React, { useState } from 'react';
import TeamsDropdownMenu from './TeamsDropdownMenu';
import { useNavigate } from 'react-router-dom';

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
        <nav className="bg-[#fafbfc] text-white shadow-lg p-2 sticky relative top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img
                            src="images/ablogo.PNG"
                            alt="Logo"
                            className="h-16 mr-2"
                        />
                        <div className="text-[#6232a8] font-semibold">
                            <p className="text-lg">ATLÉTICO BRISBANE</p>
                            <p className="text-xs ml-8 mt-[-2px] text-[#f0cb13] uppercase">
                                Dare to dream
                            </p>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <button
                            className="bg-gray-800 text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="h-10 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 7h12M6 12h12M6 17h12"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="#"
                            className="font-semibold linegrow"
                            onClick={() => navigate('/')}
                        >
                            HOME
                        </a>
                        <a
                            href="#"
                            className="font-semibold linegrow"
                            onClick={() => navigate('/about')}
                        >
                            ABOUT
                        </a>
                        <div className="relative">
                            <button
                                className="font-semibold linegrow"
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
                            </button>
                            {isDropdownOpen && (
                                <TeamsDropdownMenu closeDropdown={closeDropdown} />
                            )}
                        </div>
                        <a
                            href="#"
                            className="font-semibold linegrow"
                            onClick={() => navigate('/sponsors')}
                        >
                            SPONSORS
                        </a>
                        <a
                            href="#"
                            className="font-semibold linegrow"
                            onClick={() => {
                                closeDropdown();
                            }}
                        >
                            CONTACT
                        </a>
                    </div>
                </div>
                {isOpen && (
                    <div className="lg:hidden bg-[#f5f7f7] p-2 mb-2">
                        <div className="flex flex-col space-y-2">
                            <a
                                href="#"
                                className="font-semibold linegrow"
                                onClick={() => navigate('/')}
                            >
                                HOME
                            </a>
                            <a
                                href="#"
                                className="font-semibold linegrow"
                                onClick={() => navigate('/about')}
                            >
                                ABOUT
                            </a>
                            <div className="relative">
                            <button
                                className="font-semibold linegrow"
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
                            </button>
                            {isDropdownOpen && (
                                <TeamsDropdownMenu closeDropdown={closeDropdown} />
                            )}
                        </div>
                            <a
                                href="#"
                                className="font-semibold linegrow"
                                onClick={() => navigate('/sponsors')}
                            >
                                SPONSORS
                            </a>
                            <a
                                href="#"
                                className="font-semibold linegrow"
                                onClick={() => navigate('/contact')}
                            >
                                CONTACT
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNavbar;
