import React, { useState } from 'react';

const Announcement = () => {


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center text-[#002d75] font-semibold text-base">
                <h3>Announcements</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h4 className="text-lg font-semibold mb-2">Important Update</h4>
                    <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis semper justo quis est convallis, ut hendrerit metus pulvinar.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h4 className="text-lg font-semibold mb-2">Event Reminder</h4>
                    <p className="text-sm text-gray-700">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h4 className="text-lg font-semibold mb-2">Holiday Schedule</h4>
                    <p className="text-sm text-gray-700">Fusce nec semper nulla, a molestie ligula. Integer venenatis ultricies arcu vitae placerat.</p>
                </div>
            </div>
        </div>
    )
}

export default Announcement;