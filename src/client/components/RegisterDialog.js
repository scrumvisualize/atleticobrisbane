import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterDialog = ({ onClose }) => {

  // const [isOpen, setIsOpen] = useState(false);
  // const [inputValue, setInputValue] = useState('');
  // const [preview, setPreview] = useState('');
  // const [picture, setPicture] = useState('');
  //const { handleSubmit, register, errors } = useForm();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [formRegister, setRegister] = useState({ _id: '', photo: '', name: '', email: '', phonenumber: '', position: '', privilege: '', password: '', token: '' });


  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
  };

  const handleCancel = () => {
    // Implement logic to close the dialog
    onClose(); // Assuming onClose is a function passed as a prop to close the dialog
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Register Player Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register('name', {
              required: true
            })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register('email', {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })
            }
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            {...register('mobile',{ 
              required: "Mobile number is required", 
              pattern: {
                value: /^[0-9]{10}$/ ,
                message: "Invalid mobile number"
              }
            })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}

          <input
            type="text"
            name="code"
            placeholder="Code"
            {...register('code',{ 
              required: "Please provide a valid code", 
              pattern: {
                value: /^[a-zA-Z0-9#!@$%_]{10,}$/ ,
                message: "Invalid code provided"
              }
            })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.code && <span className="text-red-500">{errors.code.message}</span>}

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDialog;