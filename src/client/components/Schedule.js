import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'; // Importing React Icons
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // Import the plugin


const trainingImage = '/images/drills.png';
const gameImage = '/images/soccerrb.png';

const events = [
    {
        "date": "Thursday, 01 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Mansfield",
                "status": "active",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Mansfield",
                "status": "active",
                "details": "Social game, seniors"
            }
        ]
    },
    {
        "date": "Saturday, 03 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "active",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "active",
                "details": "Social game, seniors"
            }
        ]
    },
    {
        "date": "Thursday, 08 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Mansfield",
                "status": "active",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Mansfield",
                "status": "active",
                "details": "Social game, seniors"
            }
        ]
    },
    {
        "date": "Saturday, 10 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "active",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "active",
                "details": "Social game, seniors"
            }
        ]
    },
    {
        "date": "Thursday, 15 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Mansfield",
                "status": "active",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Mansfield",
                "status": "active",

            }
        ]
    },
    {
        "date": "Saturday, 17 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "active"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "active"
            }
        ]
    },
    {
        "date": "Thursday, 22 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Mansfield",
                "status": "active"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Mansfield",
                "status": "active"
            },

            {
                "type": "friendly",
                "title": "Friendly Match",
                "time": "7:00 pm",
                "place": "Calamvale",
                "status": "active",
                "details": "Vs Titans, Stretton school ground Calamvale"
            }
        ]
    },
    {
        "date": "Saturday, 24 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Event",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "active"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "active"
            }
        ]
    }
];
const options = [
    { value: 'training', label: 'Training' },
    { value: 'game', label: 'Senior Games' },
    { value: 'friendly', label: 'Friendly Match' }
];

const Schedule = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Set to null initially
    const [selectedEventType, setSelectedEventType] = useState(''); // Dropdown selected option
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [noData, setNoData] = useState(false);

    dayjs.extend(isBetween); // Extend dayjs with the plugin

    useEffect(() => {
        filterEvents();
    }, [selectedDate, selectedEventType]);

    const filterEvents = () => {
        if (selectedDate) {
            // Filter by selected date
            const selectedDateEvents = events.filter(event =>
                new Date(event.date).toDateString() === selectedDate.toDateString()
            );
            setFilteredEvents(selectedDateEvents);
        } else if (selectedEventType) {
            // Filter by selected event type
            const selectedTypeEvents = events.map(record => ({
                ...record,
                events: record.events.filter(e => e.type === selectedEventType)
            })).filter(record => record.events.length > 0);

            setFilteredEvents(selectedTypeEvents);
        } else {
            // No filters, show all events
            setFilteredEvents(events);
        }

        setNoData(filteredEvents.length === 0);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedEventType(''); // Clear the selected event type
    };

    const handleEventTypeChange = (event) => {
        const eventType = event.target.value;
        setSelectedEventType(eventType);
        setSelectedDate(null); // Clear the date selection
    };

    const toggleEventDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="p-4">
            {/* Unified Search and Dropdown */}
            <div className="mb-8 flex justify-center lg:justify-start">
                <select
                    value={selectedEventType}
                    onChange={handleEventTypeChange}
                    className="block w-full lg:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">All Events</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            {/* Calendar */}
            <div className="mb-8 flex justify-center lg:justify-start">
                <div className="w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 flex justify-center lg:justify-start">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={({ date, view }) =>
                            date.getDate() === new Date().getDate() && view === 'month'
                                ? 'bg-yellow-300 text-gray-800 rounded-full w-20 h-12 flex items-center justify-center'
                                : null
                        }
                    />
                </div>
            </div>

            {/* Schedule Details */}
            {/* <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">Complete Schedule for August 2024</h1> */}
            <div className="space-y-4">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((record, recordIndex) => (
                        <div key={recordIndex} className="border-b border-gray-300 py-4">
                            <h2 className="text-lg font-semibold mb-2">{record.date}</h2>
                            {record.events.map((event, eventIndex) => (
                                <div key={eventIndex} className="border rounded-lg mb-2 p-4 bg-white shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center w-full">
                                            <div className="w-8 h-8 mr-4">
                                                {event.type === 'training' ? (
                                                    <img src={trainingImage} alt="Training Event" className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={gameImage} alt="Game Event" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                                    <p className="text-sm font-medium">{event.title}</p>
                                                    <p className="text-xs text-gray-500 flex items-center">
                                                        <span className="mr-2">{event.time}</span>
                                                        <span className="mx-2">-</span>
                                                        <span className="mr-2">{event.place}</span>
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                            {event.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <button
                                                    className="ml-4 flex items-center justify-center w-8 h-8"
                                                    onClick={() => toggleEventDetails(eventIndex)} // Pass the current index
                                                >
                                                    {openIndex === eventIndex ? (
                                                        <AiOutlineUp size={24} />
                                                    ) : (
                                                        <AiOutlineDown size={24} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {openIndex === eventIndex && (
                                        <div className="mt-2 border-t pt-2">
                                            <p className="text-[12px] text-gray-700">{event.details || 'No additional details available.'}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Sorry, no records available for this date selection!</p>
                )}
            </div>
        </div>
    );
};

export default Schedule;