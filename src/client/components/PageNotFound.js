import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 via-[#0c50f3] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6]">
            <h1 className="text-4xl font-bold mb-4 text-white">404 - Page Not Found</h1>
            <p className="mb-4 text-white">Sorry, the page you are looking for does not exist.</p>
            <button 
                onClick={handleGoHome} 
                className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-700"
            >
                Go Home
            </button>
        </div>
    );
};

export default NotFound;
