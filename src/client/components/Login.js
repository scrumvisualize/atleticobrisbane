import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = ({ setAuthenticated }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);

    // Reset form fields after submission
    reset();

    // Check credentials
    if (data.email === 'vinod@test.com' && data.password === 'Test1234!') {
      console.log('Login successful');
      setAuthenticated(true);
      navigate('/admin');
    } else {
      console.log('Login failed');
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="font-bold flex justify-center items-center"> 
            <h1>Admin Access Only</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required !',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Please enter a valid email',
              },
            })}
            onChange={handleEmailChange}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required !' })}
            onChange={handlePasswordChange}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;