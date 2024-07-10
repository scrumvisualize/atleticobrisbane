import React, { useState, useEffect } from 'react';
import AnnouncementDialog from './AnnouncementDialog';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const Announcement = () => {
    
    const [announcementList, setAnnouncementList] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState(false);

    
    const displayDialog = () => {
        setShowDialog(true);
    }


    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get(`${appURL}/service/announcementsList`);
            const sortedAnnouncements = res.data.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setAnnouncementList(sortedAnnouncements);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

  
    const handleEdit = (announcement) => {
        setCurrentAnnouncement(announcement);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setCurrentAnnouncement(null);
        setShowDialog(false);
        fetchAnnouncements(); // Re-fetch announcements after closing the dialog
    };

    const handleDeleteAnnouncement = (announcement) => {

        const fetchData = async () => {
            try {
                const res = await axios.delete(`${appURL}/service/deleteAnnouncement/${announcement.id}`);
                if (res.status === 200) {
                    setDeleteStatus("Announcement deleted successfully!");
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-start justify-center bg-gray-50">
                <button
                    onClick={displayDialog}
                    className="px-4 py-2 bg-[#25afe6] text-white font-semibold border border-white rounded-full shadow-lg"
                >
                Add Announcement
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
               {
               announcementList.map((item, index) =>(
                <div key={index} className="bg-white rounded-lg shadow-md p-4 relative">
                    <h4 className="text-xs font-semibold mb-2">{item.announcementheading}</h4>
                    <p className="text-sm text-gray-700">{item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}</p>
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.268z" />
                            </svg>
                        </button>
                        <button onClick={() => handleDeleteAnnouncement(item)} className="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                )) }
            </div>
            {deleteStatus && (
                <div className="bg-[#f0184e] text-[#ffffff] px-4 py-2 rounded-md mt-4 animate-fadeOut">
                    Announcement deleted successfully!
                </div>
            )}
            {showDialog && (
                <AnnouncementDialog onClose={closeDialog} announcement={currentAnnouncement}/>
            )}
        </div>
    )
}

export default Announcement;