import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterDialog = ({ onClose }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [preview, setPreview] = useState('');
  const [picture, setPicture] = useState('');
  const { register, handleSubmit: onFormSubmit, errors } = useForm();
  const [formRegister, setRegister] = useState({ _id: '', photo: '', name: '', email: '', phonenumber: '', position: '', privilege: '', password: '', token: '' });
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const onSubmit = (data) => {
    console.log(data); // Handle form submission here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Dialog Title</h2>
        <form onSubmit={onFormSubmit(onSubmit)} className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Name"
            name="name"
            ref={register({ required: true })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}

          <input
            type="email"
            placeholder="Email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.email && <span className="text-red-500">Invalid email address</span>}
          <input
            type="tel"
            placeholder="Mobile"
            name="mobile"
            ref={register({ required: true, pattern: /^[0-9]{10}$/ })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.mobile && <span className="text-red-500">Invalid mobile number</span>}

          <select name="position" ref={register} className="w-full border rounded-md px-4 py-2 mb-4">
            <option value="">Select Position</option>
            <option value="soccer">Striker</option>
            <option value="soccer">Defender</option>
            <option value="soccer">Midfielder</option>
          </select>

          <input
            type="date"
            name="dob"
            ref={register({ required: true })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.dob && <span className="text-red-500">Date of Birth is required</span>}

          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            ref={register({ required: true })}
            className="w-full border rounded-md px-4 py-2 mb-4"
          />
          {errors.profilePhoto && <span className="text-red-500">Profile photo is required</span>}
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDialog;