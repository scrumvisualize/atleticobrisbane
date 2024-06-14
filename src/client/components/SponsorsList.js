import React from 'react';

const SponsorList = () => {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a href="https://www.google.com/" className="flex flex-col items-center px-2 py-4">
                    <img src="images/barca.PNG" className="w-40 h-30 rounded-lg" alt="Image 1" />
                </a>
                <a href="https://www.google.com/" className="flex flex-col items-center px-2 py-4 ">
                    <img src="images/barca.PNG" className="w-40 h-30 rounded-lg" alt="Image 2" />
                </a>
                <a href="https://www.google.com/" className="flex flex-col items-center px-2 py-4 ">
                    <img src="images/barca.PNG" className="w-40 h-30 rounded-lg" alt="Image 3" />
                </a>
                <a href="https://www.google.com/" className="flex flex-col items-center px-2 py-4 ">
                    <img src="images/barca.PNG" className="w-40 h-30 rounded-lg" alt="Image 3" />
                </a>
            </div>
        </div>
    );
};

export default SponsorList;