// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'; // Importing React Icons
// import dayjs from 'dayjs';
// import isBetween from 'dayjs/plugin/isBetween'; // Import the plugin
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import the plugin


// const trainingImage = '/images/drills.png';
// const gameImage = '/images/soccerrb.png';

// const initialEvents = [
//     {
//         "date": "Thursday, 01 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Mansfield",
//                 "status": "active",
//                 "details": "Training by Stephen"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Mansfield",
//                 "status": "active",
//                 "details": "Social game, seniors"
//             }
//         ]
//     },
//     {
//         "date": "Saturday, 03 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "active",
//                 "details": "Training by Stephen"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "active",
//                 "details": "Social game, seniors"
//             }
//         ]
//     },
//     {
//         "date": "Thursday, 08 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Mansfield",
//                 "status": "active",
//                 "details": "Training by Stephen"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Mansfield",
//                 "status": "active",
//                 "details": "Social game, seniors"
//             }
//         ]
//     },
//     {
//         "date": "Saturday, 10 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "cancelled",
//                 "details": "Training by Stephen"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "completed",
//                 "details": "Social game, seniors"
//             }
//         ]
//     },
//     {
//         "date": "Thursday, 15 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Mansfield",
//                 "status": "cancelled",
//                 "details": "Fields closed due to rain"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Mansfield",
//                 "status": "cancelled",
//                 "details": "Fields closed due to rain"

//             }
//         ]
//     },
//     {
//         "date": "Saturday, 17 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "completed"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "completed"
//             }
//         ]
//     },
//     {
//         "date": "Thursday, 22 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Mansfield",
//                 "status": "active"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Mansfield",
//                 "status": "active"
//             },

//             {
//                 "type": "friendly",
//                 "title": "Friendly Match",
//                 "time": "7:00 pm",
//                 "place": "Calamvale",
//                 "status": "active",
//                 "details": "Vs Titans, Stretton school ground Calamvale"
//             }
//         ]
//     },
//     {
//         "date": "Saturday, 24 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             }
//         ]
//     },
//     {
//         "date": "Thursday, 29 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             }
//         ]
//     },
//     {
//         "date": "Saturday, 31 August 2024",
//         "events": [
//             {
//                 "type": "training",
//                 "title": "Training Kids",
//                 "time": "6:30 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             },
//             {
//                 "type": "game",
//                 "title": "Senior Game",
//                 "time": "7:15 pm",
//                 "place": "Sunnybank",
//                 "status": "active"
//             }
//         ]
//     }
// ];

// const options = [
//     { value: 'training', label: 'Training' },
//     { value: 'game', label: 'Senior Games' },
//     { value: 'friendly', label: 'Friendly Match' }
// ];

// const Schedule = () => {
//     const [selectedDate, setSelectedDate] = useState(null); // Set to null initially
//     const [selectedEventType, setSelectedEventType] = useState(''); // Dropdown selected option
//     const [filteredEvents, setFilteredEvents] = useState([]);
//     const [openIndex, setOpenIndex] = useState(null);
//     const [noData, setNoData] = useState(false);
//     const [events, setEvents] = useState(initialEvents);

    
//     dayjs.extend(isBetween); // Extend dayjs with the plugin
//     dayjs.extend(isSameOrBefore); // Extend dayjs with the plugin


//     useEffect(() => {
//         updatePastEventStatus();
//     }, []);

//     useEffect(() => {
//         filterEvents();
//     }, [selectedDate, selectedEventType, events]);

//     const updatePastEventStatus = () => {
//         const currentDate = dayjs();
//         const updatedEvents = events.map(record => ({
//             ...record,
//             events: record.events.map(event => {
//                 const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');
//                 if (eventDate.isSame(currentDate, 'day')  || eventDate.isBefore(currentDate) && event.status !== 'cancelled' && event.status !== 'deferred') {
//                     return { ...event, status: 'completed' };
//                 }
//                 return event;
//             })
//         }));
//         setEvents(updatedEvents);
//     };

//     const filterEvents = () => {
//         const currentDate = dayjs();

//         let filtered = events.map(record => {
//             const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');

//             const updatedEvents = record.events.map(event => {
//                 if (event.status !== 'cancelled' && event.status !== 'deferred') {
//                     if (eventDate.isSame(currentDate, 'day') || eventDate.isAfter(currentDate)) {
//                         event.status = 'active';
//                     } else if (eventDate.isBefore(currentDate)) {
//                         event.status = 'completed';
//                     }
//                 }
//                 return event;
//             });

//             return {
//                 ...record,
//                 events: updatedEvents,
//             };
//         }).filter(record => {
//             const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');

//             // Apply additional filters if a date or event type is selected
//             if (selectedDate && eventDate.isSame(selectedDate, 'day')) {
//                 return true;
//             }

//             if (selectedEventType) {
//                 return record.events.some(e => e.type === selectedEventType);
//             }

//             return true;
//         });

//         // Sort the filtered events by date in descending order
//         filtered = filtered.sort((a, b) => {
//         const dateA = dayjs(a.date, 'dddd, DD MMMM YYYY');
//         const dateB = dayjs(b.date, 'dddd, DD MMMM YYYY');
//         return dateB.isBefore(dateA) ? -1 : 1;
//     });

//         setFilteredEvents(filtered);
//         setNoData(filtered.length === 0);
//     };


//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         setSelectedEventType(''); // Clear the selected event type
//     };

//     const handleEventTypeChange = (event) => {
//         const eventType = event.target.value;
//         setSelectedEventType(eventType);
//         setSelectedDate(null); // Clear the date selection
//     };

//     const toggleEventDetails = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     return (
//         <div className="p-4">
//             {/* Unified Search and Dropdown */}
//             <div className="mb-8 flex justify-center lg:justify-start">
//                 <select
//                     value={selectedEventType}
//                     onChange={handleEventTypeChange}
//                     className="block w-full lg:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                     <option value="">All Events</option>
//                     {options.map(option => (
//                         <option key={option.value} value={option.value}>{option.label}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* Calendar */}
//             <div className="mb-8 flex justify-center lg:justify-start">
//                 <div className="w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 flex justify-center lg:justify-start">
//                     <Calendar
//                         onChange={handleDateChange}
//                         value={selectedDate}
//                         tileClassName={({ date, view }) =>
//                             date.getDate() === new Date().getDate() && view === 'month'
//                                 ? 'bg-yellow-300 text-gray-800 rounded-full w-20 h-12 flex items-center justify-center'
//                                 : null
//                         }
//                     />
//                 </div>
//             </div>

//             {/* Schedule Details */}
//             {/* <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">Complete Schedule for August 2024</h1> */}
//             <div className="space-y-4">
//                 {filteredEvents.length > 0 ? (
//                     filteredEvents.map((record, recordIndex) => (
//                         <div key={recordIndex} className="border-b border-gray-300 py-4">
//                             <h2 className="text-lg font-semibold mb-2 text-gradient">{record.date}</h2>
//                             {record.events.map((event, eventIndex) => (
//                                 <div key={eventIndex} className="border rounded-lg mb-2 p-4 bg-white shadow-lg">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center w-full">
//                                             <div className="w-8 h-8 mr-4">
//                                                 {event.type === 'training' ? (
//                                                     <img src={trainingImage} alt="Training Event" className="w-full h-full object-cover" />
//                                                 ) : (
//                                                     <img src={gameImage} alt="Game Event" className="w-full h-full object-cover" />
//                                                 )}
//                                             </div>
//                                             <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                                                 <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
//                                                     <p className="text-sm font-medium">{event.title}</p>
//                                                     <p className="text-xs text-gray-500 flex items-center">
//                                                         <span className="mr-2">{event.time}</span>
//                                                         <span className="mx-2">-</span>
//                                                         <span className="mr-2">{event.place}</span>
//                                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-600': event.status === 'cancelled' ? 'bg-[#f5e17d] text-black-600' : 'bg-gray-100 text-gray-600'}`}>
//                                                             {event.status}
//                                                         </span>
//                                                     </p>
//                                                 </div>
//                                                 <button
//                                                     className="ml-4 flex items-center justify-center w-8 h-8"
//                                                     onClick={() => toggleEventDetails(eventIndex)} // Pass the current index
//                                                 >
//                                                     {openIndex === eventIndex ? (
//                                                         <AiOutlineUp size={24} />
//                                                     ) : (
//                                                         <AiOutlineDown size={24} />
//                                                     )}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {openIndex === eventIndex && (
//                                         <div className="mt-2 border-t pt-2">
//                                             <p className="text-[12px] text-gray-700">{event.details || 'No additional details available.'}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">Sorry, no records available for this date selection!</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Schedule;

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'; // Importing React Icons
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // Import the plugin
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import the plugin

const trainingImage = '/images/drills.png';
const gameImage = '/images/soccerrb.png';

const initialEvents = [
    {
        "date": "Thursday, 01 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
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
                "title": "Training Kids",
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
                "title": "Training Kids",
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
                "title": "Training Kids",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "cancelled",
                "details": "Training by Stephen"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "completed",
                "details": "Social game, seniors"
            }
        ]
    },
    {
        "date": "Thursday, 15 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
                "time": "6:30 pm",
                "place": "Mansfield",
                "status": "cancelled",
                "details": "Fields closed due to rain"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Mansfield",
                "status": "cancelled",
                "details": "Fields closed due to rain"

            }
        ]
    },
    {
        "date": "Saturday, 17 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
                "time": "6:30 pm",
                "place": "Sunnybank",
                "status": "completed"
            },
            {
                "type": "game",
                "title": "Senior Game",
                "time": "7:15 pm",
                "place": "Sunnybank",
                "status": "completed"
            }
        ]
    },
    {
        "date": "Thursday, 22 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
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
                "title": "Training Kids",
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
        "date": "Thursday, 29 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
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
        "date": "Saturday, 31 August 2024",
        "events": [
            {
                "type": "training",
                "title": "Training Kids",
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
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEventType, setSelectedEventType] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [noData, setNoData] = useState(false);
    const [events, setEvents] = useState(initialEvents);

    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);

    useEffect(() => {
        updatePastEventStatus();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [selectedDate, selectedEventType, events]);

    const updatePastEventStatus = () => {
        const currentDate = dayjs();
        const updatedEvents = events.map(record => ({
            ...record,
            events: record.events.map(event => {
                const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');
                if (eventDate.isSame(currentDate, 'day') || (eventDate.isBefore(currentDate) && event.status !== 'cancelled' && event.status !== 'deferred')) {
                    return { ...event, status: 'completed' };
                }
                return event;
            })
        }));
        setEvents(updatedEvents);
    };

    const filterEvents = () => {
        // Filter based on selected date
        let filtered = events.map(record => {
            const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');

            const updatedEvents = record.events.map(event => {
                if (event.status !== 'cancelled' && event.status !== 'deferred') {
                    if (eventDate.isSame(dayjs(), 'day') || eventDate.isAfter(dayjs())) {
                        event.status = 'active';
                    } else if (eventDate.isBefore(dayjs())) {
                        event.status = 'completed';
                    }
                }
                return event;
            });

            return {
                ...record,
                events: updatedEvents,
            };
        });

        if (selectedDate) {
            filtered = filtered.filter(record => {
                const eventDate = dayjs(record.date, 'dddd, DD MMMM YYYY');
                return eventDate.isSame(dayjs(selectedDate), 'day');
            });
        }

        // Filter based on selected event type
        if (selectedEventType) {
            filtered = filtered.map(record => ({
                ...record,
                events: record.events.filter(e => e.type === selectedEventType)
            })).filter(record => record.events.length > 0);
        }

        // Set noData to true if there are no events for the selected date
        setNoData(filtered.length === 0 && selectedDate !== null);

        filtered = filtered.sort((a, b) => {
            const dateA = dayjs(a.date, 'dddd, DD MMMM YYYY');
            const dateB = dayjs(b.date, 'dddd, DD MMMM YYYY');
            return dateB.isBefore(dateA) ? -1 : 1;
        });

        setFilteredEvents(filtered);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedEventType(''); // Clear the event type when date is changed
    };

    const handleEventTypeChange = (event) => {
        const eventType = event.target.value;
        setSelectedEventType(eventType);
        setSelectedDate(null); // Clear the date selection when event type changes
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
                    className="block w-full lg:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <div className="space-y-4">
                {noData && (
                    <p className="text-center text-gray-500">No data to display for the selected date!</p>
                )}
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((record, recordIndex) => (
                        <div key={recordIndex} className="border-b border-gray-300 py-4">
                            <h2 className="text-lg font-semibold mb-2 text-gradient">{record.date}</h2>
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
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-600': event.status === 'cancelled' ? 'bg-[#f5e17d] text-black-600' : 'bg-gray-100 text-gray-600'}`}>
                                                            {event.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <button
                                                    className="ml-4 flex items-center justify-center w-8 h-8"
                                                    onClick={() => toggleEventDetails(eventIndex)}
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
                    !noData && (
                        <p className="text-center text-gray-500">Sorry, no records available for this date selection!</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Schedule;
