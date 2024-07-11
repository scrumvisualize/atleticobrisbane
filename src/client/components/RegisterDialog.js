import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const appUrl = process.env.REACT_APP_URL;

const RegisterDialog = ({ onClose }) => {

  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [validationText, setValidationText] = useState('');
  
  const onSubmit = (data) => {

    // Create a FormData object
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('mobile', data.mobile);
    formData.append('email', data.email);
    formData.append('jerseynumber', data.jerseynumber);
    formData.append('ageGroup', data.ageGroup);
    formData.append('position', data.position);
    formData.append('favclub', data.favclub);
    formData.append('comments', data.comments);
    formData.append('code', data.code);

    // Append the profile photo file
    formData.append('profilePhoto', data.profilePhoto[0]);

    // Reset form fields after submission
    
    const fetchData = async () => {
      console.log("This is register form data::"+formData);
        try {
            const res = await axios.put(`${appUrl}/service/registerPlayer`, formData, {
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
              setValidationText('An error occurred. Please try again.');
            }
            console.log(e);
        }
    }
    fetchData();
    reset();
}


  const handleCancel = () => {
    // Implement logic to close the dialog
    onClose(); // Assuming onClose is a function passed as a prop to close the dialog
  };

  
  const handleChange = (event) => {
    setSelectedAgeGroup(event.target.value);
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
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.name && <span className="text-xs text-red-500">Name is required</span>}

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            {...register('mobile', {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid mobile number"
              }
            })}
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.mobile && <span className="text-xs text-red-500">{errors.mobile.message}</span>}

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
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}

          <input
            type="tel"
            name="jerseynumber"
            placeholder="Preferred Jersey Number"
            {...register('jerseynumber', {
              required: "Jersey number is required",
              pattern: {
                value: /^[0-9]{1,2}$/,
                message: "Invalid Jersey number"
              }
            })}
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.jerseynumber && <span className="text-xs text-red-500">{errors.jerseynumber.message}</span>}

          <div className="age-group-selector pb-4">
            <div className="text-xs font-bold pb-2">Select Age Group</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="Open"
                    {...register('ageGroup', { required: true })}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-xs ml-2">Open age</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="AB40"
                    {...register('ageGroup', { required: true })}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-xs ml-2">Above 40</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="U16"
                    {...register('ageGroup', { required: true })}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-xs ml-2">U16</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ageGroup"
                    value="U12"
                    {...register('ageGroup', { required: true })}
                    className="form-radio text-blue-600"
                  />
                  <span className="text-xs ml-2">U12</span>
                </label>
              </div>
            </div>
          </div>

          <select name="position" {...register('position', { required: true })} className="w-full border rounded-md px-4 py-1 mb-2">
            <option value="">Select Position</option>
            <option value="Striker">Striker</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Keeper">Goal Keeper</option>
            <option value="coaching">Football Coaching</option>
          </select>
          {errors.position && <p className="text-xs text-red-500">Position is required</p>}

          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            {...register('profilePhoto', {
              required: true,
              validate: {
                lessThan800KB: (files) => files[0]?.size <= 800 * 1024 || 'File size cannot be greater than 800 KB',
               }
            })}
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.profilePhoto && <span className="text-xs text-red-500">{errors.profilePhoto.message}</span>}

          <select name="favclub" {...register('favclub', { required: false })} className="w-full border rounded-md px-4 py-1 mb-2">
            <option value="select">What's your favourite soccer club?</option>
            <option value="Chelsea">Chelsea</option>
            <option value="Arsenal">Arsenal</option>
            <option value="City">Manchester City</option>
            <option value="United">Manchester United</option>
            <option value="Liverpool">Liverpool</option>
            <option value="Barcelona">Barcelona</option>
            <option value="RealMadrid">Real Madrid</option>
            <option value="Bayern">Bayern Munich</option>
            <option value="Dortmund">Borussia Dortmund</option>
            <option value="PSG">PSG</option>
            <option value="Tottenham">Tottenham</option>
          </select>
        <textarea 
          name="comments" 
          rows="3" 
          cols="67"
          placeholder="comments"
            {...register('comments', {
              required: "Please enter comments",
              maxLength: {
                value: 100,
                message: "Comments cannot exceed 100 characters"
              },
            pattern: {
              value: /^[a-zA-Z0-9!#$%&()+=\s.,?'"-]{10,100}$/,
              message: "Invalid characters provided. Only alphanumeric and !#$%&()+=.,?'-\" are allowed"
            }
            })}
            className="w-full border rounded-md px-4 py-1 mb-2"
          >
          </textarea>
          {errors.comments && <span className="text-xs text-red-500">{errors.comments.message}</span>}

          <input
            type="text"
            name="code"
            placeholder="Code"
            {...register('code', {
              required: "Please provide a valid code",
              pattern: {
                value: /^[a-zA-Z0-9#!@$%_]{10,}$/,
                message: "Invalid code provided"
              }
            })}
            className="w-full border rounded-md px-4 py-1 mb-2"
          />
          {errors.code && <span className="text-xs text-red-500">{errors.code.message}</span>}
          <span className="text-base text-red-500">{validationText}</span>
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