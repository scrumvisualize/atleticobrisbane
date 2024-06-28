import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('loginEmail');
        navigate("/login");
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
                            className="font-semibold linegrow"
                            onClick={() => navigate('/admin')}
                        >
                            Admin
                        </a>
                        <a
                            className="font-semibold linegrow"
                            onClick={() => navigate('/updates')}
                        >
                            Updates
                        </a>
                        
                        <a
                            className="font-semibold"
                            onClick={handleLogout}
                            
                        >
                            <img className="w-8" src="/images/logout.png" alt="Logout" />
                        </a>

                    </div>
                </div>
                {isOpen && (
                    <div className="lg:hidden bg-[#f5f7f7] p-2 mb-2">
                        <div className="flex flex-col space-y-2">
                            <a
                                className="font-semibold linegrow"
                                onClick={() => navigate('/admin')}
                            >
                                Admin
                            </a>
                            <a
                                className="font-semibold linegrow"
                                onClick={() => navigate('/updates')}
                            >
                                Updates
                            </a>
                            <a
                            className="font-semibold"
                            onClick={handleLogout}
                            
                        >
                            <img className="w-8" src="/images/logout.png" alt="Logout" />
                        </a>

                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MainNavbar;