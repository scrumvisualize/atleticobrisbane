import React, { useState, useEffect } from 'react';
import TeamsDropdownMenu from './TeamsDropdownMenu';
import { useNavigate, useLocation  } from 'react-router-dom';

const MainNavbar = ({ isAuthenticated, setAuthenticated}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                            src="images/ablogo.PNG"
                            alt="Logo"
                            className="h-16 mr-2"
                            onClick={() => navigate('/')}
                        />
                        <div className="text-[#6232a8] font-semibold">
                            <p className="text-lg">ATLÉTICO BRISBANE</p>
                            <p className="text-[10px] ml-10 mt-[-2px] text-[#f0cb13] uppercase">
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
