import React from 'react';

const PopupOverlay = ({ showPopup, setShowPopup }) => {
    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>
                        <h1 className="text-lg text-center font-bold text-gradient" >Information details</h1>
                        <ul className="list-disc list-inside text-left text-[14px] mt-4 space-y-2">
                            <li>Atlético team key positions.</li>
                            <li>Age category of players.</li>
                            <li>Tap on position/age nodes to display child nodes.</li>
                            <li>Fluid float-Slide left, right, top, down to see players.</li>
                        </ul>
                </div>
            </div>
            )}
        </>
    );
};

export default PopupOverlay;
