import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TrainingDialog  = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit =(data) =>{
        console.log("Training data will add soon::"+data.playerName);
    }
    const handleCancel = () => {
        // Implement logic to close the dialog
        onClose(); 
      };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-40">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto" encType="multipart/form-data">
                    <div className='text-blue-500'>We're still working on it, please be patient!</div>
                    {/* <div>
                        <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">Player Name</label>
                        <input
                            id="playerName"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('playerName', {
                                required: 'Player name is required',
                                maxLength: {
                                    value: 100,
                                    message: "Sponsor name cannot exceed 100 characters"
                                },
                            })}
                        />
                        {errors.playerName && <p className="text-red-500 text-xs mt-1">{errors.playerName.message}</p>}
                    </div> */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                        <button type="button" onClick={handleCancel} className="w-full h-10 px-4 py-2 mt-4 ml-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition duration-300 focus:ring-2 focus:ring-offset-2">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TrainingDialog;