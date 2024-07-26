import React, { useState, useEffect } from 'react';
import TeamsDropdownMenu from './TeamsDropdownMenu';
import { useNavigate, useLocation  } from 'react-router-dom';

const appURL = process.env.REACT_APP_URL;

const MainNavbar = ({ isAuthenticated, setAuthenticated}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isTournamentOpen, setIsTournamentOpen] = useState(true);

    const handleClick = (e) => {
        e.preventDefault();
        setIsTournamentOpen(true);
    };

    const closePopup = () => {
        setIsTournamentOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('loginEmail');
        localStorage.removeItem('displayName');
        setAuthenticated(false);
        window.location.reload(true);
        navigate('/login');
    };

    useEffect(() => {
        // Close the dropdown when the location changes
        closeDropdown();
    }, [location]);


    return (
        <nav className="bg-[#fafbfc] text-white shadow-lg p-0 sticky relative top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img
                            src="images/ablogo.png"
                            alt="Logo"
                            className="h-16 mr-2"
                            onClick={() => navigate('/')}
                        />
                        <div className="text-[#6232a8] font-semibold">
                            <p className="text-lg">ATLÉTICO BRISBANE</p>
                            <p className="text-[10px] ml-10 mt-[-2px] text-[#fc1930] uppercase">
                                Dare to dream
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-[calc(20%-30px)] mt-[-10px] ml-28">
                            <img className="w-full h-auto" src="images/discount.png" alt="Discount" />
                        </div>
                    </div>
                    <div>
                        <div className="pt-2">
                            <div
                                onClick={handleClick}
                                className="bg-cover bg-no-repeat bg-contain bg-custom-center w-[100px] h-[50px] sm:w-[300px] md:w-[100px] lg:w-[350px] h-10 md:h-[40px] mr-2 md:ml-[-100px] flex text-base text-white hidden sm:block highlight-text"
                                style={{ backgroundImage: `url(${appURL}/images/united.png')` }}
                            >
                                <a href="#"></a>
                            </div>
                        </div>
                            <style>
                            {`
                            @keyframes runningText {
                                0% {
                                    background-position: 0 100%;
                                }
                                100% {
                                    background-position: 100% 100%;
                                }
                            }
                            .highlight-text {
                                display: inline-block;
                                background: linear-gradient(90deg, #7f5ec4, #c24682, #7f5ec4);
                                color: #000;
                                padding: 7px 7px 7px 7px;
                                animation: runningText 5s linear infinite;
                                border-radius: 5px;
                                text-decoration:underline;
                                color: #ffffff; 
                                font-weight: bold;
                            }
                        `}</style>
                        {isTournamentOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="fixed inset-0 bg-black opacity-50" onClick={closePopup}></div>
                            <div className="bg-white rounded-lg relative max-w-[380px] w-full max-h-[90vh] p-2 overflow-hidden">
                                <button
                                    className="absolute top-4 right-4 w-10 h-10 bg-[#42cbf5] font-bold text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1184a6] transition"
                                    aria-label="Close"
                                    onClick={closePopup} // Ensure the button closes the popup
                                >
                                    ×
                                </button>
                                <div className="flex justify-center items-center w-full h-full">
                                    <img
                                        src="/images/unitedkerala.jpeg"
                                        alt="United Kerala Brisbane 7's Tournament"
                                        className="w-full h-auto max-h-[80vh] object-contain w-3/4 h-auto mx-auto block sm:w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        )}
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
                            className="font-semibold linegrow"
                            onClick={() => navigate('/')}
                        >
                            HOME
                        </a>
                        <a
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
                            className="font-semibold linegrow"
                            onClick={() => navigate('/teamgenerator')}
                        >
                            TEAM GENERATOR
                        </a>
                        <a
                            className="font-semibold linegrow"
                            onClick={() => navigate('/sponsors')}
                        >
                            SPONSORS
                        </a>
                        <a
                            className="font-semibold linegrow"
                            onClick={() => navigate('/contact')}
                        >
                            CONTACT
                        </a>
                        {isAuthenticated && (
                            <>
                                <a
                                    className="font-semibold linegrow"
                                    onClick={() => navigate('/admin')}
                                >
                                    ADMIN
                                </a>

                                <a
                                    className="font-semibold"
                                    onClick={handleLogout}
                                >
                                    <img className="w-6" src="/images/logout.png" alt="Logout" />
                                </a>
                            </>
                        )}
                    </div>
                </div>
                {isOpen && (
                    <div className="lg:hidden bg-[#f5f7f7] p-2 mb-2">
                        <div className="flex flex-col space-y-2">
                            <a   
                                className="font-semibold linegrow"
                                onClick={() => navigate('/')}
                            >
                                HOME
                            </a>
                            <a
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
                                className="font-semibold linegrow"
                                onClick={() => navigate('/teamgenerator')}
                            >
                                TEAM GENERATOR
                            </a>
                            <a                  
                                className="font-semibold linegrow"
                                onClick={() => navigate('/sponsors')}
                            >
                                SPONSORS
                            </a>
                            <a
                                className="font-semibold linegrow"
                                onClick={() => navigate('/contact')}
                            >
                                CONTACT
                            </a>
                            {isAuthenticated && (
                            <>
                                <a
                                    className="font-semibold linegrow"
                                    onClick={() => navigate('/admin')}
                                >
                                    ADMIN
                                </a>
                                <a
                                    className="font-semibold"
                                    onClick={handleLogout}
                                >
                                    <img className="w-6" src="/images/logout.png" alt="Logout" />
                                </a>
                            </>
                        )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNavbar;
