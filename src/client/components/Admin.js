import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "./AdminNavbar";

const appURL = "http://localhost:3000";

const playerData = [
    {
        "id": 1,
        "name": "Vinod Mathew",
        "photo": "images/messi.png",
        "email": "test1@test.com",
        "mobile": "0435231123",
        "position": "Midfielder"

    },
    {
        "id": 2,
        "name": "Arun Kallumparambil",
        "photo": "images/messi.png",
        "email": "test2@test.com",
        "mobile": "0435231773",
        "position": "Striker"
    },
    {
        "id": 3,
        "name": "Saju Varghese",
        "photo": "images/messi.png",
        "email": "test3@test.com",
        "mobile": "043599223",
        "position": "Striker"
    },
    {
        "id": 4,
        "name": "Sharan Kishore",
        "photo": "images/messi.png",
        "email": "test4@test.com",
        "mobile": "048831123",
        "position": "Midfielder"
    },
    {
        "id": 5,
        "name": "Jibikumar P",
        "photo": "images/messi.png",
        "email": "test5@test.com",
        "mobile": "0435231123",
        "position": "Defender"
    },
    {
        "id": 6,
        "name": "Joji James",
        "photo": "images/messi.png",
        "email": "test6@test.com",
        "mobile": "0435789023",
        "position": "Defender"
    },
    {
        "id": 7,
        "name": "Clitus Davis",
        "photo": "images/messi.png",
        "email": "test7@test.com",
        "mobile": "0435789023",
        "position": "Defender"
    }
]

// const Admin = () => {

//     const [searchTerm, setSearchTerm] = useState("");
//     const [requestList, setRequestList] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         setSearchResults(playerData);
//         setRequestList(playerData)
//     }, []);

//     const handleChange = (e) => {
//         setSearchTerm(e.target.value);
//         console.log("Items:" + searchTerm);
//     }

//     useEffect(() => {
//         const results = requestList.filter(player =>
//             player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             player.mobile.includes(searchTerm) ||
//             player.mobile.includes(searchTerm) ||
//             player.email.includes(searchTerm)
//         );
//         setSearchResults(results);
//     }, [searchTerm, requestList]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <AdminNavbar/>
//             <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
//                 {/* Left Column (Larger on desktop) */}
//                 <div className="md:col-span-2">
//                     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//                         {/* Search Box */}
//                         <div className="flex items-center mb-4">
//                             <input type="text" onChange={handleChange} placeholder="Search player request..." className="w-full border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300" />
//                         </div>
//                         <div className="h-px bg-gray-300 mb-2"></div>

//                         {/* Player Request Records */}
//                         <div className="space-y-2 px-2 h-[400px] overflow-y-auto">
//                             {searchResults.map((item) => (
//                                 <div key={item.id} className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-4">
//                                     <img src={item.photo} alt="Player" className="w-12 h-12 rounded-full mr-4" />
//                                     <div className="flex-1">
//                                         <div className="grid grid-cols-1 md:grid-cols-3">

//                                             <div className="md:col-span-1">
//                                                 <span className="text-gray-700 text-base font-semibold">{item.name}</span>
//                                             </div>

//                                             <div className="md:col-span-2 hidden">
//                                                 <span className="text-gray-700 text-xs">{item.email}</span>
//                                             </div>

//                                             <div className="md:col-span-2">
//                                                 <span className="text-gray-700 text-xs">{item.mobile}</span>
//                                             </div>
//                                             <div className="md:col-span-3">
//                                                 <span className="text-gray-700 text-xs">{item.position}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="md:ml-4 mt-4 md:mt-0 flex space-x-2">
//                                         <label className="inline-flex items-center">
//                                             <input type="checkbox" className="form-checkbox text-blue-500" />
//                                             <span className="ml-2">Accept Player</span>
//                                         </label>
//                                         <label className="inline-flex items-center">
//                                             <input type="checkbox" className="form-checkbox text-red-500" />
//                                             <span className="ml-2">Decline Player</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Save Button */}
//                         <div className="mt-4">
//                             <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Column (Smaller on desktop) */}
//                 <div className="md:col-span-1">
//                     <h1>This is space for any other business needs</h1>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admin;

// const Admin = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [requestList, setRequestList] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         setSearchResults(playerData);
//         setRequestList(playerData);
//     }, []);

//     const handleChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleAcceptPlayer = (playerId) => {
//         // Update the status for the player with the given ID
//         const updatedList = requestList.map(player =>
//             player.id === playerId ? { ...player, status: 'accepted' } : player
//         );
//         setRequestList(updatedList);
//     };

//     const handleDeclinePlayer = (playerId) => {
//         // Update the status for the player with the given ID
//         const updatedList = requestList.map(player =>
//             player.id === playerId ? { ...player, status: 'declined' } : player
//         );
//         setRequestList(updatedList);
//     };

//     const handleSave = () => {
//         // Logic to save the updated requestList to the server
//         console.log("Saving changes...");
//     };

//     useEffect(() => {
//         const results = requestList.filter(player =>
//             player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             player.mobile.includes(searchTerm) ||
//             player.email.includes(searchTerm)
//         );
//         setSearchResults(results);
//     }, [searchTerm, requestList]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <AdminNavbar/>
//             <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-4">
//                 {/* Left Column (Larger on desktop) */}
//                 <div className="md:col-span-2">
//                     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//                         {/* Search Box */}
//                         <div className="flex items-center mb-4">
//                             <input type="text" onChange={handleChange} placeholder="Search player request..." className="w-full border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300" />
//                         </div>
//                         <div className="h-px bg-gray-300 mb-2"></div>

//                         {/* Player Request Records */}
//                         <div className="space-y-2 px-2 h-[400px] overflow-y-auto">
//                             {searchResults.map((item) => (
//                                 <div key={item.id} className="flex flex-col md:flex-row items-center border-b border-gray-200 pb-4">
//                                     <img src={item.photo} alt="Player" className="w-12 h-12 rounded-full mr-4" />
//                                     <div className="flex-1">
//                                         <div className="grid grid-cols-1 md:grid-cols-3">
//                                             <div className="md:col-span-1">
//                                                 <span className="text-gray-700 text-base font-semibold">{item.name}</span>
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <span className="text-gray-700 text-xs">{item.email}</span>
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <span className="text-gray-700 text-xs">{item.mobile}</span>
//                                             </div>
//                                             <div className="md:col-span-3">
//                                                 <span className="text-gray-700 text-xs">{item.position}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="md:ml-4 mt-4 md:mt-0 flex space-x-2">
//                                         <label className="inline-flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 name={`status-${item.id}`}
//                                                 value="accept"
//                                                 className="form-radio text-blue-500"
//                                                 onChange={() => handleAcceptPlayer(item.id)}
//                                                 checked={item.status === 'accepted'}
//                                             />
//                                             <span className="ml-2">Accept Player</span>
//                                         </label>
//                                         <label className="inline-flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 name={`status-${item.id}`}
//                                                 value="decline"
//                                                 className="form-radio text-red-500"
//                                                 onChange={() => handleDeclinePlayer(item.id)}
//                                                 checked={item.status === 'declined'}
//                                             />
//                                             <span className="ml-2">Decline Player</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Save Button */}
//                         <div className="mt-4">
//                             <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Column (Smaller on desktop) */}
//                 <div className="md:col-span-1">
//                     <h1>This is space for any other business needs</h1>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admin;


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
        setSearchResults(playerData);
        setRequestList(playerData);
      }
    }, [navigate]);

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
            // Replace with your API endpoint
            //const response = await axios.post('/api/savePlayerRequests', requestList);
            //console.log("Save response:", response.data);
            console.log("What is sending to server"+requestList);
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
            <div className="text-center font-semibold text-base">
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
                        
                        <div className="space-y-2 px-2 h-[400px] overflow-y-auto">
                            {searchResults.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex flex-col md:flex-row items-center border-b border-gray-200 pb-4 ${item.status === 'accepted' ? 'bg-green-100' : item.status === 'declined' ? 'bg-red-100' : ''}`}
                                >
                                    <img src={item.photo} alt="Player" className="w-12 h-12 rounded-full mr-4" />
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
                                            <span className="ml-2">Accept Player</span>
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
                                            <span className="ml-2">Decline Player</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Save Button */}
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

                {/* Right Column (Smaller on desktop) */}
                <div className="md:col-span-1">
                    <h1>This is space for any other business needs</h1>
                </div>
            </div>
        </div>
    );
};

export default Admin;
