import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamsDropdownMenu = ({ toggleDropdown }) => {
    const navigate = useNavigate();
    return (
        <div className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg mt-1 w-40 z-10" style={{ top: 'calc(100% + 5px)', left: 0, width: '130px' }}>
            <ul >
                <li>
                    <a onClick={() => navigate('/menssquad')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200">Mens Squad</a>
                </li>
                <li>
                    <a href="#" className="block px-2 py-2 text-gray-800 hover:bg-gray-200">Masters</a>
                </li>
                <li>
                    <a href="#" className="block px-2 py-2 text-gray-800 hover:bg-gray-200">U16 Boys</a>
                </li>
                <li>
                    <a href="#" className="block px-2 py-2 text-gray-800 hover:bg-gray-200">U12 Boys</a>
                </li>
            </ul>
        </div>
    );
};

export default TeamsDropdownMenu;