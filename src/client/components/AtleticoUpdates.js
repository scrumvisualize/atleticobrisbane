import React, { useState } from 'react';

const GeneralUpdate = ({ imageSrc, title, date, text, img }) => {

    const [showFullText, setShowFullText] = useState(false);

    const handleClick = (buttonId) => {
        setShowFullText(!showFullText);
    };

    const truncatedText = text.slice(0, 75);
    const remainingText = text.slice(75);
    //bg-gradient-to-r from-[#5a0bb5] via-[#6702a6] bg-gradient-to-r from-[#0C1324] to-[#cb6ce6] #a8dbf7
    //#002d75
    //#b778d6
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-xl bg-[#f8f6fc]">
            <img className="w-16" src={imageSrc} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl text-[#002d75] mb-2">{title}</div>
                <p className="text-gray-700 text-base text-[#3c3e40] mb-2">
                    {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <div className="h-px bg-gray-300 mb-2"></div>
                <p className="text-base text-[#3c3e40]">
                    {showFullText ? text : truncatedText}
                    {text.length > 75 && !showFullText && (
                        <span onClick={handleClick} className="inline-block rounded-full px-2 bg-[#c9a214] border border-[#FAFCF6] text-white cursor-pointer">
                            Read more...
                        </span>
                    )}
                    {showFullText && (
                        <span onClick={handleClick} className="px-1 italic text-yellow-300 cursor-pointer">
                            Read less &#62;&#62;
                        </span>
                    )}
                    {showFullText && <span className="ml-1">{remainingText}</span>}
                </p>
            </div>
        </div>
    );
};

const AtleticoUpdates = ({ updates }) => {
    const [visibleItems, setVisibleItems] = useState(4);

    const handleShowMore = () => {
        setVisibleItems(prev => prev + 2);
    };

    return (
        <div>
            <h1 className="text-2xl text-[#181c1c] font-bold mt-2 mb-2">General Updates</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-24">
                {updates.slice(0, visibleItems).map(update => (
                    <GeneralUpdate
                        key={update.id}
                        imageSrc={update.imageSrc}
                        title={update.title}
                        date={update.date}
                        text={update.text}
                    />
                ))}
                {updates.length > visibleItems && (
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
