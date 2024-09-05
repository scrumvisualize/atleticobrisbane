// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import 'react-calendar/dist/Calendar.css';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
// import dayjs from 'dayjs';
// import 'dayjs/locale/en-gb'; // Import locale if needed for formatting
// import axios from 'axios'; // Import Axios

// const appURL = process.env.REACT_APP_URL;

// const types = [
//     { value: 'training', label: 'Training' },
//     { value: 'game', label: 'Senior Games' },
//     { value: 'friendly', label: 'Friendly Match' },
// ];

// const ManageSchedule = () => {
//     const { register, handleSubmit, formState: { errors }, setValue, reset, control, watch } = useForm();
//     const [formattedDate, setFormattedDate] = useState('');
//     const [recurrencePattern, setRecurrencePattern] = useState('');
//     const [schedules, setSchedules] = useState([]);
//     const [editingIndex, setEditingIndex] = useState(null);
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [selectedMonthYear, setSelectedMonthYear] = useState(null);

//     const watchRecurring = watch("recurring");

//     useEffect(() => {
//         if (watch('date')) {
//             const parsedDate = dayjs(watch('date'));
//             setFormattedDate(parsedDate.isValid() ? parsedDate.format('dddd, D MMMM YYYY') : '');
//         }
//     }, [watch('date')]);

//     const generateRecurringDates = (startDate, pattern) => {
//         let dates = [];
//         let currentDate = dayjs(startDate);

//         while (currentDate.month() === dayjs(startDate).month()) {
//             if (pattern.includes(currentDate.format('dddd'))) {
//                 dates.push(currentDate.toDate());
//             }
//             currentDate = currentDate.add(1, 'day');
//         }

//         return dates;
//     };

//     const formatDateToISOString = (date) => {
//         return dayjs(date).isValid() ? dayjs(date).toISOString() : null;
//     };

//     const onSubmit = async (data) => {
//         let newSchedules = [];
//         if (data.recurring) {
//             const recurringDates = generateRecurringDates(data.date, data.recurrencePattern);
//             newSchedules = recurringDates
//                 .map((recDate) => {
//                     const formattedDate = formatDateToISOString(recDate);
//                     return formattedDate
//                         ? {
//                             name: data.name,
//                             type: data.type,
//                             date: formattedDate,
//                             time: data.time,
//                             location: data.location,
//                             details: data.details,
//                             recurring: true,
//                             recurrencePattern: data.recurrencePattern,
//                         }
//                         : null;
//                 })
//                 .filter((schedule) => schedule !== null);
//         } else {
//             const formattedDate = formatDateToISOString(data.date);
//             if (formattedDate) {
//                 newSchedules = [
//                     {
//                         name: data.name,
//                         type: data.type,
//                         date: formattedDate,
//                         time: data.time,
//                         location: data.location,
//                         details: data.details,
//                         recurring: false,
//                         recurrencePattern: '',
//                     },
//                 ];
//             } else {
//                 console.error("Invalid date for non-recurring event:", data.date);
//             }
//         }

//         try {
//             const response = await axios.post(`${appURL}/service/createSchedule`, {
//                 schedules: newSchedules
//             });
//             console.log('Schedule saved successfully:', response.data);
//         } catch (error) {
//             console.error('Error saving schedule:', error);
//         }

//         if (editingIndex !== null) {
//             const updatedSchedules = schedules.map((sched, index) =>
//                 index === editingIndex ? { ...sched, ...newSchedules[0] } : sched
//             );
//             setSchedules(updatedSchedules);
//             setEditingIndex(null);
//         } else {
//             setSchedules([...schedules, ...newSchedules]);
//         }

//         resetForm();
//     };

//     const handleEdit = (index) => {
//         setEditingIndex(index);
//         const schedule = schedules[index];
//         setValue('name', schedule.schedulename);
//         setValue('type', schedule.type);
//         setValue('date', dayjs(schedule.date).isValid() ? dayjs(schedule.date).format('YYYY-MM-DD') : '');
//         setValue('time', schedule.scheduletime);
//         setValue('location', schedule.location);
//         setValue('details', schedule.details);
//         setValue('recurring', schedule.recurring);
//         setValue('recurrencePattern', schedule.recurrencePattern);
//     };

//     const handleDelete = (index) => {
//         const updatedSchedules = schedules.filter((_, i) => i !== index);
//         setSchedules(updatedSchedules);
//         resetForm();
//     };

//     const resetForm = () => {
//         reset();
//         setFormattedDate('');
//         setRecurrencePattern('');
//         setEditingIndex(null);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(`${appURL}/service/fullschedulelist`);
//                 setSchedules(res.data.fullscheduleList);
//             } catch (e) {
//                 console.log(e);
//             }
//         }
//         fetchData();
//     }, []);

//     // Extract unique months and years from schedules
//     const getUniqueMonthsYears = (schedules) => {
//         const monthsYears = new Set();
//         schedules.forEach(schedule => {
//             const date = dayjs(schedule.date);
//             monthsYears.add(date.format('MMMM YYYY')); // Add month and year to the set
//         });
//         return Array.from(monthsYears).sort(); // Convert set to array and sort it
//     };

//     const uniqueMonthsYears = getUniqueMonthsYears(schedules);

//     const handleClickExpand = () => {
//         setIsExpanded(!isExpanded);
//     };

//     // Handler to select a month-year and filter schedules
//     const handleMonthYearChange = (monthYear) => {
//         setSelectedMonthYear(monthYear);
//         setIsExpanded(false); // Optionally collapse the panel when a month/year is selected
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
//                 <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-4 text-gradient">
//                         {editingIndex !== null ? 'Edit Schedule' : 'Add Training Schedule'}
//                     </h2>

//                     <div className="mb-4">
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             {...register('name', { required: 'Name is required' })}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                             placeholder="Schedule Name"
//                         />
//                         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
//                         <select
//                             id="type"
//                             {...register('type', { required: 'Type is required' })}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                         >
//                             <option value="">Select Type</option>
//                             {types.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                         <Controller
//                             name="date"
//                             control={control}
//                             rules={{ required: 'Date is required' }}
//                             render={({ field: { onChange, value } }) => (
//                                 <input
//                                     type="date"
//                                     onChange={onChange}
//                                     value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
//                                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                                 />
//                             )}
//                         />
//                         {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
//                         <input
//                             type="time"
//                             id="time"
//                             {...register('time', { required: 'Time is required' })}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                             placeholder="Schedule Time"
//                         />
//                         {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//                         <input
//                             type="text"
//                             id="location"
//                             {...register('location', { required: 'Location is required' })}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                             placeholder="Location"
//                         />
//                         {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
//                         <textarea
//                             id="details"
//                             {...register('details')}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                             placeholder="Details"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="recurring" className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="recurring"
//                                 {...register('recurring')}
//                                 className="form-checkbox"
//                             />
//                             <span className="ml-2 text-sm font-medium text-gray-700">Recurring</span>
//                         </label>
//                     </div>

//                     {watchRecurring && (
//                         <div className="mb-4">
//                             <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700">Recurrence Pattern</label>
//                             <input
//                                 type="text"
//                                 id="recurrencePattern"
//                                 {...register('recurrencePattern', { required: 'Recurrence pattern is required' })}
//                                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
//                                 placeholder="e.g. Monday, Wednesday"
//                             />
//                             {errors.recurrencePattern && <p className="text-red-500 text-sm">{errors.recurrencePattern.message}</p>}
//                         </div>
//                     )}

//                     <div className="mb-4 flex justify-center">
//                         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700">
//                             {editingIndex !== null ? 'Update Schedule' : 'Add Schedule'}
//                         </button>
//                         {editingIndex !== null && (
//                             <button type="button" onClick={resetForm} className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-700 ml-2">
//                                 Cancel
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-4 text-gradient">Scheduled Trainings</h2>

//                     {/* Expandable Button */}
//                     <div
//                         onClick={handleClickExpand}
//                         className={`cursor-pointer p-4 bg-gradient-to-r from-blue-500 via-[#cb6ce6] to-[#cb6ce6] text-white rounded-lg transition-all duration-300 ease-in-out ${isExpanded ? 'h-18' : 'h-12'}`}>
//                         <span>{`Schedules ${selectedMonthYear || 'Select Month'}`}</span>
//                     </div>

//                     <div
//                         className={`mt-2 overflow-auto transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                         {schedules

//                         .filter(schedule => {
//                             const scheduleDate = dayjs(schedule.date);
//                             const now = dayjs();
//                             return scheduleDate.isSame(now, 'month');
//                         })
//                         .map((schedule, index) => (
//                             <div key={index} className="border-b border-gray-200 py-2 flex justify-between items-center">
//                                 <div>
//                                     <p className="font-medium">{schedule.schedulename}</p>
//                                     <p className="text-sm text-gray-600">{dayjs(schedule.date).format('dddd, D MMMM YYYY')}</p>
//                                     <p className="text-sm text-gray-600">{schedule.scheduletime}</p>
//                                     <p className="text-sm text-gray-600">{schedule.location}</p>
//                                     {schedule.details && <p className="text-sm text-gray-600">{schedule.details}</p>}
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => handleEdit(index)}
//                                         className="text-blue-500 hover:text-blue-700"
//                                     >
//                                         <AiOutlineEdit size={20} />
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => handleDelete(index)}
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         <AiOutlineDelete size={20} />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                 </div>

//             </div>

//         </form>
//     );
// };

// export default ManageSchedule;


import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const types = [
    { value: 'training', label: 'Training' },
    { value: 'game', label: 'Senior Games' },
    { value: 'friendly', label: 'Friendly Match' },
];

const ManageSchedule = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset, control, watch } = useForm();
    const [formattedDate, setFormattedDate] = useState('');
    const [recurrencePattern, setRecurrencePattern] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedMonthYear, setSelectedMonthYear] = useState(null);

    const watchRecurring = watch("recurring");

    useEffect(() => {
        if (watch('date')) {
            const parsedDate = dayjs(watch('date'));
            setFormattedDate(parsedDate.isValid() ? parsedDate.format('dddd, D MMMM YYYY') : '');
        }
    }, [watch('date')]);

    const generateRecurringDates = (startDate, pattern) => {
        let dates = [];
        let currentDate = dayjs(startDate);

        while (currentDate.month() === dayjs(startDate).month()) {
            if (pattern.includes(currentDate.format('dddd'))) {
                dates.push(currentDate.toDate());
            }
            currentDate = currentDate.add(1, 'day');
        }

        return dates;
    };

    const formatDateToISOString = (date) => {
        return dayjs(date).isValid() ? dayjs(date).toISOString() : null;
    };

    const onSubmit = async (data) => {
        let newSchedules = [];
        if (data.recurring) {
            const recurringDates = generateRecurringDates(data.date, data.recurrencePattern);
            newSchedules = recurringDates
                .map((recDate) => {
                    const formattedDate = formatDateToISOString(recDate);
                    return formattedDate
                        ? {
                            name: data.name,
                            type: data.type,
                            date: formattedDate,
                            time: data.time,
                            location: data.location,
                            details: data.details,
                            recurring: true,
                            recurrencePattern: data.recurrencePattern,
                        }
                        : null;
                })
                .filter((schedule) => schedule !== null);
        } else {
            const formattedDate = formatDateToISOString(data.date);
            if (formattedDate) {
                newSchedules = [
                    {
                        name: data.name,
                        type: data.type,
                        date: formattedDate,
                        time: data.time,
                        location: data.location,
                        details: data.details,
                        recurring: false,
                        recurrencePattern: '',
                    },
                ];
            } else {
                console.error("Invalid date for non-recurring event:", data.date);
            }
        }

        try {
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
        const schedule = schedules[index];
        setValue('name', schedule.schedulename);
        setValue('type', schedule.type);
        setValue('date', dayjs(schedule.scheduledate).isValid() ? dayjs(schedule.date).format('YYYY-MM-DD') : '');
        setValue('time', schedule.time);
        setValue('location', schedule.location);
        setValue('details', schedule.details);
        setValue('recurring', schedule.recurring);
        setValue('recurrencePattern', schedule.recurrencePattern);
    };

    const handleDelete = (index) => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
        resetForm();
    };

    const resetForm = () => {
        reset();
        setFormattedDate('');
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

    // Extract unique months and years from schedules
    const getUniqueMonthsYears = (schedules) => {
        const monthsYears = new Set();
        schedules.forEach(schedule => {
            const date = dayjs(schedule.date);
            monthsYears.add(date.format('MMMM YYYY')); // Add month and year to the set
        });
        return Array.from(monthsYears).sort(); // Convert set to array and sort it
    };

    const uniqueMonthsYears = getUniqueMonthsYears(schedules);

    const handleClickExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Handler to select a month-year and filter schedules
    const handleMonthYearChange = (monthYear) => {
        setSelectedMonthYear(monthYear);
        setIsExpanded(false); // Optionally collapse the panel when a month/year is selected
    };

    // Filter schedules based on the selected month/year
    const filteredSchedules = selectedMonthYear
        ? schedules.filter(schedule => {
            const scheduleDate = dayjs(schedule.date);
            const [month, year] = selectedMonthYear.split(' ');
            return scheduleDate.format('MMMM YYYY') === selectedMonthYear;
        })
        : [];

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
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: 'Date is required' }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="date"
                                    onChange={onChange}
                                    value={value ? dayjs(value).format('YYYY-MM-DD') : ''}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                />
                            )}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="time"
                            id="time"
                            {...register('time', { required: 'Time is required' })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Schedule Time"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            {...register('location', { required: 'Location is required' })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Location"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
                        <textarea
                            id="details"
                            {...register('details')}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Details"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="recurring"
                            {...register('recurring')}
                            className="mr-2"
                        />
                        <label htmlFor="recurring" className="text-sm font-medium text-gray-700">Recurring</label>
                    </div>

                    {watchRecurring && (
                        <div className="mb-4">
                            <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700">Recurrence Pattern (e.g., Monday, Wednesday)</label>
                            <input
                                type="text"
                                id="recurrencePattern"
                                {...register('recurrencePattern')}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                placeholder="Recurrence Pattern"
                            />
                        </div>
                    )}

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        {editingIndex !== null ? 'Update Schedule' : 'Add Schedule'}
                    </button>
                </div>

                <div className="lg:w-1/2 p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gradient">Current Schedule</h2>

                    <div>
                        <button
                            onClick={handleClickExpand}
                            className="bg-gradient-to-r from-blue-500 via-[#cb6ce6] to-[#cb6ce6] p-2 rounded-md w-full text-left text-white"
                        >
                            {isExpanded ? 'Collapse' : 'Expand'} Schedule List
                        </button>
                        {isExpanded && (
                            <div className="mt-4">
                                <h3 className="text-lg font-bold mb-2">Select Month/Year</h3>
                                <ul>
                                    {uniqueMonthsYears.map((monthYear, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleMonthYearChange(monthYear)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {monthYear}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4">
                                    {selectedMonthYear && (
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">Schedules for {selectedMonthYear}</h3>
                                            {filteredSchedules.length > 0 ? (
                                                <ul>
                                                    {filteredSchedules.map((schedule, index) => (
                                                        <li key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                                                            <h4 className="text-lg font-bold">{schedule.name}</h4>
                                                            <p>Date: {dayjs(schedule.scheduledate).format('dddd, D MMMM YYYY')}</p>
                                                            <p>Time: {schedule.time}</p>
                                                            <p>Location: {schedule.location}</p>
                                                            <p>Details: {schedule.details}</p>
                                                            <p>Type: {schedule.type}</p>
                                                            <p>Recurring: {schedule.recurring ? 'Yes' : 'No'}</p>
                                                            {schedule.recurring && <p>Recurrence Pattern: {schedule.recurrencePattern}</p>}
                                                            <div className="flex mt-2">
                                                                <button
                                                                    onClick={() => handleEdit(index)}
                                                                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 mr-2"
                                                                >
                                                                    <AiOutlineEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(index)}
                                                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                                                >
                                                                    <AiOutlineDelete />
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>No schedules available for this month/year.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ManageSchedule;
