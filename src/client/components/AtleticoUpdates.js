import React, { useState, useEffect } from 'react';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const GeneralUpdate = ({ imageSrc, title, date, url, text}) => {

    const [showFullText, setShowFullText] = useState(false);
    
    const announceImage = 'images/ablogo.png';

    const handleClick = (buttonId) => {
        setShowFullText(!showFullText);
    };

    const truncatedText = text.length > 150 ? text.slice(0, 150) : text;
    const remainingText = text.length > 150 ? text.slice(150) : '';

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it with a leading zero if needed
        const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
        const year = date.getFullYear(); // Get the full year
    
        return `${day} ${month} ${year}`;
    }

    const highlightURLs = (text) => {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, (url) => `<span class="bg-gray-200 p-1 rounded">${url}</span>`);
    };

    //bg-gradient-to-r from-[#5a0bb5] via-[#6702a6] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6] #a8dbf7
    //#002d75
    //#b778d6

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-xl bg-[#f8f6fc]">
            <div>
                <img className="w-16 ml-2" src={announceImage} alt={title} />
                <div className="px-4 py-4">
                    <div className="font-semibold text-xl text-[#337ab7] mb-2">{title}</div>
                    <p className="text-gray-700 text-[10px] text-[#3c3e40] mb-2">
                        {formatDate(date)}
                    </p>
                    <div className="flex justify-center">
                        <img 
                        className="w-28 h-20 rounded transform transition-transform duration-700 ease-in-out hover:scale-110" 
                        //src={imageSrc.replace(/^(\.\.\\)+public\\/, '')} 
                        src={imageSrc.replace(/^\/root\/atleticobrisbane\/public/, '')}
                        alt={title} 
                        />
                    </div>
                    <p className="text-[13px] text-[#3c3e40]">
                        <span dangerouslySetInnerHTML={{ __html: highlightURLs(truncatedText) }} />
                        {showFullText && (
                            <span className="ml-1" dangerouslySetInnerHTML={{ __html: highlightURLs(remainingText) }} />
                        )}
                        {text.length > 150 && (
                            <span onClick={handleClick} className="inline-block rounded-full px-2 bg-[#c9a214] border border-[#FAFCF6] text-white cursor-pointer">
                                {showFullText ? 'Read less' : 'Read more...'}
                            </span>
                        )}
                        {url && (
                            <span className="block bg-gray-200 p-0 text-center rounded mt-2">
                                <code className="bg-gray-200 p-1 rounded">{url}</code>
                            </span>
                        )}
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

const AtleticoUpdates = ({darkMode}) => {

    const [announcementList, setAnnouncementList] = useState([]);
    const [visibleItems, setVisibleItems] = useState(4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${appURL}/service/announcementsList`);
                const sortedAnnouncements = res.data.announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnouncementList(sortedAnnouncements);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const handleShowMore = () => {
        setVisibleItems(prev => prev + 4);
    };

    return (
        <div className='bg-gradient-to-r from-blue-100 to-pink-100'>
            <h1 className={`p-2 text-2xl text-[#002d75] font-bold mt-0 ${darkMode ? 'text-[#0c183b]' : 'text-[#002d75]'}`}>Latest Updates</h1>
            <div className="p-2 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {announcementList.slice(0, visibleItems).map(update => (
                    <GeneralUpdate
                        key={update.id}
                        imageSrc={update.image}
                        title={update.announcementheading}
                        date={update.createdAt}
                        url={update.urllink}
                        text={update.description}
                    />
                ))}
                {announcementList.length > visibleItems && (
                    <div className="col-span-full text-center mt-4">
                        <button
                            className="bg-[#25afe6] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleShowMore}
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};

export default AtleticoUpdates;
