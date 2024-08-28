import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb'; // Import locale if needed for formatting
import axios from 'axios'; // Import Axios

const appURL = process.env.REACT_APP_URL;


const ManageSchedule = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();
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
    const watchRecurring = watch("recurring");

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

            // Use setValue to update the form fields
            setValue('name', schedule.schedulename);
            setValue('type', schedule.type);
            setValue('formattedDate', dayjs(schedule.date).format('dddd, D MMMM YYYY'));
            setValue('time', schedule.scheduletime);
            setValue('location', schedule.location);
            setValue('details', schedule.details);
            setValue('recurring', schedule.recurring || false);
            setValue('recurrencePattern', schedule.recurrencePattern || '');
        }
    }, [editingIndex, schedules, setValue]);

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

    const onSubmit = async (data) => {
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
            const response = await axios.post(`${appURL}/service/createSchedule`, {
                schedules: newSchedules
            });
            console.log('Schedule saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving schedule:', error);
        }

        if (editingIndex !== null) {
            const updatedSchedules = schedules.map((sched, index) =>
                index === editingIndex ? { ...sched, ...newSchedules[0] } : sched
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

                const res = await axios.get(`${appURL}/service/fullschedulelist`);
                setSchedules(res.data.fullscheduleList);

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
                <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gradient">
                        {editingIndex !== null ? 'Edit Schedule' : 'Add Training Schedule'}
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Schedule Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            id="type"
                            {...register('type', { required: 'Type is required' })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                        >
                            <option value="">Select Type</option>
                            {types.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
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
                                {...register('formattedDate', { required: 'Date is required' })}
                                value={formattedDate}
                                readOnly
                                className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                placeholder="Day, DD Month YYYY"
                            />
                        </div>
                        {errors.formattedDate && <p className="text-red-500 text-sm">{errors.formattedDate.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="text"
                            id="time"
                            {...register('time', { required: 'Time is required' })}
                            className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="HH:MM AM/PM"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            {...register('location', { required: 'Location is required' })}
                            className="block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Location for training"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                        <textarea
                            id="details"
                            {...register('details', { required: 'Details are required' })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="4"
                            placeholder="Additional details"
                        />
                        {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="recurring" className="block text-sm font-medium text-gray-700">Recurring?</label>
                        <input
                            type="checkbox"
                            id="recurring"
                            {...register('recurring')}
                            className="mr-2 leading-tight"
                        />
                        <label htmlFor="recurring" className="text-gray-700">Yes</label>
                    </div>

                    {watchRecurring && (
                        <div className="mb-4">
                            <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700">Recurrence Pattern</label>
                            <input
                                type="text"
                                id="recurrencePattern"
                                {...register('recurrencePattern', { required: 'Recurrence pattern is required' })}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                placeholder="E.g., Monday, Wednesday, Friday"
                            />
                            {errors.recurrencePattern && <p className="text-red-500 text-sm">{errors.recurrencePattern.message}</p>}
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            {editingIndex !== null ? 'Update' : 'Save'}
                        </button>
                        {editingIndex !== null && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gradient">Saved Schedules</h2>
                    <ul>
                        {schedules.map((schedule, index) => (
                            <li key={index} className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm">
                                <div className="flex justify-between">
                                    <div>
                                        <p><strong>Name:</strong> {schedule.schedulename}</p>
                                        <p><strong>Type:</strong> {schedule.type}</p>
                                        <p><strong>Date:</strong> {schedule.scheduledate}</p>
                                        <p><strong>Time:</strong> {schedule.scheduletime}</p>
                                        <p><strong>Location:</strong> {schedule.location}</p>
                                        <p><strong>Details:</strong> {schedule.details}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700"><AiOutlineEdit size={24} /></button>
                                        <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700"><AiOutlineDelete size={24} /></button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </form>
    );
};

export default ManageSchedule;
