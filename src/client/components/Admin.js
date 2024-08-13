import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from "./MainNavbar";
import axios from 'axios';
import SponsorDialog from './SponsorDialog';
import Announcement from './Announcement';
import PaymentTracking from './PaymentTracking';
import Footer from "./Footer";

const appURL = process.env.REACT_APP_URL;

const Admin = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showStatus, setShowStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [showSponsorDialog, setShowSponsorDialog] = useState(false);
    const [sponsorsList, setSponsorsList] = useState([]);
    const [editSponsorId, setEditSponsorId] = useState(null);
    const [currentSponsor, setCurrentSponsor] = useState(null);
    const [selectedTab, setSelectedTab] = useState('players'); // Default tab
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
                status: player.status === 'Yes' ? 'accepted' : player.status === 'No' ? 'declined' : '',
                hidePhoto: player.hidephoto === 'Yes' ? 'Yes' : null  // Ensure hidePhoto is correctly mapped
            }));
            const sortedPlayers = updatedRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setRequestList(sortedPlayers);
            setSearchResults(sortedPlayers);
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

    const handleHidePhotoChange = (playerId, isChecked) => {
        const updatedList = requestList.map(player =>
            player.id === playerId
                ? { ...player, hidePhoto: isChecked ? 'Yes' : null }
                : player
        );
        console.log("hidephotcheck::"+updatedList.hidePhoto);
        setRequestList(updatedList);
        setSearchResults(updatedList); // Ensure searchResults is also updated
    };

    const handleSave = async () => {
        try {

            const res = await axios.post('/service/updatePlayerStatus', requestList);
            if (res.status === 200) {
                setShowStatus(true);
                fetchPlayerRequests();
                setTimeout(() => {
                    setShowStatus(false);
                }, 2000);
            }
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

    const sponsorDialog = () => {
        setShowSponsorDialog(true);
    }

    const closeDialog = () => {
        setShowSponsorDialog(false);
        setCurrentSponsor(null);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appURL}/service/sponsorsList`);
                setSponsorsList(res.data.sponsors);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const handleEdit = (sponsor) => {
        setEditSponsorId(sponsor.id);
        setCurrentSponsor(sponsor);
        setShowSponsorDialog(true);
    };

    const handleDeleteSponsor = (sponsor) => {

        const fetchData = async () => {
            try {
                const res = await axios.delete(`${appURL}/service/deleteSponsor/${sponsor.id}`);
                if (res.status === 200) {
                    setDeleteStatus("Sponsor deleted successfully !");
                    window.location.reload(true);
                } else {
                    setDeleteStatus(res.data.message);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }

    /* replace(/^(\.\.\\)+public\\/, '') */ 
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-start items-center py-4 space-x-2">
                <button
                    className={`font-semibold bg-[#f2f5f7] hover:bg-[#dee1e3] border border-2 px-2 py-1 rounded ${selectedTab === 'players'
                        ? 'text-blue-500 hover:text-blue-700 hover:bg-[#f2f5f7] border border-2 px-2 py-1 rounded'
                        : ''
                        }`}
                    onClick={() => setSelectedTab('players')}
                >
                    Manage Players
                </button>
                <button
                    className={`font-semibold bg-[#f2f5f7] hover:bg-[#dee1e3] h-[60px] md:h-[36px] border border-2 px-2 py-1 rounded ${selectedTab === 'announcement'
                        ? 'text-blue-500 hover:text-blue-700 hover:bg-[#f2f5f7] border border-2 px-2 py-1 rounded'
                        : ''
                        }`}
                    onClick={() => setSelectedTab('announcement')}
                >
                    Announcements
                </button>

                <button
                    className={`font-semibold bg-[#f2f5f7] hover:bg-[#dee1e3] border border-2 px-2 py-1 rounded ${selectedTab === 'paymenttracking'
                        ? 'text-blue-500 hover:text-blue-700 hover:bg-[#f2f5f7] border border-2 px-2 py-1 rounded'
                        : ''
                        }`}
                    onClick={() => setSelectedTab('paymenttracking')}
                >
                    Payment Tracking
                </button>
            </div>
            <div className="px-4">
                {selectedTab === 'players' && (
                    <div>

                        <div className="container mx-auto px-2">
                            <div className="text-xl ml-[85px] md:ml-[395px] text-[#002d75] font-semibold text-base mt-2">
                                <h3> Manage Players</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
                                <div className="md:col-span-2">
                                    <div className="bg-white p-4 rounded-lg shadow-md mb-2">
                                        <div className="flex items-center mb-4">
                                            <input
                                                type="text"
                                                onChange={handleChange}
                                                placeholder="Search player requests..."
                                                className="w-full border-gray-300 rounded-l-md py-0 px-4 focus:outline-none focus:ring focus:border-blue-300 border rounded-md px-4 py-2 mb-4"
                                            />
                                        </div>
                                        <div className="space-y-1 px-2 h-[335px] overflow-y-auto">
                                            {searchResults.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`flex flex-col md:flex-row items-center border-b border-gray-200 rounded pb-2 ${item.status === 'accepted' ? 'bg-green-100' : item.status === 'declined' ? 'bg-gray-200 italic' : ''}`}
                                                >
                                                    <img src={item.photo.replace(/^\/root\/atleticobrisbane\/public/, '')} alt="Player" className="w-12 h-12 rounded-full ml-2 mr-2" />
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center space-x-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-700 text-base font-semibold">{item.name}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-700 text-xs">{item.email}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-700 text-xs">{item.mobile}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-gray-700 text-xs">{item.position}</span>
                                                            </div>
                                                            {/* <div className="flex flex-col">
                                                                <span className="text-gray-700 text-xs">{item.comments}</span>
                                                            </div> */}
                                                            {/* Add checkbox for hiding profile photo */}
                                                            <div className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={item.hidePhoto === 'Yes'}
                                                                    onChange={(e) => handleHidePhotoChange(item.id, e.target.checked)}
                                                                    className="form-checkbox text-blue-500"
                                                                />
                                                                <span className="text-gray-700 text-xs">Hide Profile Photo</span>
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
                                                            <span className="ml-2 text-xs mr-1">Decline Player</span>
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
                                <div className="bg-white p-3 rounded-lg shadow-md mb-2">
                                    <div className="text-xl text-[#002d75] text-center font-semibold">
                                        <h1>Manage Sponsors</h1>
                                    </div>
                                    {showStatus && (
                                        <div className="bg-[#a7f2d8] text-[#313233] px-4 py-2 rounded-md mt-4 animate-fadeOut">
                                            Player status updated successfully !
                                        </div>
                                    )}
                                    {deleteStatus && (
                                        <div className="bg-[#f0184e] text-[#ffffff] px-4 py-2 rounded-md mt-4 animate-fadeOut">
                                            Sponsor deleted successfully !
                                        </div>
                                    )}
                                    <button onClick={sponsorDialog} className="md:block relative top-[3px] md:top-[20px] left-24 md:left-40 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 px-4 py-2 bg-[#25afe6] text-white font-semibold border border-white rounded-full shadow-lg">Add Sponsor</button>
                                    {
                                        showSponsorDialog && (
                                            <SponsorDialog openDialog={showSponsorDialog} onClose={closeDialog} sponsor={currentSponsor} />
                                        )}
                                    <div className="space-y-1 px-2 h-[403px] overflow-y-auto">
                                        {
                                            sponsorsList.map((item, index) => (
                                                <div key={index} className="border-2 border-gray-300 rounded-lg p-2 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between mt-12">
                                                    <h1 className="text-[10px] font-normal">{item.header}</h1>
                                                    <a href={item.link} className="text-[10px] text-[#25afe6] hover:underline mt-2 md:mt-0">{item.link}</a>
                                                    <div className="flex mt-2 md:mt-0">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="px-3 py-2 ml-2 bg-[#25afe6] text-white font-semibold rounded-md shadow mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSponsor(item)}
                                                            className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md shadow"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedTab === 'announcement' && (
                    <Announcement />
                )}
                {selectedTab === 'paymenttracking' && (
                    <PaymentTracking />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
