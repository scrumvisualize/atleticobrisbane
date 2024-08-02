import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TeamGenerator from './TeamGenerator';
import { useForm } from 'react-hook-form';

const appUrl = process.env.REACT_APP_URL;

const TeamTokenGenerator = () => {

    const [mobileNumber, setMobileNumber] = useState("");
    const [token, setToken] = useState("");
    const [inputToken, setInputToken] = useState("");
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const [tokenError, setTokenError] = useState("");
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    useEffect(() => {
        const storedToken = localStorage.getItem('teamToken');
        if (storedToken) {
            setToken(storedToken);
            setIsTokenValidated(true);
        }
    }, []);

    useEffect(() => {
        // Function to clear local storage
        const clearLocalStorage = () => {
          console.log('Route change detected or component unmounted');
          localStorage.removeItem('teamToken');
          localStorage.removeItem('savedTeams');
        };
    
        // Clear local storage when route changes or component unmounts
        return () => {
          clearLocalStorage();
        };
      }, [location, isTokenValidated]);


    const onSubmit = async (data) => {

        const name = data.name;
        const mobileNumber = data.mobileNumber;
        setMobileNumber(mobileNumber);

        try {
            const response = await axios.post(`${appUrl}/service/teamTokenGenerator`, { name, mobile: mobileNumber });
            const generatedToken = response.data.token;
            setToken(generatedToken);
        } catch (err) {
            setError("Failed to generate token. Please try again.");
        }
    };

    const validateToken = async () => {

        if (!inputToken) {
            setError('inputToken', {
                type: 'manual',
                message: 'Token is required',
            });
            return;
        } else {

            try {
                const response = await axios.get(`${appUrl}/service/validate-token`, {
                    params: {
                        mobile: mobileNumber,
                        token: inputToken
                    }
                });
                if (response.data.isValid) {
                    setIsTokenValidated(true);
                    localStorage.setItem('teamToken', inputToken);
                } else {
                    setTokenError("Invalid token. Please try again !")
                }
            } catch (err) {
                setError("Token validation failed. Please try again !");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-pink-100 bg-gray-50 shadow-md rounded-lg">
            {!isTokenValidated ? (
                <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mb-[200px]">
                    <h1 className="text-center text-gradient p-2">Do you want to try our automatic team generator option ?</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <h2 className="text-center text-2xl font-bold mb-4 text-gradient">Please enter your details</h2>

                        <div className="mb-4">
                            <input
                                type="text"
                                {...register('name', {
                                    required: 'Name is required !',
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Name field supports alphabetic characters only !'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 letters long'
                                    }
                                })}
                                placeholder="Enter your name"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                {...register('mobileNumber', {
                                    required: 'Mobile number is required !',
                                    pattern: {
                                        value: /^04\d{8,}$/,
                                        message: 'Mobile number must starts with 04 and support digits only'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Mobile number supports be 10 digits'
                                    }
                                })}
                                placeholder="Enter your mobile number"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        >
                            Submit
                        </button>
                        {token && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Your Token</h3>
                                <p className="bg-gray-100 p-2 rounded">{token}</p>
                                <h3 className="text-xl font-semibold mt-4">Validate Token</h3>
                                <input
                                    type="text"
                                    {...register('inputToken', { required: 'Token is required !' })}
                                    value={inputToken}
                                    onChange={(e) => setInputToken(e.target.value)}
                                    placeholder="Enter token"
                                    className="w-full p-2 border border-gray-300 rounded mb-4"
                                />
                                {errors.inputToken && <p className="text-red-500 mt-1">{errors.inputToken.message}</p>}
                                <button
                                    onClick={validateToken}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                                >
                                    Validate Token
                                </button>

                                {<p className="text-red-500 mt-1">{tokenError}</p>}
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <div className="w-full md:mb-[100px]">
                    <TeamGenerator />
                </div>
            )}
        </div>
    );
};

export default TeamTokenGenerator;