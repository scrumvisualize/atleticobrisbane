import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai'; // Importing React Icons
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; // Import the plugin
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import the plugin
import axios from 'axios';

const trainingImage = '/images/drills.png';
const gameImage = '/images/soccerrb.png';
const appURL = process.env.REACT_APP_URL;

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
    const [events, setEvents] = useState([]);

    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);


    useEffect(() => {
        updatePastEventStatus();
    }, []);


    useEffect(() => {
        filterEvents();
    }, [selectedDate, selectedEventType, events]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                // Get the current month and year
                const today = new Date();
                const month = today.getMonth() + 1; // Months are zero-based, so add 1
                const year = today.getFullYear();

                const res = await axios.get(`${appURL}/service/allmonthlyschedules`, {
                    params: {
                        month: month,
                        year: year
                    }
                });

                const jsonData = res.data.scheduleList;

                // Ensure jsonData is an array
                if (!Array.isArray(jsonData)) {
                    console.error('Expected jsonData to be an array:', jsonData);
                    return;
                }

                function formatDate(dateStr) {
                    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
                    return new Date(dateStr).toLocaleDateString('en-US', options);
                }

                // Group data by date
                const groupedByDate = jsonData.reduce((acc, item) => {
                    const date = formatDate(item.scheduledate);
                    if (!acc[date]) {
                        acc[date] = [];
                    }

                    const formattedTime = new Date(`1970-01-01T${item.scheduletime}`).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });

                    // Determine the place based on the day of the week
                    const dayOfWeek = new Date(item.scheduledate).toLocaleDateString('en-US', { weekday: 'long' });
                    let place;
                    if (dayOfWeek === 'Thursday') {
                        place = '109 Weedon St W, Mansfield';
                    } else if (dayOfWeek === 'Saturday') {
                        place = '65 Gager St, Sunnybank';
                    } else {
                        place = item.location || 'TBD';  // Default to 'Unknown' if not Thursday or Saturday
                    }

                    acc[date].push({
                        type: item.type,
                        title: item.schedulename,
                        time: formattedTime,
                        details: item.details || '',
                        place: place
                    });
                    return acc;
                }, {});

                // Convert grouped data to the expected format
                const initialEvents = Object.entries(groupedByDate).map(([date, events]) => ({
                    date,
                    events
                }));
                setEvents(initialEvents);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

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

            <div className="space-y-4">
                {noData && (
                    <p className="text-center text-gray-500">No data to display for the selected date !</p>
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
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.status === 'active' ? 'bg-green-100 text-green-600' : event.status === 'cancelled' ? 'bg-[#f5e17d] text-black-600' : 'bg-gray-100 text-gray-600'}`}>
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