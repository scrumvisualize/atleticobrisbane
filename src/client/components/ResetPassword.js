import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const appUrl = process.env.REACT_APP_URL;

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter Token, 3: Enter Reset Code, 4: Enter New Password
  const [apiError, setApiError] = useState('');


  const checkUserEmailSubmit = async () => {
    setApiError('');

    try {

      const response = await axios.post(`${appUrl}/service/verifyEmail`, { email });
      if (response.data.valid) {
        setStep(2);
      } else {
        setApiError('Not a valid admin email !');
      }
    } catch (error) {
      setApiError('Failed to verify email');
    }
  };

  const handleTokenSubmit = async () => {
    setApiError('');

    try {

      const response = await axios.post(`${appUrl}/service/verifyToken`, { token });
      if (response.data.valid) {
        setStep(3);
      } else {
        setApiError('Invalid token');
      }
    } catch (error) {
      setApiError('Failed to verify token');
    }
  };

  const handleResetCodeSubmit = async () => {
    setApiError('');

    try {

      const response = await axios.post(`${appUrl}/service/verifyResetCode`, { resetCode });
      if (response.data.valid) {
        setStep(4);
      } else {
        setApiError('Invalid reset code');
      }
    } catch (error) {
      setApiError('Failed to verify reset code');
    }
  };

  const handlePasswordSubmit = async () => {
    setApiError('');

    try {
      
      const response = await axios.post(`${appUrl}/service/resetPassword`, { token, newPassword });
      if (response.data.success) {
        setApiError('Password reset successfully');
      } else {
        setApiError('Failed to reset password');
      }
    } catch (error) {
      setApiError('Failed to reset password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">Reset Password</h1>
      {step === 1 && (
        <form onSubmit={handleSubmit(checkUserEmailSubmit)} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className='text-2xl font-bold text-center '>Step 1</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 p-2">User email</label>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-1 mb-2"
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Verify Email
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(handleTokenSubmit)} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className='text-2xl font-bold text-center '>Step 2</h1>
          <div className="mb-4">
            <label htmlFor="token" className="block text-sm font-medium text-gray-700">Token</label>
            <input
              id="token"
              type="text"
              placeholder="Enter your token"
              {...register('token', { required: 'Token is required !' })}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          {errors.token && <p className="text-red-500">{errors.token.message}</p>}
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Verify Token
          </button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit(handleResetCodeSubmit)} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className='text-2xl font-bold text-center '>Step 3</h1>
          <div className="mb-4">
            <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">Reset Code</label>
            <input
              id="resetCode"
              type="text"
              placeholder="Enter your reset code"
              {...register('resetCode', { required: 'Reset code is required !' })}
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          {errors.resetCode && <p className="text-red-500">{errors.resetCode.message}</p>}
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Verify Reset Code
          </button>
        </form>
      )}
      {step === 4 && (
        <form onSubmit={handleSubmit(handlePasswordSubmit)} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          <h1 className='text-2xl font-bold text-center '>Step 4</h1>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              {...register('newPassword', { required: 'New Password is required !' })}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;