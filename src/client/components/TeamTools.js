import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamTools = ({ closeToolsDropdown }) => {
    const navigate = useNavigate();
    return (
        <div className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg mt-0 w-40 z-10" style={{ top: 'calc(100% + 5px)', left: 0, width: '132px' }}>
            <ul >
                <li>
                    <a onClick={() => navigate('/teamtokengenerator')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">Team Generator</a>
                </li>
                <li>
                    <a onClick={() => navigate('/formation')} className="block px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-blue-700">Formation</a>
                </li>
               
            </ul>
        </div>
    );
};

export default TeamTools;