import React from 'react';

const TeamsDropdownMenu = ({ toggleDropdown }) => {
    return (
        <div className="flex">
            <ul className="absolute bg-white border border-gray-300 p-2 rounded shadow-lg" style={{ top: 'calc(100% + 5px)', left: 0, width: '130px'}}>
            <li>
                <a href="#" className="block px-2 py-2 text-gray-800 hover:bg-gray-200">Mens squad</a>
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