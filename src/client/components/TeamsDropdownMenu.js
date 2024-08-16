import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamsDropdownMenu = ({ toggleDropdown }) => {
    const navigate = useNavigate();
    return (
        <div className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg mt-1 w-40 z-10" style={{ top: 'calc(100% + 5px)', left: 0, width: '132px' }}>
            <ul >
                <li>
                    <a onClick={() => navigate('/menssquad')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">Mens Squad</a>
                </li>
                <li>
                    <a onClick={() => navigate('/mastersquad')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">Master Squad</a>
                </li>
                <li>
                    <a onClick={() => navigate('/u16squad')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">U16 Boys</a>
                </li>
                <li>
                    <a onClick={() => navigate('/u12squad')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">U12 Boys</a>
                </li>
                <li>
                    <a onClick={() => navigate('/teamdistribution')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">Team Tree</a>
                </li>
            </ul>
        </div>
    );
};

export default TeamsDropdownMenu;