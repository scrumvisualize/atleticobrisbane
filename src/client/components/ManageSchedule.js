import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'; // Import locale if needed for formatting
import axios from 'axios'; // Import Axios

const appURL = process.env.REACT_APP_URL;


const ManageSchedule = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState(''); // State for formatted date
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [recurring, setRecurring] = useState(false); // State for recurring sessions
    const [recurrencePattern, setRecurrencePattern] = useState(''); // Pattern for recurrence
    const [schedules, setSchedules] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const types = [
        { value: 'training', label: 'Training' },
        { value: 'game', label: 'Senior Games' },
        { value: 'friendly', label: 'Friendly Match' },
    ];

    useEffect(() => {
        if (editingIndex !== null) {
            const schedule = schedules[editingIndex];
            setName(schedule.schedulename);
            setType(schedule.type);
            setDate(dayjs(schedule.date).toDate());
            setFormattedDate(dayjs(schedule.date).format('dddd, D MMMM YYYY')); // Set formatted date
            setTime(schedule.scheduletime);
            setLocation(schedule.location);
            setDetails(schedule.details);
            setRecurring(schedule.recurring || false);
            setRecurrencePattern(schedule.recurrencePattern || '');
        }
    }, [editingIndex]);

    useEffect(() => {
        if (date) {
            setFormattedDate(dayjs(date).format('dddd, D MMMM YYYY')); // Update formatted date when date changes
        }
    }, [date]);

    const generateRecurringDates = (startDate, pattern) => {
        let dates = [];
        let currentDate = dayjs(startDate);

        while (currentDate.month() === dayjs(startDate).month()) {
            // Move to the next week
            if (pattern.includes(currentDate.format('dddd'))) {
                dates.push(currentDate.toDate());
            }
            // Move to the next day
            currentDate = currentDate.add(1, 'day');
        }

        return dates;
    };

    const handleSave = async () => {
        let newSchedules = [];
        if (recurring) {
            // Generate dates based on the recurrence pattern
            const recurringDates = generateRecurringDates(date, recurrencePattern);
            newSchedules = recurringDates.map(recDate => ({
                name,
                type,
                date: dayjs(recDate).format('dddd, D MMMM YYYY'),
                time,
                location,
                details,
                recurring: true,
                recurrencePattern
            }));
        } else {
            newSchedules = [{
                name,
                type,
                date: formattedDate,
                time,
                location,
                details,
                recurring: false,
                recurrencePattern: ''
            }];
        }

        try {
            // Sending data to the backend
            const response = await axios.post(`${appURL}service/createSchedule`, {
                schedules: newSchedules
            });
            console.log('Schedule saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving schedule:', error);
        }

        if (editingIndex !== null) {
            const updatedSchedules = schedules.map((sched, index) =>
                index === editingIndex ? newSchedules[0] : sched
            );
            setSchedules(updatedSchedules);
            setEditingIndex(null);
        } else {
            setSchedules([...schedules, ...newSchedules]);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setType('');
        setDate(null);
        setFormattedDate(''); // Clear formatted date
        setTime('');
        setLocation('');
        setDetails('');
        setRecurring(false);
        setRecurrencePattern('');
        setEditingIndex(null);
    };


    useEffect(() => {

        const fetchData = async () => {
            try {
                
                const today = new Date();
                const month = today.getMonth() + 1; // Months are zero-based, so add 1
                const year = today.getFullYear();

                const res = await axios.get(`${appURL}/service/allmonthlyschedules`, {
                    params: {
                        month: month,
                        year: year
                    }
                });
                setSchedules(res.data.scheduleList);
                console.log(res.data.scheduleList);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gradient">{editingIndex !== null ? 'Edit Schedule' : 'Add Training Schedule'}</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                        placeholder="Schedule Name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                    >
                        <option value="">Select Type</option>
                        {types.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="w-full"
                    />
                    <div className="mt-2">

                        <input
                            type="text"
                            id="formatted-date"
                            value={formattedDate}
                            readOnly
                            className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Day, DD Month YYYY"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="text"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                        placeholder="HH:MM AM/PM"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="place" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                        placeholder="Location for training"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                    <textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                        placeholder="Additional details"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="recurring" className="inline-flex items-center">
                        <input
                            type="checkbox"
                            id="recurring"
                            checked={recurring}
                            onChange={(e) => setRecurring(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2 text-sm text-gray-700">Repeat Weekly</span>
                    </label>
                </div>

                {recurring && (
                    <div className="mb-4">
                        <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700">Recurrence Pattern</label>
                        <input
                            type="text"
                            id="recurrencePattern"
                            value={recurrencePattern}
                            onChange={(e) => setRecurrencePattern(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="e.g., Thursday"
                        />
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                    <button
                        onClick={resetForm}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Right Column: Schedule List */}
            <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gradient">Scheduled Sessions</h2>
                <div className="space-y-4">
                    {schedules.length > 0 ? (
                        schedules.map((schedule, index) => (
                            <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold">{schedule.schedulename}</h3>
                                <p className="text-sm text-gray-600">{schedule.scheduledate} at {schedule.scheduletime}</p>
                                <p className="text-sm text-gray-800 mt-2">{schedule.details}</p>
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <AiOutlineEdit className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <AiOutlineDelete className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No sessions scheduled.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSchedule;
