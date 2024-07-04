import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const appURL = process.env.REACT_APP_URL;

const SponsorDialog = ({ openDialog, onClose, sponsor }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [validationText, setValidationText] = useState('');
    const [isTitleSponsor, setIsTitleSponsor] = useState(false);
    
    useEffect(() => {
        if (sponsor) {
            // Populate the form with the current sponsor data
            //setValue('titleSponsor', sponsor.titlesponsor);
            const titleSponsorValue = sponsor.titlesponsor === 'true' || sponsor.titlesponsor === true;
            setValue('sponsorHeader', sponsor.header);
            setValue('imageUpload', sponsor.logo);
            setValue('urlLink', sponsor.link);
            setValue('category', sponsor.category);
            setValue('description', sponsor.description);
            setIsTitleSponsor(titleSponsorValue);
        } else {
            // Reset the form
            reset();
        }
    }, [sponsor, setValue, reset]);

    const onSubmit = async (data) => {

        // Create a FormData object
        const formData = new FormData();
        //formData.append('titleSponsor', data.titleSponsor);
        formData.append('titleSponsor', data.titleSponsor ? 'true' : 'false'); // Send as string 'true' or 'false'
        formData.append('sponsorHeader', data.sponsorHeader);
        formData.append('urlLink', data.urlLink);
        formData.append('category', data.category);
        formData.append('description', data.description);

        // Append the profile photo file
        formData.append('imageUpload', data.imageUpload[0]);

        // Reset form fields after submission

        try {

            if (sponsor) {
                const res = await axios.put(`${appURL}/service/updateSponsor/${sponsor.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.status === 200) {
                    onClose();
                    window.location.reload(true);
                } else {
                    setValidationText(res.data.message);
                }

            } else {
                const fetchData = async () => {
                    console.log("This is register form data::" + formData);
                    try {
                        const res = await axios.post(`${appURL}/service/addSponsor`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        if (res.data.success) {
                            onClose();
                            // Optionally, you can reload the page if needed
                            window.location.reload(true);
                        } else {
                            setValidationText(res.data.message)
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
        // Implement logic to close the dialog
        onClose(); // Assuming onClose is a function passed as a prop to close the dialog
    };

    const handleCheckboxChange = (e) => {
        setIsTitleSponsor(e.target.checked);
    };


    return (
        <div className="fixed inset-0 mt-20 flex items-center justify-center bg-gray-900 bg-opacity-50 z-199">
            <div className="bg-white p-4 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Add Sponsor</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto h-[420px] overflow-y-auto" encType="multipart/form-data">
                    <div>
                        <label htmlFor="titleSponsor" className="block mb-[-15px] text-sm font-medium text-gray-700">Title Sponsor</label>
                        <input
                            type="checkbox"
                            id="titleSponsor"
                            className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('titleSponsor')}
                            checked={isTitleSponsor}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="headerText" className="block text-sm font-medium text-gray-700">Sponsor Name</label>
                        <input
                            id="sponsorHeader"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('sponsorHeader', {
                                required: 'Sponsor header is required',
                                maxLength: {
                                    value: 100,
                                    message: "Sponsor name cannot exceed 100 characters"
                                },
                            })}
                        />
                        {errors.sponsorHeader && <p className="text-red-500 text-xs mt-1">{errors.sponsorHeader.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">Image Upload</label>
                        <input
                            id="imageUpload"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500"
                            {...register('imageUpload', {
                                required: 'Image upload is required',
                                validate: {
                                    lessThan800KB: (files) => files[0]?.size <= 800 * 1024 || 'File size cannot be greater than 800 KB',
                                }
                            })}
                        />
                        {errors.imageUpload && <p className="text-red-500 text-xs mt-1">{errors.imageUpload.message}</p>}
                        {sponsor && (
                            <img src={`${sponsor.logo.replace(/^(\.\.\\)+public\\/, '')}`} alt="Sponsor Logo" className="mt-2 w-14 h-14 object-cover rounded-lg" />
                        )}
                    </div>
                    <div>
                        <label htmlFor="urlLink" className="block text-sm font-medium text-gray-700">URL Link</label>
                        <input
                            id="urlLink"
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('urlLink', {
                                required: 'URL link is required',
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$|^(www)\.[^ "]+$/,
                                    message: 'Enter a valid URL'
                                }
                            })}
                        />
                        {errors.urlLink && <p className="text-red-500 text-xs mt-1">{errors.urlLink.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            id="category"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('category', {
                                required: 'Category is required',
                                maxLength: {
                                    value: 120,
                                    message: "Category cannot exceed 120 characters"
                                },
                            })}
                        />
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('description', {
                                required: 'Description is required',
                                maxLength: {
                                    value: 400,
                                    message: "Description cannot exceed 400 characters"
                                },
                            })}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    <span className="text-base text-red-500">{validationText}</span>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {sponsor ? 'Update' : 'Save'}
                        </button>
                        <button type="button" onClick={handleCancel} className="w-full h-10 px-4 py-2 mt-4 ml-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition duration-300 focus:ring-2 focus:ring-offset-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SponsorDialog;