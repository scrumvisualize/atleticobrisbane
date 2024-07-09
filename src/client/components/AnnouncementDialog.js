import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const AnnouncementDialog = ({ onClose, announcement }) => {
    const [validationText, setValidationText] = useState('');
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    useEffect(() => {
        if (announcement) {
            // Populate the form with the current announcement data
            setValue('heading', announcement.announcementheading);
            setValue('urllink', announcement.urllink);
            setValue('description', announcement.description);
        } else {
            // Reset the form
            reset();
        }
    }, [announcement, setValue, reset]);

    const onSubmit = async (data) => {

        const loginemail = localStorage.getItem('loginEmail');

        const formData = new FormData();
        formData.append('heading', data.heading);
        formData.append('urllink', data.urllink);
        formData.append('description', data.description);
        formData.append('email', loginemail);

        // Append the profile photo file
        if (data.announceImage && data.announceImage.length > 0) {

            const imgFile = data.announceImage[0];

            if (validateImageSize(imgFile)) {
                formData.append('announceImage', imgFile);
            } else {
                // Handle the error case where the image is too large
                setValidationText("Image size is too large. It should be 800KB or less.");
                console.error('Image size is too large. It should be 800KB or less.');
                return; // Optionally return or set an error state
            }
        }

        function validateImageSize(file) {
            return file.size <= 800 * 1024;
        }

        try {

            if (announcement) {
                const res = await axios.put(`${appURL}/service/update-announcement-details/${announcement.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.status === 200) {
                    onClose();
                } else {
                    setValidationText(res.data.message);
                }

            } else {

                const fetchData = async () => {
                    try {
                        const res = await axios.post(`${appURL}/service/announcementdetails`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        if (res.data.success) {
                            onClose();
                           // window.location.reload(true);
                        } else {
                            setValidationText(res.data.message);
                        }
                    } catch (e) {
                        if (e.response && e.response.data && e.response.data.message) {
                            setValidationText(e.response.data.message);
                        } else {
                            setValidationText(e.response.data.message);
                        }
                        console.log(e);
                    }
                }
                fetchData();
                reset();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        onClose(); // Assuming onClose is a function passed as a prop to close the dialog
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Atletico Announcement Details:</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md" encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Brief details of announcement</label>
                        <input
                            id="heading"
                            type="text"
                            {...register('heading', {
                                required: 'Announcement details is required!',
                                maxLength: {
                                    value: 100,
                                    message: "Announcement details cannot exceed 100 characters"
                                },
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.heading && <p className="text-red-500 text-xs mt-1">{errors.heading.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="announceImage" className="block text-sm font-medium text-gray-700">Image Upload</label>
                        <input
                            id="announceImage"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500"
                            {...register('announceImage', {
                                required: "Image upload is required!",
                            })}
                        />
                        {errors.announceImage && <p className="text-red-500 text-xs mt-1">{errors.announceImage.message}</p>}
                        {announcement && (
                            <img src={`${announcement.image.replace(/^(\.\.\\)+public\\/, '')}`} alt="Announcement Logo" className="mt-2 w-14 h-14 object-cover rounded-lg" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="urllink" className="block text-sm font-medium text-gray-700">Link URL:</label>
                        <input
                            id="urllink"
                            type="text"
                            {...register('urllink', {
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$|^(www)\.[^ "]+$/,
                                    message: 'Please enter a valid URL!'
                                }
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.urllink && <p className="text-red-500 text-xs mt-1">{errors.urllink.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            {...register('description', {
                                required: "Description field cannot be blank!",
                                maxLength: {
                                    value: 1500,
                                    message: "Description cannot exceed 1500 characters!"
                                },
                            })}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                    <span className="text-base text-red-500">{validationText}</span>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            {announcement ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AnnouncementDialog;