import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "./AdminNavbar";
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const Admin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('loginEmail');
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchPlayerRequests();
        }
    }, [navigate]);

    const fetchPlayerRequests = async () => {
        try {
            const response = await axios.get(`${appURL}/service/registerPlayerList`);
            const updatedRequests = response.data.requests.map(player => ({
                ...player,
                status: player.status === 'Yes' ? 'accepted' : player.status === 'No' ? 'declined' : ''
            }));
            setRequestList(updatedRequests);
            setSearchResults(updatedRequests);
        } catch (error) {
            console.error("Error fetching player requests:", error);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAcceptPlayer = (playerId) => {
        const updatedList = requestList.map(player =>
            player.id === playerId ? { ...player, status: 'accepted' } : player
        );
        setRequestList(updatedList);
    };

    const handleDeclinePlayer = (playerId) => {
        const updatedList = requestList.map(player =>
            player.id === playerId ? { ...player, status: 'declined' } : player
        );
        setRequestList(updatedList);
    };

    const handleSave = async () => {
        try {
            const res = await axios.post('/service/updatePlayerStatus', requestList);
            if (res.data.success) {
                setRequestList(res.data.updatedPlayers);
                setSearchResults(res.data.updatedPlayers);
            }
            console.log("Save response:", res.data);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };


    useEffect(() => {
        const results = requestList.filter(player =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.mobile.includes(searchTerm) ||
            player.email.includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm, requestList]);

    return (
        <div className="container mx-auto px-4 py-8">
            <AdminNavbar />
            <div className="text-center font-semibold text-base mt-2">
                <h3>Home &#8594; Manage Players</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
                <div className="md:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                onChange={handleChange}
                                placeholder="Search player requests..."
                                className="w-full border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 border rounded-md px-4 py-2 mb-4"
                            />
                        </div>

                        <div className="space-y-2 px-2 h-[360px] overflow-y-auto">
                            {searchResults.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex flex-col md:flex-row items-center border-b border-gray-200 pb-4 ${item.status === 'accepted' ? 'bg-green-100' : item.status === 'declined' ? 'bg-red-100' : ''}`}
                                >
                                    <img src={item.photo.replace(/^(\.\.\\)+public\\/, '')} alt="Player" className="w-12 h-12 rounded-full ml-2 mr-2" />
                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-3">
                                            <div className="md:col-span-1">
                                                <span className="text-gray-700 text-base font-semibold">{item.name}</span>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-gray-700 text-xs">{item.email}</span>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-gray-700 text-xs">{item.mobile}</span>
                                            </div>
                                            <div className="md:col-span-3">
                                                <span className="text-gray-700 text-xs">{item.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:ml-4 mt-4 md:mt-0 flex space-x-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name={`status-${item.id}`}
                                                value="accept"
                                                className="form-radio text-blue-500"
                                                onChange={() => handleAcceptPlayer(item.id)}
                                                checked={item.status === 'accepted'}
                                            />
                                            <span className="ml-2 text-xs">Accept Player</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name={`status-${item.id}`}
                                                value="decline"
                                                className="form-radio text-red-500"
                                                onChange={() => handleDeclinePlayer(item.id)}
                                                checked={item.status === 'declined'}
                                            />
                                            <span className="ml-2 text-xs">Decline Player</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <h1>This is space can be used for any other functional needs</h1>
                </div>
            </div>
        </div>
    );
};

export default Admin;
